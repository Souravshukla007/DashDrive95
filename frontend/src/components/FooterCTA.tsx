"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const badges = [
  { icon: "🌿", label: "Eco Warrior", desc: "10+ EV rides taken", earned: true },
  { icon: "🏆", label: "Streak Master", desc: "7-day ride streak", earned: true },
  { icon: "⚡", label: "Speed Demon", desc: "Booked in <30 secs", earned: false },
  { icon: "🛡️", label: "Safe Rider", desc: "100 safe trips", earned: true },
  { icon: "🌟", label: "Top Rated", desc: "5-star average", earned: false },
  { icon: "🚀", label: "Early Adopter", desc: "First 1000 users", earned: true },
];

function StreakCalendar() {
  const days = ["M","T","W","T","F","S","S"];
  const filled = [true, true, true, true, true, false, false];
  return (
    <div className="flex gap-2 w-full justify-between mt-4">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              filled[i] ? "bg-primary text-dark-bg" : "bg-light-border text-text-muted"
            }`}
          >
            {filled[i] ? "✓" : d}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FooterCTA() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16" data-animation-on-scroll="">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Rewards Program</h2>
          <h3 className="text-3xl md:text-5xl font-secondary font-bold text-dark-bg leading-tight mb-4">
            Earn while you ride.
          </h3>
          <p className="text-text-muted text-lg">
            Unlock exclusive badges, maintain your daily streaks, and earn points redeemable for free premium rides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Streak Widget */}
          <motion.div
            data-animation-on-scroll=""
            data-animation-type="left"
            className="bg-light-bg rounded-3xl p-8 border border-light-border shadow-saas-sm flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-secondary font-bold text-2xl text-dark-bg">Ride Streak</h3>
                <p className="text-text-muted mt-1">Keep your daily streak alive!</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <span className="text-xl">🔥</span>
                <span className="font-secondary font-bold text-2xl">5</span>
                <span className="text-sm font-medium">days</span>
              </div>
            </div>

            <StreakCalendar />

            <div ref={progressRef}>
              <div className="flex justify-between text-sm font-medium text-dark-bg mb-2">
                <span>Progress to "Streak Master"</span>
                <span className="text-primary">5/7 days</span>
              </div>
              <div className="h-2 w-full rounded-full bg-light-border overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-[1200ms] ease-out"
                  style={{ width: animate ? "71%" : "0%" }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-light-border shadow-saas-sm mt-auto">
              <span className="text-3xl">🎁</span>
              <div>
                <p className="font-semibold text-dark-bg">2 more days = Free Premium Ride!</p>
                <p className="text-sm text-text-muted mt-1">Worth ₹200. Keep riding to unlock it.</p>
              </div>
            </div>
          </motion.div>

          {/* Badges Grid */}
          <motion.div
            data-animation-on-scroll=""
            data-animation-type="right"
            className="bg-white rounded-3xl p-8 border border-light-border shadow-saas-sm flex flex-col gap-6"
          >
            <h3 className="font-secondary font-bold text-2xl text-dark-bg">Achievement Badges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div
                  key={badge.label}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                    badge.earned 
                      ? "bg-primary/5 border-primary/20 hover:bg-primary/10" 
                      : "bg-light-bg border-transparent opacity-60 grayscale"
                  }`}
                >
                  <span className="text-3xl mb-2">{badge.icon}</span>
                  <span className={`text-sm font-bold text-center mb-1 ${badge.earned ? "text-dark-bg" : "text-text-muted"}`}>
                    {badge.label}
                  </span>
                  <span className="text-xs text-center text-text-muted leading-tight">
                    {badge.earned ? badge.desc : "🔒 Locked"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
