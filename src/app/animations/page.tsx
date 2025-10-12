"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface Section {
  id: string;
  title: string;
  description: string;
  bgGradient: string;
}

const sections: Section[] = [
  {
    id: "section-1",
    title: "Welcome to Snap Scrolling",
    description:
      "Scroll down to experience smooth snap scrolling with best practices",
    bgGradient: "from-blue-500 to-purple-600",
  },
  {
    id: "section-2",
    title: "Smooth Navigation",
    description: "Each section snaps perfectly into view as you scroll",
    bgGradient: "from-purple-600 to-pink-500",
  },
  {
    id: "section-3",
    title: "Keyboard Accessible",
    description: "Use arrow keys or Page Up/Down to navigate between sections",
    bgGradient: "from-pink-500 to-red-500",
  },
  {
    id: "section-4",
    title: "Long Content Section",
    description: "This section has much more content to demonstrate how snap scrolling handles variable-length sections. Notice you can scroll naturally within this section without forced snapping!",
    bgGradient: "from-red-500 to-orange-500",
  },
  {
    id: "section-5",
    title: "Touch Friendly",
    description: "Optimized for both desktop and mobile interactions",
    bgGradient: "from-orange-500 to-amber-500",
  },
  {
    id: "section-6",
    title: "Navigation Indicators",
    description: "Visual dots show your current position in the scroll",
    bgGradient: "from-amber-500 to-yellow-500",
  },
  {
    id: "section-7",
    title: "Performance Optimized",
    description: "Built with CSS scroll-snap for native browser performance",
    bgGradient: "from-yellow-500 to-green-500",
  },
];

// Component to track individual section visibility using Framer Motion
const SectionTracker = ({
  children,
  index,
  onInView,
  isScrollingProgrammatically,
}: {
  children: React.ReactNode;
  index: number;
  onInView: (index: number) => void;
  isScrollingProgrammatically: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-80px 0px 0px 0px", // Account for sticky header
    amount: 0.1, // Trigger when 10% is visible
  });

  useEffect(() => {
    // Only update active section if we're not programmatically scrolling
    if (isInView && !isScrollingProgrammatically) {
      onInView(index);
    }
  }, [isInView, index, onInView, isScrollingProgrammatically]);

  return <div ref={ref}>{children}</div>;
};

const AnimationsPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle section visibility changes from Framer Motion
  const handleSectionInView = useCallback((index: number) => {
    setActiveSection(index);
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
  }, [activeSection]);

  const scrollToSection = (index: number) => {
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
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main scroll container with snap */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-proximity scroll-smooth"
        role="region"
        aria-label="Snap scrolling demo sections"
      >
        {/* Sticky Header */}
        <header className="sticky top-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white px-8 py-4 shadow-lg z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Snap Scroll Demo</h2>
              <p className="text-sm text-white/70">
                Experience smooth scrolling
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                Section {activeSection + 1}/{sections.length}
              </span>
            </div>
          </div>
        </header>

        {/* Sections */}
        {sections.map((section, index) => (
          <SectionTracker
            key={section.id}
            index={index}
            onInView={handleSectionInView}
            isScrollingProgrammatically={isProgrammaticScroll}
          >
            <section
              id={section.id}
              data-section
              className={`min-h-screen w-full snap-start scroll-mt-20 flex items-center justify-center bg-gradient-to-br ${section.bgGradient} ${
                section.id === "section-4" ? "py-20" : ""
              }`}
              aria-label={`Section ${index + 1}: ${section.title}`}
            >
              <div className="text-center px-8 max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                  {section.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
                  {section.description}
                </p>
                
                {/* Long content section */}
                {section.id === "section-4" && (
                  <div className="mt-12 space-y-6 text-white/80 max-w-3xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        Handling Variable-Length Sections
                      </h3>
                      <p className="mb-4">
                        When building snap scrolling interfaces, it's crucial to
                        handle sections of different lengths gracefully. This
                        section demonstrates how the implementation works with
                        longer content.
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>No snap-always:</strong> Removed forced
                          snapping to allow natural scrolling within long
                          sections
                        </li>
                        <li>
                          <strong>Framer Motion useInView:</strong> Now using
                          Framer Motion's useInView hook instead of manual
                          Intersection Observer
                        </li>
                        <li>
                          <strong>scroll-margin-top:</strong> Added to account
                          for the sticky header height
                        </li>
                        <li>
                          <strong>snap-proximity:</strong> Provides a balanced
                          experience between snapping and free scrolling
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        Best Practices
                      </h3>
                      <p className="mb-4">
                        Here are some key considerations when implementing snap
                        scrolling with variable content:
                      </p>
                      <ol className="list-decimal list-inside space-y-3">
                        <li>
                          Use <code className="bg-black/30 px-2 py-1 rounded">min-h-screen</code> as
                          a baseline, but allow sections to grow naturally
                        </li>
                        <li>
                          Test with both short and long content to ensure smooth
                          behavior
                        </li>
                        <li>
                          Consider mobile viewports where "long" is relative to
                          screen size
                        </li>
                        <li>
                          Provide keyboard navigation as an accessible
                          alternative
                        </li>
                        <li>
                          Use visual indicators (like the dots on the right) to
                          show progress
                        </li>
                      </ol>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        User Experience
                      </h3>
                      <p className="mb-4">
                        The goal is to provide a delightful scrolling experience
                        that feels natural and intuitive. Users should be able to:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Scroll freely within long sections</li>
                        <li>Experience smooth transitions between sections</li>
                        <li>Navigate using keyboard, mouse, or touch</li>
                        <li>Always know where they are in the content flow</li>
                      </ul>
                      <p className="mt-4 italic">
                        Try scrolling down within this section - notice how it
                        doesn't force you to the next section until you're ready!
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="text-white/70 text-sm mt-8">
                  Section {index + 1} of {sections.length}
                </div>
              </div>
            </section>
          </SectionTracker>
        ))}

        {/* Normal Footer (at the end of content) */}
        <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white px-8 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] snap-start">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">
                © 2025 Snap Scroll Demo
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70 hidden sm:inline">
                Use arrow keys or scroll to navigate
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    scrollToSection(Math.max(0, activeSection - 1))
                  }
                  disabled={activeSection === 0}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                  aria-label="Previous section"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    scrollToSection(
                      Math.min(sections.length - 1, activeSection + 1)
                    )
                  }
                  disabled={activeSection === sections.length - 1}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                  aria-label="Next section"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Navigation dots indicator */}
      <nav
        className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3"
        aria-label="Section navigation"
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-white scale-150 shadow-lg"
                : "bg-white/40 hover:bg-white/70 hover:scale-125"
            }`}
            aria-label={`Go to ${section.title}`}
            aria-current={activeSection === index ? "true" : "false"}
          />
        ))}
      </nav>
    </div>
  );
};

export default AnimationsPage;
