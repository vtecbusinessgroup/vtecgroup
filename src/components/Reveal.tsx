import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper matching the Our Story page's `.reveal` behavior exactly:
 * starts at opacity:0, translateY(28px); animates to opacity:1, translateY(0)
 * over 0.8s ease, triggered once via IntersectionObserver (threshold 0.12,
 * rootMargin "0px 0px -40px 0px"), then stops observing. Falls back to
 * immediately visible if IntersectionObserver is unavailable, and respects
 * prefers-reduced-motion by skipping the animation (content is always visible,
 * only the transition is suppressed).
 *
 * Usage: <Reveal><h2>Section title</h2></Reveal>
 * Optional stagger delay: <Reveal delay={150}>...</Reveal>
 *
 * Place this file at: src/components/Reveal.tsx
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
