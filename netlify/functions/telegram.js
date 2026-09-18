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
  banner_promo: {
    url: "https://shimi-chemistry-quiz.netlify.app/assets/banner_miniapp_promo.png",
    type: "photo",
    caption: "⚡️ بنر معرفی مینی‌اپ هوشمند شیمی (آزمون + پلنر تعاملی)"
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
  banner_promo: "⚡️ <b>قابلیت جدید: مینی‌اپ هوشمند شیمی — آزمون و پلنر، داخل تلگرام!</b>\n───────────────\nبچه‌ها از امروز بدون نصب هیچ اپلیکیشنی، همه ابزارهای مطالعاتی‌تون داخل خود تلگرام در دسترستونه:\n\n📌 <b>امکانات نسخه تعاملی:</b>\n▫️ آزمون آنلاین استاندارد با تایمر و تحلیل گام‌به‌گام\n▫️ پلنر هفتگی هوشمند با ثبت ساعت و تست\n▫️ ذخیره خودکار روی گوشی\n───────────────\n👇 <b>همین حالا رایگان امتحان کن!</b>\n───────────────\n⚗️ <b>شیمی کنکور | الهه محمددوست</b>\n🩺 <i>دانشجوی پزشکی مشهد • رتبه ۷۸۸</i>\n🆔 " + LRM + "@shimi_mohamaddost\n\n#شیمی_کنکور #مینی_اپ #آزمون_آنلاین"
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
  const method = a.type === "document" ? "sendDocument" : "sendPhoto";
  const payload = {
    chat_id: CHANNEL_ID,
    caption: PUBLISH_CAPTIONS[key] || a.caption,
    parse_mode: "HTML"
  };
  payload[method === "sendDocument" ? "document" : "photo"] = a.url;
  return await tg(method, payload);
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
          const r = await publishToChannel(key);
          if (r.ok) {
            await tg("sendMessage", {chat_id: chatId, parse_mode: "HTML",
              text: `✅ <b>${ASSETS[key].caption.slice(0, 60)}</b> با موفقیت در کانال منتشر شد!\n▫️ شناسه پیام: <code>#${r.result.message_id}</code>`});
          } else {
            await tg("sendMessage", {chat_id: chatId, text: `❌ خطا در انتشار: ${r.description || "unknown"}`});
          }
        }
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

      // only react to admins
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
          reply_markup: {inline_keyboard: [[{text: "🚀 باز کردن مینی‌اپ ↗", url: "https://shimi-chemistry-quiz.netlify.app"}]]},
          text: "📅 <b>مدیریت پلنر مطالعاتی و مینی‌اپ</b>\n───────────────\n▫️ <b>بازه فعال:</b> هفته ۲۸ شهریور تا ۳ مهر\n▫️ <b>نسخه تعاملی وب:</b> شimi-chemistry-quiz.netlify.app/planner.html\n▫️ <b>آزمون مینی‌اپ:</b> ۱۵ تست تفکیک‌شده در ۳ پایه"});
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
