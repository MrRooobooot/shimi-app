#!/usr/bin/env python3
"""
پوستر ۲۵۶۰×۲۵۶۰ (Retina 2x) — پست آموزشی: تست مولار و ppm شیمی دهم
لوگوی وکتوری + واترمارک ۲۸px اجباری + ۱۰۰٪ فارسی + گرید ۸ پیکسلی
"""
import subprocess, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from brand import (logo_tile, watermark_svg, CYAN, GOLD, INK, MUTED, audit_emoji_icons)

def build_html() -> str:
    return f'''<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1280px; height: 1280px; background: #02050E;
    font-family: "Vazirmatn", -apple-system, sans-serif;
    direction: rtl; -webkit-font-smoothing: antialiased;
  }}
  .poster {{
    width: 1280px; height: 1280px;
    background: radial-gradient(circle at 50% 18%, #0C2046 0%, #061226 55%, #02050E 100%);
    display: flex; flex-direction: column;
    padding: 56px 72px; position: relative; overflow: hidden;
  }}
  .wm {{ position: absolute; inset: 0; z-index: 50; pointer-events: none; }}
  .glow {{
    position: absolute; width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,.12) 0%, rgba(99,102,241,.05) 50%, transparent 70%);
    top: 100px; left: 290px; filter: blur(90px); pointer-events: none; z-index: 1;
  }}

  .hd {{ display: flex; justify-content: space-between; align-items: center; padding-bottom: 22px; border-bottom: 1.5px solid rgba(255,255,255,.10); position: relative; z-index: 10; }}
  .hd-r {{ display: flex; align-items: center; gap: 16px; }}
  .hd-t .kicker {{ font-size: 20px; font-weight: 800; color: #38BDF8; margin-bottom: 4px; }}
  .hd-t .name {{ font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 1.2; }}
  .rank-pill {{
    background: rgba(251,191,36,.10); border: 1.5px solid rgba(251,191,36,.4);
    color: #FBBF24; padding: 10px 24px; border-radius: 999px;
    font-size: 22px; font-weight: 900; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }}

  .hero {{ text-align: center; margin-top: 32px; position: relative; z-index: 10; }}
  .super {{
    display: inline-block; background: rgba(0,229,255,.09); border: 1.5px solid rgba(0,229,255,.35);
    color: #38BDF8; padding: 8px 24px; border-radius: 999px;
    font-size: 21px; font-weight: 800; margin-bottom: 16px;
  }}
  .hero h1 {{ font-size: 66px; font-weight: 900; color: #FFFFFF; line-height: 1.22; text-shadow: 0 8px 24px rgba(0,0,0,.7); }}
  .hero h1 span {{ color: #0284C7; }}
  .hero p.sub {{ margin-top: 14px; font-size: 24px; font-weight: 700; color: #B9C6E4; }}

  .stage {{ display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 34px; position: relative; z-index: 10; flex: 1 1 auto; }}
  .card {{
    background: rgba(255,255,255,.045); border: 1.5px solid rgba(255,255,255,.10);
    border-radius: 22px; padding: 24px 28px; display: flex; flex-direction: column; justify-content: space-between;
  }}
  .card.win {{
    background: linear-gradient(180deg, rgba(0,229,255,.12) 0%, rgba(15,27,61,.4) 100%);
    border-color: rgba(0,229,255,.45); box-shadow: 0 16px 40px rgba(0,229,255,.12);
  }}
  .c-hd {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }}
  .c-badge {{ font-size: 19px; font-weight: 800; padding: 6px 18px; border-radius: 999px; }}
  .card.bad .c-badge {{ background: rgba(239,68,68,.14); color: #F87171; border: 1px solid rgba(239,68,68,.3); }}
  .card.win .c-badge {{ background: rgba(34,197,94,.18); color: #4ADE80; border: 1px solid rgba(34,197,94,.4); }}
  .c-time {{ font-size: 20px; font-weight: 800; color: #94A3B8; }}
  .card.win .c-time {{ color: #38BDF8; font-weight: 900; }}

  .c-formula {{
    background: rgba(0,0,0,.35); border-radius: 13px; padding: 16px 18px;
    font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.6; margin-bottom: 14px;
  }}
  .c-formula code {{ direction: ltr; unicode-bidi: isolate; display: block; color: #38BDF8; font-size: 23px; font-weight: 900; margin-top: 5px; }}
  .card.bad .c-formula code {{ color: #FCA5A5; font-size: 21px; }}

  .c-list {{ list-style: none; display: flex; flex-direction: column; gap: 9px; font-size: 20px; color: #CBD5E1; font-weight: 600; }}
  .c-list li {{ display: flex; align-items: center; gap: 10px; }}

  .example-box {{
    margin-top: 24px; background: rgba(15,23,42,.65); border: 1.5px solid rgba(255,255,255,.12);
    border-radius: 18px; padding: 20px 26px; position: relative; z-index: 10;
  }}
  .ex-hd {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }}
  .ex-tag {{ font-size: 19px; font-weight: 900; color: #FBBF24; }}
  .ex-body {{ font-size: 21px; font-weight: 700; color: #E2E8F0; line-height: 1.6; }}
  .ex-calc {{
    direction: ltr; unicode-bidi: isolate;
    background: rgba(0,0,0,.4); border-radius: 10px; padding: 9px 16px;
    font-size: 22px; font-weight: 900; color: #0284C7; margin-top: 9px; text-align: center;
  }}

  .ft {{
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 22px; padding-top: 16px; border-top: 1.5px solid rgba(255,255,255,.10);
    position: relative; z-index: 10; font-size: 20px; color: #8FA0C4; font-weight: 700;
  }}
  .ft .id {{ direction: ltr; color: #38BDF8; font-weight: 800; }}
</style>
</head>
<body>
<div class="poster">
  <div class="glow"></div>
  {watermark_svg(is_poster=True)}

  <div class="hd">
    <div class="hd-r">
      {logo_tile(68, 18, CYAN)}
      <div class="hd-t">
        <div class="kicker">شیمی دهم • فصل دوم</div>
        <div class="name">الهه محمددوست</div>
      </div>
    </div>
    <div class="rank-pill">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
      دانشجوی پزشکی مشهد • رتبه ۷۸۸
    </div>
  </div>

  <div class="hero">
    <span class="super">متد اختصاصی کلینیکال</span>
    <h1>مقایسه غلظت‌ها: <span>مولار، مولال و ppm</span></h1>
    <p class="sub">تفکیک سه واحد غلظتی که ۹۰٪ داوطلبان در آن اشتباه می‌کنند!</p>
  </div>

  <div class="stage">
    <div class="card bad">
      <div class="c-hd">
        <span class="c-badge">اشتباه رایج داوطلبان</span>
        <span class="c-time">ریشه اشتباه</span>
      </div>
      <div class="c-formula">
        تصور غلط: مخلوط کردن صورت کسرها
        <code>مولار = مول solute / حلال؟</code>
      </div>
      <ul class="c-list">
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>مخلوط کردن حجم محلول با حجم حلال</li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>فراموش کردن تبدیل میلی‌گرم به گرم در ppm</li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>اشتباه در تفاوت جرم محلول و جرم حلال</li>
      </ul>
    </div>

    <div class="card win">
      <div class="c-hd">
        <span class="c-badge">متد کلینیکال (سه‌ستون طلایی)</span>
        <span class="c-time">جدول ۱۰ ثانیه‌ای</span>
      </div>
      <div class="c-formula">
        صورت کسر همیشه «حل‌شونده» و مخرج:
        <code>M = n/V(L) | m = n/kg(solvent) | ppm = mg/L(soln)</code>
      </div>
      <ul class="c-list">
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>مولار: مخرج = حجم محلول بر حسب لیتر</li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>مولال: مخرج = جرم حلال بر حسب کیلوگرم</li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>ppm: گرم بر میلی‌گرم و مخرج ۱۰⁶</li>
      </ul>
    </div>
  </div>

  <div class="example-box">
    <div class="ex-hd">
      <span class="ex-tag">مثال کنکوری سراسری:</span>
      <span style="font-size:18px;color:#94A3B8;font-weight:700">تست محاسباتی تجربی</span>
    </div>
    <div class="ex-body">
      ۰.۰۵ مول نمک در ۲۵۰ میلی‌لیتر آب حل شده است. مولار محلول کدام است؟
    </div>
    <div class="ex-calc">
      M = 0.05 mol ÷ 0.250 L = 0.20 M   (مولار = مول ÷ حجم محلول به لیتر!)
    </div>
  </div>

  <div class="ft">
    <div>پوستر آموزشی اختصاصی • کانال شیمی کنکور</div>
    <div class="id">@shimi_mohamaddost</div>
  </div>
</div>
</body>
</html>'''

def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/molar_poster.html"
    png_path = f"{out_dir}/poster_molar_concentration.png"
    html = build_html()
    if audit_emoji_icons(html): raise SystemExit("emoji error")
    if "shimi_wm" not in html: raise SystemExit("watermark missing")
    with open(html_path, "w", encoding="utf-8") as f: f.write(html)

    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
        ctx = browser.new_context(viewport={"width": 1280, "height": 1280}, device_scale_factor=2)
        page = ctx.new_page()
        page.goto(f"file://{html_path}")
        page.wait_for_timeout(500)
        page.screenshot(path=png_path)
        browser.close()
    size_kb = os.path.getsize(png_path) // 1024
    print(f"Poster 1: {png_path} | size={size_kb}KB (2560x2560 Retina)")

if __name__ == "__main__":
    main()
