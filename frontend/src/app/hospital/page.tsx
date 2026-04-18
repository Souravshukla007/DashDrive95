"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HospitalPage() {
  const [dispatched, setDispatched] = useState(false);

  return (
    <div className="min-h-screen bg-light-bg flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row mt-20">
        
        {/* Left Side: Map UI */}
        <div className="w-full lg:w-3/5 relative h-[50vh] lg:h-auto bg-[#e5e7eb] overflow-hidden">
          {/* Fake map image for prototype */}
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url('/images/maps.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
          
          <div className="absolute inset-0 bg-gradient-to-r from-light-bg/80 to-transparent lg:hidden" />
          
          {/* Animated Map Pins */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-saas-lg flex items-center justify-center text-2xl z-10"
          >
            🏥
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full animate-ping z-0" />
        </div>

        {/* Right Side: Panel */}
        <div className="w-full lg:w-2/5 bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] z-10 flex flex-col p-8 md:p-12">
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Emergency Service
            </div>
            <h1 className="text-3xl font-secondary font-bold text-dark-bg mb-2">Hospital on Road</h1>
            <p className="text-text-muted text-sm leading-relaxed">
              Immediate priority dispatch. DashDrive guarantees the fastest route to the nearest verified medical facility.
            </p>
          </div>

          {!dispatched ? (
            <div className="flex flex-col gap-6 flex-1">
              
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-dark-bg">Emergency Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-red-500 bg-red-50 rounded-xl p-4 cursor-pointer">
                    <span className="text-2xl mb-1 block">🚑</span>
                    <span className="font-semibold text-dark-bg text-sm">Ambulance</span>
                    <p className="text-xs text-text-muted mt-1">ALS / BLS support</p>
                  </div>
                  <div className="border border-light-border hover:border-gray-300 rounded-xl p-4 cursor-pointer transition-colors">
                    <span className="text-2xl mb-1 block">🚗</span>
                    <span className="font-semibold text-dark-bg text-sm">Fast Cab</span>
                    <p className="text-xs text-text-muted mt-1">Non-critical transport</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-dark-bg">Nearest Facility</label>
                <div className="bg-light-bg rounded-xl p-4 border border-light-border flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-dark-bg text-sm">Apollo City Hospital</h4>
                    <p className="text-xs text-text-muted">2.4 km away • 6 min ETA</p>
                  </div>
                  <span className="text-primary font-bold text-sm">Selected</span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button 
                  onClick={() => setDispatched(true)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-full shadow-[0_10px_20px_-10px_rgba(239,68,68,0.5)] transition-all hover:-translate-y-1"
                >
                  DISPATCH NOW
                </button>
                <p className="text-center text-xs text-text-muted mt-4">By tapping dispatch, you agree to priority routing terms.</p>
              </div>

            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl mb-6 relative">
                <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin" />
                🚨
              </div>
              <h2 className="text-2xl font-bold text-dark-bg mb-2">Ambulance Dispatched</h2>
              <p className="text-text-muted mb-8 max-w-xs">
                Driver KA-01-HC-4029 is en route. ETA is 4 minutes. Please remain calm.
              </p>
              
              <div className="w-full bg-light-bg rounded-2xl p-4 mb-8 text-left border border-light-border">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1 font-semibold">Live Status</p>
                <p className="text-sm font-medium text-dark-bg mb-2">Navigating traffic with priority sirens.</p>
                <div className="h-1.5 w-full bg-light-border rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "10%" }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>

              <button className="btn-saas btn-saas-outline border-light-border text-dark-bg w-full">
                Call Driver
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
