import React from 'react';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './blog-detail.module.css';

async function getBlog(slug: string) {
  await dbConnect();
  try {
    const blog = await Blog.findOne({ slug });
    return blog;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <div className={styles.banner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.coverImageUrl} alt={blog.title} className={styles.bannerImage} />
        </div>

        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <time dateTime={blog.createdAt.toISOString()}>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {blog.tags && blog.tags.length > 0 && (
                <div className={styles.tags}>
                  {blog.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div 
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />

          <footer className={styles.footer}>
            <Link href="/blog" className="btn-brutalist">
              ← Back to all posts
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
