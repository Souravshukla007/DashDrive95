"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  { q: "What are your support hours?", a: "Our support team is available 24/7. You can reach us via email, phone, or in-app chat at any time." },
  { q: "How quickly will I get a response?", a: "Email responses are within 2 hours. Phone and live chat are instant during peak hours." },
  { q: "Can I report a lost item from my ride?", a: "Yes. Email us with your ride ID and a description of the item and our team will contact your driver." },
  { q: "How do I become a driver partner?", a: "Visit our driver registration page and complete the onboarding form. Approvals typically take 48–72 hours." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-white border-b border-light-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-secondary font-bold text-4xl md:text-5xl text-dark-bg mb-4">
            We'd love to hear from you.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-text-muted text-lg">
            Questions, feedback, or partnership enquiries — our team is always listening.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-light-bg border-b border-light-border">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "📧", title: "Email", detail: "support@dashdrive.in", sub: "We reply within 2 hours" },
            { icon: "📞", title: "Phone", detail: "+91 98765 43210", sub: "Mon–Sat, 9am–9pm IST" },
            { icon: "💬", title: "Live Chat", detail: "Available in the app", sub: "24/7 instant support" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl border border-light-border shadow-saas-sm hover:border-primary/40 hover:shadow-saas-md hover:-translate-y-1 transition-all duration-300">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-dark-bg">{item.title}</h3>
              <p className="text-sm font-semibold text-primary">{item.detail}</p>
              <p className="text-xs text-text-muted">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-secondary font-bold text-dark-bg mb-6">Send us a message</h2>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 p-10 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark-bg text-lg">Message Sent!</h3>
                <p className="text-text-muted text-sm">Thanks for reaching out. We'll get back to you within 2 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" }); }}
                  className="btn-saas btn-saas-primary mt-2 text-sm">Send Another Message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className="input-saas bg-light-bg" placeholder="First Name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required />
                  <input className="input-saas bg-light-bg" placeholder="Last Name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required />
                </div>
                <input type="email" className="input-saas bg-light-bg" placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                <select className="input-saas bg-light-bg cursor-pointer" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required>
                  <option value="" disabled>Select a subject</option>
                  <option>Ride Support</option>
                  <option>Driver Partnership</option>
                  <option>Billing & Payments</option>
                  <option>Business Enquiry</option>
                  <option>Other</option>
                </select>
                <textarea rows={5} className="input-saas bg-light-bg resize-none" placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                <button type="submit" className="btn-saas btn-saas-primary w-full py-4 text-base shadow-saas-md mt-2 hover:-translate-y-0.5">
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-secondary font-bold text-dark-bg mb-6">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-light-border rounded-2xl overflow-hidden bg-light-bg">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-dark-bg hover:bg-white transition-colors">
                    <span className="text-sm">{faq.q}</span>
                    <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-text-muted">
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-sm text-text-muted leading-relaxed border-t border-light-border pt-4">
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Office Address */}
            <div className="mt-8 p-5 bg-dark-bg rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-bold text-white mb-1 relative z-10">DashDrive HQ</h3>
              <p className="text-text-dim text-sm mb-3 relative z-10">Koramangala, Bengaluru, Karnataka — 560034</p>
              <a href="mailto:support@dashdrive.in" className="text-primary text-sm hover:underline block relative z-10">support@dashdrive.in</a>
              <a href="tel:+919876543210" className="text-primary text-sm hover:underline block mt-1 relative z-10">+91 98765 43210</a>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}
