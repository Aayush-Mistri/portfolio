import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  coverImageUrl: string;
  excerpt: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    coverImageUrl: {
      type: String,
      required: [true, 'Cover image URL is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Removed pre-save hook to move slug generation to the API route for better reliability.

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);