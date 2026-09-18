#!/usr/bin/env python3
"""
پلنر شماره ۳ — برنامه ماهانه ۴ هفته‌ای مرور کل کتاب (شیمی ۱۰، ۱۱، ۱۲)
A4 landscape · 1 page · vector logo · mandatory watermark
"""
import subprocess, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from brand import (logo_tile, watermark_svg, header_signature, footer_signature,
                   CYAN, GOLD, GREEN, INK, MUTED, audit_emoji_icons)

def build_html() -> str:
    return f'''<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="utf-8"><style>
  @page {{ size: A4 landscape; margin: 0; }}
  *{{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  html{{width:297mm;height:210mm}}
  body{{
    width:297mm;height:210mm;padding:7mm 8mm;
    background:#FFFFFF;color:{INK};
    font-family:"Vazirmatn",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    display:flex;flex-direction:column;position:relative;overflow:hidden;
  }}

  .hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid {CYAN};padding-bottom:4px;margin-bottom:5px;flex:0 0 auto}}
  .hd-l{{display:flex;align-items:center;gap:8px}}
  .hd h1{{font-size:12pt;font-weight:900;line-height:1.15}}
  .hd p{{font-size:6.8pt;color:{CYAN};font-weight:700}}
  .hd-r{{text-align:right}}

  .weeks{{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;flex:1 1 auto;min-height:0}}
  .week{{border:1px solid #CBD5E1;border-radius:8px;padding:6px 8px;background:#FFF;display:flex;flex-direction:column}}
  .w-1{{border-top:4px solid {CYAN};background:#F8FAFC}}
  .w-2{{border-top:4px solid {GREEN};background:#F0FDF4}}
  .w-3{{border-top:4px solid {GOLD};background:#FFFBEB}}
  .w-4{{border-top:4px solid #8B5CF6;background:#F5F3FF}}

  .w-hd{{text-align:center;margin-bottom:4px;padding-bottom:3px;border-bottom:1px dashed #CBD5E1}}
  .w-hd b{{display:block;font-size:9pt;font-weight:900;color:#0F172A}}
  .w-hd i{{display:block;font-style:normal;font-size:6.2pt;font-weight:700;color:{MUTED};margin-top:1px}}
  .w-focus{{display:block;font-size:6.8pt;font-weight:900;color:{CYAN};margin-top:3px}}
  .w-2 .w-focus{{color:{GREEN}}}
  .w-3 .w-focus{{color:#B45309}}
  .w-4 .w-focus{{color:#8B5CF6}}

  .w-list{{flex:1 1 auto;display:flex;flex-direction:column;gap:3px;margin-top:4px}}
  .w-item{{background:#FFF;border:1px solid #E2E8F0;border-radius:5px;padding:3px 6px;font-size:6.4pt;font-weight:600;color:#334155;display:flex;align-items:center;gap:4px;line-height:1.3}}
  .w-item .num{{flex:0 0 auto;width:12px;height:12px;border-radius:50%;background:{CYAN};color:#FFF;font-size:5.8pt;font-weight:900;display:flex;align-items:center;justify-content:center}}
  .w-2 .w-item .num{{background:{GREEN}}}
  .w-3 .w-item .num{{background:{GOLD}}}
  .w-4 .w-item .num{{background:#8B5CF6}}
  .w-goal{{margin-top:auto;background:{CYAN};color:#FFF;border-radius:5px;padding:3px 6px;font-size:6.4pt;font-weight:900;text-align:center}}
  .w-2 .w-goal{{background:{GREEN}}}
  .w-3 .w-goal{{background:{GOLD};color:#7C2D12}}
  .w-4 .w-goal{{background:#8B5CF6}}

  .ft{{margin-top:5px;border-top:1.5px solid #E2E8F0;padding-top:4px;display:flex;justify-content:space-between;align-items:center;font-size:6.4pt;color:{MUTED};font-weight:600;flex:0 0 auto}}
</style></head><body>

{watermark_svg()}

<div class="hd">
  <div class="hd-l">
    {logo_tile(30, 8, CYAN)}
    <div>
      <h1>پلنر ماهانه ۴ هفته‌ای — مرور کامل شیمی ۱۰، ۱۱ و ۱۲</h1>
      <p>چرخه ۲۸ روزه مرور طلایی · ۴ هفته × ۷ روز · مبتنی بر سیستم مطالعاتی رتبه ۷۸۸</p>
    </div>
  </div>
  <div class="hd-r">{header_signature("right", 9, 6.6)}</div>
</div>

<div class="weeks">

  <!-- Week 1 -->
  <div class="week w-1">
    <div class="w-hd">
      <b>هفته اول</b>
      <i>جمع‌بندی شیمی دهم</i>
      <span class="w-focus">تمرکز: مفاهیم پایه و استوکیومتری</span>
    </div>
    <div class="w-list">
      <div class="w-item"><span class="num">۱</span>شنبه: فصل ۱ — ایزوتوپ‌ها و جرم اتمی میانگین (متد ترازو)</div>
      <div class="w-item"><span class="num">۲</span>یکشنبه: فصل ۲ — ترتیب و شمارش الکترون‌های l=1</div>
      <div class="w-item"><span class="num">۳</span>دوشنبه: فصل ۲ — روند تناوبی شعاع و انرژی یونش</div>
      <div class="w-item"><span class="num">۴</span>سه‌شنبه: فصل ۳ — پیوند یگانه و ساختار لوویس</div>
      <div class="w-item"><span class="num">۵</span>چهارشنبه: فصل ۳ — شمارش پیوند با متد کلینیکال</div>
      <div class="w-item"><span class="num">۶</span>پنجشنبه: تست‌زنی جامع دهم (۵۰ تست زمان‌دار)</div>
      <div class="w-item"><span class="num">۷</span>جمعه: مرور فعال اشتباهات + استراحت فعال</div>
    </div>
    <div class="w-goal">هدف هفته: تسلط ۹۰٪+ بر پایه دهم</div>
  </div>

  <!-- Week 2 -->
  <div class="week w-2">
    <div class="w-hd">
      <b>هفته دوم</b>
      <i>جمع‌بندی شیمی یازدهم</i>
      <span class="w-focus">تمرکز: ترمودینامیک و سینتیک</span>
    </div>
    <div class="w-list">
      <div class="w-item"><span class="num">۱</span>شنبه: فصل ۱ — مولار و غلظت (ppm و مولالیته)</div>
      <div class="w-item"><span class="num">۲</span>یکشنبه: فصل ۲ — گرماده/گرماگیر و آنتالپی</div>
      <div class="w-item"><span class="num">۳</span>دوشنبه: فصل ۲ — هس و محاسبات گرمای واکنش</div>
      <div class="w-item"><span class="num">۴</span>سه‌شنبه: فصل ۳ — سرعت واکنش و عوامل موثر</div>
      <div class="w-item"><span class="num">۵</span>چهارشنبه: فصل ۳ — کاتالیزور و تعادل سرعت‌ها</div>
      <div class="w-item"><span class="num">۶</span>پنجشنبه: تست‌زنی جامع یازدهم (۵۰ تست زمان‌دار)</div>
      <div class="w-item"><span class="num">۷</span>جمعه: مرور فرمول‌های کلیدی یازدهم</div>
    </div>
    <div class="w-goal">هدف هفته: تسلط بر آنتالپی و سینتیک</div>
  </div>

  <!-- Week 3 -->
  <div class="week w-3">
    <div class="w-hd">
      <b>هفته سوم</b>
      <i>جمع‌بندی شیمی دوازدهم</i>
      <span class="w-focus">تمرکز: pH، تعادل و الکتروشیمی</span>
    </div>
    <div class="w-list">
      <div class="w-item"><span class="num">۱</span>شنبه: فصل ۱ — محلول‌ها و انحلال‌پذیری</div>
      <div class="w-item"><span class="num">۲</span>یکشنبه: فصل ۲ — Ka و درجه یونش (متد رادیکال)</div>
      <div class="w-item"><span class="num">۳</span>دوشنبه: فصل ۲ — pH و رقیق‌سازی (تکنیک ۱۰ ثانیه)</div>
      <div class="w-item"><span class="num">۴</span>سه‌شنبه: فصل ۳ — سلول گالوانی و پتانسیل استاندارد</div>
      <div class="w-item"><span class="num">۵</span>چهارشنبه: فصل ۳ — الکترولیز و فرایند هال-هرو</div>
      <div class="w-item"><span class="num">۶</span>پنجشنبه: تست‌زنی جامع دوازدهم (۵۰ تست زمان‌دار)</div>
      <div class="w-item"><span class="num">۷</span>جمعه: مرور تله‌های pH و الکتروشیمی</div>
    </div>
    <div class="w-goal">هدف هفته: تسلط بر محاسبات pH و پیل‌ها</div>
  </div>

  <!-- Week 4 -->
  <div class="week w-4">
    <div class="w-hd">
      <b>هفته چهارم</b>
      <i>آزمون جامع و جمع‌بندی نهایی</i>
      <span class="w-focus">تمرکز: شبیه‌سازی کنکور واقعی</span>
    </div>
    <div class="w-list">
      <div class="w-item"><span class="num">۱</span>شنبه: آزمون جامع دهم (۲۰ تست · ۲۰ دقیقه)</div>
      <div class="w-item"><span class="num">۲</span>یکشنبه: آزمون جامع یازدهم (۲۰ تست · ۲۰ دقیقه)</div>
      <div class="w-item"><span class="num">۳</span>دوشنبه: آزمون جامع دوازدهم (۲۰ تست · ۲۰ دقیقه)</div>
      <div class="w-item"><span class="num">۴</span>سه‌شنبه: تحلیل آزمون‌ها + جبران نقاط ضعف</div>
      <div class="w-item"><span class="num">۵</span>چهارشنبه: آزمون ترکیبی ۳۰ سؤالی (۳۰ دقیقه)</div>
      <div class="w-item"><span class="num">۶</span>پنجشنبه: مرور برگه‌های طلایی کانال + فرمول‌ها</div>
      <div class="w-item"><span class="num">۷</span>جمعه: مرور نهایی ذهنی + آمادگی روانی</div>
    </div>
    <div class="w-goal">هدف هفته: آمادگی کامل برای آزمون واقعی</div>
  </div>

</div>

<div class="ft">{footer_signature()}</div>

</body></html>'''

def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/planner_monthly.html"
    pdf_path = f"{out_dir}/planner_monthly_cycle.pdf"
    html = build_html()
    if audit_emoji_icons(html): raise SystemExit("emoji error")
    if "shimi_wm" not in html: raise SystemExit("watermark missing")

    with open(html_path, "w", encoding="utf-8") as f: f.write(html)
    subprocess.run([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}", html_path
    ], check=True, capture_output=True)
    data = open(pdf_path, "rb").read()
    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    print(f"Planner 3: {pdf_path} | pages={pages} | size={len(data)//1024}KB")
    assert pages == 1, f"Expected 1 page, got {pages}"

if __name__ == "__main__":
    main()
