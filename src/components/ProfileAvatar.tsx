"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "./ProfileAvatar.module.css";

export default function ProfileAvatar() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.avatarContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.04, boxShadow: "12px 12px 0px var(--color-pink)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Sticker labels */}
      <span className={`${styles.sticker} ${styles.stickerTopLeft}`}>
        Dev Mode
      </span>
      <span className={`${styles.sticker} ${styles.stickerBottomRight}`}>
        Aayush.dmg
      </span>

      <div className={styles.avatarInner}>
        {/* Full-square photo — no filters */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/me.jpeg"
          alt="Aayush Mistri"
          className={styles.avatarPhoto}
        />
        <span className={styles.avatarLabel}>AAYUSH.EXE</span>
      </div>
    </motion.div>
  );
}
