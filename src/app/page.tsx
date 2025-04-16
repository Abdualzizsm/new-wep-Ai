import { Metadata } from 'next';
import Link from 'next/link';

// تعريف الميتاداتا
export const metadata: Metadata = {
  title: 'أخبار الذكاء الاصطناعي - آخر المستجدات والأخبار',
  description: 'منصة إخبارية تقدم آخر أخبار وتطورات الذكاء الاصطناعي باللغة العربية',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 rtl">
      <div className="container mx-auto px-4 py-8">
        <header className="py-6 mb-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-center text-gray-800">أخبار الذكاء الاصطناعي</h1>
          <p className="text-center text-gray-600 mt-2">أحدث الأخبار والتطورات في عالم الذكاء الاصطناعي</p>
        </header>

        {/* قسم الأخبار المميزة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">أخبار مميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* سيتم استبدال هذا بمكونات ديناميكية تعرض البيانات من قاعدة البيانات */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full mb-2">تقنية</span>
                  <h3 className="text-xl font-bold mb-2">عنوان الخبر التجريبي {i}</h3>
                  <p className="text-gray-600 mb-4">هذا نص تجريبي يمثل محتوى الخبر. سيتم استبداله بالمحتوى الفعلي من قاعدة البيانات...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">المصدر: TechNews</span>
                    <Link href={`/news/${i}`} className="text-blue-600 hover:underline">اقرأ المزيد</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* قسم أحدث الأخبار */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">أحدث الأخبار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* سيتم استبدال هذا بمكونات ديناميكية تعرض البيانات من قاعدة البيانات */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow duration-300 flex gap-4">
                <div className="bg-gray-300 h-24 w-24 flex-shrink-0"></div>
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full mb-2">أبحاث</span>
                  <h3 className="font-bold mb-1">عنوان الخبر المختصر {i}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">نص مختصر للخبر يظهر هنا ويمكن أن يستمر لسطرين كحد أقصى...</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">12 أبريل 2025</span>
                    <Link href={`/news/${i+10}`} className="text-sm text-blue-600 hover:underline">اقرأ المزيد</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
