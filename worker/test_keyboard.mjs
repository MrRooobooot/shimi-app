// بررسی خودکار منطق ادغام دکمه‌های هاب پین‌شده — بدون نیاز به شبکه.
// اجرا: node worker/test_keyboard.mjs
import assert from "node:assert";
import {mergeKeyboard} from "./index.js";

const hub = [
  [{text: "mini", url: "https://a"}],
  [{text: "d10", url: "https://b"}, {text: "d11", url: "https://c"}]
];

// ۱) دکمه تکراری موجود حذف می‌شود (URL یکسان با هاب)
let merged = mergeKeyboard([[{text: "old-mini", url: "https://a"}]], hub);
assert.equal(merged.length, 2, "ردیف تکراری باید حذف شود");
assert.equal(merged[0][0].text, "mini", "نسخه هاب برنده است");

// ۲) دکمه‌های بیرونی نگه داشته می‌شوند
merged = mergeKeyboard([[{text: "external", url: "https://z"}]], hub);
assert.equal(merged.length, 3);
assert.equal(merged[2][0].url, "https://z");

// ۳) ورودی خالی/نامعتبر نمی‌شکند
assert.equal(mergeKeyboard(undefined, hub).length, 2);
assert.equal(mergeKeyboard([[]], hub).length, 2);

// ۴) ردیف‌هایی که همه دکمه‌هایشان در هاب است حذف می‌شوند
merged = mergeKeyboard([[{text: "x", url: "https://b"}, {text: "y", url: "https://c"}]], hub);
assert.equal(merged.length, 2);

console.log("✓ mergeKeyboard: همه بررسی‌ها پاس شد");
