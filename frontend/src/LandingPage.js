import "./App.css";
import Header from "./Header";
import Logo from "./Img/Logo.png";
import AI from "./Img/AI.png";
import user from "./Img/user.png";
import Summary from "./Img/Summary.png";
import Generation from "./Img/generation.png";
import users from "./Img/users.png";
import one from "./Img/1.png";
import two from "./Img/2.png";
import three from "./Img/3.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  // مصفوفة خطوات "How It Works"
  const steps = [
    {
      icon: one,
      alt: "Sign Up",
      title: "Sign Up",
      desc: "Create a free account and get started with full access to all our tools.",
    },
    {
      icon: two,
      alt: "Choose Tool",
      title: "Choose a Tool",
      desc: "Select from our writing assistant, summarizer, or grammar check tool.",
    },
    {
      icon: three,
      alt: "Start Creating",
      title: "Start Creating",
      desc: "Generate content, summarize articles, or check grammar instantly!",
    },
  ];

  // مصفوفة ميزات "AI Tools"
  const features = [
    {
      icon: AI,
      alt: "AI Writing Tools",
      title: "AI Writing Tools",
      desc: "Generate creative, relevant content effortlessly with our AI-powered writing tools.",
    },
    {
      icon: Generation,
      alt: "Content Generation",
      title: "Content Generation & Enhancement",
      desc: "Generate titles, descriptions, and body content in seconds, enhanced with AI suggestions.",
    },
    {
      icon: Summary,
      alt: "Text Summarization",
      title: "Text Summarization Tools",
      desc: "Summarize lengthy articles and blog posts instantly, saving time and boosting readability.",
    },
    {
      icon: user,
      alt: "Grammar & Style Check",
      title: "Grammar & Style Check",
      desc: "Check for grammar, punctuation, and style improvements with AI-powered suggestions.",
    },
  ];

  // مصفوفة التعليقات "Testimonials"
  const testimonials = [
    {
      img: users,
      alt: "Sara Doe, Blogger",
      text: "This AI writing tool has saved me so much time and effort!",
      name: "Sara Doe, Blogger",
    },
    {
      img: users,
      alt: "Ghadah Smith, Content Creator",
      text: "I love how easy it is to generate content with AI suggestions.",
      name: "Ghadah Smith, Content Creator",
    },
    {
      img: users,
      alt: "Norah Alex, Author",
      text: "This tool helped me refine my writing style and grammar effortlessly.",
      name: "Norah Alex, Author",
    },
    {
      img: users,
      alt: "Halah Gonzalez, Marketer",
      text: "Amazing features that make writing much easier and faster!",
      name: "Halah Gonzalez, Marketer",
    },
  ];

  return (
    <div>
      <Header />

      <div className="background">
        <div className="firstBox">
          <section className="HeroSection">
            <div className="hero-text">
              <h1>Smart tools to enhance your writing experience</h1>
              <p>Your all-in-one AI-powered writing assistant.</p>
              <button type="button" onClick={() => navigate("/Editor")}>
                Get Started
              </button>
            </div>
            <div className="hero-image">
              <img src={Logo} alt="SmartWrite Logo" />
            </div>
          </section>
        </div>

        <section className="context-section">
          <h2>Why Choose Our Tools?</h2>
          <p>
            Our suite of tools is designed to make your writing process faster,
            more creative, and stress-free. Generate ideas, enhance your
            content, and polish your grammar with a single click. Say goodbye to
            writer's block and hello to productivity with our intelligent,
            user-friendly tools.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => navigate("/AboutUs")}
          >
            Learn More
          </button>
        </section>
      </div>

      {/* How It Works Section */}
      <section className="HowItWorks">
        <h2>How It Works</h2>
        <div className="wave-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="step">
              <div className="step-icon">
                <img src={step.icon} alt={step.alt} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div id="Features"></div>

      {/* Features Section */}
      <section className="FeatureSection">
        <h2>AI Tools</h2>
        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-item">
              <div className="icon-placeholder">
                <img src={feat.icon} alt={feat.alt} />
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="TestimonialsSection">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-avatar">
              <img src={t.img} alt={t.alt} />
              <div className="testimonial-text">
                <p>"{t.text}"</p>
                <h4>- {t.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="CallToAction">
        <h2>Ready to enhance your writing?</h2>
        <button type="button" onClick={() => navigate("/Editor")}>
          Try It Now
        </button>
      </section>
    </div>
  );
}

export default LandingPage;
