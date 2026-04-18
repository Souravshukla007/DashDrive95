"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DummyDataBanner from "@/components/DummyDataBanner";

const departments = ["All", "Engineering", "Design", "Operations", "Sales", "Support"];

const jobs = [
  { title: "Senior Backend Engineer", dept: "Engineering", location: "Bengaluru · Hybrid", type: "Full-time", level: "Senior" },
  { title: "React Native Developer", dept: "Engineering", location: "Remote · India", type: "Full-time", level: "Mid-level" },
  { title: "DevOps Engineer", dept: "Engineering", location: "Bengaluru · On-site", type: "Full-time", level: "Mid-level" },
  { title: "Product Designer", dept: "Design", location: "Bengaluru · Hybrid", type: "Full-time", level: "Mid-level" },
  { title: "UX Researcher", dept: "Design", location: "Remote · India", type: "Contract", level: "Senior" },
  { title: "City Operations Manager", dept: "Operations", location: "Mumbai", type: "Full-time", level: "Manager" },
  { title: "Fleet Expansion Lead", dept: "Operations", location: "Delhi", type: "Full-time", level: "Senior" },
  { title: "B2B Sales Executive", dept: "Sales", location: "Hyderabad", type: "Full-time", level: "Mid-level" },
  { title: "Customer Support Specialist", dept: "Support", location: "Remote · India", type: "Full-time", level: "Junior" },
];

const perks = [
  { icon: "🏥", title: "Health Insurance", desc: "Full medical, dental & vision coverage for you and your family." },
  { icon: "🌍", title: "Remote Friendly", desc: "Flexible work arrangements for most roles across India." },
  { icon: "📚", title: "Learning Budget", desc: "₹30,000/year for courses, conferences, and books." },
  { icon: "🏖️", title: "Unlimited PTO", desc: "Take the time you need to recharge and come back fresh." },
  { icon: "💰", title: "ESOPs", desc: "Equity participation for full-time employees at all levels." },
  { icon: "🚗", title: "Free DashDrive Rides", desc: "Unlimited rides for personal use within your city." },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");

  const filtered = activeDept === "All" ? jobs : jobs.filter(j => j.dept === activeDept);

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <DummyDataBanner message="Demo Listings Only. The job openings, locations, and perks listed here are illustrative placeholders and do not represent active DashDrive recruitment." />
      </div>

      {/* Hero */}
      <section className="pt-12 pb-20 bg-white border-b border-light-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Careers</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-6xl text-dark-bg mb-6 leading-tight">
            Build the future of mobility.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Join a passionate team working to transform how India moves. We're always looking for curious, driven people to help us build something extraordinary.
          </motion.p>
          <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} href="#openings" className="btn-saas btn-saas-primary shadow-saas-md">
            See Open Roles ↓
          </motion.a>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-light-bg border-b border-light-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Why DashDrive</p>
            <h2 className="text-3xl font-secondary font-bold text-dark-bg">Perks & Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, i) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="group flex gap-4 p-5 bg-white rounded-2xl border border-light-border hover:border-primary/40 hover:shadow-saas-sm hover:-translate-y-1 transition-all duration-300">
                <span className="text-2xl shrink-0">{perk.icon}</span>
                <div>
                  <h3 className="font-bold text-dark-bg text-sm mb-1">{perk.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Open Positions</p>
            <h2 className="text-3xl font-secondary font-bold text-dark-bg">{jobs.length} roles available</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {departments.map(dept => (
              <button key={dept} onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeDept === dept ? "bg-dark-bg text-white shadow-sm" : "bg-light-bg text-text-muted border border-light-border hover:border-dark-bg hover:text-dark-bg"
                }`}>
                {dept}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeDept} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
              {filtered.map((job) => (
                <motion.div key={job.title} layout
                  className="group flex items-center justify-between gap-4 p-5 bg-light-bg rounded-2xl border border-light-border hover:border-primary/40 hover:shadow-saas-sm hover:bg-white transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-dark-bg group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{job.dept}</span>
                      <span className="text-xs text-text-muted">{job.location}</span>
                      <span className="text-xs text-text-muted">· {job.type}</span>
                      <span className="text-xs text-text-muted">· {job.level}</span>
                    </div>
                  </div>
                  <button className="btn-saas bg-white border border-light-border text-dark-bg text-sm font-semibold hover:border-primary hover:text-primary shrink-0 shadow-sm transition-all">
                    Apply →
                  </button>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-text-muted py-12">No openings in this department right now. Check back soon!</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
}
