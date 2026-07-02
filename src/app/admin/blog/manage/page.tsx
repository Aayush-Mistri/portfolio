"use client";

import React, { useState, useEffect } from "react";
import styles from "./manage.module.css";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    const secret = prompt("Please enter the admin secret to confirm deletion:");
    
    if (secret === null) return; // Cancelled
    if (secret === "") {
      alert("Secret is required!");
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": secret,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        alert("Invalid admin secret!");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }

      alert("Blog deleted successfully!");
      // Refresh list
      await fetchBlogs();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  }

  if (loading) return <div className={styles.loadingText}>Loading blogs...</div>;

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className={styles.title}>Manage Blogs</h1>
        <Link href="/admin/blog/new" className="btn-brutalist" style={{ background: "var(--color-cyan)" }}>
          + New Blog
        </Link>
      </div>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {blogs.length === 0 ? (
        <div className={styles.emptyText}>No blogs found.</div>
      ) : (
        <div className={styles.blogList}>
          {blogs.map((blog) => (
            <div key={blog._id} className={styles.blogItem}>
              <div className={styles.blogInfo}>
                <span className={styles.blogTitle}>{blog.title}</span>
                <span className={styles.blogSlug}>{blog.slug}</span>
              </div>
              <button 
                className={styles.deleteBtn} 
                onClick={() => handleDelete(blog.slug)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
