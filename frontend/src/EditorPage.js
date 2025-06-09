import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import "./EditorPage.css";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const greetings = [
  "👋 Welcome! Need help writing?",
  "🌟 Hello! Ready to create something amazing?",
  "💡 Pro Tip: Use AI to polish your writing!",
  "✨ Happy Editing with the AI Assistant!",
];

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [corrected, setCorrected] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [lastSaved, setLastSaved] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);
  const [greeting, setGreeting] = useState(greetings[0]);

  // Change greeting randomly every refresh
  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  const charCount = content.length;
  let correctedTextSection = "";

  if (corrected) {
    const parts = corrected.split("Corrected Text:");
    correctedTextSection = parts[1] ? parts[1].trim() : corrected.trim();
  }

  // Prevent suggesting title without content
  const handleSuggestTitles = useCallback(async () => {
    if (!content.trim()) {
      toast.error("Please write some content first!");
      return;
    }
    setIsSuggesting(true);
    try {
      const res = await fetch("/api/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (Array.isArray(data.titles)) setSuggestions(data.titles);
      else if (data.title) setSuggestions([data.title]);
      else setSuggestions([]);
    } catch (err) {
      setSuggestions([
        "A Smart Start",
        "How to Write with AI",
        "Boost Your Blog",
      ]);
    } finally {
      setIsSuggesting(false);
    }
  }, [content]);

  const handlePickSuggestion = (suggestion) => {
    setTitle(suggestion);
    setSuggestions([]);
  };

  // Generate new content (AI)
  const handleGenerateContent = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first!");
      return;
    }
    setIsGenerating(true);
    setGeneratedContent("");
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });
      const data = await res.json();
      if (data.content) setGeneratedContent(data.content.trim());
    } catch (err) {
      setGeneratedContent("Error generating content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddGeneratedContent = () => {
    if (generatedContent)
      setContent((prev) => prev + "\n\n" + generatedContent);
    setGeneratedContent("");
  };

  // Generate summary
  const handleGenerateSummary = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first!");
      return;
    }
    setShowSummary(true); // Show summary result area
    setIsSummarizing(true);
    try {
      const res = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
    } catch (err) {
      setSummary("Failed to generate summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  // Grammar and spelling correction
  const handleCheckGrammar = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first!");
      return;
    }
    setShowCorrections(true); // Show corrections area
    setIsCorrecting(true);
    try {
      const res = await fetch("/api/check-grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (data.corrected) setCorrected(data.corrected);
    } catch (err) {
      setCorrected("Failed to check grammar.");
    } finally {
      setIsCorrecting(false);
    }
  };

  const handleSave = useCallback(() => {
    setLastSaved(new Date().toLocaleTimeString());
  }, []);

  // Publishing: Require title and content
  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please enter a title and content before publishing!");
      return;
    }
    alert("Published!");
  };

  useEffect(() => {
    const timer = setInterval(handleSave, 30000);
    return () => clearInterval(timer);
  }, []);

  // Whether there is a correction change
  const correctionChanged = corrected && corrected.trim() !== content.trim();

  // After generate summary/content/correct, show toast
  useEffect(() => {
    if (summary && !isSummarizing) toast.success("Summary generated!");
  }, [summary, isSummarizing]);

  useEffect(() => {
    if (generatedContent && !isGenerating)
      toast.success("AI content generated!");
  }, [generatedContent, isGenerating]);

  useEffect(() => {
    if (corrected && !isCorrecting) toast.success("Grammar check complete!");
  }, [corrected, isCorrecting]);

  return (
    <div className="editor-page">
      <Toaster position="top-right" />
      <Header />

      {/* Dynamic greeting */}
      <motion.div
        aria-live="polite"
        className="smart-greeting"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {greeting}
      </motion.div>

      {/* Title Section */}
      <section className="title-section">
        <input
          type="text"
          className="title-input"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={handleSuggestTitles}
          disabled={isSuggesting}
        >
          {isSuggesting ? <span className="spinner"></span> : "Suggest Titles"}
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s) => (
              <li key={s} onClick={() => handlePickSuggestion(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Main Content */}
      <div className="editor-grid one-column">
        <div className="content-column">
          {/* Content Editor */}
          <textarea
            className="ai-textarea"
            placeholder="Write your blog post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="status-bar">
            <span>{charCount} characters</span>
            {lastSaved && <span>Last saved at {lastSaved}</span>}
          </div>

          {/* Actions */}
          <div className="content-actions">
            <button
              className="btn"
              onClick={handleGenerateContent}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="spinner"></span>
              ) : (
                "Generate Content"
              )}
            </button>
            <button
              className="btn"
              onClick={handleGenerateSummary}
              disabled={isSummarizing}
            >
              {isSummarizing ? (
                <span className="spinner"></span>
              ) : (
                "Generate Summary"
              )}
            </button>
            <button
              className="btn"
              onClick={handleCheckGrammar}
              disabled={isCorrecting}
            >
              {isCorrecting ? (
                <span className="spinner"></span>
              ) : (
                "Check Grammar & Spelling"
              )}
            </button>
          </div>

          {/* Animated Generated Content */}
          {generatedContent && (
            <motion.div
              aria-live="polite"
              className="generated-content-box"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="generated-content-header">
                <span>✨ AI Suggestion</span>
                <button
                  className="btn small-btn"
                  onClick={handleAddGeneratedContent}
                >
                  Add to Post
                </button>
                <button
                  className="btn copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedContent)
                  }
                >
                  Copy
                </button>
              </div>
              <div className="generated-content-body">{generatedContent}</div>
            </motion.div>
          )}

          {/* Animated Summary */}
          {showSummary && (
            <motion.div
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="output-label">
                <span role="img" aria-label="summary">
                  📝
                </span>{" "}
                Summary
              </label>
              <div className="output-with-copy">
                <textarea
                  className="ai-textarea"
                  readOnly
                  value={summary}
                  placeholder="Summary will appear here..."
                  rows={5}
                />
                {summary && (
                  <button
                    className="btn copy-btn"
                    onClick={() => navigator.clipboard.writeText(summary)}
                    style={{ marginTop: "8px" }}
                  >
                    Copy Summary
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Grammar Section */}
          {showCorrections &&
            corrected &&
            (corrected.trim().toLowerCase() === "no corrections needed." ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="no-change-msg"
                style={{ margin: "1rem 0", color: "#27ae60", fontWeight: 500 }}
              >
                <span role="img" aria-label="check">
                  ✅
                </span>{" "}
                Your text is correct. No corrections needed.
              </motion.div>
            ) : (
              <motion.div
                aria-live="polite"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="output-label" style={{ marginTop: 8 }}>
                  <span role="img" aria-label="correction">
                    🔎
                  </span>{" "}
                  Corrected Text
                </label>
                <div className="output-with-copy">
                  <textarea
                    className="ai-textarea"
                    readOnly
                    value={corrected.trim()}
                    placeholder="Corrected text will appear here..."
                    rows={5}
                  />
                  <button
                    type="button"
                    className="btn copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(corrected.trim())
                    }
                    style={{ marginTop: "8px" }}
                  >
                    Copy Corrected Text
                  </button>
                </div>
              </motion.div>
            ))}

          {/* Footer Actions */}
          <div className="actions content-footer">
            <button type="button" className="btn outline" onClick={handleSave}>
              Save Draft
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer">Made with ❤️ by Ghadah AlQahtani</footer>
    </div>
  );
}
