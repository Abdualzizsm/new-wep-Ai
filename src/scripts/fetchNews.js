// سكريبت لجلب أخبار الذكاء الاصطناعي تلقائياً باستخدام Google Gemini API
// يمكن تشغيله عبر وظيفة مجدولة على Render
import dotenv from 'dotenv';
import { fetchLatestAINews } from '../services/gemini/client';
import mongoose from 'mongoose';

// تهيئة متغيرات البيئة
dotenv.config();

// نموذج الأخبار (تحويل من TypeScript إلى JavaScript)
const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String, required: true },
    imagePrompt: { type: String },
    imageUrl: { type: String },
    publishedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

// اتصال بقاعدة البيانات
async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('الرجاء تحديد متغير البيئة MONGODB_URI');
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ تم الاتصال بقاعدة البيانات بنجاح');
  } catch (error) {
    console.error('× خطأ في الاتصال بقاعدة البيانات:', error);
    throw error;
  }
}

// تنفيذ عملية جلب وحفظ الأخبار
async function main() {
  try {
    console.log('بدء عملية جلب أخبار الذكاء الاصطناعي...');
    
    // الاتصال بقاعدة البيانات
    await connectToDatabase();
    
    // التحقق من وجود نموذج الأخبار
    const News = mongoose.models.News || mongoose.model('News', NewsSchema);
    
    // جلب الأخبار باستخدام Gemini API
    const newsItems = await fetchLatestAINews(10);
    console.log(`تم جلب ${newsItems.length} من الأخبار`);
    
    // إضافة طابع زمني لكل خبر
    const newsWithTimestamp = newsItems.map(item => ({
      ...item,
      publishedAt: new Date()
    }));
    
    // البحث عن العناوين المكررة وتحديثها بدلاً من إضافتها
    let addedCount = 0;
    let updatedCount = 0;
    
    for (const newsItem of newsWithTimestamp) {
      try {
        // البحث عن خبر موجود بنفس العنوان
        const existingNews = await News.findOne({ title: newsItem.title });
        
        if (existingNews) {
          // تحديث الخبر الموجود
          await News.updateOne(
            { _id: existingNews._id },
            { 
              $set: {
                content: newsItem.content,
                source: newsItem.source,
                category: newsItem.category,
                imagePrompt: newsItem.imagePrompt
              }
            }
          );
          updatedCount++;
        } else {
          // إضافة خبر جديد
          await News.create(newsItem);
          addedCount++;
        }
      } catch (itemError) {
        console.error(`خطأ في معالجة خبر: ${newsItem.title}`, itemError);
      }
    }
    
    console.log(`تم إضافة ${addedCount} خبر جديد وتحديث ${updatedCount} خبر موجود`);
  } catch (error) {
    console.error('حدث خطأ أثناء جلب الأخبار:', error);
  } finally {
    // قطع الاتصال بقاعدة البيانات
    await mongoose.disconnect();
    console.log('تم قطع الاتصال بقاعدة البيانات');
    process.exit();
  }
}

// تنفيذ البرنامج
main();