"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    cat: "MOBILE APP",
    title: "E-Commerce Mobile App",
    desc: "A sleek mobile shopping experience with intuitive navigation and seamless checkout flow.",
    tags: ["UI Design", "Mobile", "Figma"],
    emoji: "📱",
  },
  {
    cat: "WEB DESIGN",
    title: "SaaS Dashboard Design",
    desc: "Modern analytics dashboard with data visualization and real-time insights.",
    tags: ["Dashboard", "Web", "UX"],
    emoji: "📊",
  },
  {
    cat: "BRANDING",
    title: "Brand Identity System",
    desc: "Complete brand identity for a tech startup including logo, colors, and guidelines.",
    tags: ["Branding", "Logo", "Identity"],
    emoji: "🎨",
  },
  {
    cat: "UI/UX",
    title: "Fitness App Redesign",
    desc: "User experience overhaul for a fitness tracking app with focus on engagement.",
    tags: ["Mobile", "UX Research", "Prototyping"],
    emoji: "💪",
  },
  {
    cat: "WEB DESIGN",
    title: "Restaurant Website",
    desc: "Elegant website design for a fine dining restaurant with online reservations.",
    tags: ["Web", "Responsive", "UI"],
    emoji: "🍽️",
  },
  {
    cat: "MOBILE APP",
    title: "Banking App Interface",
    desc: "Secure and intuitive mobile banking interface with biometric authentication.",
    tags: ["FinTech", "Mobile", "Security"],
    emoji: "🏦",
  },
];

const SKILLS = [
  { name: "UI Design",         pct: 70, icon: "🎨" },
  { name: "UX Design",         pct: 75, icon: "🔍" },
  { name: "Figma",             pct: 86, icon: "✦"  },
  { name: "Adobe Photoshop",   pct: 88, icon: "✏️" },
  { name: "Adobe Illustrator", pct: 60, icon: "🖊️" },
  { name: "Wireframing",       pct: 72, icon: "⬡"  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const GitHubIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);
const LinkedInIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: string }

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: data.message });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback({ type: "error", text: data.error || "Something went wrong." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error. Please try again." });
    }
    setLoading(false);
  }

  return (
    <div className="contact-form-wrap">
      <div className="form-row">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handle} placeholder="Your name" />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handle} placeholder="your.email@example.com" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" type="text" value={form.subject} onChange={handle} placeholder="Project inquiry" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." />
      </div>
      <button className="form-submit" onClick={submit} disabled={loading}>
        <SendIcon />
        {loading ? "Sending…" : "Send Message"}
      </button>
      {feedback && (
        <div className={feedback.type === "success" ? "form-success" : "form-error"}>
          {feedback.text}
        </div>
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo" onClick={() => scrollTo("home")}>VANSH GANDHI</div>
        <div className="nav-links">
          {["home", "about", "projects", "skills", "contact"].map((id) => (
            <a key={id} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
        {/* 
          RESUME BUTTON — update the href below once you deploy.
          /api/resume serves public/resume.pdf as a download.
        */}
        <button className="nav-resume" onClick={() => window.open("/api/resume", "_blank")}>
          <DownloadIcon /> Resume
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home">
        <p className="hero-sub">Welcome to my portfolio</p>
        <h1 className="hero-name">VANSH GANDHI</h1>
        <p className="hero-role">UI/UX &amp; Graphic Designer</p>
        <p className="hero-desc">
          Crafting exceptional digital experiences through innovative design and user-centered thinking
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>
            <MailIcon /> Get In Touch
          </button>
        </div>
        <div className="hero-socials">
          {/* ── Replace # with your actual GitHub and LinkedIn URLs ── */}
          <a href="https://github.com/" target="_blank" rel="noreferrer" title="GitHub"><GitHubIcon /></a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" title="LinkedIn"><LinkedInIcon /></a>
        </div>
        <div className="hero-arrow"><ArrowDownIcon /></div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="sec-header">
          <h2 className="sec-title">ABOUT ME</h2>
          <div className="sec-line" />
        </div>
        <div className="about-grid">
          <div className="about-avatar">VG</div>
          <div>
            <h3 className="about-name">Hello, I'm Vansh Gandhi</h3>
            <p className="about-bio">
              Hi, I'm Vansh. An Interaction Design student at Anant National University, minoring in
              Product Design with a deep passion for Graphic Design. I believe great design is more
              than aesthetics — it's about crafting experiences that feel intuitive, purposeful, and
              human. From UI flows and product thinking to visual communication, I love bringing ideas
              to life across every touchpoint. Off-screen, you'll find me on the football field,
              playing for my university team. I'm currently open to internship opportunities in UI/UX,
              Product, or Graphic Design — let's build something great together.
            </p>
            <div className="about-info">
              <div className="about-info-row"><LocationIcon /> Ahmedabad</div>
              <div className="about-info-row"><MailIcon size={16} /> vanshgandhi24@gmail.com</div>
            </div>
            <p className="what-i-do-title">What I Do</p>
            <div className="what-grid">
              {["UI Design", "UX Research", "Prototyping", "Branding"].map((s) => (
                <div key={s} className="what-card">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="sec-header">
          <h2 className="sec-title">MY PROJECTS</h2>
          <div className="sec-line" />
          <p className="sec-desc">A collection of my recent design work and creative projects</p>
        </div>
        <div className="filter-bar">
          <FilterIcon />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option value="MOBILE APP">Mobile App</option>
            <option value="WEB DESIGN">Web Design</option>
            <option value="BRANDING">Branding</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>
        <div className="projects-grid">
          {visible.map((p) => (
            <div key={p.title} className="project-card">
              <div className="project-emoji">{p.emoji}</div>
              <div className="project-body">
                <p className="project-cat">{p.cat}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="sec-header">
          <h2 className="sec-title">SKILLS &amp; EXPERTISE</h2>
          <div className="sec-line" />
          <p className="sec-desc">Tools and technologies I use to bring ideas to life</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div key={s.name} className="skill-card">
              <div className="skill-top">
                <div className="skill-left">
                  <div className="skill-icon">{s.icon}</div>
                  <span className="skill-name">{s.name}</span>
                </div>
                <span className="skill-pct">{s.pct}%</span>
              </div>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="sec-header">
          <h2 className="sec-title">GET IN TOUCH</h2>
          <div className="sec-line" />
          <p className="sec-desc">Have a project in mind? Let's work together to create something amazing</p>
        </div>
        <ContactForm />
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">VANSH GANDHI</div>
            <p className="footer-tagline">UI/UX &amp; Graphic Designer</p>
          </div>
          <div>
            <p className="footer-col-title">Quick Links</p>
            <div className="footer-links">
              {["home", "about", "projects", "skills", "contact"].map((id) => (
                <a key={id} onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-title">Connect</p>
            <div className="footer-icons">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer-icon" title="GitHub">
                <GitHubIcon size={18} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="footer-icon" title="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
              <a href="mailto:vanshgandhi24@gmail.com" className="footer-icon" title="Email">
                <MailIcon size={18} />
              </a>
            </div>
            <p className="footer-email">vanshgandhi24@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Vansh Gandhi. All rights reserved.</span>
          <span>Made with ❤️ and dedication</span>
        </div>
      </footer>
    </>
  );
}
