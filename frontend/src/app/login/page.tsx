"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { loginAction, registerAction } from "../actions/auth";

const bgSlides = [
  { src: "/images/login.jpg", quote: "Enterprise-grade security.", sub: "Every ride secured with end-to-end encryption and No Pin No Pay." },
  { src: "/images/maps.jpg", quote: "Millions trust DashDrive.", sub: "4M+ rides completed safely across 12 cities in India." },
  { src: "/images/booked.jpg", quote: "Your driver is on the way.", sub: "Real-time tracking and verified drivers, always." },
];

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [loginState, formLoginAction, isLoginPending] = useActionState(loginAction, null);
  const [registerState, formRegisterAction, isRegisterPending] = useActionState(registerAction, null);

  const error = isLogin ? loginState?.error : registerState?.error;
  const isPending = isLogin ? isLoginPending : isRegisterPending;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % bgSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = bgSlides[slideIndex];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* === Full-Screen Background (opacity-only crossfade — no scale, no full-screen blur) === */}
      <div className="absolute inset-0 z-0">
        {bgSlides.map((slide, i) => (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === slideIndex ? 1 : 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{ willChange: "opacity" }}
          >
            <Image src={slide.src} alt="bg" fill priority={i === 0} unoptimized className="object-cover" />
          </motion.div>
        ))}
        {/* Single static dark overlay — no backdrop-blur on full screen */}
        <div className="absolute inset-0 bg-dark-bg/65" />
        {/* Static decorative orbs — no animation to avoid continuous repaints */}
        <div className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* === Layout: Form Left / Branding Right === */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 md:px-10 py-12">

        {/* ---- Glassmorphic Form ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "2rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
            willChange: "transform",
          }}
        >
          <div className="p-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-8 w-fit">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-saas-glow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 12h10M12 7l3 5-3 5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">DashDrive</span>
            </Link>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div key={isLogin ? "login" : "signup"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <h2 className="text-3xl font-secondary font-bold text-white mb-1.5">
                  {isLogin ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-white/60 text-sm mb-7">
                  {isLogin ? "Sign in to continue your journey." : "Join millions riding safely with DashDrive."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <form action={isLogin ? formLoginAction : formRegisterAction} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-white/30 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                      onFocus={e => (e.target.style.borderColor = "rgba(126,234,87,0.7)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-white/30 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(126,234,87,0.7)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(126,234,87,0.7)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors">
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-semibold text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <button type="submit" disabled={isPending}
                className="w-full py-3.5 mt-2 rounded-xl font-bold text-dark-bg text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-saas-glow disabled:opacity-50 disabled:hover:translate-y-0"
                style={{ background: "linear-gradient(135deg, #7eea57 0%, #6ad148 100%)" }}>
                {isPending ? "Please wait..." : isLogin ? "Sign In →" : "Create Account →"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              <span className="text-xs text-white/40 font-medium">or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* Google Button */}
            <button type="button"
              className="group w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <svg viewBox="0 0 48 48" className="w-5 h-5 transition-transform group-hover:scale-110 duration-200">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.238-2.657-.611-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.238-2.657-.611-3.917z"/>
              </svg>
              Continue with Google
            </button>

            {/* Switch Mode */}
            <p className="text-center text-sm text-white/50 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-primary hover:underline transition-colors">
                {isLogin ? "Sign up free" : "Log in"}
              </button>
            </p>
          </div>
        </motion.div>

        {/* ---- Right: Branding / Testimonial ---- */}
        <div className="hidden md:flex flex-1 flex-col justify-end gap-6 pl-6 pb-4">
          <AnimatePresence mode="wait">
            <motion.div key={slideIndex} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-saas-glow backdrop-blur-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7eea57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-secondary font-bold text-white leading-tight max-w-md">
                {currentSlide.quote}
              </h2>
              <p className="text-white/60 text-lg max-w-sm leading-relaxed">{currentSlide.sub}</p>
            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <div className="flex items-center gap-2 mt-4">
            {bgSlides.map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? "w-8 bg-primary" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>

          {/* Trust badge row */}
          <div className="flex items-center gap-6 mt-2">
            {[["4M+", "Rides"], ["4.9★", "Rating"], ["50K+", "Drivers"]].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-white font-bold text-xl">{val}</span>
                <span className="text-white/50 text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
