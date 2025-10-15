"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface SectionTrackerProps {
  children: React.ReactNode;
  index: number;
  onInView: (index: number) => void;
  isScrollingProgrammatically: boolean;
}

export const SectionTracker = ({
  children,
  index,
  onInView,
  isScrollingProgrammatically,
}: SectionTrackerProps) => {
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

