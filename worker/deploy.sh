#!/bin/bash
# Deploy the Telegram webhook bot to Cloudflare Workers (account already logged in via `wrangler login`).
# Token is read from the bot env at deploy time, pushed as an encrypted Worker secret, never printed or committed.
set -euo pipefail
cd "$(dirname "$0")"

TOKEN_SRC="${SHIMI_TOKEN_SRC:-$HOME/shimi_bot/.env}"
TOKEN=$(grep -m1 -oE '[0-9]{8,10}:[A-Za-z0-9_-]{30,}' "$TOKEN_SRC")
[ -n "$TOKEN" ] || { echo "no bot token found in $TOKEN_SRC" >&2; exit 1; }

# one-time generated values (kept out of git, chmod 600)
if [ ! -f .env.local ]; then
  umask 077
  printf 'WEBHOOK_SECRET=%s\nADMIN_KEY=%s\n' "$(openssl rand -hex 24)" "$(openssl rand -hex 16)" > .env.local
fi
# shellcheck disable=SC1091
. ./.env.local

cat > .wrangler.local.jsonc <<'JSONC'
{
  "name": "shimi-chem-bot",
  "main": "index.js",
  "compatibility_date": "2025-01-01"
}
JSONC

redact() { sed -E 's/[0-9]{8,10}:[A-Za-z0-9_-]{30,}/<token-redacted>/g'; }

# wrangler's OAuth refresh is bot-challenged on some networks; an API token in .env.local wins.
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  export CLOUDFLARE_API_TOKEN
  echo "auth: CLOUDFLARE_API_TOKEN from .env.local"
else
  echo "auth: wrangler OAuth (no CLOUDFLARE_API_TOKEN in .env.local)"
fi

put_secret() {
  printf '%s' "$2" | npx --yes wrangler@latest secret put "$1" -c .wrangler.local.jsonc 2>&1 | redact | tail -2
}
if [ "${1:-}" = "--secrets" ]; then
  shift
  put_secret TELEGRAM_BOT_TOKEN "$TOKEN"
  put_secret WEBHOOK_SECRET "$WEBHOOK_SECRET"
  put_secret ADMIN_KEY "$ADMIN_KEY"
fi

npx --yes wrangler@latest deploy -c .wrangler.local.jsonc "$@" 2>&1 | redact
