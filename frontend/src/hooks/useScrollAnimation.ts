"use client";

import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll("[data-animation-on-scroll]");
    
    elements.forEach((el) => {
      const element = el as HTMLElement;
      const delay = element.dataset.animationDelay || "0s";
      element.style.transitionDelay = delay;

      observer.observe(element);
    });

    const loopElements = document.querySelectorAll("[data-animation-loop]");
    loopElements.forEach((el) => {
      const element = el as HTMLElement;
      if (element.dataset.animationLoop === "float") {
        element.classList.add("animation-float");
      }
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
}
