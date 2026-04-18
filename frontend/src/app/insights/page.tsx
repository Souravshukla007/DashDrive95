"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DummyDataBanner from "@/components/DummyDataBanner";

// ─── Data ────────────────────────────────────────────────────────────────────

const kpis = [
  { value: 4200000, suffix: "+", label: "Total Rides", icon: "🚗", growth: "+18% vs last quarter" },
  { value: 50000, suffix: "+", label: "Driver Partners", icon: "👨‍✈️", growth: "+12% vs last quarter" },
  { value: 12, suffix: "", label: "Cities Active", icon: "🏙️", growth: "+3 new this year" },
  { value: 98.4, suffix: "%", label: "Completion Rate", icon: "✅", growth: "+0.6% vs last year" },
];

const monthlyRides = [
  { month: "Oct", rides: 310000 },
  { month: "Nov", rides: 340000 },
  { month: "Dec", rides: 390000 },
  { month: "Jan", rides: 420000 },
  { month: "Feb", rides: 400000 },
  { month: "Mar", rides: 460000 },
  { month: "Apr", rides: 480000 },
];

const cityStats = [
  { city: "Bengaluru", rides: 1800000, drivers: 22000, rating: 4.91, growth: 22 },
  { city: "Mumbai",    rides: 900000,  drivers: 11000, rating: 4.88, growth: 15 },
  { city: "Delhi",     rides: 750000,  drivers: 9000,  rating: 4.85, growth: 19 },
  { city: "Hyderabad", rides: 380000,  drivers: 4800,  rating: 4.90, growth: 31 },
  { city: "Chennai",   rides: 210000,  drivers: 2600,  rating: 4.87, growth: 14 },
  { city: "Pune",      rides: 160000,  drivers: 2100,  rating: 4.89, growth: 27 },
];

const vehicleBreakdown = [
  { type: "DashCab",  pct: 42, color: "#7eea57" },
  { type: "DashBike", pct: 28, color: "#212121" },
  { type: "DashAuto", pct: 18, color: "#a8f58a" },
  { type: "DashEV",   pct: 12, color: "#4caf50" },
];

const safetyMetrics = [
  { label: "Background-verified drivers", value: "100%", bar: 100 },
  { label: "Rides with real-time tracking", value: "100%", bar: 100 },
  { label: "Incidents resolved < 24h", value: "97.2%", bar: 97 },
  { label: "Rides rated 4★ or above", value: "94.8%", bar: 95 },
  { label: "Emergency SOS response < 3 min", value: "99.1%", bar: 99 },
];

const peakHours = [
  { hour: "6am",  pct: 45 }, { hour: "7am",  pct: 72 }, { hour: "8am",  pct: 95 },
  { hour: "9am",  pct: 85 }, { hour: "10am", pct: 55 }, { hour: "11am", pct: 42 },
  { hour: "12pm", pct: 48 }, { hour: "1pm",  pct: 50 }, { hour: "2pm",  pct: 38 },
  { hour: "3pm",  pct: 40 }, { hour: "4pm",  pct: 58 }, { hour: "5pm",  pct: 82 },
  { hour: "6pm",  pct: 100 }, { hour: "7pm", pct: 92 }, { hour: "8pm",  pct: 70 },
  { hour: "9pm",  pct: 52 }, { hour: "10pm", pct: 35 }, { hour: "11pm", pct: 20 },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = target >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : target >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : target % 1 !== 0
    ? count.toFixed(1)
    : count.toString();

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const maxRides = Math.max(...monthlyRides.map(m => m.rides));

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <DummyDataBanner message="Demo Data Only. All statistics, ride volumes, city figures, and safety metrics on this page are illustrative placeholders and do not reflect real DashDrive operational data." />
      </div>

      {/* ── Hero ── */}
      <section className="pt-12 pb-20 bg-white border-b border-light-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Platform Insights</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
            DashDrive by the numbers.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg max-w-2xl mx-auto">
            Real-time platform analytics, city performance reports, safety data, and trends across India's fastest-growing ride-hailing network.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-text-muted mt-4">
            Data updated: April 2026 · Q2 FY2026–27
          </motion.p>
        </div>
      </section>

      {/* ── KPI Cards ── */}
      <section className="py-16 bg-light-bg border-b border-light-border">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 border border-light-border shadow-saas-sm hover:border-primary/40 hover:shadow-saas-md hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl mb-3 block">{kpi.icon}</span>
              <p className="text-3xl font-bold text-dark-bg font-secondary mb-1">
                <AnimatedNumber target={kpi.value} suffix={kpi.suffix} />
              </p>
              <p className="text-sm font-semibold text-text-muted mb-2">{kpi.label}</p>
              <p className="text-xs text-primary font-semibold">{kpi.growth}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Monthly Rides Bar Chart ── */}
      <section className="py-20 bg-white border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Ride Volume</p>
              <h2 className="text-2xl font-secondary font-bold text-dark-bg">Monthly Rides (Oct 2025 – Apr 2026)</h2>
            </div>
            <span className="text-xs text-text-muted hidden md:block">Hover bars to see details</span>
          </div>

          <div className="flex items-end gap-3 h-56 relative">
            {/* Y-axis grid lines */}
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} className="absolute left-0 right-0 border-t border-light-border/70" style={{ bottom: `${pct}%` }}>
                <span className="absolute -left-10 -top-2.5 text-[10px] text-text-muted w-9 text-right">{(maxRides * pct / 100 / 1000).toFixed(0)}K</span>
              </div>
            ))}
            {monthlyRides.map((m, i) => {
              const heightPct = (m.rides / maxRides) * 100;
              return (
                <div key={m.month} className="flex-1 h-full flex flex-col justify-end items-center gap-2 relative group"
                  onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                  {hoveredBar === i && (
                    <div className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 bg-dark-bg text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg mb-2">
                      {(m.rides / 1000).toFixed(0)}K rides
                    </div>
                  )}
                  <div className="flex-1 w-full flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`w-full rounded-t-xl transition-all duration-200 cursor-default ${
                        hoveredBar === i ? "bg-primary" : "bg-primary/30 hover:bg-primary/60"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-text-muted">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Peak Hours Heatmap ── */}
      <section className="py-20 bg-light-bg border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Demand Patterns</p>
            <h2 className="text-2xl font-secondary font-bold text-dark-bg">Peak Ride Hours</h2>
            <p className="text-text-muted text-sm mt-1">Average booking demand across all cities by hour of day</p>
          </div>
          <div className="bg-white rounded-2xl border border-light-border p-6 shadow-saas-sm">
            <div className="flex items-end gap-1.5 h-36">
              {peakHours.map((h, i) => (
                <div key={h.hour} className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group">
                  <div className="flex-1 w-full relative">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h.pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                      viewport={{ once: true }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        borderRadius: "6px 6px 0 0",
                        background: h.pct >= 80 ? "#7eea57" : h.pct >= 50 ? "#a8f58a" : "#d4f7c5",
                      }}
                      className="transition-all duration-200 cursor-default hover:opacity-80"
                      title={`${h.hour}: ${h.pct}% demand`}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-text-muted">{h.hour}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-light-border">
              {[["#7eea57", "High (80–100%)"], ["#a8f58a", "Medium (50–79%)"], ["#d4f7c5", "Low (<50%)"]].map(([color, label]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="text-xs text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── City Performance ── */}
      <section className="py-20 bg-white border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">City Breakdown</p>
            <h2 className="text-2xl font-secondary font-bold text-dark-bg">Performance by City</h2>
          </div>
          <div className="bg-white rounded-2xl border border-light-border shadow-saas-sm overflow-hidden">
            <div className="grid grid-cols-5 bg-light-bg border-b border-light-border px-5 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">
              <span className="col-span-1">City</span>
              <span className="text-right">Rides</span>
              <span className="text-right">Drivers</span>
              <span className="text-right">Rating</span>
              <span className="text-right">QoQ Growth</span>
            </div>
            {cityStats.map((city, i) => (
              <motion.div key={city.city} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                onMouseEnter={() => setHoveredCity(city.city)} onMouseLeave={() => setHoveredCity(null)}
                className={`grid grid-cols-5 px-5 py-4 border-b border-light-border last:border-b-0 transition-colors duration-200 ${hoveredCity === city.city ? "bg-primary/5" : ""}`}>
                <span className="font-bold text-dark-bg text-sm col-span-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  {city.city}
                </span>
                <span className="text-right text-sm text-text-muted font-medium">{(city.rides / 1000000).toFixed(1)}M</span>
                <span className="text-right text-sm text-text-muted font-medium">{(city.drivers / 1000).toFixed(1)}K</span>
                <span className="text-right text-sm font-bold text-dark-bg">★ {city.rating}</span>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 bg-light-border rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${city.growth}%` }} transition={{ duration: 0.8, delay: i * 0.07 }} viewport={{ once: true }}
                      className="h-full bg-primary rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-primary">+{city.growth}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vehicle Breakdown + Safety ── */}
      <section className="py-20 bg-light-bg border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Vehicle Mix */}
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Fleet</p>
            <h2 className="text-xl font-secondary font-bold text-dark-bg mb-6">Ride Type Breakdown</h2>
            <div className="bg-white rounded-2xl border border-light-border p-6 shadow-saas-sm flex flex-col gap-5">
              {vehicleBreakdown.map((v, i) => (
                <motion.div key={v.type} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-dark-bg">{v.type}</span>
                    <span className="text-sm font-bold" style={{ color: v.color === "#212121" ? "#212121" : v.color }}>{v.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-light-bg rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${v.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }} viewport={{ once: true }}
                      className="h-full rounded-full" style={{ background: v.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Safety Metrics */}
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Safety</p>
            <h2 className="text-xl font-secondary font-bold text-dark-bg mb-6">Platform Safety Metrics</h2>
            <div className="bg-white rounded-2xl border border-light-border p-6 shadow-saas-sm flex flex-col gap-5">
              {safetyMetrics.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-text-muted font-medium">{m.label}</span>
                    <span className="text-sm font-bold text-primary">{m.value}</span>
                  </div>
                  <div className="w-full h-2 bg-light-bg rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.bar}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }} viewport={{ once: true }}
                      className="h-full rounded-full bg-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Environmental Impact ── */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Sustainability</p>
            <h2 className="text-2xl font-secondary font-bold text-white">Environmental Impact</h2>
            <p className="text-text-dim text-sm mt-2">DashDrive's commitment to a greener India — FY2026 numbers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: "1.2M", label: "kg CO₂ saved", sub: "vs equivalent private car trips", icon: "🌿" },
              { value: "8,500+", label: "EV rides/day", sub: "across Bengaluru & Mumbai", icon: "⚡" },
              { value: "28%", label: "EV fleet share", sub: "target: 60% by 2027", icon: "🔋" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/5">
                <span className="text-3xl mb-3">{stat.icon}</span>
                <p className="text-3xl font-bold text-primary font-secondary mb-1">{stat.value}</p>
                <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-text-dim text-xs">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-light-bg border-t border-light-border">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-secondary font-bold text-dark-bg mb-3">Want deeper analytics?</h2>
          <p className="text-text-muted text-sm mb-6">Access full API-level data and custom city reports with a DashDrive Enterprise account.</p>
          <a href="/contact" className="btn-saas btn-saas-primary shadow-saas-md">Talk to Enterprise Sales →</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
