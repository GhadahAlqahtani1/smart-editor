// src/Header.js
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import pen from "./Img/Pen.png";
import "./App.css";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setNavOpen(false); // أغلق القائمة بعد الضغط
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`Header${navOpen ? " nav-open" : ""}`}>
      <div className="leftSide">
        <img src={pen} alt="pen logo" className="topImg" />
        <Link to="/" className="logo">
          <h3>Smart Editor</h3>
        </Link>
      </div>

      {/* Burger menu icon */}
      <div
        className="burger"
        role="button"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        tabIndex={0}
        onClick={() => setNavOpen(!navOpen)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setNavOpen(!navOpen)
        }
      >
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      <nav className="navLinks">
        {" "}
        <a href="#Features" onClick={(e) => handleNavClick("Features", e)}>
          Features
        </a>
        <Link to="/Editor" onClick={() => setNavOpen(false)}>
          Editor
        </Link>
        <Link to="/AboutUs" onClick={() => setNavOpen(false)}>
          About Us
        </Link>
      </nav>
    </header>
  );
}
