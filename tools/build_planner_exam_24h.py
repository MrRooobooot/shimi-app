#!/usr/bin/env python3
"""
پلنر مطالعاتی شماره ۲ — ویژه شب امتحان (۲۴ ساعت منظم) + چرخه مرور
A4 portrait · 1 page · vector logo · mandatory watermark
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
  @page {{ size: A4 portrait; margin: 0; }}
  *{{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  html{{width:210mm;height:297mm}}
  body{{
    width:210mm;height:297mm;padding:8mm 9mm;
    background:#FFFFFF;color:{INK};
    font-family:"Vazirmatn",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    display:flex;flex-direction:column;position:relative;overflow:hidden;
  }}

  .hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid {CYAN};padding-bottom:5px;margin-bottom:5px;flex:0 0 auto}}
  .hd-l{{display:flex;align-items:center;gap:9px}}
  .hd h1{{font-size:12.5pt;font-weight:900;line-height:1.18}}
  .hd p{{font-size:7pt;color:{CYAN};font-weight:700}}
  .hd-r{{text-align:right}}

  /* 24h strip */
  .strip{{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-bottom:8px;flex:0 0 auto}}
  .s-card{{background:#F8FAFC;border:1.5px solid {CYAN};border-radius:7px;padding:5px 4px;text-align:center}}
  .s-card:nth-child(4){{border-color:{GOLD};background:#FFFBEB}}
  .s-card b{{display:block;font-size:7.4pt;font-weight:900;color:#0F172A;margin-bottom:2px}}
  .s-card i{{display:block;font-style:normal;font-size:6.4pt;color:{MUTED};font-weight:700;line-height:1.3}}
  .s-card .h{{display:block;font-size:8.4pt;font-weight:900;color:{CYAN};margin-top:2px}}
  .s-card:nth-child(4) .h{{color:#B45309}}

  /* main 3-phase table */
  .tbl-wrap{{flex:1 1 auto;min-height:0}}
  table{{width:100%;border-collapse:collapse;height:100%}}
  th,td{{border:1px solid #CBD5E1;padding:3px 5px;text-align:center;vertical-align:middle}}
  thead th{{background:{CYAN};color:#fff;font-size:7.4pt;font-weight:900;height:8mm}}
  thead th.corner{{background:{CYAN};border-color:{CYAN};width:13%}}
  tbody th{{background:#F1F5F9;font-size:7pt;font-weight:900;color:#0F172A;width:13%}}
  tbody th small{{display:block;font-size:5.8pt;font-weight:700;color:{MUTED}}}
  tbody td{{font-size:6.4pt;color:#334155;font-weight:600;line-height:1.3}}
  tbody tr:nth-child(even) td{{background:#FAFBFC}}

  /* review cycle */
  .cycle{{margin-top:7px;background:#F0FDF4;border:1.5px solid {GREEN};border-radius:8px;padding:6px 10px;flex:0 0 auto}}
  .cycle h2{{font-size:8.6pt;font-weight:900;color:#15803D;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between}}
  .cycle h2 em{{font-style:normal;font-size:6.4pt;font-weight:700;color:#64748B}}
  .c-grid{{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}}
  .c-item{{background:#FFF;border:1px solid #BBF7D0;border-radius:6px;padding:4px 3px;text-align:center}}
  .c-item b{{display:block;font-size:6.6pt;font-weight:900;color:#15803D}}
  .c-item i{{display:block;font-style:normal;font-size:5.8pt;color:{MUTED};font-weight:700;margin-top:1px}}

  /* checklist */
  .foot-cols{{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:7px;flex:0 0 auto}}
  .chk-box{{background:#FAFBFC;border:1px solid #E2E8F0;border-radius:8px;padding:6px 9px}}
  .chk-box h3{{font-size:7.6pt;font-weight:900;color:{CYAN};margin-bottom:4px}}
  .chk{{display:flex;align-items:center;gap:5px;font-size:6.6pt;color:#334155;font-weight:600;margin-bottom:2.5px}}
  .chk .box{{flex:0 0 auto;width:9px;height:9px;border:1.3px solid {CYAN};border-radius:2px}}

  .ft{{margin-top:5px;border-top:1.5px solid #E2E8F0;padding-top:4px;display:flex;justify-content:space-between;align-items:center;font-size:6.4pt;color:{MUTED};font-weight:600;flex:0 0 auto}}
</style></head><body>

{watermark_svg()}

<div class="hd">
  <div class="hd-l">
    {logo_tile(30, 8, CYAN)}
    <div>
      <h1>پلنر ویژه شب امتحان — چرخه ۲۴ ساعته مطالعه و مرور</h1>
      <p>برنامه فشرده آخرین ۲۴ ساعت قبل از امتحان · ۶ دوره ۴ ساعته · با تمرکز بر مرور فعال</p>
    </div>
  </div>
  <div class="hd-r">{header_signature("right", 9, 6.6)}</div>
</div>

<!-- 24h summary strip -->
<div class="strip">
  <div class="s-card"><b>ساعت ۰ تا ۴</b><i>مرور فعال جزوه و خلاصه</i><span class="h">۴ ساعت</span></div>
  <div class="s-card"><b>ساعت ۴ تا ۸</b><i>حل تست‌های سال‌های قبل</i><span class="h">۴ ساعت</span></div>
  <div class="s-card"><b>ساعت ۸ تا ۱۲</b><i>مرور فرمول‌ها و تله‌ها</i><span class="h">۴ ساعت</span></div>
  <div class="s-card"><b>ساعت ۱۲ تا ۱۶</b><i>استراحت فعال و خواب کوتاه</i><span class="h">۴ ساعت</span></div>
  <div class="s-card"><b>ساعت ۱۶ تا ۲۰</b><i>حل تست‌های کلیدی کتاب</i><span class="h">۴ ساعت</span></div>
  <div class="s-card"><b>ساعت ۲۰ تا ۲۴</b><i>مرور نهایی + آمادگی روحی</i><span class="h">۴ ساعت</span></div>
</div>

<!-- main 6-phase table -->
<div class="tbl-wrap">
<table>
  <thead>
    <tr><th class="corner">دوره / زمان</th><th>موضوع اصلی مطالعه</th><th>روش مرور پیشنهادی</th><th>ابزار مطالعاتی</th><th>تست مرور</th><th>نکته طلایی این دوره</th></tr>
  </thead>
  <tbody>
    <tr><th>دوره ۱<small>۰ تا ۴ صبح</small></th><td>جزوه و خلاصه‌نویسی استاد (فصل‌های ۱ تا ۳)</td><td>مرور فعال با ماژیک هایلایت</td><td>جزوه + برگه طلایی کانال</td><td>۱۰ تست نمونه</td><td>مطالعه صبح زود با ذهن خالی = ضریب ۱.۵ حفظ</td></tr>
    <tr><th>دوره ۲<small>۴ تا ۸ صبح</small></th><td>تست‌زنی کنکورهای سراسری سال‌های قبل</td><td>زمان‌بندی ۳ دقیقه‌ای در هر تست</td><td>دفتر تست + تحلیل</td><td>۲۵ تست</td><td>تحلیل پاسخ‌های نادرست مهم‌تر از پاسخ صحیح است</td></tr>
    <tr><th>دوره ۳<small>۸ تا ۱۲ ظهر</small></th><td>فرمول‌های کلیدی و تله‌های طراح</td><td>جمع‌بندی با فلاش‌کارت</td><td>برگه طلایی + فلاش‌کارت</td><td>۱۵ تست مفهومی</td><td>تست‌های متد کلینیکال در کانال را مرور کن</td></tr>
    <tr><th>دوره ۴<small>۱۲ تا ۱۶ (استراحت)</small></th><td>خواب کوتاه ۹۰ دقیقه‌ای + تغذیه سبک</td><td>قطع مطالعه (Consolidation)</td><td>—</td><td>—</td><td>خواب حافظه کوتاه‌مدت را تثبیت می‌کند</td></tr>
    <tr><th>دوره ۵<small>۱۶ تا ۲۰ عصر</small></th><td>حل تست‌های پرتکرار کتاب درسی</td><td>روش تست فعال (Active Recall)</td><td>کتاب + بانک تست</td><td>۳۰ تست</td><td>روی تست‌های آزمون‌های آزمایشی تمرکز کن</td></tr>
    <tr><th>دوره ۶<small>۲۰ تا ۲۴ شب</small></th><td>مرور نهایی خلاصه‌ها + آمادگی ذهنی</td><td>مرور ذهنی بدون جزوه</td><td>خلاصه دست‌نویس</td><td>۱۰ تست اعتمادسازی</td><td>۸ ساعت خواب شبانه = ضریب هوشی موقت +۱۵٪</td></tr>
  </tbody>
</table>
</div>

<!-- review cycle -->
<div class="cycle">
  <h2>🔁 چرخه طلایی مرور فعال (Active Recall)<em>مبنای علمی: منحنی فراموشی ابینگهاوس</em></h2>
  <div class="c-grid">
    <div class="c-item"><b>مرور اول</b><i>بعد از ۲۴ ساعت</i></div>
    <div class="c-item"><b>مرور دوم</b><i>بعد از ۳ روز</i></div>
    <div class="c-item"><b>مرور سوم</b><i>بعد از ۷ روز</i></div>
    <div class="c-item"><b>مرور چهارم</b><i>بعد از ۱۴ روز</i></div>
    <div class="c-item"><b>مرور پنجم</b><i>بعد از ۳۰ روز</i></div>
  </div>
</div>

<!-- footer cols -->
<div class="foot-cols">
  <div class="chk-box">
    <h3>✅ چک‌لیست شب امتحان</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 8px">
      <div class="chk"><span class="box"></span>آماده‌سازی کارت ورود و وسایل</div>
      <div class="chk"><span class="box"></span>خواب کافی ۷-۸ ساعته</div>
      <div class="chk"><span class="box"></span>چک‌کردن آدرس و زمان آزمون</div>
      <div class="chk"><span class="box"></span>پرهیز از مطالعه نیمه‌شب</div>
      <div class="chk"><span class="box"></span>صبحانه سبک و آب کافی</div>
      <div class="chk"><span class="box"></span>مرور کوتاه فلاش‌کارت‌ها</div>
      <div class="chk"><span class="box"></span>دوری از پست‌های استرس‌زا</div>
      <div class="chk"><span class="box"></span>تمرین تنفس عمیق ۵ دقیقه</div>
    </div>
  </div>
  <div class="chk-box">
    <h3>⛔️ ۴ ممنوعیت بزرگ شب امتحان</h3>
    <div class="chk"><span class="box"></span>مطالعه مبحث جدید در ۱۲ ساعت آخر</div>
    <div class="chk"><span class="box"></span>بیدار ماندن تا ساعت ۳ صبح</div>
    <div class="chk"><span class="box"></span>مصرف کافئین زیاد (قهوه/انرژی)</div>
    <div class="chk"><span class="box"></span>چک‌کردن مداوم شبکه‌های اجتماعی</div>
  </div>
</div>

<div class="ft">{footer_signature()}</div>

</body></html>'''

def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/planner_exam.html"
    pdf_path = f"{out_dir}/planner_exam_24h.pdf"
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
    print(f"Planner 2: {pdf_path} | pages={pages} | size={len(data)//1024}KB")
    assert pages == 1, f"Expected 1 page, got {pages}"

if __name__ == "__main__":
    main()
