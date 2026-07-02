"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  date: string;
  accentColor?: "yellow" | "green" | "purple" | "cyan" | "pink";
  index?: number;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  date,
  accentColor = "yellow",
  index = 0,
}: BlogCardProps) {
  const getAccentShadow = () => {
    switch (accentColor) {
      case "yellow": return "var(--shadow-flat-yellow)";
      case "green": return "var(--shadow-flat-green)";
      case "purple": return "var(--shadow-flat-purple)";
      case "cyan": return "var(--shadow-flat-cyan)";
      case "pink": return "var(--shadow-flat-pink)";
      default: return "var(--shadow-flat-black)";
    }
  };

  return (
    <motion.div
      className={styles.cardContainer}
      whileHover={{
        scale: 1.02,
        boxShadow: getAccentShadow(),
        transform: "translate(-4px, -4px)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <Link href={`/blog/${slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImageUrl} alt={title} className={styles.image} />
          <div className={styles.imageOverlay} />
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.index}>{index + 1}</span>
          </div>
          
          <p className={styles.excerpt}>{excerpt}</p>
          
          <div className={styles.footer}>
            <span className={styles.date}>{date}</span>
            <span className={styles.readMore}>Read Post →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
