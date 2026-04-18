"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By downloading, accessing, or using the DashDrive application or website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use our services.

You must be at least 18 years old to use DashDrive. By using our services, you represent that you meet this age requirement.`,
  },
  {
    title: "2. Use of the Platform",
    content: `DashDrive grants you a limited, non-exclusive, non-transferable, revocable license to use the app and services for your personal, non-commercial use.

You agree not to:
• Use the platform for any unlawful purpose.
• Attempt to decompile, reverse-engineer, or hack the application.
• Use automated scripts or bots to interact with the platform.
• Impersonate any person or entity.
• Harass, threaten, or abuse drivers, other users, or DashDrive staff.`,
  },
  {
    title: "3. Rides & Bookings",
    content: `When you book a ride through DashDrive, you enter into a service agreement with the independent driver partner fulfilling your request. DashDrive acts as a technology intermediary, not a transportation provider.

• Estimated fares are displayed at the time of booking and may vary based on actual distance, traffic, and wait time.
• Cancellations made after 2 minutes of booking confirmation may be subject to a cancellation fee.
• You are responsible for being ready at the specified pickup location at the scheduled time.`,
  },
  {
    title: "4. Payments",
    content: `By providing payment information, you authorize DashDrive to charge you for rides, subscriptions, and applicable fees. All payments are processed securely through our PCI-compliant payment gateway.

• Fares are charged to your saved payment method immediately after ride completion.
• Disputes must be raised within 7 days of the transaction.
• Refunds are processed at our sole discretion and may take 5–7 business days to reflect.`,
  },
  {
    title: "5. Driver Partner Terms",
    content: `Driver partners are independent contractors, not employees of DashDrive. DashDrive provides technology tools to facilitate connections between riders and drivers.

Drivers must:
• Hold a valid driving licence and vehicle registration.
• Maintain a minimum 4.0 rating to remain active on the platform.
• Comply with all applicable traffic laws and regulations.
• Complete the mandatory safety and onboarding training.`,
  },
  {
    title: "6. Ratings & Reviews",
    content: `After each ride, both riders and drivers can rate one another. These ratings are used to maintain quality and safety standards on the platform. DashDrive reserves the right to suspend accounts that consistently receive low ratings or violate community guidelines.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, DashDrive shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or goodwill, arising from your use of the platform.

DashDrive's total liability for any claim arising from your use of the services shall not exceed the amount you paid to DashDrive in the three months preceding the event giving rise to the claim.`,
  },
  {
    title: "8. Termination",
    content: `DashDrive reserves the right to suspend or terminate your account at any time, with or without notice, if you violate these Terms of Service or engage in behavior that we determine to be harmful to the platform, our users, or driver partners.

You may also delete your account at any time by contacting support@dashdrive.in. Account deletion requests are processed within 30 days.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.`,
  },
  {
    title: "10. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. If we make material changes, we will notify you via email or through the app. Your continued use of DashDrive after the effective date of the revised Terms constitutes your acceptance of the changes.`,
  },
];

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      <section className="pt-36 pb-10 bg-white border-b border-light-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Legal</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
            Terms of Service
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-sm">
            Last updated: <span className="font-semibold text-dark-bg">April 15, 2026</span>
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-text-muted text-sm leading-relaxed mb-8 p-5 bg-white rounded-2xl border border-light-border shadow-saas-sm">
            Please read these Terms of Service carefully before using the DashDrive platform. These terms govern your access to and use of our application, website, and services. By using DashDrive, you agree to be legally bound by these terms.
          </p>

          {/* Quick Nav */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sections.map((s, i) => (
              <button key={i} onClick={() => setOpenSection(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all duration-200 ${
                  openSection === i ? "bg-dark-bg text-white border-dark-bg" : "bg-white text-text-muted border-light-border hover:border-dark-bg hover:text-dark-bg"
                }`}>
                §{i + 1}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} viewport={{ once: true }}
                className="bg-white rounded-2xl border border-light-border overflow-hidden">
                <button onClick={() => setOpenSection(openSection === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-dark-bg hover:bg-light-bg transition-colors">
                  <span className="text-sm md:text-base">{section.title}</span>
                  <motion.svg animate={{ rotate: openSection === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-text-muted">
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {openSection === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 text-sm text-text-muted leading-relaxed border-t border-light-border whitespace-pre-line">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-white rounded-2xl border border-light-border shadow-saas-sm text-center">
            <p className="text-dark-bg font-semibold mb-1">Have questions about these terms?</p>
            <p className="text-text-muted text-sm mb-4">Our legal team is happy to clarify anything.</p>
            <a href="mailto:legal@dashdrive.in" className="btn-saas btn-saas-primary text-sm">
              Contact Legal →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
