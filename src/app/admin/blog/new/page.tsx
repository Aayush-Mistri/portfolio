"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./new-blog.module.css";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    coverImageUrl: "",
    excerpt: "",
    content: "",
    tags: "",
    adminToken: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": formData.adminToken,
        },
        body: JSON.stringify({
          title: formData.title,
          coverImageUrl: formData.coverImageUrl,
          excerpt: formData.excerpt,
          content: formData.content,
          tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/blog/${result.slug}`);
        router.refresh();
      } else {
        setError(result.message || result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 className={styles.title}>Create New Blog Post</h1>
          <Link href="/admin/blog/manage" className="btn-brutalist" style={{ background: "var(--color-cyan)" }}>
            Manage Blogs ⚙️
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Admin Secret Token</label>
            <input
              type="password"
              required
              value={formData.adminToken}
              onChange={(e) => setFormData({ ...formData, adminToken: e.target.value })}
              placeholder="Enter your admin secret"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Post Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="The title of your awesome post"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Cover Image URL</label>
            <input
              type="url"
              required
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Excerpt (max 200 chars)</label>
            <textarea
              required
              maxLength={200}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A short summary for the preview card..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.field}>
            <label>Content (HTML/Markdown supported)</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your heart out... Use <img src='...' /> for images."
              className={styles.textareaLarge}
            />
          </div>

          <div className={styles.field}>
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="tech, webdev, life"
              className={styles.input}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Publishing..." : "Publish Post 🚀"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
