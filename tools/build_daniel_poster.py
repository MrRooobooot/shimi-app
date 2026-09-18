#!/usr/bin/env python3
"""
پوستر ۲۵۶۰×۲۵۶۰ (Retina 2x) — پست آموزشی: الکتروشیمی و پیل دانیل شیمی دوازدهم
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
    background: radial-gradient(circle, rgba(241,196,15,.10) 0%, rgba(99,102,241,.05) 50%, transparent 70%);
    top: 100px; left: 290px; filter: blur(90px); pointer-events: none; z-index: 1;
  }}

  .hd {{ display: flex; justify-content: space-between; align-items: center; padding-bottom: 22px; border-bottom: 1.5px solid rgba(255,255,255,.10); position: relative; z-index: 10; }}
  .hd-r {{ display: flex; align-items: center; gap: 16px; }}
  .hd-t .kicker {{ font-size: 20px; font-weight: 800; color: #FBBF24; margin-bottom: 4px; }}
  .hd-t .name {{ font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 1.2; }}
  .rank-pill {{
    background: rgba(251,191,36,.10); border: 1.5px solid rgba(251,191,36,.4);
    color: #FBBF24; padding: 10px 24px; border-radius: 999px;
    font-size: 22px; font-weight: 900; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }}

  .hero {{ text-align: center; margin-top: 30px; position: relative; z-index: 10; }}
  .super {{
    display: inline-block; background: rgba(241,196,15,.09); border: 1.5px solid rgba(241,196,15,.35);
    color: #FBBF24; padding: 8px 24px; border-radius: 999px;
    font-size: 21px; font-weight: 800; margin-bottom: 14px;
  }}
  .hero h1 {{ font-size: 64px; font-weight: 900; color: #FFFFFF; line-height: 1.22; text-shadow: 0 8px 24px rgba(0,0,0,.7); }}
  .hero h1 span {{ color: #F1C40F; }}
  .hero p.sub {{ margin-top: 12px; font-size: 24px; font-weight: 700; color: #B9C6E4; }}

  /* Cell diagram */
  .cell-diagram {{
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    margin-top: 30px; position: relative; z-index: 10;
    background: rgba(255,255,255,.045); border: 1.5px solid rgba(255,255,255,.12);
    border-radius: 20px; padding: 22px 30px;
  }}
  .electrode {{ text-align: center; flex: 1; }}
  .electrode .box {{
    width: 120px; height: 120px; margin: 0 auto 10px; border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 34px; font-weight: 900; color: #FFFFFF;
  }}
  .electrode.anode .box {{ background: linear-gradient(135deg, #EF4444, #B91C1C); box-shadow: 0 12px 30px rgba(239,68,68,.25); }}
  .electrode.cathode .box {{ background: linear-gradient(135deg, #0EA5E9, #0369A1); box-shadow: 0 12px 30px rgba(14,165,233,.25); }}
  .electrode b {{ display: block; font-size: 23px; font-weight: 900; color: #FFF; margin-bottom: 3px; }}
  .electrode i {{ display: block; font-style: normal; font-size: 17px; color: #94A3B8; font-weight: 700; }}
  .electrode .eq {{ display: block; margin-top: 7px; font-size: 18px; font-weight: 800; direction: ltr; unicode-bidi: isolate; }}
  .electrode.anode .eq {{ color: #FCA5A5; }}
  .electrode.cathode .eq {{ color: #7DD3FC; }}

  .center {{
    flex: 0 0 auto; text-align: center; padding: 0 10px;
  }}
  .center .salt {{
    background: rgba(255,255,255,.08); border: 1.5px dashed rgba(255,255,255,.3);
    border-radius: 12px; padding: 10px 16px; font-size: 17px; font-weight: 800; color: #CBD5E1;
    margin-bottom: 12px;
  }}
  .center .voltage {{
    background: linear-gradient(135deg, rgba(241,196,15,.18), rgba(251,191,36,.10));
    border: 2px solid rgba(241,196,15,.5);
    border-radius: 14px; padding: 14px 20px;
    font-size: 30px; font-weight: 900; color: #FBBF24; direction: ltr; unicode-bidi: isolate;
    box-shadow: 0 10px 30px rgba(241,196,15,.15);
  }}

  /* key points */
  .points {{
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-top: 24px; position: relative; z-index: 10; flex: 1 1 auto;
  }}
  .pt {{
    background: rgba(255,255,255,.045); border: 1.5px solid rgba(255,255,255,.10);
    border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 14px;
  }}
  .pt .ic {{
    width: 46px; height: 46px; border-radius: 13px; flex: 0 0 auto;
    background: rgba(241,196,15,.12); color: #FBBF24;
    display: flex; align-items: center; justify-content: center;
  }}
  .pt .tx b {{ display: block; font-size: 21px; font-weight: 900; color: #FFFFFF; margin-bottom: 3px; }}
  .pt .tx span {{ font-size: 17px; font-weight: 600; color: #8FA0C4; line-height: 1.5; }}

  .ft {{
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 20px; padding-top: 14px; border-top: 1.5px solid rgba(255,255,255,.10);
    position: relative; z-index: 10; font-size: 20px; color: #8FA0C4; font-weight: 700;
  }}
  .ft .id {{ direction: ltr; color: #FBBF24; font-weight: 800; }}
</style>
</head>
<body>
<div class="poster">
  <div class="glow"></div>
  {watermark_svg(is_poster=True)}

  <div class="hd">
    <div class="hd-r">
      {logo_tile(68, 18, "#B45309")}
      <div class="hd-t">
        <div class="kicker">شیمی دوازدهم • فصل سوم</div>
        <div class="name">الهه محمددوست</div>
      </div>
    </div>
    <div class="rank-pill">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
      دانشجوی پزشکی مشهد • رتبه ۷۸۸
    </div>
  </div>

  <div class="hero">
    <span class="super">پیل گالوانی — آناتومی کامل در یک نگاه</span>
    <h1>پیل <span>دانیل</span>: قطب‌ها را دیگر جابه‌جا نمی‌کنی!</h1>
    <p class="sub">شناسنامه ۱۰ ثانیه‌ای آند و کاتد با قاعده «آند همیشه جایی است که اکسیداسیون است»</p>
  </div>

  <div class="cell-diagram">
    <div class="electrode anode">
      <div class="box">Zn</div>
      <b>آند (ANode)</b>
      <i>قطب منفی — اکسیداسیون</i>
      <span class="eq">Zn ➔ Zn²⁺ + 2e⁻</span>
    </div>

    <div class="center">
      <div class="salt">🧂 پل نمکی — انتقال یون‌ها</div>
      <div class="voltage">E° = +1.10 V</div>
    </div>

    <div class="electrode cathode">
      <div class="box">Cu</div>
      <b>کاتد (Cathode)</b>
      <i>قطب مثبت — کاهش</i>
      <span class="eq">Cu²⁺ + 2e⁻ ➔ Cu</span>
    </div>
  </div>

  <div class="points">
    <div class="pt">
      <div class="ic">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <div class="tx"><b>الکترون همیشه از آند به کاتد</b><span>در سیم خارجی — جهت جریان الکتریکی برعکس آن است</span></div>
    </div>
    <div class="pt">
      <div class="ic">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </div>
      <div class="tx"><b>پل نمکی: حفظ تعادل بار</b><span>آنیون‌ها به آند و کاتیون‌ها به کاتد مهاجرت می‌کنند</span></div>
    </div>
    <div class="pt">
      <div class="ic">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
      </div>
      <div class="tx"><b>پیل خودبه‌خودی E° &gt; ۰</b><span>اگر E° منفی شود، پیل الکترولیتی است (غیرخودبه‌خودی)</span></div>
    </div>
    <div class="pt">
      <div class="ic">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      </div>
      <div class="tx"><b>ترکیب پیل‌ها جمع می‌شود</b><span>E° کل = E° آند + E° کاتد (چون هر دو نیم‌واکنش را جمع می‌کنیم)</span></div>
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
    html_path = "/tmp/daniel_poster.html"
    png_path = f"{out_dir}/poster_daniel_cell.png"
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
    print(f"Poster 2: {png_path} | size={os.path.getsize(png_path)//1024}KB (2560x2560 Retina)")

if __name__ == "__main__":
    main()
