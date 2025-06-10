// src/AboutUs.js
import React, { useState } from "react";
import "./AboutUs.css";
import Header from "./Header";
import team from "./Img/team.png";
import videoThumbnail from "./Img/vid.png";
import customer from "./Img/customer.png";
import { useNavigate } from "react-router-dom";


export default function AboutUs() {
  const navigate = useNavigate();
  // tabs
  const tabs = [
    {
      id: "purpose",
      title: "Our Purpose",
      content:
        "At Smart Editor, founded by Ghadah in 2025, our purpose is to bridge the gap between human creativity and AI efficiency.",
    },
    {
      id: "journey",
      title: "Our Journey",
      content:
        "From a pen-and-paper prototype to a full React-based AI blogging suite, our journey has been fueled by curiosity and user feedback.",
    },
    {
      id: "promise",
      title: "Our Promise",
      content:
        "We promise ongoing innovation, rock-solid privacy, and a toolset that grows with writers’ needs.",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // FAQs
  const faqs = [
    {
      q: "Is AI available 24/7?",
      a: "Yes—our service runs around the clock in the cloud.",
    },
    {
      q: "How do title suggestions work?",
      a: "We analyze your draft text and use a model to generate relevant title options.",
    },
    {
      q: "Can I edit suggested titles?",
      a: "Absolutely—you can pick a suggestion or type your own at any time.",
    },
    {
      q: "How is my data stored?",
      a: "All posts are saved locally for now, with optional cloud sync coming soon.",
    },
    {
      q: "Do I need an account?",
      a: "No—no login required. Just start writing!",
    },
  ];
  const [openFaq, setOpenFaq] = useState(null);

  // testimonials
  const testimonials = [
    {
      name: "Mohammed Ali",
      role: "Support Manager",
      avatar: customer,
      quote:
        "Smart Blog Editor transformed our workflow—fast, accurate, seamless.",
    },
    {
      name: "Shahad Khalid",
      role: "Marketing Specialist",
      avatar: customer,
      quote: "Instant summaries and title ideas—all within React!",
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () =>
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);

  return (
    <main className="about-page">
      <Header />

      {/* HERO / JOURNEY */}
      <section className="about-hero">
        <h1>Our Journey to Smarter Blogging</h1>
        <p>
          See how passion and AI combine to power the Smart Blog Editor
          experience.
        </p>
        <img src={team} alt="Team collaborating" className="about-hero-img" />
        <div className="stats-row">
          <div>
            <strong>98%</strong>
            <span>User Satisfaction</span>
          </div>
          <div>
            <strong>5×</strong>
            <span>Faster Writing</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Availability</span>
          </div>
          <div>
            <strong>1M+</strong>
            <span>Titles Generated</span>
          </div>
        </div>
      </section>

      {/* WHAT DEFINES US */}
      <section className="defines-us">
        <h2>What Defines Us</h2>
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs.find((t) => t.id === activeTab).content}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Get the Answers You Need</h2>
        <div className="faq-list">
          {faqs.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className="question"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {item.q}
                <span className="icon">{openFaq === idx ? "–" : "+"}</span>
              </button>
              {openFaq === idx && <p className="answer">{item.a}</p>}
            </div>
          ))}
        </div>
  <a
    href="mailto:GhadahQa@Hotmail.com"
    className="secondary-btn"
  >
    Contact Us
  </a>      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Hear From Happy Users</h2>
        <div className="testimonial-card">
          <img
            src={testimonials[currentTestimonial].avatar}
            alt={testimonials[currentTestimonial].name}
            className="avatar"
          />
          <blockquote>“{testimonials[currentTestimonial].quote}”</blockquote>
          <p className="author">
            {testimonials[currentTestimonial].name},{" "}
            <em>{testimonials[currentTestimonial].role}</em>
          </p>
        </div>
        <button className="next-testimonial" onClick={nextTestimonial}>
          Next →
        </button>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta">
        <h2>Start Blogging Smarter Today</h2>
        <p>Write better, faster, and more creatively with AI-powered tools.</p>
        <button className="primary-btn" onClick={() => navigate("/Editor")}>Start Free Trial</button>
      </section>
      {/* FOOTER */}
      <footer className="about-footer">
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/">How It Works</a>
            <a href="/">Features</a>
            <a href="/">Pricing</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/">About Us</a>
            <a href="/">Contact</a>
            <a href="/">Success Stories</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Help Center</a>
          </div>
        </div>
        <p>© 2025 Smart Editor. Designed by Ghadah.</p>
      </footer>
    </main>
  );
}
