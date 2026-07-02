"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronUp } from "lucide-react";
import styles from "./Footer.module.css";

// Custom Github SVG Icon
const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom Linkedin SVG Icon
const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FooterProps {
  email?: string;
  phone?: string;
  githubUrl?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  linkedinUsername?: string;
}

export default function Footer({
  email = "aayushhmistri@gmail.com",
  phone = "+91 9054082300",
  githubUrl = "https://github.com/Aayush-Mistri",
  githubUsername = "Aayush-Mistri",
  linkedinUrl = "https://linkedin.com/in/aayush-mistri-9ba79334a",
  linkedinUsername = "aayush-mistri",
}: FooterProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerHeading}>
            LET&#39;S BUILD <br />
            <span style={{ color: "var(--color-yellow)" }}>SOMETHING COOL.</span>
          </h2>

          <div className={styles.contactGrid}>
            <div className={styles.contactBox}>
              <div className={styles.contactLabel}>Email</div>
              <div className={styles.contactValue}>{email}</div>
              <button
                onClick={copyEmail}
                className="btn-brutalist"
                style={{
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.75rem",
                  marginTop: "0.75rem",
                  width: "100%",
                  justifyContent: "center",
                  background: copied ? "var(--color-green)" : "var(--color-yellow)",
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
            </div>

            <div className={styles.contactBox}>
              <div className={styles.contactLabel}>Phone</div>
              <div className={styles.contactValue}>{phone}</div>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactBox}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div className={styles.contactLabel}>GitHub</div>
              <div className={styles.contactValue} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <GithubIcon size={16} />
                <span>{githubUsername}</span>
              </div>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactBox}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div className={styles.contactLabel}>LinkedIn</div>
              <div className={styles.contactValue} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <LinkedinIcon size={16} />
                <span>{linkedinUsername}</span>
              </div>
            </a>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.backToTop} onClick={scrollToTop} title="Back to Top">
            <ChevronUp size={24} />
          </div>

          <div style={{ textAlign: "right", marginTop: "2rem" }}>
            <div className={styles.copyright}>DESIGN: MAXIMALISM UI v2.0</div>
            <div className={styles.copyright} style={{ marginTop: "0.25rem" }}>
              © {new Date().getFullYear()} AAYUSH MISTRI. ALL RIGHT RESERVED.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
