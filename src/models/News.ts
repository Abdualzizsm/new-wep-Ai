import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة الأخبار
export interface INews extends Document {
  title: string;
  content: string;
  source: string;
  category: string;
  imagePrompt?: string;
  imageUrl?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// تعريف مخطط الأخبار
const NewsSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: true,
      unique: true,
      trim: true
    },
    content: { 
      type: String, 
      required: true 
    },
    source: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    imagePrompt: { 
      type: String 
    },
    imageUrl: { 
      type: String 
    },
    publishedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true
  }
);

// إنشاء وتصدير النموذج
const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;