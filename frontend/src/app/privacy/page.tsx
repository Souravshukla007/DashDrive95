"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, book a ride, or contact our support team. This includes:

• **Account Data**: Name, email address, phone number, and profile photo.
• **Location Data**: Real-time GPS location during a ride, pickup and drop-off addresses.
• **Payment Data**: Payment method details (processed securely through our PCI-compliant gateway — we do not store raw card data).
• **Usage Data**: App interactions, search history, ride history, and device identifiers.
• **Communications**: Support messages, feedback, and survey responses.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, operate, and improve the DashDrive platform.
• Match you with nearby driver partners.
• Process payments and send receipts.
• Send service updates, ride confirmations, and promotional offers (with your consent).
• Detect fraud and ensure platform safety.
• Comply with legal obligations.`,
  },
  {
    title: "3. Sharing Your Information",
    content: `We do not sell your personal data. We share your data only in these limited circumstances:

• **Driver Partners**: Your name, pickup location, and rating are shared with your driver to complete your ride.
• **Service Providers**: Third-party vendors who help us operate the platform (e.g., cloud hosting, payment processors, analytics tools) under strict data protection agreements.
• **Legal Requirements**: When required by law, court order, or government authority.
• **Business Transfers**: In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@dashdrive.in. Some data may be retained for legal, safety, or fraud-prevention purposes even after account deletion.`,
  },
  {
    title: "5. Your Rights",
    content: `Depending on your location, you may have the following rights:

• **Access**: Request a copy of the personal data we hold about you.
• **Correction**: Request correction of inaccurate data.
• **Deletion**: Request erasure of your data (subject to legal obligations).
• **Portability**: Receive your data in a structured, machine-readable format.
• **Opt-Out**: Unsubscribe from marketing communications at any time.

To exercise any of these rights, contact us at privacy@dashdrive.in.`,
  },
  {
    title: "6. Security",
    content: `We use industry-standard security measures including TLS encryption, access controls, and regular security audits to protect your data. However, no method of transmission over the internet is 100% secure — we encourage you to use strong passwords and report any suspicious activity immediately.`,
  },
  {
    title: "7. Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to improve your experience. These include:

• **Essential Cookies**: Required for the platform to function.
• **Analytics Cookies**: Help us understand how users interact with DashDrive (e.g., Google Analytics).
• **Preference Cookies**: Remember your settings and preferences.

You can control cookie settings through your browser, though disabling some cookies may affect functionality.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will notify you via email or in-app notification. Your continued use of DashDrive after updates constitutes your acceptance of the revised policy.`,
  },
];

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      <section className="pt-36 pb-10 bg-white border-b border-light-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Legal</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
            Privacy Policy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-sm">
            Last updated: <span className="font-semibold text-dark-bg">April 15, 2026</span>
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-text-muted text-sm leading-relaxed mb-8 p-5 bg-white rounded-2xl border border-light-border shadow-saas-sm">
            At DashDrive Technologies Inc., we take the privacy of our users, drivers, and partners seriously. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use the DashDrive app and website.
          </p>

          <div className="flex flex-col gap-3">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }}
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

          <div className="mt-10 p-6 bg-dark-bg rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-16 bg-primary/20 blur-2xl rounded-full -translate-y-1/2" />
            <p className="text-white font-semibold mb-1 relative z-10">Questions about your privacy?</p>
            <p className="text-text-dim text-sm mb-4 relative z-10">Our Data Protection Officer is here to help.</p>
            <a href="mailto:privacy@dashdrive.in" className="btn-saas btn-saas-primary text-sm shadow-saas-glow relative z-10">
              Contact DPO →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
