"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Check, Copy, ChevronUp } from "lucide-react";
import styles from "./page.module.css";

// Components
import Marquee from "../components/Marquee";
import ProfileAvatar from "../components/ProfileAvatar";
import RetroWindow from "../components/RetroWindow";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Link from "next/link";

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

interface BlogPreviewData {
  title: string;
  slug: string;
  coverImageUrl: string;
  excerpt: string;
  createdAt: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [blogs, setBlogs] = useState<BlogPreviewData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects for text and decorations
  const titleX = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const rotateShape1 = useTransform(scrollYProgress, [0, 1], [15, 360]);
  const rotateShape2 = useTransform(scrollYProgress, [0, 1], [-25, -200]);
  const scaleShape3 = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1.3]);

  // Anime characters scroll animations (inline responsive dynamics)
  const onepunchScale = useTransform(scrollYProgress, [0.12, 0.42], [0.6, 1.15]);
  const onepunchY = useTransform(scrollYProgress, [0.12, 0.42], [140, -40]);
  const onepunchRotate = useTransform(scrollYProgress, [0.12, 0.42], [-15, 10]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs for preview", err);
      }
    }
    fetchBlogs();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("aayushhmistri@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skills = [
    "Python", "TypeScript", "LLMs", "RAG", "Machine Learning", 
    "LangChain", "Vector Databases", "Node.js", "Express.js", "MongoDB", "SQL"
  ];

  const marqueeSkills = [
    "BACKEND DEVELOPER", "AI ENGINEER", "LLMS & RAG", 
    "PYTHON & TYPESCRIPT", "REST APIS", "MACHINE LEARNING"
  ];

  return (
    <div ref={containerRef} className={styles.page}>
      
      {/* 2D/3D Floating Background Elements (Scroll Aligned) */}
      <div className={`${styles.gridBackground} bg-dots`} />
      
      <motion.div 
        className={`${styles.floatingShape} ${styles.shape1}`}
        style={{ rotate: rotateShape1 }}
      >
        ✦
      </motion.div>
      <motion.div 
        className={`${styles.floatingShape} ${styles.shape2}`}
        style={{ rotate: rotateShape2 }}
      >
        ★
      </motion.div>
      <motion.div 
        className={`${styles.floatingShape} ${styles.shape3}`}
        style={{ scale: scaleShape3 }}
      >
        ✿
      </motion.div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.heroText}
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <span className={styles.subTitle}>👾 Welcome to my space</span>
            
            <div className={styles.titleRow}>
              <motion.h1 className={styles.mainTitle} style={{ x: titleX }}>
                Aayush <br />
                <span className={styles.highlightText}>Mistri</span>
              </motion.h1>

              <div className={styles.retroAniContainer}>
                <img src="/ani/image-Photoroom%20(1).png" className={styles.retroAni} alt="ani1" />
                <img src="/ani/image-Photoroom.png" className={styles.retroAni} alt="ani2" />
              </div>
            </div>
            <p className={styles.heroBio}>
              Backend Developer specializing in constructing high-performance server-side architectures, database management, and API design. Building fast, real-time products.
            </p>
            <div className={styles.heroButtons}>
              <a href="#projects" className="btn-brutalist" style={{ background: "var(--color-cyan)" }}>
                View Projects ⚡
              </a>
              <a href="#contact" className="btn-brutalist">
                Contact Me 📞
              </a>
              <Link href="/blog" className="btn-brutalist" style={{ background: "var(--color-pink)" }}>
                View Blogs ✍️
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
          >
            <ProfileAvatar />
          </motion.div>
        </div>
      </section>

      {/* Infinite Skills Marquee banner */}
      <Marquee items={marqueeSkills} speed="normal" bgColor="var(--color-yellow)" textColor="var(--color-black)" />

      {/* About Section */}
      <section className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Summary & Activity</h2>
            <span className={styles.sectionTag}>AAYUSH.SYS</span>
          </div>

          <div className={styles.aboutGrid}>
            <RetroWindow title="biography.exe" headerBg="var(--color-pink)" headerColor="var(--color-white)" statusText="File size: 1.2KB">
              <div className={styles.summaryInner}>
                <div className={styles.cmdLine}>
                  <span>&gt;_</span>
                  <span>cat self_description.txt</span>
                </div>
                <p className={styles.cmdOutput}>
                  Backend Developer with hands-on experience building server-side applications, managing databases, and integrating APIs using Node.js and Express. Completed a 10-month internship delivering real-world backend solutions. Passionate about continuous learning, with additional exposure to Machine Learning, Data Analytics, and full-stack development.
                </p>
              </div>
            </RetroWindow>

            <RetroWindow title="github_activity.exe" headerBg="var(--color-green)" headerColor="var(--color-black)" statusText="Real-time chart">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className={styles.cmdLine}>
                  <span>&gt;_</span>
                  <span>curl -s ghchart.rshah.org/Aayush-Mistri</span>
                </div>
                <div style={{ overflowX: "auto", border: "2px solid #000", background: "#ffffff", padding: "1rem", borderRadius: "4px" }}>
                  <div style={{ minWidth: "500px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://ghchart.rshah.org/39ff14/Aayush-Mistri" 
                      alt="Aayush Mistri's Github Contributions" 
                      style={{ width: "100%", height: "auto", display: "block" }} 
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#555" }}>
                  <span>Less activity</span>
                  <span>More activity</span>
                </div>
              </div>
            </RetroWindow>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.section} id="skills">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <span className={styles.sectionTag}>Tech Stack</span>
          </div>

          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => {
              const bgColors = ["var(--color-yellow)", "var(--color-green)", "var(--color-cyan)", "var(--color-pink)", "var(--color-white)"];
              const randomBg = bgColors[index % bgColors.length];
              
              return (
                <motion.div
                  key={index}
                  className={styles.skillItem}
                  style={{ background: "var(--color-white)" }}
                  whileHover={{ 
                    scale: 1.08, 
                    backgroundColor: randomBg,
                    color: "var(--color-black)",
                    boxShadow: "8px 8px 0px var(--color-black)",
                    transform: "rotate(" + (index % 2 === 0 ? 3 : -3) + "deg)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {skill}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* One Punch Man divider — scroll-animated between Skills & Experience */}
      <div className={styles.animeDividerContainer}>
        <motion.div
          className={styles.dividerAnime}
          style={{ scale: onepunchScale, y: onepunchY, rotate: onepunchRotate }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/anime_onepunch.png"
            alt="One Punch Man"
            style={{ width: "280px", height: "auto", objectFit: "contain", filter: "drop-shadow(-6px 6px 0px var(--color-yellow))" }}
          />
        </motion.div>

        <div style={{ position: "absolute", left: "5%", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-syne)", fontSize: "clamp(1rem, 3vw, 2rem)", fontWeight: 800, color: "var(--color-yellow)", textTransform: "uppercase", opacity: 0.15, lineHeight: 1.1, userSelect: "none", pointerEvents: "none" }}>
          SERIOUS<br/>SERIES:<br/>WORK<br/>HISTORY
        </div>
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-syne)", fontSize: "clamp(1rem, 3vw, 2rem)", fontWeight: 800, color: "var(--color-pink)", textTransform: "uppercase", opacity: 0.15, lineHeight: 1.1, textAlign: "right", userSelect: "none", pointerEvents: "none" }}>
          NEVER<br/>GIVE<br/>UP
        </div>
      </div>

      {/* Experience Section */}
      <section className={styles.section} id="experience">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <span className={styles.sectionTag}>Work History</span>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <motion.div 
                className={styles.timelineCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>Backend Developer Intern</h3>
                    <div className={styles.company}>
                      <Briefcase size={16} style={{ display: "inline", marginRight: "5px", verticalAlign: "text-bottom" }} />
                      DevERP Solutions Pvt. Ltd.
                    </div>
                  </div>
                  <div className={styles.dateLocation}>
                    <div>Jun 2025 – Apr 2026</div>
                    <div style={{ color: "var(--color-pink)" }}>Ahmedabad, India</div>
                  </div>
                </div>

                <ul className={styles.timelineBullets}>
                  <li>Supported and guided the development of my final year college project (Cohort).</li>
                  <li>Managed client communication and helped coordinate their requirements with the team.</li>
                  <li>Solved day-to-day issues and bugs reported by clients to keep things running smoothly.</li>
                  <li>Learnt how ERP systems work and contributed to maintaining internal modules.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.section} id="projects">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <span className={styles.sectionTag}>Completed Work</span>
          </div>

          <div className={styles.projectsGrid}>
            <ProjectCard
              index="01"
              title="Cohort"
              description="Full-stack platform for Indian users with scheduled messaging, event management, community groups, 24-hour stories, and AI-powered Indian language translation (Gemini API). Built in collaboration with DevERP Solutions."
              tags={["Node.js", "Express", "React", "MongoDB", "LLMs", "Gemini API"]}
              accentColor="purple"
            />
            <ProjectCard
              index="02"
              title="4mdavad"
              description="City-focused platform for Ahmedabad connecting residents, creators, and businesses via a city feed, event discovery, and interactive maps. Designed for a city of 8 million people."
              tags={["React", "TypeScript", "Supabase", "Leaflet"]}
              accentColor="green"
            />
            <ProjectCard
              index="03"
              title="Chess Online"
              description="Real-time online chess platform enabling matches with random players using WebSocket-based communication and instant matchmaking."
              tags={["React", "Node.js", "WebSockets", "TypeScript"]}
              accentColor="cyan"
            />
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className={styles.section} id="blog">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Blog</h2>
            <span className={styles.sectionTag}>Latest Updates</span>
          </div>

          <div className={styles.blogPreviewGrid}>
            {blogs.length > 0 ? (
              blogs.slice(0, 3).map((blog, index) => (
                <BlogCard
                  key={blog.slug}
                  title={blog.title}
                  slug={blog.slug}
                  excerpt={blog.excerpt}
                  coverImageUrl={blog.coverImageUrl}
                  date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  index={index}
                  accentColor={['yellow', 'green', 'purple', 'cyan', 'pink'][index % 5] as any}
                />
              ))
            ) : (
              <p className={styles.emptyText}>No blog posts yet. Stay tuned!</p>
            )}
          </div>
          
          <div className={styles.viewMoreContainer}>
            <Link href="/blog" className="btn-brutalist">
              View All Blogs 📖
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Marquee #2 (Reversed & Fast) */}
      <Marquee items={marqueeSkills} speed="fast" reverse={true} bgColor="var(--color-pink)" textColor="var(--color-white)" />

      {/* Education & Certifications Section */}
      <section className={styles.section} id="education">
        <div className={styles.container}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>Education & Certifications</h2>
            <span className={styles.sectionTag}>Qualifications</span>
          </div>

          <div className={styles.educationGrid}>

            {/* Education Receipt */}
            <motion.div 
              className={styles.receiptCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.receiptHeader}>
                <h3 className={styles.receiptTitle}>ACADEMIC RECORD</h3>
                <span className={styles.receiptTime}>DATE: MAY 2026</span>
              </div>

              {/* MCA - Current */}
              <div style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "2px dashed #ccc" }}>
                <div className={styles.receiptItem} style={{ color: "var(--color-purple)", fontWeight: 800 }}>
                  <span>▶ CURRENT:</span>
                  <span className={styles.receiptItemVal}>MCA (Master of Computer Applications)</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>COLLEGE:</span>
                  <span className={styles.receiptItemVal}>LJ University</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>LOCATION:</span>
                  <span className={styles.receiptItemVal}>Ahmedabad, Gujarat</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>STARTED:</span>
                  <span className={styles.receiptItemVal}>July 2026</span>
                </div>
                <div className={styles.receiptTotal} style={{ borderColor: "var(--color-purple)", color: "var(--color-purple)" }}>
                  <span>STATUS:</span>
                  <span>IN PROGRESS ✦</span>
                </div>
              </div>

              {/* BCA */}
              <div style={{ marginBottom: "2rem" }}>
                <div className={styles.receiptItem}>
                  <span>DEGREE:</span>
                  <span className={styles.receiptItemVal}>BCA (Bachelor of Computer Applications)</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>COLLEGE:</span>
                  <span className={styles.receiptItemVal}>Sardar Vallabhbhai Global University</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>LOCATION:</span>
                  <span className={styles.receiptItemVal}>Ahmedabad, Gujarat</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>GRADUATION:</span>
                  <span className={styles.receiptItemVal}>May 2026</span>
                </div>
                <div className={styles.receiptTotal}>
                  <span>FINAL GPA:</span>
                  <span>7.11 / 10.0</span>
                </div>
              </div>

              <div>
                <div className={styles.receiptItem}>
                  <span>HIGHER SECONDARY:</span>
                  <span className={styles.receiptItemVal}>HSC (Class 12)</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>SCHOOL:</span>
                  <span className={styles.receiptItemVal}>Vedant Vidhyavihar</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>LOCATION:</span>
                  <span className={styles.receiptItemVal}>Ahmedabad, Gujarat</span>
                </div>
                <div className={styles.receiptItem}>
                  <span>GRADUATION:</span>
                  <span className={styles.receiptItemVal}>March 2024</span>
                </div>
                <div className={styles.receiptTotal}>
                  <span>PERCENTILE:</span>
                  <span>88 pr</span>
                </div>
              </div>
            </motion.div>

            {/* Certifications Receipt */}
            <motion.div 
              className={styles.receiptCard}
              style={{ boxShadow: "var(--shadow-flat-yellow)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.receiptHeader}>
                <h3 className={styles.receiptTitle}>CERTIFICATIONS</h3>
                <span className={styles.receiptTime}>VERIFIED CREDENTIALS</span>
              </div>

              <ul className={styles.certList}>
                <li className={styles.certItem}>
                  <div className={styles.certTitle}>Supervised Machine Learning: Regression and Classification</div>
                  <div className={styles.certSource}>
                    <span>Stanford University / Coursera</span>
                    <span>Apr–May 2025</span>
                  </div>
                </li>
                <li className={styles.certItem}>
                  <div className={styles.certTitle}>Data Analytics Job Simulation</div>
                  <div className={styles.certSource}>
                    <span>Deloitte</span>
                    <span>May 2025</span>
                  </div>
                </li>
                <li className={styles.certItem}>
                  <div className={styles.certTitle}>Data Visualization</div>
                  <div className={styles.certSource}>
                    <span>Tata Group</span>
                    <span>Apr–May 2025</span>
                  </div>
                </li>
                <li className={styles.certItem}>
                  <div className={styles.certTitle}>Course on Computer Concepts (CCC)</div>
                  <div className={styles.certSource}>
                    <span>TOPS Technologies / Workshop</span>
                    <span>Jun–Aug 2024</span>
                  </div>
                </li>
              </ul>

              <div className={styles.receiptTotal} style={{ marginTop: "1.5rem" }}>
                <span>TOTAL CREDENTIALS:</span>
                <span>4 APPROVED</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
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
                <div className={styles.contactValue}>aayushhmistri@gmail.com</div>
                <button 
                  onClick={copyEmail}
                  className="btn-brutalist" 
                  style={{ 
                    padding: "0.4rem 0.8rem", 
                    fontSize: "0.75rem", 
                    marginTop: "0.75rem",
                    width: "100%",
                    justifyContent: "center",
                    background: copied ? "var(--color-green)" : "var(--color-yellow)"
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>

              <div className={styles.contactBox}>
                <div className={styles.contactLabel}>Phone</div>
                <div className={styles.contactValue}>+91 9054082300</div>
              </div>

              <a 
                href="https://github.com/Aayush-Mistri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.contactBox}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div className={styles.contactLabel}>GitHub</div>
                <div className={styles.contactValue} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <GithubIcon size={16} />
                  <span>Aayush-Mistri</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/aayush-mistri-9ba79334a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.contactBox}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div className={styles.contactLabel}>LinkedIn</div>
                <div className={styles.contactValue} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <LinkedinIcon size={16} />
                  <span>aayush-mistri</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.backToTop} onClick={scrollToTop} title="Back to Top">
              <ChevronUp size={24} />
            </div>

            <div style={{ textAlign: "right", marginTop: "2rem" }}>
              <div className={styles.copyright}>
                DESIGN: MAXIMALISM UI v2.0
              </div>
              <div className={styles.copyright} style={{ marginTop: "0.25rem" }}>
                © {new Date().getFullYear()} AAYUSH MISTRI. ALL RIGHT RESERVED.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
