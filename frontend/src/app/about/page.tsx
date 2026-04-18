"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DummyDataBanner from "@/components/DummyDataBanner";

const stats = [
  { value: "4M+", label: "Rides Completed" },
  { value: "12+", label: "Cities Served" },
  { value: "50K+", label: "Driver Partners" },
  { value: "4.9★", label: "Average Rating" },
];

const team = [
  { name: "Arjun Mehta", role: "CEO & Co-Founder", img: "https://i.pravatar.cc/150?img=11" },
  { name: "Priya Sharma", role: "CTO & Co-Founder", img: "https://i.pravatar.cc/150?img=5" },
  { name: "Rohit Das", role: "Head of Operations", img: "https://i.pravatar.cc/150?img=15" },
  { name: "Sneha Iyer", role: "Chief Design Officer", img: "https://i.pravatar.cc/150?img=9" },
];

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safety First",
    desc: "Every ride, every driver, every journey — safety is our non-negotiable priority.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Always On Time",
    desc: "We respect your schedule. Predictable ETAs and on-time pickups, guaranteed.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Transparency",
    desc: "No hidden fees, no surprises. What you see is what you pay.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: "Sustainability",
    desc: "Committed to a greener India — expanding our EV fleet city by city.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <DummyDataBanner message="Demo Content Only. The team members, company statistics, and story details on this page are illustrative placeholders and do not reflect the real DashDrive organisation." />
      </div>

      {/* Hero */}
      <section className="pt-12 pb-20 bg-white border-b border-light-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-6xl text-dark-bg mb-6 leading-tight">
            Moving India, one ride at a time.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            DashDrive was founded in 2021 with a single mission: to make every journey in India safe, affordable, and dependable. From Bengaluru to beyond, we're building the transport layer for modern India.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-light-bg border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="text-4xl font-bold text-dark-bg font-secondary mb-1">{s.value}</p>
              <p className="text-text-muted text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white border-b border-light-border">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-3xl font-secondary font-bold text-dark-bg mb-5 leading-snug">Born from frustration,<br />built with purpose.</h2>
            <p className="text-text-muted leading-relaxed mb-4">Our founders Arjun and Priya were daily commuters who were tired of surge pricing, unreliable drivers, and opaque fare calculations. In 2021, they decided to build the platform they always wished existed.</p>
            <p className="text-text-muted leading-relaxed mb-4">Today, DashDrive operates in 12+ cities across India, with a fleet of 50,000 driver partners and over 4 million rides completed. We're just getting started.</p>
            <Link href="/book" className="btn-saas btn-saas-primary mt-4 inline-flex">Book a Ride Today →</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[380px] rounded-3xl overflow-hidden shadow-saas-lg border border-light-border">
            <Image src="/images/maps.jpg" alt="DashDrive Story" fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-light-bg border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-3xl font-secondary font-bold text-dark-bg">Our core values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="group flex gap-5 p-6 bg-white rounded-2xl border border-light-border hover:border-primary/40 hover:shadow-saas-sm hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-dark-bg mb-1">{v.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">The People</p>
            <h2 className="text-3xl font-secondary font-bold text-dark-bg">Meet the team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="group flex flex-col items-center text-center gap-3 p-5 bg-light-bg rounded-2xl border border-light-border hover:border-primary/40 hover:shadow-saas-sm hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-dark-bg text-sm">{member.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
