"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-light-bg overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16" data-animation-on-scroll="">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Impact</h2>
          <h3 className="text-3xl md:text-5xl font-secondary font-bold text-dark-bg leading-tight mb-4">
            Driving real change.
          </h3>
          <p className="text-text-muted text-lg">
            DashDrive isn't just about moving people. It's about moving the world forward sustainably.
          </p>
        </div>

        {/* Dashboard Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { label: "Total Rides Completed", target: 2000000, suffix: "+", highlight: false },
            { label: "EV Fleet Usage", target: 65, suffix: "%", highlight: true },
            { label: "CO₂ Emissions Saved (Tons)", target: 12500, suffix: "", highlight: false },
          ].map((stat, i) => (
            <div 
              key={i}
              data-animation-on-scroll=""
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-saas-sm border ${
                stat.highlight ? "bg-dark-bg border-dark-bg text-white" : "bg-white border-light-border text-dark-bg"
              }`}
            >
              <h4 className={`text-5xl font-secondary font-bold mb-3 ${stat.highlight ? "text-primary" : ""}`}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h4>
              <p className={`text-sm uppercase tracking-wider font-medium ${stat.highlight ? "text-white/70" : "text-text-muted"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scrolling Ticker */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6" data-animation-on-scroll="">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-light-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-light-bg to-transparent z-10" />
          
          <div className="flex w-max" style={{ animation: "ticker 40s linear infinite" }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6 pr-6">
                {[
                  { text: "DashDrive's EVs have cut my commute costs by 30%.", author: "Rahul M." },
                  { text: "The hospital on road feature saved my father's life.", author: "Priya S." },
                  { text: "Clean UI, faster pickups. Easily the best app in India.", author: "Arjun K." },
                  { text: "No Pin No Pay gives me peace of mind every single time.", author: "Sneha R." },
                ].map((testimonial, j) => (
                  <div key={j} className="w-80 bg-white rounded-2xl p-6 shadow-saas-sm border border-light-border">
                    <div className="flex gap-1 text-primary text-sm mb-3">★★★★★</div>
                    <p className="text-dark-bg font-medium leading-relaxed mb-4">"{testimonial.text}"</p>
                    <p className="text-sm text-text-muted">— {testimonial.author}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
