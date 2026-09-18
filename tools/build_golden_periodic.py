#!/usr/bin/env python3
"""
برگه طلایی شماره ۳ — جدول تناوبی، تناوب و هم‌ارزی الکترونی شیمی دهم
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

  .hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid {CYAN};padding-bottom:5px;margin-bottom:6px;flex:0 0 auto}}
  .hd-l{{display:flex;align-items:center;gap:9px}}
  .hd h1{{font-size:13pt;font-weight:900;line-height:1.18}}
  .hd p{{font-size:7.2pt;color:{CYAN};font-weight:700}}
  .hd-r{{text-align:right}}

  .sections{{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:0}}
  .sec{{border:1px solid #CBD5E1;border-radius:6px;padding:6px 8px;flex:1 1 0;display:flex;flex-direction:column;justify-content:space-between}}
  .sec-1{{border-top:3px solid {CYAN};background:#F8FAFC}}
  .sec-2{{border-top:3px solid {GREEN};background:#F0FDF4}}
  .sec-3{{border-top:3px solid {GOLD};background:#FFFBEB}}

  .sec-hd{{display:flex;justify-content:space-between;align-items:center;border-bottom:1px dashed #CBD5E1;padding-bottom:3px;margin-bottom:4px}}
  .sec-badge{{font-size:8.2pt;font-weight:900;color:#FFF;padding:2px 8px;border-radius:4px}}
  .sec-1 .sec-badge{{background:{CYAN}}}
  .sec-2 .sec-badge{{background:{GREEN}}}
  .sec-3 .sec-badge{{background:{GOLD}}}
  .sec-sub{{font-size:6.8pt;font-weight:700;color:{MUTED}}}

  .grid-2{{display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;flex:1 1 auto}}
  .card{{background:#FFF;border:1px solid #E2E8F0;border-radius:5px;padding:3px 6px}}
  .card-t{{font-size:7pt;font-weight:800;color:#0F172A;display:flex;justify-content:space-between;margin-bottom:1px}}
  .tag{{font-size:5.8pt;font-weight:800;padding:.5px 5px;border-radius:3px;background:#F1F5F9;color:#475569}}
  .sec-1 .tag{{background:#E0F2FE;color:#0369A1}}
  .sec-2 .tag{{background:#DCFCE7;color:#15803D}}
  .sec-3 .tag{{background:#FEF3C7;color:#B45309}}

  .formula{{
    direction:ltr;unicode-bidi:isolate;font-family:"Vazirmatn",sans-serif;
    font-size:7.2pt;font-weight:700;color:#0F172A;line-height:1.2;
  }}
  .formula b{{color:{CYAN};font-weight:900}}
  .sec-2 .formula b{{color:{GREEN}}}
  .sec-3 .formula b{{color:#B45309}}

  .ft{{margin-top:6px;border-top:1.5px solid #E2E8F0;padding-top:4px;display:flex;justify-content:space-between;align-items:center;font-size:6.6pt;color:{MUTED};font-weight:600;flex:0 0 auto}}
</style></head><body>

{watermark_svg()}

<div class="hd">
  <div class="hd-l">
    {logo_tile(32, 8, CYAN)}
    <div>
      <h1>برگه طلایی: جدول تناوبی، پیکربندی الکترونی و قوانین تناوبی (شیمی دهم)</h1>
      <p>مرور جامع روند تغییرات شعاع اتمی، انرژی یونش، الکترونگاتیوی و شمارش الکترون‌ها با l</p>
    </div>
  </div>
  <div class="hd-r">{header_signature("right", 9, 6.8)}</div>
</div>

<div class="sections">

  <!-- Section 1: Electron config -->
  <div class="sec sec-1">
    <div class="sec-hd">
      <span class="sec-badge">بخش اول • پیکربندی الکترونی و شمارش سریع الکترون‌ها (l=1)</span>
      <span class="sec-sub">زیرلایه‌های s, p, d, f و ترفند جمع‌زدنی الکترون‌های p</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>زیرلایه‌ها و سقف الکترون</span><span class="tag">الکترون‌های زیرلایه</span></div><div class="formula">s=<b>2</b> , p=<b>6</b> , d=<b>10</b> , f=<b>14</b>  (ظرفیت کامل)</div></div>
      <div class="card"><div class="card-t"><span>شمار سریع الکترون‌های l=1 (زیرلایه p)</span><span class="tag">تست‌های پرتکرار</span></div><div class="formula">مجموع e⁻ در همه pها ➔ <b>2p⁶ + 3pⁿ</b> (مثال ₁₆S: 6+4 = 10 e⁻)</div></div>
      <div class="card"><div class="card-t"><span>ترتیب انرژی زیرلایه‌ها (دیاگونالی)</span><span class="tag">اصل اوت‌باو</span></div><div class="formula">1s→2s→2p→3s→3p→<b>4s→3d→4p</b>→5s→4d</div></div>
      <div class="card"><div class="card-t"><span>تفاوت اتم سنگین و کاتیون/آنیون</span><span class="tag">روند پرشدن</span></div><div class="formula">کاتیون ➔ حذف از لایه ظرفیت  (₁₁Na ➔ ₁₀Ne)  | آنیون ➔ تکمیل اکتت</div></div>
      <div class="card"><div class="card-t"><span>قاعده هوند و اصل طرد پائولی</span><span class="tag">چیدمان الکترون</span></div><div class="formula">هر اوربیتال تک‌اشغالی با <b>اسپین موازی</b> پر می‌شود سپس جفت می‌شود</div></div>
      <div class="card"><div class="card-t"><span>عناصر واسطه (بلاک d)</span><span class="tag">ثابت‌های مهم</span></div><div class="formula">₂₄Cr: <b>[Ar]3d⁵4s¹</b> (استثنا) | ₂₉Cu: <b>[Ar]3d¹⁰4s¹</b> (استثنا)</div></div>
    </div>
  </div>

  <!-- Section 2: Periodic trends -->
  <div class="sec sec-2">
    <div class="sec-hd">
      <span class="sec-badge">بخش دوم • روند تناوبی در گروه و دوره</span>
      <span class="sec-sub">شعاع اتمی، انرژی یونش، الکترونگاتیوی و فلزی/نافلزی</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>روند شعاع اتمی در گروه</span><span class="tag">حرکت عمودی ⬇️</span></div><div class="formula">از بالا به پایین ➔ <b>شعاع افزایش</b> (افزایش لایه جدید)</div></div>
      <div class="card"><div class="card-t"><span>روند شعاع اتمی در دوره</span><span class="tag">حرکت افقی ⬅️</span></div><div class="formula">از چپ به راست ➔ <b>شعاع کاهش</b> (جاذبه هسته بیشتر)</div></div>
      <div class="card"><div class="card-t"><span>انرژی یونش (IE)</span><span class="tag">قوی‌ترین عناصر</span></div><div class="formula">نوبل‌ها (بیشترین) &gt; هالوژن‌ها &gt; ... &gt; فلزات قلیایی (کمترین)</div></div>
      <div class="card"><div class="card-t"><span>الکترونگاتیوی (EN)</span><span class="tag">قوی‌ترین عناصر</span></div><div class="formula"><b>F (4.0) &gt; O (3.5) &gt; N &gt; Cl (3.0)</b> ➔ بالاترین جذب الکترون</div></div>
      <div class="card"><div class="card-t"><span>رابطه مستقیم EN و قابلیت اکسید شدن</span><span class="tag">قواعد خلاصه</span></div><div class="formula">EN بالا ➔ اکسیدکننده قوی | EN پایین ➔ <b>احیاکننده قوی</b></div></div>
      <div class="card"><div class="card-t"><span>مقایسه اندازه یون هم‌الکترونی</span><span class="tag">تکنیک ۳ ثانیه</span></div><div class="formula">هر چه <b>بار هسته Z بیشتر</b> ➔ یون کوچک‌تر: O²⁻ &gt; F⁻ &gt; Na⁺ &gt; Mg²⁺</div></div>
    </div>
  </div>

  <!-- Section 3: Avogadro -->
  <div class="sec sec-3">
    <div class="sec-hd">
      <span class="sec-badge">بخش سوم • شمارش اتم و مول (عدد آووگادرو)</span>
      <span class="sec-sub">تبدیل‌های سریع گرم، مول، حجم و شمار ذرات</span>
    </div>
    <div class="grid-2">
      <div class="card"><div class="card-t"><span>عدد آووگادرو و تعریف مول</span><span class="tag">پایه محاسبات</span></div><div class="formula"><b>N_A = 6.022 × 10²³</b> ذره در هر مول</div></div>
      <div class="card"><div class="card-t"><span>شمار اتم‌ها در ترکیب</span><span class="tag">تکنیک ۵ ثانیه</span></div><div class="formula">n_اتم = <b>مول ترکیب × تعداد اتم در فرمول</b>  (مثال CH₄: ×5)</div></div>
      <div class="card"><div class="card-t"><span>حجم مولی گازها در STP</span><span class="tag">شرایط استاندارد</span></div><div class="formula"><b>V = 22.4 L/mol</b> (دمای ۰°C و فشار ۱ atm)</div></div>
      <div class="card"><div class="card-t"><span>تبدیل سریع گرم به تعداد ذره</span><span class="tag">فرمول یک‌خطی</span></div><div class="formula">N = <b>(m / M) × N_A</b>  (m جرم، M جرم مولی)</div></div>
      <div class="card"><div class="card-t"><span>جرم اتمی میانگین (تکنیک ترازوی گشتاور)</span><span class="tag">متد کلینیکال</span></div><div class="formula"><b>M̄ = M_سبک + (ΔM × درصد سنگین‌تر)</b>  بدون کسر ۱۰۰</div></div>
      <div class="card"><div class="card-t"><span>خلوص و جرم واقعی ماده</span><span class="tag">تله طراح</span></div><div class="formula">m_خالص = <b>m_کل × خلوص</b>  ➔ سپس تقسیم بر جرم مولی</div></div>
    </div>
  </div>

</div>

<div class="ft">{footer_signature()}</div>

</body></html>'''

def main():
    out_dir = "/Users/aidin/shimi_channel_backup"
    html_path = "/tmp/golden_periodic.html"
    pdf_path = f"{out_dir}/golden_sheet_periodic_grade10.pdf"
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
    print(f"PDF 2: {pdf_path} | pages={pages} | size={len(data)//1024}KB")
    assert pages == 1, f"Expected 1 page, got {pages}"

if __name__ == "__main__":
    main()
