"use client";

interface HeaderProps {
  activeSection: number;
  totalSections: number;
}

export const Header = ({ activeSection, totalSections }: HeaderProps) => {
  return (
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
            Section {activeSection + 1}/{totalSections}
          </span>
        </div>
      </div>
    </header>
  );
};

