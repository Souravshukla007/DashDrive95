"use client";

import { useEffect } from "react";

export default function ScrollAnimationInitializer() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll("[data-animation-on-scroll]");
      elements.forEach((el) => {
        const delay = el.getAttribute("data-animation-delay") || "0s";
        (el as HTMLElement).style.transitionDelay = delay;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    // Animated counters
    const counters = document.querySelectorAll("[data-counter]");
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.getAttribute("data-counter") || "0", 10);
          const suffix = el.getAttribute("data-counter-suffix") || "";
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    animateElements();

    document.querySelectorAll("[data-animation-on-scroll]").forEach((el) => {
      observer.observe(el);
    });

    counters.forEach((el) => counterObserver.observe(el));

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
