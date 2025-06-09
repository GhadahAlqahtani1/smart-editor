import React from "react";
import { Routes, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import AboutUs from "./AboutUs";
import LandingPage from "./LandingPage";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Editor" element={<EditorPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        {/* add more as needed */}
      </Routes>
    </>
  );
}
