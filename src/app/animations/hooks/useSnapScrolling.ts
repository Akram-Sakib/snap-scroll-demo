"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "../components/sections-data";

export const useSnapScrolling = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle section visibility changes from Framer Motion
  const handleSectionInView = useCallback((index: number) => {
    setActiveSection(index);
  }, []);

  // Scroll to specific section
  const scrollToSection = useCallback((index: number) => {
    // Set flag to prevent view tracking interference during programmatic scroll
    setIsProgrammaticScroll(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Immediately update the active section
    setActiveSection(index);

    // Perform the scroll
    const section = document.getElementById(sections[index].id);
    section?.scrollIntoView({ behavior: "smooth" });

    // Reset flag after animation completes (smooth scroll typically takes ~500-1000ms)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsProgrammaticScroll(false);
    }, 1000);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (activeSection < sections.length - 1) {
            scrollToSection(activeSection + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (activeSection > 0) {
            scrollToSection(activeSection - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(0);
          break;
        case "End":
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, scrollToSection]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeSection,
    isProgrammaticScroll,
    containerRef,
    handleSectionInView,
    scrollToSection,
  };
};

