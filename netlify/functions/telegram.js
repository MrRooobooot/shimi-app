// Telegram webhook handler — cloud 24/7 bot (no local Mac dependency)
// Free tier: 125k requests/month, far beyond our usage.

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_IDS = [5207128978, 6712714529];
const GROUP_ID = -1003989699975;
const CHANNEL_ID = -1003792488519;
const LRM = "\u200E";

const ASSETS = {
  golden_reactions: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/golden_reactions_10_11_12.pdf",
    type: "document", name: "golden_reactions_10_11_12.pdf",
    caption: "📄 برگه طلایی جمع‌بندی تمام واکنش‌های کتاب درسی (۱۰، ۱۱ و ۱۲)"
  },
  golden_acids: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/golden_sheet_acids_bases.pdf",
    type: "document", name: "golden_sheet_acids_bases.pdf",
    caption: "📄 برگه طلایی اسیدها، بازها و روابط محاسباتی pH (شیمی دوازدهم)"
  },
  golden_periodic: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/golden_sheet_periodic_grade10.pdf",
    type: "document", name: "golden_sheet_periodic_grade10.pdf",
    caption: "📄 برگه طلایی جدول تناوبی و پیکربندی الکترونی (شیمی دهم)"
  },
  planner_weekly: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/planner_weekly_chemistry.pdf",
    type: "document", name: "planner_weekly_chemistry.pdf",
    caption: "📅 پلنر مطالعاتی هفتگی شیمی کنکور (۲۸ شهریور تا ۳ مهر)"
  },
  planner_exam: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/planner_exam_24h.pdf",
    type: "document", name: "planner_exam_24h.pdf",
    caption: "📅 پلنر ویژه شب امتحان — چرخه ۲۴ ساعته مطالعه و مرور"
  },
  planner_monthly: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/planner_monthly_cycle.pdf",
    type: "document", name: "planner_monthly_cycle.pdf",
    caption: "📅 پلنر ماهانه ۴ هفته‌ای — مرور جامع شیمی ۱۰، ۱۱ و ۱۲"
  },
  poster_isotopes: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/poster_isotopes_grade10.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی شیمی دهم — متد ترازوی گشتاور ایزوتوپ‌ها"
  },
  poster_molar: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/poster_molar_concentration.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی مقایسه سه واحد غلظتی (مولار، مولال، ppm)"
  },
  poster_daniel: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/poster_daniel_cell.png",
    type: "photo",
    caption: "🖼 پوستر آموزشی پیل دانیل — آناتومی آند و کاتد"
  },
  shimidle: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/shimidle_preview.png",
    type: "photo",
    caption: "🧩 شیمیدل — بازی حدس عنصر روزانه",
    webapp: true
  },
  banner_promo: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/banner_miniapp_promo.png",
    type: "photo",
    caption: "⚡️ بنر معرفی مینی‌اپ هوشمند شیمی (آزمون + پلنر تعاملی)"
  },
  thankyou_update: {
    url: "https://raw.githubusercontent.com/MrRooobooot/shimi-app/main/assets/banner_thankyou_update.png",
    type: "photo",
    caption: "❤️ پست تشکر و معرفی آپدیت نسخه ۲.۵ مینی‌اپ شیمی",
    webapp: true
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
  thankyou_update: "❤️ <b>به پاس استقبال پرشور شما دانش‌آموزان عزیز...</b>\n───────────────\nدر کمتر از ۴۸ ساعت، استقبال و پیام‌های پرمهرتون از مینی‌اپ شیمی فراتر از انتظارمون بود! برای قدردانی از اعتماد شما، <b>نسخه ۲.۵</b> با ۳ ارتقای اساسی منتشر شد:\n\n🧩 <b>۱. شیمیدل پرو (وردل شیمی):</b>\nپازل علمی حدس عنصر روزانه با بررسی دوره، گروه، عدد اتمی و دسته‌ها + سرنخ‌های بالینی طراح!\n\n📅 <b>۲. پلنر بدون اسکرول دو ستونه:</b>\nچیدمان هوشمند متناسب با دسکتاپ و موبایل + تگ‌های سریع مباحث و دکمه جادویی «کپی از دیروز».\n\n📊 <b>۳. کارنامه تفکیکی آزمون:</b>\nمشاهده درصد دقیق به تفکیک پایه‌های دهم، یازدهم و دوازدهم جهت عیب‌یابی آنی مباحث.\n───────────────\n💡 <i>۱۰۰٪ رایگان، بدون تبلیغات و با پاسخ‌های کاملاً تشریحی</i>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#مینی_اپ #شیمیدل #پلنر_کنکور #متد_کلینیکال"
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

async function sendAsset(chatId, key) {
  const a = ASSETS[key];
  if (!a) return {ok: false};
  const method = a.type === "document" ? "sendDocument" : "sendPhoto";
  const payload = {chat_id: chatId, caption: a.caption};
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

export async function handler(event) {
  if (event.httpMethod === "GET") {
    return {statusCode: 200, body: "Telegram webhook endpoint is live. Use POST."};
  }
  if (event.httpMethod !== "POST") {
    return {statusCode: 405, body: "Method Not Allowed"};
  }

  let update;
  try {
    update = JSON.parse(event.body);
  } catch (e) {
    return {statusCode: 200, body: "bad json"};
  }

  try {
    // callback query (approve / reject buttons)
    if (update.callback_query) {
      const cb = update.callback_query;
      const data = cb.data || "";
      const fromId = cb.from.id;
      const chatId = cb.message?.chat?.id;

      await tg("answerCallbackQuery", {callback_query_id: cb.id});

      if (!ADMIN_IDS.includes(fromId)) {
        await tg("sendMessage", {chat_id: chatId, text: "⛔️ فقط ادمین‌های مجاز اجازه استفاده از این دکمه را دارند."});
        return {statusCode: 200, body: "ok"};
      }

      if (data.startsWith("pub_")) {
        const key = data.slice(4);
        if (isAssetKey(key)) {
          // Preview the exact post in the GROUP first — channel publish requires an admin's
          // explicit ✅ on the PREVIEW message (two-step, never direct publish)
          await sendAsset(chatId, key);
          await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[
                {text: "✅ تایید نهایی و انتشار در کانال", callback_data: `pub2_${key}`},
                {text: "❌ انصراف", callback_data: "noop"}
              ]]
            },
            text: `📋 <b>پیش‌نمایش پست بالا</b>\n▫️ ${ASSETS[key].caption.slice(0, 80)}\n⚠️ با تایید نهایی، پست در کانال منتشر می‌شود.`});
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
      return {statusCode: 200, body: "ok"};
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
      if (roasted) return {statusCode: 200, body: "ok"};

      // only react to admins for commands
      if (!ADMIN_IDS.includes(fromId)) return {statusCode: 200, body: "ok"};

      if (text.startsWith("/start") || text.startsWith("/panel") || text.startsWith("/menu") || text === "منو" || text === "پنل") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "👋 <b>پنل مدیریت ابری شیمی کنکور فعال شد.</b>\n───────────────\nربات ۲۴ ساعته روی سرور Netlify اجرا می‌شود — سیستم شما خاموش باشد هم فعال است."});
      } else if (text === "📊 آمار و وضعیت کانال" || text === "/stats") {
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "📊 <b>گزارش زنده وضعیت کانال (ابری)</b>\n───────────────\n📢 <b>کانال:</b> @shimi_mohamaddost\n📌 <b>پست پین‌شده:</b> پیام ۵ (هاب ناوبری)\n🚀 <b>مینی‌اپ:</b> فعال با ۱۵ تست و پلنر تعاملی\n⚙️ <b>ربات ابری:</b> ۲۴/۷ فعال روی Netlify ✅\n🔔 <b>وب‌هوک تلگرام:</b> متصل"});
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
      } else if (text === "🚀 بررسی و انتشار پست جدید" || text === "/post") {
        // send all assets with approve buttons
        for (const key of Object.keys(ASSETS)) {
          await sendAsset(chatId, key);
          await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML", reply_markup: approveRejectKeyboard(key),
            text: `📋 <b>بررسی و تایید انتشار:</b>\n▫️ ${ASSETS[key].caption.slice(0, 80)}`});
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
          text: "⚙️ <b>راهنمای پنل ابری ربات دستیار شیمی کنکور</b>\n───────────────\n▫️ <b>آمار:</b> وضعیت لحظه‌ای کانال\n▫️ <b>انتشار:</b> بررسی و ارسال پست‌های آماده به کانال\n▫️ <b>فایل‌ها:</b> دریافت مستقیم PDF و پوسترها\n▫️ <b>پلنر:</b> دسترسی سریع به ابزارهای هوشمند\n\n🆔 @nemathermesbot\n☁️ <b>اجرای ابری ۲۴/۷ روی Netlify</b>"});
      } else if (text.startsWith("/setwebhook")) {
        const url = `https://shimi-chemistry-quiz.netlify.app/.netlify/functions/telegram`;
        const r = await tg("setWebhook", {url: url, allowed_updates: ["message", "callback_query", "my_chat_member"]});
        await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
          text: `🔔 <b>وب‌هوک تلگرام تنظیم شد:</b>\n<code>${url}</code>\n▫️ نتیجه: <code>${JSON.stringify(r)}</code>`});
      }
    }

    // my_chat_member: bot added to group
    if (update.my_chat_member) {
      const mcm = update.my_chat_member;
      const chat = mcm.chat;
      const newStatus = mcm.new_chat_member?.status;
      if (newStatus === "member" || newStatus === "administrator") {
        await tg("sendMessage", {chat_id: chat.id, parse_mode: "HTML", reply_markup: MAIN_KEYBOARD,
          text: "👋 <b>ربات دستیار ابری شیمی کنکور در این گروه فعال شد!</b>\n───────────────\nادمین گرامی، کیبورد مدیریت در پایین صفحه در دسترس شماست.\n☁️ این ربات روی سرور Netlify اجرا می‌شود و ۲۴ ساعته فعال است."});
      }
    }

    return {statusCode: 200, body: "ok"};
  } catch (err) {
    console.error("Webhook error:", err);
    return {statusCode: 200, body: "error"};
  }
}
