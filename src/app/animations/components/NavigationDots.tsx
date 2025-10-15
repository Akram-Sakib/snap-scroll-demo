"use client";

import { Section } from "./types";

interface NavigationDotsProps {
  sections: Section[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

export const NavigationDots = ({
  sections,
  activeSection,
  onNavigate,
}: NavigationDotsProps) => {
  return (
    <nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => onNavigate(index)}
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
  );
};

