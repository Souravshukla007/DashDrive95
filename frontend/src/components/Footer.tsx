"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-light-bg overflow-hidden border-t border-light-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div data-animation-on-scroll="" data-animation-type="left">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Get in Touch</h2>
            <h3 className="text-3xl md:text-5xl font-secondary font-bold text-dark-bg leading-tight mb-6">
              We're here to help.
            </h3>
            <p className="text-text-muted text-lg mb-10">
              Have questions about booking a ride or becoming a driver partner? Send us a message and our team will get back to you shortly.
            </p>

            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="input-saas" />
                <input type="text" placeholder="Last Name" className="input-saas" />
              </div>
              <input type="email" placeholder="Email Address" className="input-saas" />
              <textarea placeholder="How can we help?" rows={4} className="input-saas resize-none" />
              <button type="button" className="btn-saas btn-saas-primary w-full md:w-auto mt-2">
                Send Message
              </button>
            </form>
          </div>

          <div data-animation-on-scroll="" data-animation-type="right" className="relative w-full h-[400px] lg:h-auto rounded-3xl overflow-hidden shadow-saas-md border border-light-border">
            <Image src="/images/maps.jpg" alt="HQ Location" fill unoptimized className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-dark-bg/10 mix-blend-overlay" />
            <div className="absolute bottom-6 left-6 right-6 glass-panel-dark rounded-2xl p-6 shadow-saas-lg">
              <h4 className="text-white font-bold text-lg mb-1">DashDrive HQ</h4>
              <p className="text-text-dim text-sm mb-4">Koramangala, Bengaluru, Karnataka, India</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:support@dashdrive.in" className="text-primary text-sm hover:underline">support@dashdrive.in</a>
                <a href="tel:+919876543210" className="text-primary text-sm hover:underline">+91 98765 43210</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-dark-bg pt-20 pb-10 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 12h10M12 7l3 5-3 5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-semibold text-xl tracking-tight text-white">DashDrive</span>
              </Link>
              <p className="text-text-dim text-sm leading-relaxed mb-6">
                India's most trusted ride-hailing platform. Connecting millions to safe, premium, and sustainable transport.
              </p>
              <div className="flex items-center gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-text-dim hover:text-primary hover:border-primary transition-colors">
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="flex flex-col gap-4">
                {([
                  { label: 'Features', href: '/#features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Security', href: '/privacy' },
                  { label: 'Enterprise', href: '/contact' },
                ] as { label: string; href: string }[]).map(({ label, href }) => (
                  <li key={label}><Link href={href} className="text-text-dim hover:text-white text-sm transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="flex flex-col gap-4">
                {([
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' },
                ] as { label: string; href: string }[]).map(({ label, href }) => (
                  <li key={label}><Link href={href} className="text-text-dim hover:text-white text-sm transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Download App</h4>
              <div className="flex flex-col gap-4">
                <a href="https://www.apple.com/in/app-store/" className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 w-full text-left overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-dark-bg/50 text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors relative z-10 shadow-inner">
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col relative z-10">
                    <span className="text-[10px] text-text-dim uppercase tracking-widest font-medium group-hover:text-white/80 transition-colors">Download on the</span>
                    <span className="text-base font-semibold text-white tracking-tight">App Store</span>
                  </div>
                </a>
                
                <a href="https://play.google.com/store/apps?hl=en_IN" className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 w-full text-left overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-dark-bg/50 text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors relative z-10 shadow-inner">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 ml-0.5">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col relative z-10">
                    <span className="text-[10px] text-text-dim uppercase tracking-widest font-medium group-hover:text-white/80 transition-colors">Get it on</span>
                    <span className="text-base font-semibold text-white tracking-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-dim text-sm">
              © {new Date().getFullYear()} DashDrive Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-text-dim hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-text-dim hover:text-white text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
