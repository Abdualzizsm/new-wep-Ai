import mongoose from 'mongoose';

// قاعدة البيانات URI من متغيرات البيئة
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// تعريف النوع للكاش
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// تعريف للكائن العالمي
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongoose: MongooseCache;
    }
  }
}

// حل أكثر توافقية مع TypeScript
let cached: MongooseCache;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
cached = global.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✓ تم الاتصال بقاعدة البيانات بنجاح');
        return mongoose;
      })
      .catch((error) => {
        console.error('× خطأ في الاتصال بقاعدة البيانات:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('تم قطع الاتصال بقاعدة البيانات بنجاح');
  }
}