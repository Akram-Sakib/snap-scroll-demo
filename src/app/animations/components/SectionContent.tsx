"use client";

import { Section } from "./types";

interface SectionContentProps {
  section: Section;
  index: number;
  totalSections: number;
}

export const SectionContent = ({
  section,
  index,
  totalSections,
}: SectionContentProps) => {
  return (
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
          Section {index + 1} of {totalSections}
        </div>
      </div>
    </section>
  );
};

