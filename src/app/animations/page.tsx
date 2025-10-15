"use client";

import {
  sections,
  SectionTracker,
  SectionContent,
  Header,
  Footer,
  NavigationDots,
} from "./components";
import { useSnapScrolling } from "./hooks";

const AnimationsPage = () => {
  const {
    activeSection,
    isProgrammaticScroll,
    containerRef,
    handleSectionInView,
    scrollToSection,
  } = useSnapScrolling();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main scroll container with snap */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        role="region"
        aria-label="Snap scrolling demo sections"
      >
        {/* Sticky Header */}
        <Header activeSection={activeSection} totalSections={sections.length} />

        {/* Sections */}
        {sections.map((section, index) => (
          <SectionTracker
            key={section.id}
            index={index}
            onInView={handleSectionInView}
            isScrollingProgrammatically={isProgrammaticScroll}
          >
            <SectionContent
              section={section}
              index={index}
              totalSections={sections.length}
            />
          </SectionTracker>
        ))}

        {/* Footer */}
        <Footer
          activeSection={activeSection}
          totalSections={sections.length}
          onNavigate={scrollToSection}
        />
      </div>

      {/* Navigation dots indicator */}
      <NavigationDots
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </div>
  );
};

export default AnimationsPage;
