import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offset = 120) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const callback: IntersectionObserverCallback = (entries) => {
      let active = '';
      let minDistance = Infinity;

      // Because multiple could intersect, find the one closest to the top offset
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const distance = Math.abs(rect.top - offset);
          if (distance < minDistance) {
            minDistance = distance;
            active = entry.target.id;
          }
        }
      });

      if (active) {
        setActiveSection(active);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: `-${offset}px 0px -40% 0px`, // Start triggering when it reaches the offset area
      threshold: [0, 0.2, 0.5, 0.8, 1], // Provide multiple thresholds for smoother updates
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeSection;
}
