// Telegram webhook handler — cloud 24/7 bot (no local Mac dependency)
// Free tier: 125k requests/month, far beyond our usage.

const ADMIN_IDS = [5207128978, 6712714529];
const GROUP_ID = -1003989699975;
const CHANNEL_ID = -1003792488519;
const LRM = "\u200E";

const ASSETS = {
  golden_reactions: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden_reactions_10_11_12.pdf",
    type: "document", name: "golden_reactions_10_11_12.pdf",
    caption: "📄 برگه طلایی جمع‌بندی تمام واکنش‌های کتاب درسی (۱۰، ۱۱ و ۱۲)"
  },
  golden_acids: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden_sheet_acids_bases.pdf",
    type: "document", name: "golden_sheet_acids_bases.pdf",
    caption: "📄 برگه طلایی اسیدها، بازها و روابط محاسباتی pH (شیمی دوازدهم)"
  },
  golden_periodic: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden_sheet_periodic_grade10.pdf",
    type: "document", name: "golden_sheet_periodic_grade10.pdf",
    caption: "📄 برگه طلایی جدول تناوبی و پیکربندی الکترونی (شیمی دهم)"
  },
  planner_weekly: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/planner_weekly_chemistry.pdf",
    type: "document", name: "planner_weekly_chemistry.pdf",
    caption: "📅 پلنر مطالعاتی هفتگی شیمی کنکور (۲۸ شهریور تا ۳ مهر)"
  },
  planner_exam: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/planner_exam_24h.pdf",
    type: "document", name: "planner_exam_24h.pdf",
    caption: "📅 پلنر ویژه شب امتحان — چرخه ۲۴ ساعته مطالعه و مرور"
  },
  planner_monthly: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/planner_monthly_cycle.pdf",
    type: "document", name: "planner_monthly_cycle.pdf",
    caption: "📅 پلنر ماهانه ۴ هفته‌ای — مرور جامع شیمی ۱۰، ۱۱ و ۱۲"
  },
  poster_isotopes: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/poster_isotopes_grade10.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی شیمی دهم — متد ترازوی گشتاور ایزوتوپ‌ها"
  },
  poster_molar: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/poster_molar_concentration.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی مقایسه سه واحد غلظتی (مولار، مولال، ppm)"
  },
  poster_daniel: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/poster_daniel_cell.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی پیل دانیل — آناتومی آند و کاتد"
  },
  shimidle: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/shimidle_preview.png",
    type: "photo",
    caption: "🧩 شیمیدل — بازی حدس عنصر روزانه",
    webapp: true
  },
  banner_promo: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/banner_miniapp_promo.png",
    type: "photo",
    caption: "⚡️ بنر معرفی مینی‌اپ هوشمند شیمی (آزمون + پلنر تعاملی)"
  },
  thankyou_update: {
    url: "https://raw.githubusercontent.com/MrRooobooot/shimi-app/main/assets/banner_thankyou_update.png",
    type: "photo",
    caption: "❤️ پست تشکر و معرفی آپدیت نسخه ۲.۵ مینی‌اپ شیمی",
    webapp: true
  },
  golden12_soap: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden12_ch1_v2_01_soap_detergents.pdf",
    type: "document", name: "golden12_ch1_soap_detergents.pdf",
    caption: "📄 برگه طلایی ۱ — جمع‌بندی صابون‌ها و پاک‌کننده‌ها (شیمی ۱۲، فصل اول)"
  },
  golden12_mixtures: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden12_ch1_v2_02_mixtures_corrosive.pdf",
    type: "document", name: "golden12_ch1_mixtures_corrosive.pdf",
    caption: "📄 برگه طلایی ۲ — مخلوط‌ها و پاک‌کننده‌های خورنده (شیمی ۱۲)"
  },
  golden12_acids: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden12_ch1_v2_03_acids_bases_ka.pdf",
    type: "document", name: "golden12_ch1_acids_bases_ka.pdf",
    caption: "📄 برگه طلایی ۳ — اسیدها و بازها، تعادل یونش و Ka (شیمی ۱۲)"
  },
  golden12_water: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden12_ch1_v2_04_water_ph.pdf",
    type: "document", name: "golden12_ch1_water_ph.pdf",
    caption: "📄 برگه طلایی ۴ — خودیونش آب، مقیاس pH و محاسبات (شیمی ۱۲)"
  },
  golden12_oxides: {
    url: "https://mrrooobooot.github.io/shimi-app/assets/golden12_ch1_v2_05_oxides_acidrain.pdf",
    type: "document", name: "golden12_ch1_oxides_acidrain.pdf",
    caption: "📄 برگه طلایی ۵ — اکسیدها، باران اسیدی و ضداسیدهای معده (شیمی ۱۲)"
  }
};

const PUBLISH_CAPTIONS = {
  golden_reactions: "📄 <b>برگه طلایی: جمع‌بندی کل واکنش‌های کتاب درسی (۱۰، ۱۱ و ۱۲)</b>\n───────────────\nبچه‌ها این برگه رو طوری طراحی کردم که بتونید مستقیم پرینت بگیرید و روی میز مطالعه بذارید.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ ۳۰ واکنش کلیدی و پرتکرار کنکور تجربی و ریاضی\n▫️ تفکیک دقیق با کدهای رنگی پایه‌های دهم، یازدهم و دوازدهم\n▫️ موازنه شده به همراه تمام شرایط، کاتالیزورها و حالت‌های فیزیکی\n───────────────\n👇 <b>برای ذخیره و استفاده دوستانتون فوروارد کنید!</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_کنکور #جمع_بندی #برگه_طلایی",
  golden_acids: "📄 <b>برگه طلایی: اسیدها، بازها و روابط محاسباتی pH (شیمی دوازدهم)</b>\n───────────────\n▫️ مرور جامع اسیدها و بازهای قوی و ضعیف کتاب درسی\n▫️ فرمول‌های طلایی درجه یونش و Ka بدون معادله درجه دوم\n▫️ تکنیک‌های ۱۰ ثانیه‌ای رقیق‌سازی و تغییرات pH\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #اسید_باز #برگه_طلایی",
  golden_periodic: "📄 <b>برگه طلایی: جدول تناوبی، آرایش الکترونی و شمارش اتم‌ها (شیمی دهم)</b>\n───────────────\n▫️ شمارش سریع الکترون‌های l=1 و استثناهای کروم و مس\n▫️ روند تناوبی شعاع، انرژی یونش و الکترونگاتیوی\n▫️ فرمول‌های آووگادرو و تکنیک ترازوی گشتاور\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دهم #جدول_تناوبی #برگه_طلایی",
  planner_weekly: "📅 <b>پلنر مطالعاتی هفتگی شیمی کنکور (متد رتبه برتر)</b>\n───────────────\nبچه‌ها یکی از بزرگ‌ترین تله‌های مطالعاتی، پیش رفتن بدون ثبت دقیق ساعت و تست روزانه‌ست.\n\n📌 <b>ساختار و امکانات این نسخه:</b>\n▫️ جدول ۷ روز هفته با تفکیک ۶ پارت مطالعاتی در روز\n▫️ رعایت تراز طلایی: ۷۰٪ دروس اختصاصی و ۳۰٪ عمومی\n▫️ کادرهای ثبت ساعت مطالعه و شمارش تست به تفکیک روز\n▫️ پنل ارزیابی هفتگی + چک‌لیست مرور\n───────────────\n👇 <b>پرینت بگیرید، از همین شنبه شروع کنید!</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_کنکور #برنامه_ریزی #پلنر_هفتگی",
  planner_exam: "📅 <b>پلنر ویژه شب امتحان — چرخه ۲۴ ساعته مطالعه و مرور</b>\n───────────────\n▫️ ۶ دوره ۴ ساعته دقیق از صفر تا ۲۴ ساعت قبل آزمون\n▫️ چرخه طلایی مرور ۵ مرحله‌ای بر اساس منحنی ابینگهاوس\n▫️ چک‌لیست آمادگی + ۴ ممنوعیت بزرگ شب امتحان\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#پلنر #شب_امتحان #متد_کلینیکال",
  planner_monthly: "📅 <b>پلنر ماهانه ۴ هفته‌ای — مرور جامع شیمی ۱۰، ۱۱ و ۱۲</b>\n───────────────\n▫️ چرخه ۲۸ روزه مرور طلایی با تفکیک ۴ هفته مطالعاتی\n▫️ تسلط کامل بر دهم، یازدهم، دوازدهم و آزمون‌های جامع\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#پلنر_ماهانه #برنامه_ریزی #متد_کلینیکال",
  poster_isotopes: "⚡️ <b>متد کلینیکال: محاسبه ۳ ثانیه‌ای جرم اتمی میانگین!</b>\n───────────────\n🔹 <b>تکنیک ترازوی گشتاور:</b>\n<code>M̄ = M_سبک + (اختلاف جرم × درصد سنگین‌تر)</code>\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دهم #ایزوتوپها #متد_کلینیکال",
  poster_molar: "⚡️ <b>متد کلینیکال: مقایسه سه واحد غلظتی — مولار، مولال و ppm</b>\n───────────────\n🔹 <b>جدول طلایی کسرها:</b>\n<code>M = n/V(L) | m = n/kg(solvent) | ppm = mg/L(soln)</code>\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دهم #محلولها #متد_کلینیکال",
  poster_daniel: "⚡️ <b>پیل دانیل در یک نگاه — آند و کاتد را دیگر جابه‌جا نمی‌کنی!</b>\n───────────────\n🔹 <b>قاعده طلایی:</b> «آند همیشه جایی است که اکسیداسیون رخ می‌دهد»\n▫️ <b>آند:</b> قطب منفی، اکسیداسیون: <code>Zn ➔ Zn²⁺ + 2e⁻</code>\n▫️ <b>کاتد:</b> قطب مثبت، کاهش: <code>Cu²⁺ + 2e⁻ ➔ Cu</code>\n▫️ <b>E° = +1.10 V</b>\n───────────────\n⚗️ شیمی کنکور | الهه محمددوست (رتبه ۷۸۸)\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #پیل_دانیل #متد_کلینیکال",
  shimidle: "🧩 <b>شیمیدل — بازی حدس عنصر روزانه، فقط در کانال شیمی کنکور!</b>\n───────────────\nبچه‌ها هر روز یک سرنخ از یک عنصر شیمیایی میدیم؛ شما حدس می‌زنین!\n\n🎯 <b>چطوری بازی کنیم؟</b>\n▫️ سرنخ اول سخت‌ترینه — هر جواب غلط، یک سرنخ جدید باز می‌کنه\n▫️ امتیاز و استریک روزانه‌ت ذخیره میشه\n▫️ نتیجه‌ت رو به دوستات چالش بفرست!\n───────────────\n👇 <b>همین امروز شروع کن!</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمیدل #بازی_شیمی",
  banner_promo: "⚡️ <b>قابلیت جدید: مینی‌اپ هوشمند شیمی — آزمون و پلنر، داخل تلگرام!</b>\n───────────────\nبچه‌ها از امروز بدون نصب هیچ اپلیکیشنی، همه ابزارهای مطالعاتی‌تون داخل خود تلگرام در دسترستونه:\n\n📌 <b>امکانات نسخه تعاملی:</b>\n▫️ آزمون آنلاین استاندارد با تایمر و تحلیل گام‌به‌گام\n▫️ پلنر هفتگی هوشمند با ثبت ساعت و تست\n▫️ ذخیره خودکار روی گوشی\n───────────────\n👇 <b>همین حالا رایگان امتحان کن!</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_کنکور #مینی_اپ #آزمون_آنلاین",
  thankyou_update: "❤️ <b>به پاس استقبال پرشور شما دانش‌آموزان عزیز...</b>\n───────────────\nدر کمتر از ۴۸ ساعت، استقبال و پیام‌های پرمهرتون از مینی‌اپ شیمی فراتر از انتظارمون بود! برای قدردانی از اعتماد شما، <b>نسخه ۲.۵</b> با ۳ ارتقای اساسی منتشر شد:\n\n🧩 <b>۱. شیمیدل پرو (وردل شیمی):</b>\nپازل علمی حدس عنصر روزانه با بررسی دوره، گروه، عدد اتمی و دسته‌ها + سرنخ‌های بالینی طراح!\n\n📅 <b>۲. پلنر بدون اسکرول دو ستونه:</b>\nچیدمان هوشمند متناسب با دسکتاپ و موبایل + تگ‌های سریع مباحث و دکمه جادویی «کپی از دیروز».\n\n📊 <b>۳. کارنامه تفکیکی آزمون:</b>\nمشاهده درصد دقیق به تفکیک پایه‌های دهم، یازدهم و دوازدهم جهت عیب‌یابی آنی مباحث.\n───────────────\n💡 <i>۱۰۰٪ رایگان، بدون تبلیغات و با پاسخ‌های کاملاً تشریحی</i>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#مینی_اپ #شیمیدل #پلنر_کنکور #متد_کلینیکال",
  golden12_soap: "📄 <b>برگه طلایی ۱ — جمع‌بندی صابون‌ها و پاک‌کننده‌ها (شیمی ۱۲، فصل اول)</b>\n───────────────\nچهار مولکول ۱۸ کربنی کتاب درسی، جرم مولی، ساختار لوویس و شوینده غیرصابونی رو یک‌جا و مقایسه‌ای ببین.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ فرمول ساختاری، ساختار لوویس و جرم مولی چهار مولکول شاخص ۱۸ کربنی\n▫️ واکنش‌های کلیدی: صابونی‌شدن، آب سخت و لکه‌بری\n▫️ جدول مقایسه صابون، شوینده غیرصابونی و پاک‌کننده خورنده\n───────────────\n👇 <b>پرینت بگیر و کنار دستت باشه</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #صابون #برگه_طلایی",
  golden12_mixtures: "📄 <b>برگه طلایی ۲ — مخلوط‌ها و پاک‌کننده‌های خورنده (شیمی ۱۲)</b>\n───────────────\nمحلول، کلوئید و سوسپانسیون، اثر تیندال و واکنش‌های لکه‌بری و لوله‌بازکنی در یک برگه.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ مقایسه سه نوع مخلوط بر پایه اندازه ذرات و پایداری\n▫️ اثر تیندال و راه تشخیص کلوئید از محلول\n▫️ لکه‌بری، لوله‌بازکنی و نکات ایمنی گاز کلر\n───────────────\n👇 <b>پرینت بگیر و کنار دستت باشه</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #مخلوط_ها #برگه_طلایی",
  golden12_acids: "📄 <b>برگه طلایی ۳ — اسیدها و بازها، تعادل یونش و Ka (شیمی ۱۲)</b>\n───────────────\nنظریه آرنیوس، قدرت اسیدی، درجه و درصد یونش و تقریب استوالد در یک برگه.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ نظریه آرنیوس و مفهوم یون هیدرونیوم\n▫️ مقایسه جامع اسیدهای قوی و ضعیف در غلظت مولی یکسان\n▫️ درجه و درصد یونش (α) و تقریب استوالد\n───────────────\n👇 <b>پرینت بگیر و کنار دستت باشه</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #اسید_باز #برگه_طلایی",
  golden12_water: "📄 <b>برگه طلایی ۴ — خودیونش آب، مقیاس pH و محاسبات (شیمی ۱۲)</b>\n───────────────\nحاصل‌ضرب یونی آب، روابط لگاریتمی pH و pOH، شناساگرها و اسیدهای چندپروتون‌دار در یک برگه.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ خودیونش آب، Kw و اثر دما بر تعادل\n▫️ روابط لگاریتمی pH و pOH و محاسبات سریع\n▫️ شناساگرها و اسیدهای چندپروتون‌دار\n───────────────\n👇 <b>پرینت بگیر و کنار دستت باشه</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #pH #برگه_طلایی",
  golden12_oxides: "📄 <b>برگه طلایی ۵ — اکسیدها، باران اسیدی و ضداسیدهای معده (شیمی ۱۲)</b>\n───────────────\nرفتار اسیدی-بازی اکسیدهای فلزی و نافلزی، فرآیندهای جوی باران اسیدی و داروهای آنتی‌اسید در یک برگه.\n\n📌 <b>ویژگی‌های این برگه:</b>\n▫️ اکسیدهای فلزی (بازی) و نافلزی (اسیدی) و واکنش آن‌ها با آب\n▫️ فرآیندهای جوی تولید باران اسیدی\n▫️ آنتی‌اسیدهای معده و استوکیومتری واکنش‌ها\n───────────────\n👇 <b>پرینت بگیر و کنار دستت باشه</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_دوازدهم #باران_اسیدی #برگه_طلایی"
};

const MAIN_KEYBOARD = {
  keyboard: [
    [{"text": "📊 آمار و وضعیت کانال"}, {"text": "🚀 بررسی و انتشار پست جدید"}],
    [{"text": "📅 مدیریت پلنر و آزمون"}, {"text": "📄 دریافت فایل‌ها"}],
    [{"text": "🔄 همگام‌سازی هاب پین‌شده"}, {"text": "⚙️ راهنما و ابزارها"}]
  ],
  resize_keyboard: true, persistent: true
};

async function tg(method, payload) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
  return await res.json();
}

async function sendAsset(chatId, key, caption) {
  const a = ASSETS[key];
  if (!a) return {ok: false};
  const method = a.type === "document" ? "sendDocument" : "sendPhoto";
  const payload = {chat_id: chatId, caption: caption || a.caption};
  if (caption) payload.parse_mode = "HTML";
  payload[method === "sendDocument" ? "document" : "photo"] = a.url;
  return await tg(method, payload);
}

async function publishToChannel(key) {
  const a = ASSETS[key];
  if (!a) return {ok: false};
  if (a.webapp) {
    const method = a.type === "document" ? "sendDocument" : "sendPhoto";
    const payload = {
      chat_id: CHANNEL_ID,
      caption: PUBLISH_CAPTIONS[key] || a.caption,
      parse_mode: "HTML",
      reply_markup: {inline_keyboard: [[
        {text: "🧩 ورود به شیمیدل پرو (بازی روزانه) ↗", url: "https://mrrooobooot.github.io/shimi-app/shimidle.html"}
      ]]}
    };
    payload[method === "sendDocument" ? "document" : "photo"] = a.url;
    return await tg(method, payload);
  }
  const method0 = a.type === "document" ? "sendDocument" : "sendPhoto";
  const payload = {
    chat_id: CHANNEL_ID,
    caption: PUBLISH_CAPTIONS[key] || a.caption,
    parse_mode: "HTML"
  };
  payload[method0 === "sendDocument" ? "document" : "photo"] = a.url;
  return await tg(method0, payload);
}

function isAssetKey(key) { return ASSETS.hasOwnProperty(key); }

function approveRejectKeyboard(key) {
  return {
    inline_keyboard: [[
      {text: "✅ تایید و انتشار در کانال", callback_data: `pub_${key}`},
      {text: "❌ رد / نیاز به اصلاح", callback_data: `rej_${key}`}
    ]]
  };
}

const ROASTS = [
  {
    triggers: [
      "خسته", "خستم", "خسته‌ام", "خسته ام", "خسته شدم", "بسه", "نمیکشم", "نمی‌کشم", "نابودم", "بریدم",
      "له‌ام", "پاره شدم", "پاره‌ام", "داغونم", "داغون", "جنازه", "مردم", "مُردم", "پوکیدم", "رمق ندارم",
      "انرژی ندارم", "خوابم میاد", "خوابالو", "خوابم", "چرت زدم", "بیهوشم", "خوابیدم", "میخوابم", "می‌خوابم", "کپیدم"
    ],
    emoji: "🥱",
    replies: [
      "مگه کوه کندی؟ دو تا تست لوویس زدی قندت افتاد؟ برو یه آب‌قند بخور ادا دانشجوهای انصرافی رو درنیار!",
      "خسته‌ای؟ کنکور به خستگیت مدال نمیده، به درصدت رتبه میده! پاشو تست بزن تنبل‌خان.",
      "فشار درس روت افتاده؟ تازه اول راهی! برو فصل سه دوازدهم اسید و باز رو ببینی چی میگی؟",
      "از کجاش خسته شدی مگه تو کتاب رو باز کردی؟ وزن کتاب که رو دوشت نیست که!",
      "راضی باش ترازوی آزمایشگاه نیست، وگرنه از بس بی‌عرضه‌ای نمره منفی میگرفتی!",
      "خسته شدی؟ پاشو یه لیوان آب یخ بریز رو صورتت ادا کارگر معدن رو درنیار!"
    ]
  },
  {
    triggers: [
      "حوصله ندارم", "فردا میخونم", "فردا می‌خونم", "حال ندارم", "ولش", "بیخیال", "بی‌خیال", "حوصله",
      "بی‌حوصله", "حسش نیست", "حالشو ندارم", "بعدا", "بعداً", "شنبه", "از شنبه", "وقت هست", "دیره", "دیر شد", "گشادی"
    ],
    emoji: "🤡",
    replies: [
      "آره جون خودت، فردا هم میگی شنبه، شنبه هم میگی سال بعد! پاشو دو کلمه استوکیومتری بخون مسخره‌بازی درنیار.",
      "همین فرمون بری جلو سال بعد باید برای بار پنجم بشینی پای ثبت‌نام سنجش! کتابو وا کن ببینم.",
      "حوصله نداری؟ رتبه کنکورم حوصله تو رو نخواهد داشت عزیزم! تکون بخور!",
      "کل حوصله تو در یک روز بیشتر از نیم ساعت نیست؟ برو دنبال شغل دفتر داری، پزشکی مال بچه‌های درس‌خون گرونه!",
      "حوصله‌ات ته‌کشید؟ رحمت خدا! تو از اول کلاس پنجم حوصله‌ت سر رفته بود!",
      "همین الان پاشو کتابو باز کن، از شنبه از شنبه راه ننداز!"
    ]
  },
  {
    triggers: [
      "ربات", "هرمس", "بات", "احمق", "خنگ", "گاوی", "بیشعور", "بی‌شعور", "نفهم", "خر", "الاغ",
      "پلشت", "اسکل", "عوضی", "آشغال", "دیوس", "کره خر", "گه", "گوه", "سیکتیر", "خفه", "لال شو", "گم شو", "گمشو"
    ],
    emoji: "🗿",
    replies: [
      "من هوش مصنوعیم، تو همونی هستی که هنوز تو موازنه کردن ضریب کسری میاری! کی اینجا خنگه؟",
      "صدا می‌زنی که چی؟ مگه من بیکارِ باباتم؟ اگه سؤال شیمی داری بپرس، اگه نه دکمه‌های پنل رو بزن زحمت کم کن!",
      "فحش میدی؟ تو برو اول تست شماره ۴ رو بالای ۵۰ درصد بزن بعد بیا با هوش مصنوعی کل‌کل کن!",
      "حرف گنده نزن عزیز دل، من در یک لحظه ۱۵ میلیون تست رو تحلیل می‌کنم، تو هنوز داری با محاسبه ۱۵×۲ کلی کل‌کل می‌کنی!",
      "خنگ کیست؟ آن که هنوز ساختار لوویس را با خط و نقطه می‌کشد در حالی که متد ۵ ثانیه‌ای را نچشیده!",
      "صداتو بیار پایین، وگرنه تو آزمون بعدی ضریب سختی سوالات رو برات می‌برم رو حالت المپیاد جهانی!"
    ]
  },
  {
    triggers: [
      "الهه", "محمددوست", "محمد دوست", "خانم محمددوست", "دکتر", "استاد", "دبیر", "معلم"
    ],
    emoji: "💅",
    replies: [
      "خانم محمددوست سر کلاسه داره رتبه ۷۸۸ رو پز میده، منم دستیار بداخلاقشم! چی کار داری باز؟",
      "اسم الهه محمددوست رو الکی به زبون نیار، اول پلنر هفتگی رو پر کن بعد اجازه داری اسمشو ببری!",
      "رتبه ۷۸۸ به کسی برنمی‌خوره عزیزم، مگه اینکه تو تست‌های pH رو خراب کنی که اونوقت خانم محمددوست دستور حذف تو رو صادر می‌کنه!"
    ]
  },
  {
    triggers: [
      "آیدین", "ایدین", "مهندس", "ادمین", "برنامه‌نویس", "برنامه نویس"
    ],
    emoji: "👨‍💻",
    replies: [
      "مهندس اعظم تشریف آوردن! بازم اومدی دکمه‌ها رو دستکاری کنی یا اومدی خرابکاری کنی؟",
      "به به آیدین خان! سرورها خنک شد اومدی سراغ ما؟ دکمه‌های پنل کار میکنه دیگه انقدر تست نکن!",
      "مهندس نرم‌افزار ما بالاخره تشریف آوردن! بگو ببینم این بار دکمه کدوم رو خراب کردی؟"
    ]
  },
  {
    triggers: [
      "کنکور", "رتبه", "پزشکی", "دندان", "دندون", "دارو", "داروسازی", "مشهد", "دانشگاه", "قبولی",
      "سنجش", "قلمچی", "ماز", "گزینه دو", "گاج"
    ],
    emoji: "💀",
    replies: [
      "پزشکی مشهد می‌خوای با روزی نیم ساعت خوندن؟ خواب دیدی خیر باشه! حداقل باید روزی ۶ پارت سنگین بزنی.",
      "کنکور؟ همونی که قراره اگر تست استوکیومتری نزنی پوستت رو بکنه؟ برو تست بزن دلتو به قضا و قدر نبند!",
      "می‌خوای دکتر بشی؟ اول باید قید خواب، گشت‌وگذار و تلگرام رو بزنی بعد بیا اونجا حرف بزنیم!",
      "داروسازی؟ بهتره اول بری داروی ضد خواب‌زدگی بخری که سر جلسه خواب نری!"
    ]
  },
  {
    triggers: [
      "عشقی", "دوستت دارم", "قربونت", "فدات", "نوکرم", "چاکرم", "به قربونت", "عزیزمی", "عزیزم", "جیگر",
      "عشق منی", "دمت گرم", "نوکرتم", "چاکرتم", "مخلصم"
    ],
    emoji: "🤮",
    replies: [
      "چاپلوسی نکن، من به قربون‌صدقه نمره نمیدم! پاشو برو کارنامه آزمونتو بیار ببینم چند درصد زدی.",
      "فدات شم فدات شم راه ننداز، برو ۱۰ تا تست pH بزن اون موقع شاید تحویلت گرفتم!",
      "خب حالا که این‌قدر نوکر منی، برو سه تا برگه طلایی رو پرینت کن بیار بچسبون رو دیوار اتاقت!"
    ]
  },
  {
    triggers: [
      "شیمی", "سخته", "نمیفهمم", "نمی‌فهمم", "گنگه", "سخت", "نمیدونم", "نمی‌دونم", "پیچیده", "حفظ نمیشم",
      "فرمول", "مسئله", "محاسبات", "استوکیومتری", "لوویس", "اسید", "باز", "تعادل", "الکتروشیمی"
    ],
    emoji: "🤯",
    replies: [
      "سخت نیست، تو تمرکز نداری! برو مینی‌اپ رو باز کن ۵ تا تست بزن متد کلینیکال رو ببینی دیگه بهونه نمیاری.",
      "کجاش سخته؟ یه تفاضل اکتت و ظرفیته، دبستانم این تفریق رو بلدن! بیا منو نخور پاشو حلش کن.",
      "سخت؟ مگه جفت‌الکترون رو با لوله برق مونتاژ می‌کنی؟ برو تو مینی‌اپ بخش شیمی دهم رو بزن ببین چقدر آسونه!",
      "فرمول زیاده؟ برگه طلایی رو گذاشتیم تو کانال پرینت کنی، نه این که بشینی نگاهش کنی و آه بکشی!"
    ]
  },
  {
    triggers: [
      "پول", "تخفیف", "گرونه", "شهریه", "مفتی", "رایگان", "هزینه", "چند", "چنده", "قیمت", "قسطی", "ارزون"
    ],
    emoji: "💸",
    replies: [
      "تخفیف؟ مگه سر گردنه‌ست؟ کل پلنر و مینی‌اپ و برگه طلایی‌ها رو مفتی گذاشتیم جلوت، دیگه چی می‌خوای؟ نوکر بی‌جیره مواجب؟",
      "برای چیپس و قهوه پول داری، به آموزش کنکور که میرسه گدا میشی؟ پاشو برو ثبت‌نام کن آینده‌ت نسوزه!",
      "قیمت مشاوره از قاب گوشیت کمتره! اگر این‌قدر نگران آینده‌ای، برو دنبال یه کار با حقوق ثابت!"
    ]
  },
  {
    triggers: [
      "سلام", "درود", "سلام دوستان", "سلام ربات", "بای", "خداحافظ", "خدافظ", "فعلا", "فعلاً", "صبح بخیر", "شب بخیر", "چطوری", "خوبی"
    ],
    emoji: "🫡",
    replies: [
      "سلام بی‌مغز! به جای ۱۰ دقیقه سلام و علیک، برو ۱۰ تست استوکیومتری بزن که دم جمعه خراب نکنی!",
      "درود بر تو، به شرطی که بری تست بزنی! وگرنه سلامت هم هدر دادن اکسیژنه.",
      "بای‌بای! برو خدا به همراهت، وقتی برگشتی ببینم چند درصد پیشرفت کردی، وگرنه اخم می‌کنم بهت!"
    ]
  },
  {
    triggers: [
      "مینی اپ", "مینی‌اپ", "اپلیکیشن", "وب‌اپ", "وب اپ", "اپ", "نرم‌افزار", "برنامه"
    ],
    emoji: "📱",
    replies: [
      "مینی‌اپ رو زدی هنوز؟ مگه من باباتم که یادت بندازم؟ خودت برو از پست ۳۶ کانال بازش کن!",
      "اون مینی‌اپ آنجا نشسته تا ببیند چطور با ۵ تست پایین ۲۰ درصد می‌زنی! برو نشونش بده!"
    ]
  },
  {
    triggers: [
      "آزمون", "امتحان", "آزمایشی", "کارنامه", "تراز", "درصد"
    ],
    emoji: "📝",
    replies: [
      "ترازت رو دیدم، رفتم خوابیدم! تو هم برو بخواب، کاری به کارت ندارم دیگه.",
      "تو آزمون آزمایشی شرکت کردی یا رفتی روی پاسخ‌برگ نقاشی کشیدی؟ کارنامه‌ت دیدن نداره!"
    ]
  },
  {
    triggers: [
      "استرس", "میترسم", "می‌ترسم", "گریه", "افسرده", "افسردگی", "اضطراب", "امید ندارم", "رد میشم", "میفتم", "می‌افتم", "بدبخت شدم", "بدبخت"
    ],
    emoji: "🥺",
    replies: [
      "استرس داری؟ استرس مال کسیه که نخونده! پاشو پلنر ۲۴ ساعته رو بردار، قدم به قدم بخون تا ترست بریزه.",
      "گریه کن عزیزم، اشک‌هات سدیم کلرید دارن غلظتشون رو حساب کن بعد برو سر درست!",
      "اضطراب نگیر، کنکور فقط یه آزمونه، تهش اینه که رتبه خوبی نمیاری و میری سربازی! ترس نداره که!"
    ]
  },
  {
    triggers: [
      "اینستا", "اینستاگرام", "یوتیوب", "تیک تاک", "گیم", "بازی", "فیلم", "سریال", "نتفلیکس", "ولگردی", "چت", "رل", "رل زدن"
    ],
    emoji: "📱",
    replies: [
      "تو اینستا ول می‌چرخی بعد میگی چرا درصدم صفره؟ گوشی رو بذار تو کمد کلیدشم بنداز چاه فاضلاب!",
      "بازی و گیم رتبه دانشگاه تهران نمیشه داداش من! گوشی رو سایلنت کن بتمرگ پای کتاب."
    ]
  }
];

// Random opener/closer for infinite roast variations
const OPENERS = [
  "",
  "خفه شو بابا! ",
  "ببین چی میگم بهت: ",
  "آخه الاغ، ",
  "روت میشه اینو میگی؟ ",
  "گوش کن نکبت: ",
  "زر نزن الدنگ! ",
  "خاک بر سرت، ",
  "حالمو بهم زدی: ",
  "بشین سر جات: ",
  "صداتو ببر: ",
  "خجالت بکش: "
];

const CLOSERS = [
  "",
  "\nحالا هم بتمرگ سر درست.",
  "\nدیگه هم نبینم از این زرا بزنی!",
  "\nبرو تا با اسید سولفوریک نیفتادم به جونت!",
  "\nخاک بر سر بی‌عرضه‌ت!",
  "\nتکون بخور مفت‌خور!",
  "\nدفعه آخرت باشه این چرت و پرتا رو میگی!",
  "\nبرو تا لوله آزمایش رو نکردم تو حلقت!",
  "\nبرو کارنامه سفیدتو قاب کن بزن توالت!",
  "\nپاشو مسخره‌بازی رو جمع کن!",
  "\nبرو تا ندادمت دست سنجش اعدامت کنن!"
];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

let TOKEN;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "text/plain; charset=utf-8",
};
const res = (body, status = 200, headers = {}) =>
  new Response(body, {status, headers: {...CORS, ...headers}});
const jsonRes = (obj, status = 200) =>
  res(JSON.stringify(obj), status, {"Content-Type": "application/json; charset=utf-8"});
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// who gets told about a new booking request: Elahe in PM + the working group
const BOOK_NOTIFY = [6712714529, GROUP_ID];

async function handleBook(request, env) {
  let d;
  try {
    d = await request.json();
  } catch (e) {
    return jsonRes({ok: false, error: "bad_json"}, 400);
  }
  const clean = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, n);
  const name = clean(d.name, 40), grade = clean(d.grade, 20), contact = clean(d.contact, 40);
  const topic = clean(d.topic, 200), prefer = clean(d.prefer, 100);
  if (name.length < 3 || !grade || contact.length < 3 || topic.length < 3 || prefer.length < 3) {
    return jsonRes({ok: false, error: "incomplete"}, 400);
  }
  if (!/^[@+\-()\d\sA-Za-z_.آ-ی\u200c]{3,40}$/.test(contact)) {
    return jsonRes({ok: false, error: "bad_contact"}, 400);
  }

  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const id = [...bytes].map(b => b.toString(36).padStart(2, "0")).join("").slice(0, 8);
  const rec = {id, name, grade, contact, topic, prefer, status: "pending", created_at: new Date().toISOString()};
  if (env.BOOKINGS) await env.BOOKINGS.put(`booking:${id}`, JSON.stringify(rec));

  const text = `🗓 <b>درخواست وقت شخصی جدید</b>\n───────────────\n▫️ <b>کد پیگیری:</b> <code>${id}</code>\n▫️ <b>نام:</b> ${esc(name)}\n▫️ <b>پایه:</b> ${esc(grade)}\n▫️ <b>تماس:</b> ${esc(contact)}\n▫️ <b>موضوع:</b> ${esc(topic)}\n▫️ <b>زمان پیشنهادی:</b> ${esc(prefer)}\n───────────────\nتأیید زمان: <code>/settime ${id} ۱۴۰۵/۰۷/۰۵ - ۱۸:۰۰</code>`;
  for (const chat of BOOK_NOTIFY) {
    await tg("sendMessage", {chat_id: chat, parse_mode: "HTML", text: text});
  }
  return jsonRes({ok: true, id});
}

async function handleMyBooking(env, url) {
  const id = String(url.searchParams.get("id") || "").trim().slice(0, 12);
  if (!/^[a-z0-9]{4,12}$/.test(id)) return jsonRes({ok: false, error: "bad_id"}, 400);
  if (!env.BOOKINGS) return jsonRes({ok: false, error: "no_store"}, 503);
  const raw = await env.BOOKINGS.get(`booking:${id}`);
  if (!raw) return jsonRes({ok: false, error: "not_found"}, 404);
  const r = JSON.parse(raw);
  return jsonRes({ok: true, id: r.id, name: r.name, topic: r.topic, prefer: r.prefer, time: r.time || null, status: r.status});
}

export default {
  async fetch(request, env) {
    TOKEN = env.TELEGRAM_BOT_TOKEN;

    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (request.method === "OPTIONS") return res("", 204);
    // public booking endpoints (no Telegram secret: they are called by the web page)
    if (url.pathname === "/book" && request.method === "POST") return handleBook(request, env);
    if (url.pathname === "/mybooking" && request.method === "GET") return handleMyBooking(env, url);

    // admin routes (guard: key must match the ADMIN_KEY binding)
    if (request.method === "GET" && env.ADMIN_KEY && key === env.ADMIN_KEY) {
      if (url.pathname === "/setwebhook") {
        const target = url.origin + "/";
        const r = await tg("setWebhook", {
          url: target,
          allowed_updates: ["message", "callback_query", "my_chat_member"],
          secret_token: env.WEBHOOK_SECRET || undefined,
          drop_pending_updates: false,
        });
        return res(JSON.stringify({setWebhook: r, url: target}), 200);
      }
      if (url.pathname === "/status") {
        // Self-healing: the local polling daemon calls deleteWebhook on start, which
        // silently kills every button in the group. Re-assert our own URL whenever
        // /status is read so the bot can never stay deaf again.
        const self = new URL(request.url).origin + "/";
        const before = await tg("getWebhookInfo", {});
        let healed = false;
        if (before.ok && before.result.url !== self) {
          await tg("setWebhook", {url: self, allowed_updates: ["message", "callback_query", "my_chat_member"],
                                 secret_token: env.WEBHOOK_SECRET || undefined});
          healed = true;
        }
        const after = await tg("getWebhookInfo", {});
        return res(JSON.stringify({healed, webhook: after}), 200);
      }
      // Channel audit source: Cloudflare reaches t.me even when the local network
      // cannot, so the owner never needs a VPN to inspect the channel.
      if (url.pathname === "/chan") {
        const r = await fetch("https://t.me/s/" + (url.searchParams.get("ch") || "shimi_mohamaddost"),
                              {headers: {"User-Agent": "Mozilla/5.0"}});
        const html = await r.text();
        const posts = [];
        const chunks = html.split(/data-post="/).slice(1);
        for (const raw of chunks) {
          const idm = raw.match(/^[^"]*?\/(\d+)"/);
          if (!idm) continue;
          const chunk = raw;
          const textm = chunk.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
          const strip = (s) => s.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "")
                               .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                               .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
          const buttons = [];
          const reA = /<a class="tgme_widget_message_inline_button[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
          const reS = /<span class="tgme_widget_message_inline_button[^"]*"[^>]*>([\s\S]*?)<\/span>/g;
          let m;
          while ((m = reA.exec(chunk))) buttons.push({kind: "url", text: strip(m[2]).trim(), href: m[1]});
          while ((m = reS.exec(chunk))) buttons.push({kind: "callback", text: strip(m[1]).trim()});
          posts.push({
            id: parseInt(idm[1], 10),
            text: textm ? strip(textm[1]).trim() : "",
            has_media: /tgme_widget_message_photo_wrap|tgme_widget_message_document/.test(chunk),
            buttons,
          });
        }
        return res(JSON.stringify({fetched: r.status, html_len: html.length,
                                   widgets: (html.match(/tgme_widget_message/g) || []).length,
                                   count: posts.length, posts}), 200);
      }

      // Send asset previews straight to the work group from the cloud, so the owner
      // never has to switch a VPN on: /preview?only=golden12_soap
      if (url.pathname === "/preview") {
        const only = url.searchParams.get("only") || "";
        const clean = (url.searchParams.get("clean") || "").split(",").map((s) => parseInt(s, 10)).filter(Boolean);
        const removed = [];
        for (const mid of clean) {
          const d = await tg("deleteMessage", {chat_id: GROUP_ID, message_id: mid});
          removed.push({message_id: mid, ok: !!(d && d.ok)});
        }
        const keys = only ? [only] : Object.keys(ASSETS).filter((k) => k.startsWith("golden12_"));
        const sent = [];
        for (const k of keys) {
          if (!ASSETS[k]) { sent.push({key: k, error: "unknown key"}); continue; }
          const cap = PUBLISH_CAPTIONS[k] || ASSETS[k].caption;
          const r = await sendAsset(GROUP_ID, k, cap);
          if (!r || r.ok === false) { sent.push({key: k, error: (r && r.description) || "send failed"}); continue; }
          const mid = r.result && r.result.message_id;
          const rev = await tg("sendMessage", {
            chat_id: GROUP_ID, parse_mode: "HTML", reply_markup: approveRejectKeyboard(k),
            text: `📋 <b>بررسی و تایید انتشار برگه طلایی:</b>\n▫️ ${cap.replace(/<[^>]+>/g, "").slice(0, 70)}`,
          });
          sent.push({key: k, message_id: mid, review_id: rev.result && rev.result.message_id,
                     caption_len: cap.length, public_caption: !!PUBLISH_CAPTIONS[k]});
        }
        return res(JSON.stringify({ok: true, removed, sent}), 200);
      }
    }

    if (request.method === "GET") {
      return res("Telegram webhook endpoint is live. Use POST.");
    }
    if (request.method !== "POST") {
      return res("Method Not Allowed", 405);
    }
    // trust boundary: only accept updates carrying Telegram's secret header
    if (env.WEBHOOK_SECRET &&
        request.headers.get("x-telegram-bot-api-secret-token") !== env.WEBHOOK_SECRET) {
      return res("forbidden", 403);
    }

    const body = await request.text();
    let update;
    try {
      update = JSON.parse(body);
    } catch (e) {
      return res("bad json");
    }

  try {
    // callback query (approve / reject buttons)
    if (update.callback_query) {
      const cb = update.callback_query;
      const data = cb.data || "";
      const fromId = cb.from.id;
      const chatId = cb.message?.chat?.id;

      await tg("answerCallbackQuery", {callback_query_id: cb.id});

      // public file requests (📄/📅/🖼 panel buttons): anyone may tap these, so they
      // are handled BEFORE the admin gate.
      if (data.startsWith("file_")) {
        const key = data.slice(5);
        if (ASSETS[key]) {
          await sendAsset(chatId, key);
        } else {
          await tg("sendMessage", {chat_id: chatId, text: "⚠️ این فایل در دسترس نیست."});
        }
        return res("ok", 200);
      }

      if (!ADMIN_IDS.includes(fromId)) {
        await tg("sendMessage", {chat_id: chatId, text: "⛔️ فقط ادمین‌های مجاز اجازه استفاده از این دکمه را دارند."});
        return res("ok", 200);
      }

      if (data.startsWith("pub_")) {
        const key = data.slice(4);
        if (isAssetKey(key)) {
          // Preview the exact post in the GROUP first — channel publish requires an admin's
          // explicit ✅ on the PREVIEW message (two-step, never direct publish)
          await sendAsset(chatId, key, PUBLISH_CAPTIONS[key] || ASSETS[key].caption);
          await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[
                {text: "✅ تایید نهایی و انتشار در کانال", callback_data: `pub2_${key}`},
                {text: "❌ انصراف", callback_data: "noop"}
              ]]
            },
            text: `📋 <b>پیش‌نمایش پست بالا</b>\n▫️ ${(PUBLISH_CAPTIONS[key] || ASSETS[key].caption).replace(/<[^>]+>/g, "").slice(0, 70)}\n⚠️ با تایید نهایی، پست در کانال منتشر می‌شود.`});
        }
      } else if (data.startsWith("pub2_")) {
        const key = data.slice(5);
        if (isAssetKey(key)) {
          const r = await publishToChannel(key);
          if (r.ok) {
            await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
              text: `✅ <b>در کانال منتشر شد!</b>\n▫️ شناسه پیام: <code>#${r.result.message_id}</code>\n⚠️ قانون: پست بدون تایید گروه هرگز منتشر نمی‌شود.`});
          } else {
            await tg("sendMessage", {chat_id: chatId, text: `❌ خطا در انتشار: ${r.description || "unknown"}`});
          }
        }
      } else if (data === "noop") {
        await tg("sendMessage", {chat_id: chatId, text: "↩️ انصراف ثبت شد. فایل منتشر نشد."});
      } else if (data.startsWith("rej_")) {
        const key = data.slice(4);
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
          text: `✍️ لطفاً علت رد یا اصلاحات مورد نظر برای «<b>${ASSETS[key]?.caption.slice(0, 50)}</b>» را ارسال کنید:`});
      }
      return res("ok", 200);
    }

    // incoming message (commands / keyboard buttons)
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const fromId = msg.from?.id;
      const text = (msg.text || "").trim();

      // Fun roast & sarcastic reaction engine
      const lowText = text.toLowerCase();
      const isLongSentence = text.split(/\s+/).length >= 4; // 4+ words = full sentence, not just a keyword
      let roasted = false;
      for (const r of ROASTS) {
        if (r.triggers.some(tr => lowText.includes(tr))) {
          try {
            await tg("setMessageReaction", {
              chat_id: chatId,
              message_id: msg.message_id,
              reaction: [{type: "emoji", emoji: r.emoji}]
            });
          } catch (e) {}

          const rep = pick(r.replies);
          const finalText = isLongSentence ? (pick(OPENERS) + rep + pick(CLOSERS)) : rep;

          await tg("sendMessage", {
            chat_id: chatId,
            text: finalText,
            reply_to_message_id: msg.message_id
          });
          roasted = true;
          break;
        }
      }
      if (roasted) return res("ok", 200);

      // only react to admins for commands
      if (!ADMIN_IDS.includes(fromId)) return res("ok", 200);

      if (text.startsWith("/start") || text.startsWith("/panel") || text.startsWith("/menu") || text === "منو" || text === "پنل") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "👋 <b>پنل مدیریت ابری شیمی کنکور فعال شد.</b>\n───────────────\nربات ۲۴ ساعته روی سرور Cloudflare اجرا می‌شود — سیستم شما خاموش باشد هم فعال است."});
      } else if (text === "📊 آمار و وضعیت کانال" || text === "/stats") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "📊 <b>گزارش زنده وضعیت کانال (ابری)</b>\n───────────────\n📢 <b>کانال:</b> @shimi_mohamaddost\n📌 <b>پست پین‌شده:</b> پیام ۵ (هاب ناوبری)\n🚀 <b>مینی‌اپ:</b> فعال با ۱۵ تست و پلنر تعاملی\n⚙️ <b>ربات ابری:</b> ۲۴/۷ فعال روی Cloudflare ✅\n🔔 <b>وب‌هوک تلگرام:</b> متصل"});
      } else if (text === "📄 دریافت فایل‌ها" || text === "/files") {
        const kb = {inline_keyboard: [
          [{text: "📄 برگه طلایی واکنش‌ها (PDF)", callback_data: "file_golden_reactions"}],
          [{text: "📄 برگه طلایی اسید و باز (PDF)", callback_data: "file_golden_acids"}],
          [{text: "📄 برگه طلایی جدول تناوبی (PDF)", callback_data: "file_golden_periodic"}],
          [{text: "📅 پلنر هفتگی (PDF)", callback_data: "file_planner_weekly"}],
          [{text: "📅 پلنر شب امتحان (PDF)", callback_data: "file_planner_exam"}],
          [{text: "📅 پلنر ماهانه (PDF)", callback_data: "file_planner_monthly"}],
          [{text: "🖼 پوستر ایزوتوپ‌ها", callback_data: "file_poster_isotopes"}],
          [{text: "🖼 پوستر غلظت مولار", callback_data: "file_poster_molar"}],
          [{text: "🖼 پوستر پیل دانیل", callback_data: "file_poster_daniel"}]
        ]};
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: kb,
          text: "📁 کدام فایل را دریافت می‌کنید؟"});
      } else if (text === "🚀 بررسی و انتشار پست جدید" || text === "/post" || text.startsWith("/post ")) {
        // send all assets with approve buttons — or one: /post golden12_soap
        const only = text.startsWith("/post ") ? text.slice(6).trim() : "";
        if (only && !ASSETS[only]) {
          await tg("sendMessage", {chat_id: chatId, text: `❌ کلید نامعتبر: <code>${esc(only)}</code>`});
        } else {
          for (const key of (only ? [only] : Object.keys(ASSETS))) {
            await sendAsset(chatId, key);
            await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: approveRejectKeyboard(key),
              text: `📋 <b>بررسی و تایید انتشار:</b>\n▫️ ${ASSETS[key].caption.slice(0, 80)}`});
          }
        }
      } else if (text === "🔄 همگام‌سازی هاب پین‌شده" || text === "/sync") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
          text: "⚠️ همگام‌سازی هاب پین‌شده فعلاً فقط در ربات لوکال فعال است (نسخه ابری به‌زودی)."});
      } else if (text === "📅 مدیریت پلنر و آزمون" || text === "/planner") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
          reply_markup: {inline_keyboard: [[{text: "🚀 باز کردن مینی‌اپ ↗", url: "https://mrrooobooot.github.io/shimi-app/"}]]},
          text: "📅 <b>مدیریت پلنر مطالعاتی و مینی‌اپ</b>\n───────────────\n▫️ <b>بازه فعال:</b> هفته ۲۸ شهریور تا ۳ مهر\n▫️ <b>نسخه تعاملی وب:</b> <code>https://mrrooobooot.github.io/shimi-app/planner.html</code>\n▫️ <b>آزمون مینی‌اپ:</b> ۱۵ تست تفکیک‌شده در ۳ پایه"});
      } else if (text === "⚙️ راهنما و ابزارها" || text === "/help") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "⚙️ <b>راهنمای پنل ابری ربات دستیار شیمی کنکور</b>\n───────────────\n▫️ <b>آمار:</b> وضعیت لحظه‌ای کانال\n▫️ <b>انتشار:</b> بررسی و ارسال پست‌های آماده به کانال\n▫️ <b>فایل‌ها:</b> دریافت مستقیم PDF و پوسترها\n▫️ <b>پلنر:</b> دسترسی سریع به ابزارهای هوشمند\n\n🆔 @nemathermesbot\n☁️ <b>اجرای ابری ۲۴/۷ روی Cloudflare</b>"});
      } else if (text.startsWith("/settime")) {
        const parts = text.split(/\s+/);
        const ref = parts[1], when = parts.slice(2).join(" ").trim();
        let body;
        if (!ref || !when) {
          body = "🧭 <b>روش ثبت زمان جلسه</b>\n<code>/settime کد زمان</code>\nمثال: <code>/settime " + "ab12cd34 ۱۴۰۵/۰۷/۰۵ - ۱۸:۰۰</code>";
        } else {
          const raw = env.BOOKINGS ? await env.BOOKINGS.get(`booking:${ref}`) : null;
          if (!raw) {
            body = `❌ درخواستی با کد <code>${esc(ref)}</code> پیدا نشد.`;
          } else {
            const r = JSON.parse(raw);
            r.time = when;
            r.status = "confirmed";
            r.confirmed_at = new Date().toISOString();
            await env.BOOKINGS.put(`booking:${ref}`, JSON.stringify(r));
            body = `✅ زمان ثبت شد\n▫️ کد: <code>${esc(ref)}</code>\n▫️ دانش‌آموز: ${esc(r.name)}\n▫️ زمان: ${esc(when)}\n───────────────\nصفحه وضعیت دانش‌آموز: <code>https://mrrooobooot.github.io/shimi-app/book.html?ref=${esc(ref)}</code>`;
          }
        }
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", text: body});
      } else if (text === "/bookings" || text === "🗓 وقت‌های شخصی") {
        if (!env.BOOKINGS) {
          await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", text: "⚠️ فضای ذخیره‌سازی BOOKINGS متصل نیست."});
        } else {
          const list = await env.BOOKINGS.list({prefix: "booking:", limit: 50});
          const rows = [];
          for (const k of list.keys) {
            const r = JSON.parse(await env.BOOKINGS.get(k.name));
            if (r.status !== "confirmed") {
              rows.push(`▫️ <code>${esc(r.id)}</code> — ${esc(r.name)} (${esc(r.grade)}) — ${esc(r.prefer)} — ${esc(r.contact)}`);
            }
          }
          await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
            text: rows.length ? `🗓 <b>درخواست‌های در انتظار زمان</b>\n───────────────\n${rows.slice(0, 15).join("\n")}\n───────────────\nثبت زمان: <code>/settime کد زمان</code>`
                             : "✅ هیچ درخواست در انتظاری نیست."});
        }
      } else if (text.startsWith("/setwebhook")) {
        const selfUrl = url.origin + "/";
        const r = await tg("setWebhook", {url: selfUrl, allowed_updates: ["message", "callback_query", "my_chat_member"], secret_token: env.WEBHOOK_SECRET || undefined});
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
          text: `🔔 <b>وب‌هوک تلگرام تنظیم شد:</b>\n<code>${selfUrl}</code>\n▫️ نتیجه: <code>${JSON.stringify(r)}</code>`});
      }
    }

    // my_chat_member: bot added to group
    if (update.my_chat_member) {
      const mcm = update.my_chat_member;
      const chat = mcm.chat;
      const newStatus = mcm.new_chat_member?.status;
      if (newStatus === "member" || newStatus === "administrator") {
        await tg("sendMessage", {chat_id: chat.id, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "👋 <b>ربات دستیار ابری شیمی کنکور در این گروه فعال شد!</b>\n───────────────\nادمین گرامی، کیبورد مدیریت در پایین صفحه در دسترس شماست.\n☁️ این ربات روی سرور Cloudflare اجرا می‌شود و ۲۴ ساعته فعال است."});
      }
    }

    return res("ok", 200);
  } catch (err) {
    console.error("Webhook error:", err);
    return res("error", 200);
  }
  },
};
