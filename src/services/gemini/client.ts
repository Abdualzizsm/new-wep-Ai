import { GoogleGenerativeAI } from "@google/generative-ai";

// التأكد من وجود مفتاح API
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("مفتاح GOOGLE_GEMINI_API_KEY غير موجود في متغيرات البيئة");
}

// تهيئة عميل Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * جلب أحدث أخبار الذكاء الاصطناعي من Google Gemini API
 * @param count عدد الأخبار المطلوبة
 * @returns مصفوفة من أخبار الذكاء الاصطناعي
 */
export async function fetchLatestAINews(count = 5) {
  try {
    // استخدام نموذج Gemini Pro
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // إنشاء استعلام للحصول على أخبار الذكاء الاصطناعي
    const prompt = `
      قم بتوليد ${count} أخبار حقيقية وحديثة عن الذكاء الاصطناعي.
      يجب أن تكون هذه الأخبار واقعية ومستندة إلى آخر التطورات في مجال الذكاء الاصطناعي.
      
      أريد أن تكون المخرجات بصيغة JSON Array مع الحقول التالية:
      {
        "title": "عنوان الخبر",
        "content": "محتوى الخبر بتفاصيل كافية (100-200 كلمة)",
        "source": "المصدر المحتمل للخبر (مثل: TechCrunch، VentureBeat، إلخ)",
        "category": "تصنيف الخبر (مثل: تقنية، أعمال، تعليم، صحة، إلخ)",
        "imagePrompt": "وصف قصير يمكن استخدامه لإنشاء صورة تمثيلية للخبر"
      }
      
      تأكد من أن المحتوى باللغة العربية وله صلة بأحدث تطورات الذكاء الاصطناعي.
    `;

    // إرسال الطلب إلى Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // معالجة النص للحصول على JSON
    const jsonStr = text.match(/\[[\s\S]*\]/)?.[0] || "[]";
    console.log("تم استلام الرد من Gemini API");
    
    try {
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("خطأ في تحليل رد JSON:", parseError);
      return [];
    }
  } catch (error) {
    console.error("حدث خطأ أثناء الاتصال بـ Gemini API:", error);
    throw error;
  }
}