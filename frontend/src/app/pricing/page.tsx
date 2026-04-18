"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Basic",
    desc: "For the occasional rider",
    monthly: 0,
    yearly: 0,
    features: ["Standard support", "Pay-per-ride pricing", "Basic vehicle selection", "Digital receipts"],
    highlight: false,
    cta: "Sign Up Free",
    color: "border-light-border",
  },
  {
    name: "Dash+ Pro",
    desc: "For daily commuters",
    monthly: 199,
    yearly: 1990,
    features: ["Priority booking", "No surge pricing", "Zero cancellation fees", "Dedicated support line", "10% off all rides"],
    highlight: true,
    cta: "Get Dash+ Pro",
    color: "border-primary",
  },
  {
    name: "Dash+ Premium",
    desc: "For luxury travel",
    monthly: 499,
    yearly: 4990,
    features: ["All Pro features", "EV-only fleet guarantee", "Free airport wait times", "Top-rated drivers only", "VIP concierge"],
    highlight: false,
    cta: "Get Premium",
    color: "border-dark-bg",
  },
];

type FeatureValue = boolean | string;

const comparisonRows: { category: string; features: { label: string; basic: FeatureValue; pro: FeatureValue; premium: FeatureValue }[] }[] = [
  {
    category: "Rides",
    features: [
      { label: "Pay-per-ride", basic: true, pro: true, premium: true },
      { label: "Surge pricing protection", basic: false, pro: true, premium: true },
      { label: "Cancellation fees", basic: "Standard", pro: "None", premium: "None" },
      { label: "Discount on rides", basic: "0%", pro: "10%", premium: "20%" },
    ],
  },
  {
    category: "Fleet",
    features: [
      { label: "Vehicle types", basic: "Standard only", pro: "All types", premium: "All types" },
      { label: "EV-only guarantee", basic: false, pro: false, premium: true },
      { label: "Top-rated drivers only", basic: false, pro: false, premium: true },
      { label: "Priority dispatch", basic: false, pro: true, premium: true },
    ],
  },
  {
    category: "Airport & Long Trips",
    features: [
      { label: "Airport rides", basic: true, pro: true, premium: true },
      { label: "Free airport wait time", basic: false, pro: false, premium: true },
      { label: "Outstation rides", basic: false, pro: true, premium: true },
    ],
  },
  {
    category: "Support",
    features: [
      { label: "Customer support", basic: "Standard", pro: "Priority", premium: "VIP Concierge" },
      { label: "Dedicated support line", basic: false, pro: true, premium: true },
      { label: "In-app live chat", basic: false, pro: true, premium: true },
    ],
  },
  {
    category: "Perks",
    features: [
      { label: "Digital receipts", basic: true, pro: true, premium: true },
      { label: "Loyalty rewards", basic: false, pro: true, premium: true },
      { label: "Monthly ride reports", basic: false, pro: true, premium: true },
      { label: "VIP lounge access (airports)", basic: false, pro: false, premium: true },
    ],
  },
];

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-300">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>
    );
  }
  return <span className="text-sm font-semibold text-dark-bg">{value}</span>;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(comparisonRows.map(r => r.category));
  const [highlightCol, setHighlightCol] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Pricing</p>
            <h1 className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-text-muted text-lg mb-8">
              Choose the perfect Dash+ plan to upgrade your daily commute.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center p-1 bg-white border border-light-border rounded-full shadow-saas-sm">
              <button 
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isYearly ? "bg-dark-bg text-white shadow-md" : "text-text-muted hover:text-dark-bg"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isYearly ? "bg-dark-bg text-white shadow-md" : "text-text-muted hover:text-dark-bg"}`}
              >
                Yearly <span className="text-primary ml-1">(-15%)</span>
              </button>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-24">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHighlightCol(plan.name)}
                onMouseLeave={() => setHighlightCol(null)}
                className={`relative rounded-3xl p-8 flex flex-col bg-white border-2 transition-all duration-300 cursor-pointer ${
                  plan.highlight 
                    ? "border-primary shadow-saas-lg scale-100 md:scale-105 z-10" 
                    : `${plan.color} shadow-saas-sm hover:shadow-saas-md hover:-translate-y-1`
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-dark-bg text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-saas-glow">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-secondary text-2xl font-bold text-dark-bg mb-1">{plan.name}</h3>
                <p className="text-text-muted text-sm mb-6">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <motion.span
                    key={`${plan.name}-${isYearly}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-dark-bg"
                  >
                    ₹{isYearly ? plan.yearly : plan.monthly}
                  </motion.span>
                  <span className="text-text-muted text-sm">/{isYearly ? "yr" : "mo"}</span>
                </div>

                <button className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all duration-200 hover:-translate-y-0.5 ${
                  plan.highlight 
                    ? "bg-primary text-dark-bg hover:bg-primary/90 shadow-saas-glow" 
                    : "bg-light-bg text-dark-bg hover:bg-gray-200 border border-light-border"
                }`}>
                  {plan.cta}
                </button>

                <div className="flex flex-col gap-3.5 mt-auto">
                  <span className="text-xs font-bold text-dark-bg uppercase tracking-widest">Includes</span>
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm text-text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Detailed Breakdown</p>
              <h2 className="text-2xl md:text-3xl font-secondary font-bold text-dark-bg">Compare all features</h2>
            </div>

            <div className="bg-white rounded-3xl border border-light-border shadow-saas-md overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-light-bg border-b border-light-border">
                <div className="p-5 text-sm font-bold text-text-muted uppercase tracking-wider">Feature</div>
                {plans.map(plan => (
                  <div
                    key={plan.name}
                    onMouseEnter={() => setHighlightCol(plan.name)}
                    onMouseLeave={() => setHighlightCol(null)}
                    className={`p-5 text-center transition-colors duration-200 ${highlightCol === plan.name ? "bg-primary/5" : ""}`}
                  >
                    <p className={`font-bold text-sm ${plan.highlight ? "text-primary" : "text-dark-bg"}`}>{plan.name}</p>
                    {plan.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block">Best Value</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Grouped Rows */}
              {comparisonRows.map((group) => (
                <div key={group.category}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(group.category)}
                    className="w-full grid grid-cols-4 items-center border-b border-light-border bg-[#f8f8f8] hover:bg-gray-100 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-3 px-5 py-3.5 text-left">
                      <motion.svg
                        animate={{ rotate: openCategories.includes(group.category) ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="text-text-muted shrink-0"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </motion.svg>
                      <span className="text-xs font-bold uppercase tracking-widest text-dark-bg">{group.category}</span>
                    </div>
                  </button>

                  {/* Feature Rows */}
                  <AnimatePresence initial={false}>
                    {openCategories.includes(group.category) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {group.features.map((row, idx) => (
                          <div
                            key={row.label}
                            className={`grid grid-cols-4 border-b border-light-border last:border-b-0 transition-colors duration-200 ${
                              idx % 2 === 1 ? "bg-[#fdfdfd]" : "bg-white"
                            }`}
                          >
                            <div className="p-4 pl-8 text-sm text-text-muted font-medium flex items-center">{row.label}</div>
                            {[{ val: row.basic, name: "Basic" }, { val: row.pro, name: "Dash+ Pro" }, { val: row.premium, name: "Dash+ Premium" }].map(({ val, name }) => (
                              <div
                                key={name}
                                onMouseEnter={() => setHighlightCol(name)}
                                onMouseLeave={() => setHighlightCol(null)}
                                className={`p-4 flex items-center justify-center transition-colors duration-200 ${highlightCol === name ? "bg-primary/5" : ""}`}
                              >
                                <FeatureCell value={val} />
                              </div>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <p className="text-center text-text-muted text-sm mt-6">
              All plans include a <span className="font-semibold text-dark-bg">14-day free trial</span>. No credit card required.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
