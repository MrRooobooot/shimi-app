#!/usr/bin/env python3
"""
برگه طلایی — پلنر مطالعاتی هفتگی شیمی کنکور
A4 portrait · print-friendly · anti-crop watermark · 1 page exactly
"""
import subprocess, datetime, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brand import (logo_tile, watermark_svg, header_signature, footer_signature,
                   CYAN, INK, MUTED, HAIR, audit_emoji_icons)

# ---------------- Jalali conversion (no external deps) ----------------
def g2j(gy, gm, gd):
    g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334]
    if gy > 1600:
        jy = 979; gy -= 1600
    else:
        jy = 0; gy -= 621
    gy2 = gy + 1 if gm > 2 else gy
    days = (365*gy) + ((gy2+3)//4) - ((gy2+99)//100) + ((gy2+399)//400) - 80 + gd + g_d_m[gm-1]
    jy += 33 * (days // 12053); days %= 12053
    jy += 4 * (days // 1461);  days %= 1461
    if days > 365:
        jy += (days-1)//365; days = (days-1) % 365
    if days < 186:
        jm = 1 + days//31; jd = 1 + (days % 31)
    else:
        jm = 7 + (days-186)//30; jd = 1 + ((days-186) % 30)
    return jy, jm, jd

JM = ["","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]
FA = "۰۱۲۳۴۵۶۷۸۹"
def fa(s): return str(s).translate(str.maketrans("0123456789", FA))

today = datetime.date.today()
sat_off = (today.weekday() - 5) % 7
start = today - datetime.timedelta(days=sat_off)

DAYS = []
for i in range(7):
    d = start + datetime.timedelta(days=i)
    y, m, dd = g2j(d.year, d.month, d.day)
    names = ["دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه","یکشنبه"]
    DAYS.append({"name": names[d.weekday()], "date": f"{fa(dd)} {JM[m]}"})

y0, m0, d0 = g2j(start.year, start.month, start.day)
end = start + datetime.timedelta(days=6)
y1, m1, d1 = g2j(end.year, end.month, end.day)
week_label = f"{fa(d0)} {JM[m0]} تا {fa(d1)} {JM[m1]} {fa(y0)}"

PARTS = [
    ("پارت ۱", "صبح زود"),
    ("پارت ۲", "قبل از ظهر"),
    ("پارت ۳", "بعد از ظهر"),
    ("پارت ۴", "غروب"),
    ("پارت ۵", "شب"),
    ("پارت ۶", "مرور شب"),
]

CHECKLIST = [
    "مطالعه جزوه و کتاب درسی هر مبحث",
    "حل تمرین‌ها و مثال‌های کتاب",
    "تست‌زنی کافی از هر مبحث",
    "خلاصه‌نویسی و مرور نکات",
    "تحلیل آزمون آزمایشی هفته",
    "جبران عقب‌ماندگی‌ها",
]

def build_html():
    rows = ""
    for i, (pname, ptime) in enumerate(PARTS):
        cells = "".join(
            f'<td class="cell"><span class="dot"></span><span class="dot"></span></td>'
            for _ in range(7)
        )
        rows += f'''
        <tr>
          <th class="part"><b>{pname}</b><i>{ptime}</i></th>
          {cells}
        </tr>'''

    day_head = "".join(
        f'<th class="day"><b>{d["name"]}</b><i>{d["date"]}</i></th>' for d in DAYS
    )

    checklist = "".join(
        f'<div class="chk"><span class="box"></span>{c}</div>' for c in CHECKLIST
    )

    return f'''<!DOCTYPE html>
<html lang="fa" dir="rtl"><head><meta charset="utf-8">
<style>
  @page {{ size: A4 portrait; margin: 0; }}
  *{{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  html{{width:210mm;height:297mm}}
  body{{
    width:210mm;height:297mm;padding:7mm 8mm;
    font-family:"Vazirmatn",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    color:#0F172A;background:#fff;display:flex;flex-direction:column;
    position:relative;overflow:hidden;font-size:8.4pt;
  }}

  /* anti-crop watermark (fixed, cannot expand layout) */
  .wm{{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}}

  .wrap{{position:relative;z-index:5;display:flex;flex-direction:column;flex:1 1 auto;gap:5px;min-height:0}}

  /* header — متن فارسی: هرگز direction:ltr نگذار */
  .hd{{display:flex;justify-content:space-between;align-items:center;
       border-bottom:2px solid {CYAN};padding-bottom:5px;flex:0 0 auto}}
  .hd-l{{display:flex;align-items:center;gap:8px}}
  .hd h1{{font-size:12.5pt;font-weight:900;line-height:1.15}}
  .hd p{{font-size:7pt;color:{CYAN};font-weight:700}}
  .hd-r{{text-align:right}}

  /* goal strip */
  .goal{{display:flex;align-items:center;gap:6px;background:#F0F9FF;border:1px solid #BAE6FD;
         border-radius:6px;padding:4px 9px;font-size:7.6pt;font-weight:700;color:#0369A1;flex:0 0 auto}}
  .goal .fill{{flex:1;height:4px;background:#E0F2FE;border-radius:99px;overflow:hidden}}
  .goal .fill>i{{display:block;height:100%;width:0;background:#0284C7}}
  .goal b{{color:#0F172A}}

  /* main table — explicit mm heights (Chrome print ignores flex height distribution) */
  .tbl-wrap{{flex:0 0 auto}}
  table{{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}}
  th,td{{border:1px solid #CBD5E1}}
  thead th.day{{background:#0284C7;color:#fff;padding:4px 2px;text-align:center;
                border-color:#0284C7;font-size:7.6pt;width:12.6%;height:9mm;vertical-align:middle}}
  thead th.day b{{display:block;font-size:8pt;font-weight:900}}
  thead th.day i{{font-style:normal;font-size:6.4pt;opacity:.88;font-weight:600}}
  thead th.corner{{background:{CYAN};border-color:{CYAN};width:11.8%}}
  tbody th.part{{background:#F8FAFC;text-align:right;padding:4px 6px;width:11.8%;vertical-align:middle}}
  tbody th.part b{{display:block;font-size:7.6pt;font-weight:900;color:#0F172A}}
  tbody th.part i{{font-style:normal;font-size:6.4pt;color:#64748B;font-weight:600}}
  tbody td.cell{{height:32mm;background:#fff;position:relative;padding:5px 6px;vertical-align:top}}
  td.cell .dot{{display:block;height:1px;background:#E8EDF3;margin:11px 0 0 0}}
  tfoot td{{background:#F1F5F9;height:7mm}}
  tfoot th{{background:#E0F2FE;font-size:7.4pt;font-weight:900;color:#0369A1;text-align:right;padding:3px 6px}}
  tfoot td.tot{{position:relative}}
  tfoot td.tot span{{position:absolute;left:4px;bottom:2px;font-size:6pt;color:#94A3B8}}

  /* lower grid */
  .low{{display:grid;grid-template-columns:1.55fr 1fr;gap:7px;flex:0 0 auto}}
  .card{{border:1px solid #E2E8F0;border-radius:7px;padding:6px 8px 8px 8px;background:#fff}}
  .card h2{{font-size:8pt;font-weight:900;color:#0F172A;margin-bottom:5px;
            padding-bottom:3px;border-bottom:1px dashed #CBD5E1;display:flex;justify-content:space-between}}
  .card h2 em{{font-style:normal;font-size:6.4pt;color:#94A3B8;font-weight:700;direction:ltr}}

  .rev{{display:flex;flex-direction:column;gap:5px}}
  .rev .line{{border-bottom:1px dotted #CBD5E1;height:11px}}
  .rev .lbl{{font-size:6.8pt;color:#64748B;font-weight:700;margin-bottom:-3px}}

  .chk{{display:flex;align-items:center;gap:5px;font-size:7pt;font-weight:600;
        color:#334155;margin-bottom:4.5px;line-height:1.35}}
  .chk .box{{flex:0 0 auto;width:9px;height:9px;border:1.2px solid #94A3B8;border-radius:2.5px}}

  /* footer */
  .ft{{display:flex;justify-content:space-between;align-items:center;
       border-top:1.5px solid #E2E8F0;padding-top:4px;
       font-size:6.8pt;color:#64748B;font-weight:600;flex:0 0 auto}}
  .ft .id{{direction:ltr;color:#0284C7;font-weight:800}}
</style></head><body>

{watermark_svg()}

<div class="wrap">

  <div>
    <div class="hd">
      <div class="hd-l">
        {logo_tile(30, 8, CYAN)}
        <div>
          <h1>پلنر مطالعاتی هفتگی — شیمی کنکور</h1>
          <p>هفته {week_label} · ۷۰٪ اختصاصی و ۳۰٪ عمومی · هر پارت ۷۵ تا ۹۰ دقیقه</p>
        </div>
      </div>
      <div class="hd-r">{header_signature("right")}</div>
    </div>

    <div class="goal">
      <span>هدف ساعت مطالعه این هفته:</span>
      <b>______</b><span>ساعت</span>
      <span class="fill"><i></i></span>
      <span>انجام‌شده: <b>______</b></span>
    </div>

    <div class="tbl-wrap">
    <table>
      <thead>
        <tr><th class="corner"></th>{day_head}</tr>
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <tr><th>جمع ساعت روز</th>
          {"".join('<td class="tot"><span>ساعت</span></td>' for _ in range(7))}
        </tr>
        <tr><th>تعداد تست</th>
          {"".join('<td class="tot" style="height:6mm"><span>تست</span></td>' for _ in range(7))}
        </tr>
      </tfoot>
    </table>
    </div>

    <div class="low">
      <div class="card">
        <h2>تحلیل و مرور پایان هفته <em>Friday Review</em></h2>
        <div class="rev">
          <div class="lbl">کدام مباحث کامل تمام شد؟</div>
          <div class="line"></div><div class="line"></div>
          <div class="lbl" style="margin-top:3px">کجا عقب ماندی و علتش چه بود؟</div>
          <div class="line"></div><div class="line"></div>
          <div class="lbl" style="margin-top:3px">برای هفته بعد چه تغییری می‌دهی؟</div>
          <div class="line"></div><div class="line"></div>
        </div>
      </div>
      <div class="card">
        <h2>چک‌لیست هفتگی <em>Checklist</em></h2>
        {checklist}
      </div>
    </div>
  </div>

  <div class="ft">
    {footer_signature()}
  </div>

</div>
</body></html>'''


def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/planner.html"
    pdf_path = f"{out_dir}/planner_weekly_chemistry.pdf"

    html = build_html()

    # گارد: هیچ ایموجی سیستمی نباید نقش آیکون رابط داشته باشد
    leftover = audit_emoji_icons(html)
    if leftover:
        raise SystemExit(f"❌ ایموجی سیستمی در جایگاه آیکون: {leftover}")
    # گارد: واترمارک اجباری است
    if "shimi_wm" not in html:
        raise SystemExit("❌ واترمارک در فایل نیست — انتشار ممنوع")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)

    subprocess.run([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}", html_path
    ], check=True, capture_output=True)

    # verify page count
    data = open(pdf_path, "rb").read()
    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    print(f"PDF: {pdf_path}")
    print(f"pages: {pages}  (must be 1)")
    print(f"size : {len(data)//1024} KB")
    assert pages == 1, f"expected 1 page, got {pages}"

    # render for visual check
    subprocess.run(["/opt/homebrew/bin/pdftoppm", "-png", "-r", "140",
                    pdf_path, "/tmp/planner_page"], check=True, capture_output=True)
    print("preview: /tmp/planner_page-1.png")

if __name__ == "__main__":
    main()
