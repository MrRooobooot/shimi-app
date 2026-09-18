"""
brand.py — منبع واحد هویت بصری برای همه فایل‌های تولیدی
لوگوی وکتوری (بدون ایموجی سیستمی) + واترمارک اجباری + توکن‌های رنگ

قانون: هر فایل PDF/تصویری که ساخته می‌شود باید از LOGO_SVG و WATERMARK_SVG این ماژول استفاده کند.
"""

# ───────────────────────── رنگ‌های برند ─────────────────────────
INK    = "#0F172A"   # سرمه‌ای متن اصلی
BODY   = "#334155"   # متن بدنه
MUTED  = "#64748B"   # متن کم‌رنگ
HAIR   = "#E2E8F0"   # خطوط جداکننده
CYAN   = "#0284C7"   # فیروزه‌ای اصلی
CYAN_L = "#38BDF8"
GOLD   = "#D97706"   # طلایی/کهربایی
GREEN  = "#059669"
RED    = "#DC2626"

# ─────────────────────── لوگوی وکتوری (SVG) ───────────────────────
# ارلن آزمایشگاهی — خوانا در اندازه‌های کوچک، هم‌ضخامت با تایپوگرافی
# هرگز ایموجی سیستمی (⚗️ 🧪 📅 ...) به‌عنوان آیکون رابط استفاده نکن.
LOGO_PATHS = (
    '<path d="M9.2 2.6h5.6"/>'
    '<path d="M10.4 2.6v6.1L5.9 16.8A2.6 2.6 0 0 0 8.2 20.8h7.6a2.6 2.6 0 0 0 2.3-4L13.6 8.7V2.6"/>'
    '<path d="M7.6 15.2h8.8"/>'
    '<circle cx="10.6" cy="17.6" r="0.9" fill="currentColor" stroke="none"/>'
    '<circle cx="13.6" cy="18.4" r="0.7" fill="currentColor" stroke="none"/>'
)


def logo_svg(size: int = 30, stroke: str = "#FFFFFF", sw: float = 1.9) -> str:
    """آیکون وکتوری داخل کاشی رنگی برند."""
    return (
        f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" '
        f'stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">'
        f'{LOGO_PATHS}</svg>'
    )


def logo_tile(size: int = 30, radius: int = 8, bg: str = CYAN,
              stroke: str = "#FFFFFF", fs: str = "") -> str:
    """کاشی لوگو — همان چیزی که در هدر فایل‌ها می‌نشیند."""
    icon = logo_svg(int(size * 0.62), stroke)
    return (
        f'<div style="width:{size}px;height:{size}px;border-radius:{radius}px;'
        f'background:{bg};display:flex;align-items:center;justify-content:center;'
        f'flex:0 0 auto;{fs}">{icon}</div>'
    )


# ───────────────────────── واترمارک اجباری ─────────────────────────
# همه‌جا باید باشد: PDF، پوستر، کارت. بدون استثنا.
WATERMARK_ID = "shimi_wm"


def watermark_svg(owner: str = "الهه محمددوست",
                  handle: str = "@shimi_mohamaddost",
                  second: str = "رتبه ۷۸۸ • شیمی کنکور",
                  opacity: float = 0.055,
                  angle: int = -24,
                  tile_w: int = 300, tile_h: int = 150,
                  color: str = CYAN) -> str:
    """ماتریس واترمارک مورب سراسری — ضدکات و ضدسرقت."""
    return f'''<div style="position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden">
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="{WATERMARK_ID}" width="{tile_w}" height="{tile_h}"
             patternUnits="userSpaceOnUse" patternTransform="rotate({angle})">
      <text x="12" y="42" font-family="Vazirmatn,sans-serif" font-size="10.5"
            font-weight="900" fill="{color}" opacity="{opacity}">{owner} • {handle}</text>
      <text x="140" y="112" font-family="Vazirmatn,sans-serif" font-size="9.5"
            font-weight="900" fill="{color}" opacity="{opacity}">{second}</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#{WATERMARK_ID})"/>
</svg>
</div>'''


# ───────────────────────── بلوک امضا (هدر/فوتر) ─────────────────────────
SIGNATURE_NAME = "الهه محمددوست"
SIGNATURE_CRED = "دانشجوی پزشکی مشهد • رتبه ۷۸۸"
CHANNEL_URL    = "t.me/shimi_mohamaddost"
CHANNEL_HANDLE = "@shimi_mohamaddost"


def header_signature(align: str = "left", name_pt: float = 9,
                     cred_pt: float = 6.8) -> str:
    """
    بلوک امضا در هدر. متن فارسی است، پس هرگز direction:ltr نگذار —
    فقط ترازبندی را با text-align کنترل کن.
    """
    return (
        f'<div style="text-align:{align};line-height:1.35">'
        f'<b style="display:block;font-size:{name_pt}pt;font-weight:900;color:{INK}">'
        f'{SIGNATURE_NAME}</b>'
        f'<i style="font-style:normal;font-size:{cred_pt}pt;color:{MUTED};font-weight:700">'
        f'{SIGNATURE_CRED}</i></div>'
    )


def footer_signature(label: str = "برگه طلایی رتبه برتر • کانال شیمی کنکور") -> str:
    return (
        f'<div>{label}</div>'
        f'<div style="direction:ltr;color:{CYAN};font-weight:800">'
        f'{CHANNEL_URL} • {CHANNEL_HANDLE}</div>'
    )


# ───────────────────────── لیست سیاه ایموجی ─────────────────────────
# ایموجی‌های سیستمی که هرگز نباید نقش آیکون رابط را بازی کنند.
FORBIDDEN_UI_EMOJI = ["⚗️", "🧪", "📅", "📄", "📊", "📬", "💬", "🔥", "🎯", "🩺", "🔬"]


def audit_emoji_icons(html: str) -> list:
    """ایموجی‌های سیستمی باقی‌مانده در جایگاه آیکون را گزارش می‌دهد."""
    return [e for e in FORBIDDEN_UI_EMOJI if e in html]


if __name__ == "__main__":
    import sys
    src = sys.stdin.read() if not sys.argv[1:] else open(sys.argv[1], encoding="utf-8").read()
    found = audit_emoji_icons(src)
    print("لوگو وکتوری:", "OK" if logo_svg() else "FAIL")
    print("واترمارک:", "OK" if watermark_svg() else "FAIL")
    print("ایموجی سیستمی باقی‌مانده:", found if found else "هیچ — پاک است ✓")
