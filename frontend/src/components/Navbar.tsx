"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5 transition-all duration-300">
      <div
        className={`w-full max-w-5xl rounded-full px-5 py-2.5 transition-all duration-300 flex items-center justify-between bg-white border border-neutral-100 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10 pl-1">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 12h10M12 7l3 5-3 5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight text-dark-bg">DashDrive</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-dark-bg transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-dark-bg hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/book" className="btn-saas btn-saas-primary text-xs py-2 px-5">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-dark-bg z-10 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-saas-lg border border-light-border"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-dark-bg hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="h-px w-full bg-light-border" />
              <div className="flex flex-col gap-3">
                <Link href="/login" className="btn-saas btn-saas-outline-light w-full text-center">Log in</Link>
                <Link href="/book" className="btn-saas btn-saas-primary w-full text-center">Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
