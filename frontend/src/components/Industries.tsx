"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Industries() {
  return (
    <section id="insights" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
        
        {/* Split Section 1: Security */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1" data-animation-on-scroll="" data-animation-type="left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-secondary font-bold text-dark-bg leading-tight mb-5">
              Secure payments with <br/> No Pin, No Pay.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Never worry about being charged for rides you didn't take. DashDrive's OTP-secured verification ensures the driver only begins the trip, and payment is only processed, when you provide the unique 4-digit PIN.
            </p>
            <ul className="flex flex-col gap-3">
              {['End-to-end encrypted transactions', 'Verified driver profiles', '24/7 incident support team'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-text-dark font-medium">
                  <span className="text-primary">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square" data-animation-on-scroll="" data-animation-type="right">
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-3 scale-105" />
            <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-saas-xl">
              <Image src="/images/login.jpg" alt="Security" fill unoptimized className="object-cover" />
            </div>
          </div>
        </div>

        {/* Split Section 2: Sustainability */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1" data-animation-on-scroll="" data-animation-type="right">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-secondary font-bold text-dark-bg leading-tight mb-5">
              Zero emissions. <br/> Maximum comfort.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Join the electric revolution. By choosing DashEV, you're not just getting a silent, premium ride—you're actively reducing the carbon footprint of your city.
            </p>
            <ul className="flex flex-col gap-3">
              {['100% electric premium hatchbacks', 'Zero tailpipe emissions', 'Noise-free comfortable travel'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-text-dark font-medium">
                  <span className="text-primary">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square" data-animation-on-scroll="" data-animation-type="left">
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] -rotate-3 scale-105" />
            <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-saas-xl">
              <Image src="/images/e-car.jpg" alt="Sustainability" fill unoptimized className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
