import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import News from '@/models/News';

export async function GET() {
  try {
    await connectToDatabase();
    
    // جلب أحدث 20 خبر مرتبة حسب تاريخ النشر
    const news = await News.find({})
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean();
    
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الأخبار' },
      { status: 500 }
    );
  }
}