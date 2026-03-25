import { motion } from "framer-motion";

const services = [
  {
    title: "Premium Websites",
    description:
      "High-end websites designed to elevate perception, communicate authority and convert attention into real business.",
  },
  {
    title: "Automation Systems",
    description:
      "Operational workflows and custom systems that reduce repetitive work and create a cleaner business process.",
  },
  {
    title: "AI Integration",
    description:
      "Intelligent features, assistants and AI-powered experiences built to sharpen positioning and efficiency.",
  },
];

const highlights = [
  "Premium-first visual direction",
  "Dark glass UI with depth and glow",
  "Structured for trust and conversion",
  "Fast, modern and scalable foundation",
];

export default function App() {
  return (
    <div className="app-shell">
      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <header className="navbar">
        <div className="brand-wrap">
          <div className="brand-mark" />
          <span className="brand">ESCOBAR</span>
        </div>

        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-cta">
          Start Project
        </a>
      </header>

      <main>
        <section className="hero">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Premium digital presence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            We build digital experiences that feel premium from the first second.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            Escobar creates modern landing pages, premium websites and
            conversion-focused digital systems for brands that want sharper
            positioning, stronger trust and better presentation online.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <a href="#contact" className="btn btn-primary">
              Book a Project
            </a>
            <a href="#services" className="btn btn-secondary">
              View Services
            </a>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.97, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26 }}
          >
            <div className="panel-top">
              <span />
              <span />
              <span />
            </div>

            <div className="panel-content">
              <div className="metric-card">
                <small>Positioning</small>
                <strong>Premium-first</strong>
              </div>
              <div className="metric-card">
                <small>Design Language</small>
                <strong>Dark / Glass / Glow</strong>
              </div>
              <div className="metric-card">
                <small>Purpose</small>
                <strong>Trust + Conversion</strong>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <span>Services</span>
            <h2>Built for brands that want a stronger digital image.</h2>
            <p>
              Premium execution across website design, operational systems and
              AI-enhanced digital experiences.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.article
                className="glass-card"
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="card-glow" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section two-col" id="about">
          <motion.div
            className="glass-card feature-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow">About the build</span>
            <h2>More than a website. A perception system.</h2>
            <p>
              This landing is built to do three things well: establish authority
              fast, communicate value clearly, and move visitors toward action
              without noise or visual confusion.
            </p>
            <p>
              The structure, spacing, visual hierarchy and atmosphere are all
              designed to create a more premium impression from the first scroll.
            </p>
          </motion.div>

          <motion.div
            className="glass-card list-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="eyebrow">Core highlights</span>
            <ul className="highlight-list">
              {highlights.map((item) => (
                <li key={item}>
                  <span className="dot" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="section cta-section" id="contact">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Start your project</span>
            <h2>Let’s build something serious.</h2>
            <p>
              If the goal is to look more premium, communicate more clearly and
              convert with more confidence, this is the right direction.
            </p>

            <div className="hero-actions">
              <a href="mailto:hello@escobar.com" className="btn btn-primary">
                Contact Escobar
              </a>
              <a href="#services" className="btn btn-secondary">
                Explore Services
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Escobar</strong>
          <p>Premium digital experiences for modern brands.</p>
        </div>

        <div className="footer-right">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}