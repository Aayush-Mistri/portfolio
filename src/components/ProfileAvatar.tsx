"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { User } from "lucide-react";
import styles from "./ProfileAvatar.module.css";

export default function ProfileAvatar() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform motion values to rotation degrees
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to center of element
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Reset rotations smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.avatarContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.03, boxShadow: "12px 12px 0px var(--color-pink)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Visual stickers typical in maximalism */}
      <span className={`${styles.sticker} ${styles.stickerTopLeft}`}>
        Dev Mode
      </span>
      <span className={`${styles.sticker} ${styles.stickerBottomRight}`}>
        Aayush.dmg
      </span>

      <div className={styles.avatarInner} style={{ transform: "translateZ(20px)" }}>
        <div className={styles.blankSilhouette}>
          <User className={styles.avatarIcon} strokeWidth={1} />
        </div>
        <span className={styles.avatarLabel}>NO SIGNAL</span>
      </div>
    </motion.div>
  );
}
