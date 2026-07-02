"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./RetroWindow.module.css";

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  headerBg?: string;
  headerColor?: string;
  statusText?: string;
}

export default function RetroWindow({
  title,
  children,
  headerBg,
  headerColor,
  statusText = "Status: Online",
}: RetroWindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const headerStyle: React.CSSProperties = {};
  if (headerBg) headerStyle.background = headerBg;
  if (headerColor) headerStyle.color = headerColor;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={styles.windowContainer}
          >
            {/* Header */}
            <div className={styles.windowHeader} style={headerStyle}>
              <div className={styles.windowTitle}>
                <span>👾</span>
                <span>{title}</span>
              </div>
              <div className={styles.windowControls}>
                <div
                  className={styles.windowButton}
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                >
                  _
                </div>
                <div
                  className={`${styles.windowButton} ${styles.closeButton}`}
                  onClick={() => setIsOpen(false)}
                  title="Close"
                >
                  X
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.windowContent}>{children}</div>

            {/* Status Bar */}
            <div className={styles.statusBar}>
              <span>{statusText}</span>
              <span>100% CPU</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized or Closed Restore Button */}
      {(!isOpen || isMinimized) && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="btn-brutalist"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          style={{
            cursor: "pointer",
            background: "var(--color-pink)",
            color: "var(--color-white)",
            display: "inline-flex",
            gap: "0.5rem",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>📂 Restore: {title}</span>
        </motion.div>
      )}
    </div>
  );
}
