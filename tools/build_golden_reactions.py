#!/usr/bin/env python3
"""
برگه طلایی — جمع‌بندی واکنش‌های کتاب درسی (دهم، یازدهم، دوازدهم)
A4 portrait · 1 page · print-friendly · vector logo · mandatory watermark
"""
import subprocess, os, re, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from brand import (logo_tile, watermark_svg, header_signature, footer_signature,
                   CYAN, GOLD, GREEN, INK, MUTED, audit_emoji_icons)

DATA = json.load(open(os.path.join(HERE, "reactions.json"), encoding="utf-8"))

ACCENT = {"tenth": CYAN, "eleventh": GREEN, "twelfth": GOLD}


def build_html() -> str:
    sections = []
    for s in DATA:
        c = s["cls"]
        a = ACCENT[c]
        cards = "".join(
            f'<div class="rx-card">'
            f'<div class="rx-title"><span>{it["name"]}</span>'
            f'<span class="rx-tag">{it["tag"]}</span></div>'
            f'<div class="rx-eq">{it["eq"]}</div></div>'
            for it in s["items"]
        )
        sections.append(f'''
    <div class="grade-section {c}">
      <div class="section-header">
        <div class="section-badge-wrap">
          <span class="section-badge">{s["title"]}</span>
          <span class="section-subtitle">{s["sub"]}</span>
        </div>
        <div class="section-security-tag">@shimi_mohamaddost</div>
      </div>
      <div class="reactions-grid">{cards}</div>
    </div>''')

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

  /* Header — متن فارسی: هرگز direction:ltr نگذار */
  .header{{
    display:flex;justify-content:space-between;align-items:center;
    border-bottom:2px solid {CYAN};padding-bottom:6px;margin-bottom:7px;flex:0 0 auto;
    position:relative;z-index:10;
  }}
  .brand-title{{display:flex;align-items:center;gap:10px}}
  .title-text h1{{font-size:13.5pt;font-weight:900;line-height:1.18}}
  .title-text p{{font-size:7.4pt;color:{CYAN};font-weight:700}}
  .header-meta{{text-align:right}}

  .sections-container{{
    display:flex;flex-direction:column;gap:7px;flex:1 1 auto;
    position:relative;z-index:10;min-height:0;
  }}

  .grade-section{{
    border:1px solid #E2E8F0;border-radius:7px;padding:6px 9px 8px 9px;
    background:#FFF;flex:1 1 0;display:flex;flex-direction:column;justify-content:space-between;
  }}
  .tenth{{border-top:3px solid {CYAN};background:#F8FAFC}}
  .eleventh{{border-top:3px solid {GREEN};background:#F0FDF4}}
  .twelfth{{border-top:3px solid {GOLD};background:#FFFBEB}}

  .section-header{{
    display:flex;align-items:center;justify-content:space-between;
    margin-bottom:5px;padding-bottom:3px;border-bottom:1px dashed #CBD5E1;
  }}
  .section-badge-wrap{{display:flex;align-items:center;gap:8px}}
  .section-badge{{font-size:8.6pt;font-weight:900;padding:2px 8px;border-radius:5px;color:#FFF}}
  .tenth .section-badge{{background:{CYAN}}}
  .eleventh .section-badge{{background:{GREEN}}}
  .twelfth .section-badge{{background:{GOLD}}}
  .section-subtitle{{font-size:7pt;font-weight:700;color:{MUTED}}}
  .section-security-tag{{font-size:6.4pt;font-weight:800;color:#94A3B8;direction:ltr}}

  .reactions-grid{{display:grid;grid-template-columns:1fr 1fr;gap:4px 9px;flex:1 1 auto}}

  .rx-card{{
    background:#FFF;border:1px solid #E2E8F0;border-radius:5px;
    padding:3px 7px;display:flex;flex-direction:column;justify-content:center;min-height:0;
  }}
  .rx-title{{font-size:7.2pt;font-weight:800;color:{INK};
             display:flex;justify-content:space-between;align-items:center;margin-bottom:1px}}
  .rx-tag{{font-size:6pt;font-weight:700;color:#475569;background:#F1F5F9;
           padding:.5px 5px;border-radius:3px;border:1px solid #E2E8F0;white-space:nowrap}}
  .tenth .rx-tag{{background:#E0F2FE;color:#0369A1;border-color:#BAE6FD}}
  .eleventh .rx-tag{{background:#DCFCE7;color:#15803D;border-color:#BBF7D0}}
  .twelfth .rx-tag{{background:#FEF3C7;color:#B45309;border-color:#FDE68A}}

  .rx-eq{{
    direction:ltr;unicode-bidi:isolate;
    font-family:"Vazirmatn",-apple-system,"Segoe UI",Roboto,sans-serif;
    font-size:7.4pt;font-weight:700;color:{INK};line-height:1.25;
    white-space:normal;word-break:break-word;
  }}
  .rx-eq .arr{{color:{CYAN};font-weight:900;margin:0 2px}}
  .eleventh .rx-eq .arr{{color:{GREEN}}}
  .twelfth .rx-eq .arr{{color:{GOLD}}}

  .footer{{
    margin-top:7px;border-top:1.5px solid #E2E8F0;padding-top:5px;
    display:flex;justify-content:space-between;align-items:center;
    font-size:6.8pt;color:{MUTED};font-weight:600;flex:0 0 auto;
    position:relative;z-index:10;
  }}
</style></head><body>

{watermark_svg()}

<div class="header">
  <div class="brand-title">
    {logo_tile(34, 9, CYAN)}
    <div class="title-text">
      <h1>برگه طلایی: تمام واکنش‌های حفظی کتاب درسی برای کنکور</h1>
      <p>مرور جامع معادلات موازنه‌شده پایه‌های دهم، یازدهم و دوازدهم تجربی و ریاضی</p>
    </div>
  </div>
  <div class="header-meta">{header_signature("right", 9.5, 7)}</div>
</div>

<div class="sections-container">{"".join(sections)}</div>

<div class="footer">{footer_signature()}</div>

</body></html>'''


def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/golden.html"
    pdf_path = f"{out_dir}/golden_reactions_10_11_12.pdf"

    html = build_html()

    leftover = audit_emoji_icons(html)
    if leftover:
        raise SystemExit(f"❌ ایموجی سیستمی در جایگاه آیکون: {leftover}")
    if "shimi_wm" not in html:
        raise SystemExit("❌ واترمارک در فایل نیست — انتشار ممنوع")
    if len(re.findall(r'class="rx-card"', html)) != 30:
        raise SystemExit("❌ تعداد کارت‌های واکنش ۳۰ نیست")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)

    subprocess.run([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}", html_path
    ], check=True, capture_output=True)

    data = open(pdf_path, "rb").read()
    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    print(f"PDF   : {pdf_path}")
    print(f"pages : {pages}  (must be 1)")
    print(f"size  : {len(data)//1024} KB")
    assert pages == 1, f"expected 1 page, got {pages}"

    subprocess.run(["/opt/homebrew/bin/pdftoppm", "-png", "-r", "140",
                    pdf_path, "/tmp/golden_page"], check=True, capture_output=True)
    print("preview: /tmp/golden_page-1.png")


if __name__ == "__main__":
    main()
