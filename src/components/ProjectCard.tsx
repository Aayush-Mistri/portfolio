"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./ProjectCard.module.css";

// Custom Github SVG Icon since brand icons are deprecated in lucide-react
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  index: string;
  title: string;
  description: string;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  accentColor?: "yellow" | "green" | "purple" | "cyan" | "pink";
}

export default function ProjectCard({
  index,
  title,
  description,
  tags,
  liveLink = "#",
  githubLink = "#",
  accentColor = "yellow",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform motions to rotation degree
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Assign tag classes dynamically
  const getTagColorClass = (tag: string, idx: number) => {
    const classes = [styles.tagYellow, styles.tagGreen, styles.tagPurple, styles.tagCyan, styles.tagPink];
    return classes[(idx + tag.length) % classes.length];
  };

  // Accent shadow colors
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
      ref={cardRef}
      className={styles.cardContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: getAccentShadow(),
        transform: "translate(-3px, -3px)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <div style={{ transform: "translateZ(15px)", display: "flex", flexDirection: "column", height: "100%" }}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.index}>{index}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.techStack}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`${styles.tag} ${getTagColorClass(tag, idx)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnAction} ${styles.btnLive}`}
            onClick={(e) => {
              if (liveLink === "#") {
                e.preventDefault();
                alert("This project link will be updated later!");
              }
            }}
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnAction} ${styles.btnGithub}`}
            onClick={(e) => {
              if (githubLink === "#") {
                e.preventDefault();
                alert("This GitHub link will be updated later!");
              }
            }}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
