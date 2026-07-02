"use client";

import React from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: "normal" | "fast";
  bgColor?: string;
  textColor?: string;
}

export default function Marquee({
  items,
  reverse = false,
  speed = "normal",
  bgColor,
  textColor,
}: MarqueeProps) {
  // Triple the items array to ensure it spans larger screens and loops smoothly
  const marqueeItems = [...items, ...items, ...items, ...items];

  const inlineStyles: React.CSSProperties = {};
  if (bgColor) inlineStyles.background = bgColor;
  if (textColor) inlineStyles.color = textColor;

  return (
    <div
      className={styles.marqueeContainer}
      style={inlineStyles}
    >
      <div
        className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""} ${
          speed === "fast" ? styles.fast : ""
        }`}
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className={styles.marqueeItem} style={textColor ? { color: textColor } : {}}>
            <span>{item}</span>
            <span className={styles.star}>★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
