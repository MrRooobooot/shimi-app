#!/usr/bin/env python3
"""
پوستر ۱۲۸۰×۱۲۸۰ شیمی دهم — متد ترازوی گشتاور برای جرم اتمی میانگین
لوگوی وکتوری + واترمارک سراسری + ۱۰۰٪ فارسی + گرید ۸ پیکسلی
"""
import subprocess, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from brand import (logo_tile, watermark_svg, CYAN, GOLD, INK, MUTED, audit_emoji_icons)

def build_html() -> str:
    return f'''<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
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

  /* header */
  .hd {{
    display: flex; justify-content: space-between; align-items: center;
    padding-bottom: 22px; border-bottom: 1.5px solid rgba(255,255,255,.10);
    position: relative; z-index: 10;
  }}
  .hd-r {{ display: flex; align-items: center; gap: 16px; }}
  .hd-t .kicker {{ font-size: 20px; font-weight: 800; color: #38BDF8; margin-bottom: 4px; }}
  .hd-t .name {{ font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 1.2; }}
  .rank-pill {{
    background: rgba(251,191,36,.10); border: 1.5px solid rgba(251,191,36,.4);
    color: #FBBF24; padding: 10px 24px; border-radius: 999px;
    font-size: 22px; font-weight: 900; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }}

  /* hero */
  .hero {{ text-align: center; margin-top: 32px; position: relative; z-index: 10; }}
  .super {{
    display: inline-block;
    background: rgba(0,229,255,.09); border: 1.5px solid rgba(0,229,255,.35);
    color: #38BDF8; padding: 8px 24px; border-radius: 999px;
    font-size: 21px; font-weight: 800; margin-bottom: 16px;
  }}
  .hero h1 {{
    font-size: 68px; font-weight: 900; color: #FFFFFF; line-height: 1.22;
    text-shadow: 0 8px 24px rgba(0,0,0,.7);
  }}
  .hero h1 span {{ color: #00E5FF; }}
  .hero p.sub {{
    margin-top: 14px; font-size: 25px; font-weight: 700; color: #B9C6E4;
  }}

  /* stage comparison */
  .stage {{
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
    margin-top: 36px; position: relative; z-index: 10; flex: 1 1 auto;
  }}
  .card {{
    background: rgba(255,255,255,.045); border: 1.5px solid rgba(255,255,255,.10);
    border-radius: 24px; padding: 28px 30px; display: flex; flex-direction: column;
    justify-content: space-between;
  }}
  .card.win {{
    background: linear-gradient(180deg, rgba(0,229,255,.12) 0%, rgba(15,27,61,.4) 100%);
    border-color: rgba(0,229,255,.45);
    box-shadow: 0 16px 40px rgba(0,229,255,.12);
  }}
  .c-hd {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }}
  .c-badge {{
    font-size: 19px; font-weight: 800; padding: 6px 18px; border-radius: 999px;
  }}
  .card.bad .c-badge {{ background: rgba(239,68,68,.14); color: #F87171; border: 1px solid rgba(239,68,68,.3); }}
  .card.win .c-badge {{ background: rgba(34,197,94,.18); color: #4ADE80; border: 1px solid rgba(34,197,94,.4); }}
  .c-time {{ font-size: 20px; font-weight: 800; color: #94A3B8; }}
  .card.win .c-time {{ color: #38BDF8; font-weight: 900; }}

  .c-formula {{
    background: rgba(0,0,0,.35); border-radius: 14px; padding: 18px 20px;
    font-size: 23px; font-weight: 800; color: #FFFFFF; line-height: 1.6;
    margin-bottom: 16px;
  }}
  .c-formula code {{
    direction: ltr; unicode-bidi: isolate; display: block;
    color: #38BDF8; font-size: 24px; font-weight: 900; margin-top: 6px;
  }}
  .card.bad .c-formula code {{ color: #FCA5A5; font-size: 21px; }}

  .c-list {{ list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 21px; color: #CBD5E1; font-weight: 600; }}
  .c-list li {{ display: flex; align-items: center; gap: 10px; }}
  .c-list li svg {{ flex: 0 0 auto; }}

  /* worked example */
  .example-box {{
    margin-top: 26px; background: rgba(15,23,42,.65); border: 1.5px solid rgba(255,255,255,.12);
    border-radius: 20px; padding: 22px 28px; position: relative; z-index: 10;
  }}
  .ex-hd {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }}
  .ex-tag {{ font-size: 19px; font-weight: 900; color: #FBBF24; }}
  .ex-body {{ font-size: 22px; font-weight: 700; color: #E2E8F0; line-height: 1.6; }}
  .ex-calc {{
    direction: ltr; unicode-bidi: isolate;
    background: rgba(0,0,0,.4); border-radius: 10px; padding: 10px 16px;
    font-size: 23px; font-weight: 900; color: #00E5FF; margin-top: 10px; text-align: center;
  }}

  /* footer */
  .ft {{
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 26px; padding-top: 18px; border-top: 1.5px solid rgba(255,255,255,.10);
    position: relative; z-index: 10; font-size: 20px; color: #8FA0C4; font-weight: 700;
  }}
  .ft .id {{ direction: ltr; color: #38BDF8; font-weight: 800; }}
</style>
</head>
<body>
<div class="poster">

  <div class="glow"></div>
  {watermark_svg()}

  <!-- header -->
  <div class="hd">
    <div class="hd-r">
      {logo_tile(68, 18, CYAN)}
      <div class="hd-t">
        <div class="kicker">شیمی دهم • فصل اول</div>
        <div class="name">الهه محمددوست</div>
      </div>
    </div>
    <div class="rank-pill">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
      دانشجوی پزشکی مشهد • رتبه ۷۸۸
    </div>
  </div>

  <!-- hero -->
  <div class="hero">
    <span class="super">متد اختصاصی کلینیکال</span>
    <h1>محاسبه ۳ ثانیه‌ای <span>جرم اتمی میانگین</span></h1>
    <p class="sub">تکنیک ترازوی گشتاور — بدون معادله دو مجهولی و کسرهای وقت‌گیر کتاب</p>
  </div>

  <!-- comparison stage -->
  <div class="stage">
    <!-- bad -->
    <div class="card bad">
      <div class="c-hd">
        <span class="c-badge">روش سنتی کتاب درسی</span>
        <span class="c-time">⏱ اتلاف ۹۰ ثانیه</span>
      </div>
      <div class="c-formula">
        فرمول میانگین وزنی:
        <code>M̄ = (M₁·F₁ + M₂·F₂) / 100</code>
      </div>
      <ul class="c-list">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ضرب و جمع اعداد چندرقمی سنگین
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          تقسیم بر ۱۰۰ و جابه‌جایی اعشار
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          احتمال بالای خطای محاسباتی در کنکور
        </li>
      </ul>
    </div>

    <!-- win -->
    <div class="card win">
      <div class="c-hd">
        <span class="c-badge">متد کلینیکال (ترازوی گشتاور)</span>
        <span class="c-time">⚡️ فقط ۳ ثانیه</span>
      </div>
      <div class="c-formula">
        تکیه‌گاه روی ایزوتوپ سبک‌تر:
        <code>M̄ = M_سبک + (اختلاف جرم × درصد سنگین‌تر)</code>
      </div>
      <ul class="c-list">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          صفر کردن محاسبات ایزوتوپ سبک‌تر
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          فقط یک ضرب ساده ذهنی بدون کسر
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          پاسخ مستقیم در تست‌های محاسباتی کنکور
        </li>
      </ul>
    </div>
  </div>

  <!-- worked example -->
  <div class="example-box">
    <div class="ex-hd">
      <span class="ex-tag">مثال کنکوری سراسری:</span>
      <span style="font-size:18px;color:#94A3B8;font-weight:700">تست شناسنامه‌دار تجربی</span>
    </div>
    <div class="ex-body">
      عنصر بور دارای دو ایزوتوپ ۱۰ (فراوانی ۲۰٪) و ۱۱ (فراوانی ۸۰٪) است. جرم میانگین کدام است؟
    </div>
    <div class="ex-calc">
      M̄ = 10 + (1 × 0.80) = 10.8 amu   (حل ذهنی در ۳ ثانیه!)
    </div>
  </div>

  <!-- footer -->
  <div class="ft">
    <div>برگه آموزشی اختصاصی • کانال شیمی کنکور</div>
    <div class="id">@shimi_mohamaddost</div>
  </div>

</div>
</body>
</html>'''

def main():
    html_path = "/tmp/isotope_poster.html"
    png_path = "/Users/aidin/shimi_channel_backup/poster_isotopes_grade10.png"
    html = build_html()

    leftovers = audit_emoji_icons(html)
    if leftovers: raise SystemExit(f"forbidden emoji: {leftovers}")
    if "shimi_wm" not in html: raise SystemExit("watermark missing")

    with open(html_path, "w", encoding="utf-8") as f: f.write(html)
    subprocess.run([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless", f"--screenshot={png_path}", "--window-size=1280,1280", "--hide-scrollbars",
        html_path
    ], check=True, capture_output=True)
    print("Poster generated:", png_path)
    print("Size:", os.path.getsize(png_path) // 1024, "KB")

if __name__ == "__main__":
    main()
