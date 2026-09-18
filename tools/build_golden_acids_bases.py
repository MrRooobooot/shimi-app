#!/usr/bin/env python3
"""
برگه طلایی شماره ۲ — اسیدها، بازها و فرمول‌های طلایی pH شیمی دوازدهم
A4 portrait · 1 page · print-friendly · vector logo · mandatory watermark
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

  /* header */
  .hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid {CYAN};padding-bottom:5px;margin-bottom:6px;flex:0 0 auto}}
  .hd-l{{display:flex;align-items:center;gap:9px}}
  .hd h1{{font-size:13pt;font-weight:900;line-height:1.18}}
  .hd p{{font-size:7.2pt;color:{CYAN};font-weight:700}}
  .hd-r{{text-align:right}}

  .sections{{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:0}}

  .sec{{border:1px solid #CBD5E1;border-radius:6px;padding:6px 8px;background:#FFF;flex:1 1 0;display:flex;flex-direction:column;justify-content:space-between}}
  .sec-1{{border-top:3px solid {CYAN};background:#F8FAFC}}
  .sec-2{{border-top:3px solid {GOLD};background:#FFFBEB}}
  .sec-3{{border-top:3px solid {GREEN};background:#F0FDF4}}

  .sec-hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:1px dashed #CBD5E1;padding-bottom:3px;margin-bottom:4px}}
  .sec-badge{{font-size:8.2pt;font-weight:900;color:#FFF;padding:2px 8px;border-radius:4px}}
  .sec-1 .sec-badge{{background:{CYAN}}}
  .sec-2 .sec-badge{{background:{GOLD}}}
  .sec-3 .sec-badge{{background:{GREEN}}}
  .sec-sub{{font-size:6.8pt;font-weight:700;color:{MUTED}}}

  .grid-2{{display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;flex:1 1 auto}}
  .card{{background:#FFF;border:1px solid #E2E8F0;border-radius:5px;padding:3px 6px;display:flex;flex-direction:column;justify-content:center}}
  .card-t{{font-size:7pt;font-weight:800;color:#0F172A;display:flex;justify-content:space-between;margin-bottom:1px}}
  .tag{{font-size:5.8pt;font-weight:800;padding:.5px 5px;border-radius:3px;background:#F1F5F9;color:#475569}}
  .sec-1 .tag{{background:#E0F2FE;color:#0369A1}}
  .sec-2 .tag{{background:#FEF3C7;color:#B45309}}
  .sec-3 .tag{{background:#DCFCE7;color:#15803D}}

  .formula{{
    direction:ltr;unicode-bidi:isolate;font-family:"Vazirmatn",sans-serif;
    font-size:7.2pt;font-weight:700;color:#0F172A;line-height:1.2;
  }}
  .formula b{{color:{CYAN};font-weight:900}}
  .sec-2 .formula b{{color:#B45309}}
  .sec-3 .formula b{{color:#15803D}}

  /* footer */
  .ft{{margin-top:6px;border-top:1.5px solid #E2E8F0;padding-top:4px;display:flex;justify-content:space-between;align-items:center;font-size:6.6pt;color:{MUTED};font-weight:600;flex:0 0 auto}}
</style></head><body>

{watermark_svg()}

<div class="hd">
  <div class="hd-l">
    {logo_tile(32, 8, CYAN)}
    <div>
      <h1>برگه طلایی: اسیدها، بازها و روابط محاسباتی pH (شیمی دوازدهم)</h1>
      <p>مرور جامع اسیدها/بازهای قوی و ضعیف، ثابت یونش Ka، درجه یونش و تکنیک‌های تستی pH</p>
    </div>
  </div>
  <div class="hd-r">{header_signature("right", 9, 6.8)}</div>
</div>

<div class="sections">

  <!-- Section 1: Strong Acids & Bases -->
  <div class="sec sec-1">
    <div class="sec-hd">
      <span class="sec-badge">بخش اول • اسیدها و بازهای قوی (یونش ۱۰۰٪)</span>
      <span class="sec-sub">اسیدهای هالوژن‌دار، اکسیژن‌دار و هیدروکسیدهای گروه ۱ و ۲</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>هیدروکلریک، برمیک و یدیک اسید</span><span class="tag">اسید تک‌پروتونه</span></div><div class="formula">HCl, HBr, HI ➔ <b>[H⁺] = M × n</b>  (pH = -log M)</div></div>
      <div class="card"><div class="card-t"><span>نیتریک و پرکلریک اسید</span><span class="tag">اکسی‌اسید قوی</span></div><div class="formula">HNO₃, HClO₄ ➔ <b>[H⁺] = M</b>  (α = 1 , Ka >> 1)</div></div>
      <div class="card"><div class="card-t"><span>سولفوریک اسید (یونش مرحله اول)</span><span class="tag">اسید دوپروتونه</span></div><div class="formula">H₂SO₄ ➔ H⁺ + HSO₄⁻  ➔ <b>[H⁺] ≥ M</b></div></div>
      <div class="card"><div class="card-t"><span>هیدروکسیدهای فلزات قلیایی (گروه ۱)</span><span class="tag">باز قوی تک‌ظرفیتی</span></div><div class="formula">LiOH, NaOH, KOH ➔ <b>[OH⁻] = M</b>  (pOH = -log M)</div></div>
      <div class="card"><div class="card-t"><span>هیدروکسیدهای فلزات قلیایی خاکی (گروه ۲)</span><span class="tag">باز قوی دوظرفیتی</span></div><div class="formula">Ca(OH)₂, Ba(OH)₂, Sr(OH)₂ ➔ <b>[OH⁻] = 2M</b></div></div>
      <div class="card"><div class="card-t"><span>رابطه تعادلی آب در دمای ۲۵ درجه</span><span class="tag">محیط خنثی و آبی</span></div><div class="formula"><b>Kw = [H⁺][OH⁻] = 10⁻¹⁴</b> ➔ pH + pOH = 14</div></div>
    </div>
  </div>

  <!-- Section 2: Weak Acids & Ka -->
  <div class="sec sec-2">
    <div class="sec-hd">
      <span class="sec-badge">بخش دوم • اسیدها و بازهای ضعیف، ثابت یونش Ka و درجه یونش</span>
      <span class="sec-sub">کربوکسیلیک اسیدها، هیدروفلوئوریک، آمونیاک و آمین‌ها</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>هیدروفلوئوریک اسید و هیدروژن سیانید</span><span class="tag">اسید ضعیف هالوژنی</span></div><div class="formula">HF (Ka ≈ 6.8×10⁻⁴)  |  HCN (Ka ≈ 6.2×10⁻¹⁰)</div></div>
      <div class="card"><div class="card-t"><span>فرمول طلایی درجه یونش (تقریب مجاز)</span><span class="tag">تکنیک سریع</span></div><div class="formula"><b>α = √(Ka / M)</b>  (شرط تقریب: α &lt; 0.05 یا M/Ka &gt; 400)</div></div>
      <div class="card"><div class="card-t"><span>غلظت یون هیدرونیوم در اسید ضعیف</span><span class="tag">محاسبه تک‌کسری</span></div><div class="formula"><b>[H⁺] = M × α = √(Ka × M)</b> ➔ حل بدون معادله درجه ۲</div></div>
      <div class="card"><div class="card-t"><span>استیک اسید (سرکه) و فرمیک اسید</span><span class="tag">اسیدهای آلی کربوکسیل</span></div><div class="formula">CH₃COOH (Ka=1.8×10⁻⁵)  &lt;  HCOOH (Ka=1.8×10⁻⁴)</div></div>
      <div class="card"><div class="card-t"><span>آمونیاک و آمین‌های آلی</span><span class="tag">بازهای ضعیف نیتروژن‌دار</span></div><div class="formula">NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ ➔ <b>[OH⁻] = √(Kb × M)</b></div></div>
      <div class="card"><div class="card-t"><span>مقایسه قدرت اسیدی اسیدهای اکسیژن‌دار</span><span class="tag">قاعده پاولینگ</span></div><div class="formula">هر چه تعداد O بدون H بیشتر ➔ اسید قوی‌تر: HClO₄ &gt; HClO₃ &gt; HClO</div></div>
    </div>
  </div>

  <!-- Section 3: pH Shortcuts & Dilution -->
  <div class="sec sec-3">
    <div class="sec-hd">
      <span class="sec-badge">بخش سوم • فرمول‌های بالینی رقیق‌سازی و تغییرات pH</span>
      <span class="sec-sub">تکنیک‌های ۱۰ ثانیه‌ای حل تست بدون لگاریتم‌های سنگین</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>۱۰ برابر رقیق کردن اسید قوی</span><span class="tag">افزایش خطی</span></div><div class="formula">حجم ۱۰ برابر ➔ <b>ΔpH = +1</b> (تا سقف ۷)</div></div>
      <div class="card"><div class="card-t"><span>۱۰ برابر رقیق کردن باز قوی</span><span class="tag">کاهش خطی</span></div><div class="formula">حجم ۱۰ برابر ➔ <b>ΔpH = -1</b> (تا کف ۷)</div></div>
      <div class="card"><div class="card-t"><span>۱۰ برابر رقیق کردن اسید ضعیف</span><span class="tag">تکنیک رادیکالی</span></div><div class="formula">حجم ۱۰ برابر ➔ <b>ΔpH ≈ +0.5</b> (به علت اثر یون مشترک و α)</div></div>
      <div class="card"><div class="card-t"><span>فرمول جادویی لگاریتم‌های پرکاربرد</span><span class="tag">حفظی‌های کنکور</span></div><div class="formula">log 2 = <b>0.3</b> , log 3 = <b>0.48</b> , log 5 = <b>0.7</b> , log 7 = <b>0.85</b></div></div>
      <div class="card"><div class="card-t"><span>مخلوط دو اسید قوی هم‌حجم با اختلاف pH=1</span><span class="tag">ترفند تستی</span></div><div class="formula">pH_مخلوط = <b>pH_کمتر + 0.26</b> (مثال: pH=2 و pH=3 ➔ 2.26)</div></div>
      <div class="card"><div class="card-t"><span>خنثی‌شدن کامل اسید قوی و باز قوی</span><span class="tag">نقطه هم‌ارزی</span></div><div class="formula">n(H⁺) = n(OH⁻) ➔ <b>M₁V₁n₁ = M₂V₂n₂</b> (pH در ۲۵°C = 7)</div></div>
    </div>
  </div>

</div>

<div class="ft">{footer_signature()}</div>

</body></html>'''

def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/golden_acids.html"
    pdf_path = f"{out_dir}/golden_sheet_acids_bases.pdf"

    html = build_html()
    leftover = audit_emoji_icons(html)
    if leftover: raise SystemExit(f"emoji error: {leftover}")
    if "shimi_wm" not in html: raise SystemExit("watermark missing")

    with open(html_path, "w", encoding="utf-8") as f: f.write(html)
    subprocess.run([
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}", html_path
    ], check=True, capture_output=True)

    data = open(pdf_path, "rb").read()
    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    print(f"PDF 1: {pdf_path} | pages={pages} | size={len(data)//1024}KB")
    assert pages == 1, f"Expected 1 page, got {pages}"

if __name__ == "__main__":
    main()
