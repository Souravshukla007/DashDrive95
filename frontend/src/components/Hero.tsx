"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[680px] flex justify-center items-center pt-20 md:pt-24 overflow-hidden bg-dark-bg">
      
      {/* Background Image with Mix-Blend Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/6194882/pexels-photo-6194882.jpeg?w=1920&h=1080&fit=crop"
          alt="Modern eco-friendly transport"
          fill
          unoptimized
          priority
          className="object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1640px] px-6 h-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end pb-8 md:pb-16 gap-8 md:gap-12">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-3xl flex flex-col gap-6 md:gap-8">
          <motion.h1 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary font-medium text-3xl md:text-6xl lg:text-[72px] leading-[1.15] text-white"
          >
            The modern way to <span className="text-primary">move your city.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white opacity-90 text-base md:text-xl max-w-xl leading-relaxed"
          >
            Seamless, fast, and forward-thinking ride-hailing solutions that lower your emissions while boosting convenience.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mt-2"
          >
            <Link 
              href="/book" 
              className="inline-flex items-center justify-center bg-primary text-dark-bg font-medium px-8 py-3.5 rounded-full text-base md:text-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              Book a Ride Now
            </Link>
          </motion.div>
        </div>

        {/* Right Floating Card */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[380px] lg:w-[420px] bg-white rounded-xl overflow-hidden flex flex-col self-center md:self-end shadow-2xl shrink-0 border border-light-border relative"
        >
          <div style={{ animation: "float 6s ease-in-out infinite" }} className="w-full flex flex-col">
            <div className="p-5 md:p-6 pb-3 md:pb-4">
              <h3 className="font-primary text-lg md:text-xl font-medium text-dark-bg leading-tight">
                Discover how smart routing transforms city travel
              </h3>
            </div>
            
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden mb-4 md:mb-6 relative">
                <Image 
                  src="https://images.pexels.com/photos/5312253/pexels-photo-5312253.jpeg?w=800&h=400&fit=crop" 
                  alt="Green city infrastructure" 
                  fill
                  unoptimized
                  className="object-cover" 
                />
              </div>
              
              <div className="flex items-center justify-between gap-4 text-center">
                <div className="flex-1 flex flex-col gap-1 md:gap-2">
                  <span className="text-[10px] md:text-sm text-text-muted leading-snug">CO₂ emissions saved</span>
                  <span className="font-primary text-xl md:text-2xl font-medium text-dark-bg">85K+</span>
                </div>
                
                <div className="w-px h-12 md:h-16 border-l border-dashed border-light-border"></div>
                
                <div className="flex-1 flex flex-col gap-1 md:gap-2">
                  <span className="text-[10px] md:text-sm text-text-muted leading-snug">ETA reduction via AI</span>
                  <span className="font-primary text-xl md:text-2xl font-medium text-dark-bg">30%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
