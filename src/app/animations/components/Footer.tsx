"use client";

interface FooterProps {
  activeSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

export const Footer = ({
  activeSection,
  totalSections,
  onNavigate,
}: FooterProps) => {
  return (
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
              onClick={() => onNavigate(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
              aria-label="Previous section"
            >
              ← Prev
            </button>
            <button
              onClick={() =>
                onNavigate(Math.min(totalSections - 1, activeSection + 1))
              }
              disabled={activeSection === totalSections - 1}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
              aria-label="Next section"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

