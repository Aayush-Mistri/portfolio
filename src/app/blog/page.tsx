import React from 'react';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import BlogCard from '@/components/BlogCard';
import styles from './blog.module.css';
import Link from 'next/link';

async function getBlogs() {
  await dbConnect();
  try {
    const blogs = await Blog.find({}, 'title slug coverImageUrl excerpt createdAt').sort({ createdAt: -1 });
    return blogs;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Latest <span className={styles.highlight}>Thoughts</span></h1>
          <p className={styles.subtitle}>A collection of my musings on backend, AI, and everything in between.</p>
          <Link href="/" className="btn-brutalist">
            ← Back to Home
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className={styles.empty}>
            <p>No blog posts found. Check back later!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog._id.toString()}
                title={blog.title}
                slug={blog.slug}
                excerpt={blog.excerpt}
                coverImageUrl={blog.coverImageUrl}
                date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                index={index}
                accentColor={['yellow', 'green', 'purple', 'cyan', 'pink'][index % 5] as any}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
