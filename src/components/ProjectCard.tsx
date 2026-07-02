"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import styles from "./ProjectCard.module.css";

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
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
