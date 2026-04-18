"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DummyDataBanner from "@/components/DummyDataBanner";

const categories = ["All", "Product", "Safety", "Driver Stories", "Company News", "City Spotlight"];

const posts = [
  {
    slug: "dashdrive-launches-ev-fleet",
    category: "Company News",
    title: "DashDrive Launches Its First All-EV Fleet in Bengaluru",
    excerpt: "We're taking a major step towards sustainable mobility — introducing 500 fully electric vehicles to our Bengaluru fleet starting this month.",
    date: "April 14, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800&auto=format&fit=crop&q=60",
    featured: true,
  },
  {
    slug: "surge-pricing-free-zones",
    category: "Product",
    title: "Introducing Surge-Free Zones: No More Unpredictable Fares",
    excerpt: "Our new Surge-Free Zone algorithm ensures stable pricing in high-demand areas during peak hours, so you always know what you'll pay.",
    date: "April 9, 2026",
    readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop&q=60",
    featured: false,
  },
  {
    slug: "driver-spotlight-suresh",
    category: "Driver Stories",
    title: "From Factory Worker to 5-Star Driver: Suresh's Journey",
    excerpt: "Meet Suresh Mahesh — a DashDrive driver who turned his life around and now earns triple his previous income, all on his own schedule.",
    date: "April 2, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    featured: false,
  },
  {
    slug: "real-time-safety-features",
    category: "Safety",
    title: "How Our Real-Time Safety System Protects Every Ride",
    excerpt: "An inside look at the AI-powered safety stack behind DashDrive — from trip monitoring to emergency SOS response times.",
    date: "March 27, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=60",
    featured: false,
  },
  {
    slug: "hyderabad-city-spotlight",
    category: "City Spotlight",
    title: "DashDrive Expands to Hyderabad: What to Expect",
    excerpt: "The City of Pearls is next on our map. Here's everything you need to know about DashDrive's Hyderabad launch.",
    date: "March 19, 2026",
    readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
    featured: false,
  },
  {
    slug: "schedule-ride-feature",
    category: "Product",
    title: "Never Miss a Flight Again: Schedule Your Ride Days in Advance",
    excerpt: "Our new Schedule Ride feature lets you book rides up to 7 days in advance — perfect for airport runs, meetings, or any time-sensitive trip.",
    date: "March 12, 2026",
    readTime: "2 min read",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);
  const featured = posts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== "All");

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <DummyDataBanner message="Demo Content Only. The blog posts, authors, and dates shown here are illustrative placeholders and do not represent real published articles." />
      </div>

      {/* Hero */}
      <section className="pt-12 pb-16 bg-white border-b border-light-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Blog</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
            Stories, Updates & Insights
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg">
            The latest from the DashDrive team — product updates, driver stories, and the road ahead.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-6xl mx-auto px-6">

          {/* Featured Post */}
          {activeCategory === "All" && featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl border border-light-border shadow-saas-md overflow-hidden mb-10 hover:shadow-saas-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="relative h-64 lg:h-auto min-h-[280px]">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">{featured.category}</span>
                <h2 className="font-secondary font-bold text-2xl text-dark-bg mb-3 leading-snug group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat ? "bg-dark-bg text-white" : "bg-white text-text-muted border border-light-border hover:border-dark-bg hover:text-dark-bg"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Post Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="group bg-white rounded-2xl border border-light-border overflow-hidden hover:shadow-saas-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-3">{post.category}</span>
                    <h3 className="font-bold text-dark-bg text-base leading-snug mb-2 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-text-muted mt-auto pt-4 border-t border-light-border">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
}
