"use client";

import { motion } from "framer-motion";

const features = [
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ), 
    title: "Instant Booking", 
    desc: "Match with nearby drivers in seconds using our real-time spatial routing engine." 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ), 
    title: "Scheduled Rides", 
    desc: "Plan ahead and schedule your airport transfers or daily commutes with guaranteed reliability." 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ), 
    title: "Hospital on Road", 
    desc: "One-tap emergency transport dispatch with priority routing to the nearest healthcare facility." 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ), 
    title: "No Pin, No Pay", 
    desc: "OTP-secured rides ensure you only pay when you reach your destination safely." 
  },
];

export default function DrivingChange() {
  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16" data-animation-on-scroll="">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Platform Features</h2>
          <h3 className="text-3xl md:text-5xl font-secondary font-bold text-dark-bg leading-tight mb-4">
            Everything you need for a seamless journey.
          </h3>
          <p className="text-text-muted text-lg">
            We've completely re-engineered the ride-hailing experience with modern tools built for speed, safety, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              data-animation-on-scroll=""
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group bg-white rounded-2xl p-8 border border-light-border shadow-saas-sm hover:shadow-saas-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-dark-bg mb-3">{feature.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
