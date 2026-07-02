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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const { slug } = await params;

  try {
// ...
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = adminAuthMiddleware(req);
  if (authError) return authError;

  await dbConnect();
  const { slug } = await params;

  try {
    const body = await req.json();
    const blog = await Blog.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error(`Error updating blog with slug ${slug}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = adminAuthMiddleware(req);
  if (authError) return authError;

  await dbConnect();
  const { slug } = await params;

  try {
    const deletedBlog = await Blog.deleteOne({ slug });

    if (deletedBlog.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog deleted' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting blog with slug ${slug}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
