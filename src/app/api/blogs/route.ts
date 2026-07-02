import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

// Middleware for admin authentication
const adminAuthMiddleware = (req: NextRequest) => {
  const adminToken = req.headers.get('x-admin-token');
  if (adminToken !== process.env.ADMIN_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  return null; // No error, proceed
};

export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find({}, 'title slug coverImageUrl excerpt createdAt').sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = adminAuthMiddleware(req);
  if (authError) return authError;

  await dbConnect();

  try {
    const body = await req.json();
    
    // Generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$ /g, '');
    }

    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    if (error.code === 11000) {
        return NextResponse.json({ success: false, message: 'A blog with this slug already exists' }, { status: 400 });
    }
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
