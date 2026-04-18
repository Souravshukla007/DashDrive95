"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DummyDataBanner from "@/components/DummyDataBanner";

const vehicles = [
  { id: "taxi", label: "DashCab", icon: "🚗", image: "/images/taxi.jpg", price: "₹80", eta: "3 min" },
  { id: "bike", label: "DashBike", icon: "🏍️", image: "/images/bike.jpg", price: "₹40", eta: "2 min" },
  { id: "ev", label: "DashEV", icon: "⚡", image: "/images/e-car.jpg", price: "₹90", eta: "5 min" },
  { id: "auto", label: "DashAuto", icon: "🛺", image: "/images/auto.jpg", price: "₹60", eta: "4 min" },
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("taxi");
  const [isLocating, setIsLocating] = useState(false);
  const [booked, setBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Scheduling State
  const [scheduleType, setScheduleType] = useState<"now" | "schedule">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [availableDates, setAvailableDates] = useState<{label: string, value: string}[]>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) { // Let's include today + next 3 days
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ label, value: d.toISOString().split('T')[0] });
    }
    setAvailableDates(dates);
    setScheduleDate(dates[0].value);
    
    // Default time
    const currentHour = today.getHours() + 1;
    setScheduleTime(`${currentHour.toString().padStart(2, '0')}:00`);
  }, []);

  const vehicle = vehicles.find(v => v.id === selectedVehicle)!;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latDir = latitude >= 0 ? 'N' : 'S';
        const lngDir = longitude >= 0 ? 'E' : 'W';
        setPickup(`Current Location (${Math.abs(latitude).toFixed(4)}° ${latDir}, ${Math.abs(longitude).toFixed(4)}° ${lngDir})`);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setBooked(true); }, 2000);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center pt-32 px-4 pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 shadow-saas-xl border border-light-border text-center flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl shadow-saas-glow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark-bg mb-1">Ride {scheduleType === "schedule" ? "Scheduled" : "Confirmed"}!</h2>
              {scheduleType === "schedule" ? (
                <p className="text-sm text-text-muted">Your driver will arrive on {availableDates.find(d => d.value === scheduleDate)?.label} at {scheduleTime}.</p>
              ) : (
                <p className="text-sm text-text-muted">Your driver is on the way. ETA is 3 minutes.</p>
              )}
            </div>
            
            <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-saas-md border border-light-border">
              <Image src="/images/booked.jpg" alt="Driver" fill unoptimized className="object-cover" />
            </div>

            <div className="w-full bg-light-bg rounded-2xl p-5 text-sm text-left flex flex-col gap-3 border border-light-border shadow-inner">
              <div className="flex justify-between items-center"><span className="text-text-muted font-medium">Vehicle</span><span className="text-dark-bg font-bold flex items-center gap-2"><span className="text-lg">{vehicle.icon}</span> {vehicle.label}</span></div>
              <div className="flex justify-between items-center"><span className="text-text-muted font-medium">Fare Estimate</span><span className="text-primary font-bold text-lg">{vehicle.price}</span></div>
              <div className="flex justify-between items-center pt-3 border-t border-light-border"><span className="text-text-muted font-medium">Driver</span><span className="text-dark-bg font-bold flex items-center gap-1">Suresh M. <span className="text-yellow-400">★</span> 4.9</span></div>
            </div>

            <button onClick={() => { setBooked(false); setStep(1); setScheduleType("now"); }} className="btn-saas btn-saas-primary w-full py-3.5 text-lg font-semibold mt-2 shadow-saas-md hover:-translate-y-0.5">
              Book Another Ride
            </button>
            <Link href="/" className="text-sm font-medium text-text-muted hover:text-dark-bg transition-colors">
              Return to Dashboard
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      
      <div className="w-full max-w-2xl mx-auto flex flex-col pt-32 px-4 pb-10">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-secondary font-bold text-dark-bg mb-3 tracking-tight">Where to?</h1>
          <p className="text-text-muted text-base">Enter your destination to see available rides.</p>
        </div>

        {/* Wizard Steps */}
        <div className="flex items-center justify-between px-8 mb-6 relative">
          {[1,2,3].map(s => (
            <div key={s} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s ? "bg-primary text-dark-bg shadow-saas-glow border-2 border-primary" : "bg-white border-2 border-light-border text-text-muted"
              }`}>
                {step > s ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : s}
              </div>
              <span className={`text-xs font-semibold absolute top-12 whitespace-nowrap transition-colors ${step >= s ? "text-dark-bg" : "text-text-muted"}`}>
                {s === 1 ? "Route" : s === 2 ? "Ride" : "Confirm"}
              </span>
            </div>
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 top-5 w-[calc(100%-120px)] max-w-[500px] h-1 bg-light-border rounded-full -z-0 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-saas-lg border border-light-border mt-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-6">
                
                {/* Schedule Toggle */}
                <div className="flex p-1 bg-light-bg rounded-xl border border-light-border">
                  <button 
                    onClick={() => setScheduleType("now")}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${scheduleType === "now" ? "bg-white text-dark-bg shadow-sm" : "text-text-muted hover:text-dark-bg"}`}
                  >
                    Ride Now
                  </button>
                  <button 
                    onClick={() => setScheduleType("schedule")}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${scheduleType === "schedule" ? "bg-white text-dark-bg shadow-sm" : "text-text-muted hover:text-dark-bg"}`}
                  >
                    Schedule Later
                  </button>
                </div>

                {/* Scheduling Inputs */}
                <AnimatePresence>
                  {scheduleType === "schedule" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex gap-4 overflow-hidden"
                    >
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-text-muted mb-1.5 ml-1 uppercase tracking-wider">Date</label>
                        <select 
                          value={scheduleDate} 
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="input-saas bg-white border border-light-border font-medium w-full shadow-sm appearance-none cursor-pointer"
                        >
                          {availableDates.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-text-muted mb-1.5 ml-1 uppercase tracking-wider">Time</label>
                        <input 
                          type="time" 
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="input-saas bg-white border border-light-border font-medium w-full shadow-sm cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-4 relative">
                  {/* Vertical connect line */}
                  <div className="absolute left-[22px] top-[30px] bottom-[30px] w-0.5 bg-light-border z-0"></div>
                  
                  <div className="relative z-10">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-white shadow-sm" />
                    <input className="input-saas pl-12 pr-12 bg-white border-light-border shadow-sm h-14 text-base font-medium" placeholder="Pickup location" value={pickup} onChange={e => setPickup(e.target.value)} />
                    <button 
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      title="Use current location"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                    >
                      {isLocating ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-25"></circle>
                          <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75"></path>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-none bg-dark-bg ring-4 ring-white shadow-sm" />
                    <input className="input-saas pl-12 bg-white border-light-border shadow-sm h-14 text-base font-medium" placeholder="Where to?" value={dropoff} onChange={e => setDropoff(e.target.value)} />
                  </div>
                </div>
                
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!pickup || !dropoff}
                  className="btn-saas btn-saas-primary w-full py-4 mt-4 text-lg shadow-saas-md disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {scheduleType === "schedule" ? "See Available Rides" : "Search Rides"}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  {vehicles.map(v => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedVehicle === v.id ? "border-primary bg-primary/5 shadow-saas-sm scale-[1.02]" : "border-transparent bg-light-bg hover:border-light-border hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-16 h-12 relative rounded-lg overflow-hidden shrink-0 shadow-sm">
                        <Image src={v.image} alt={v.label} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-dark-bg text-base flex items-center gap-2">{v.label}</h4>
                        <p className="text-xs text-text-muted font-medium">{v.eta} away</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-dark-bg text-lg">{v.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep(1)} className="btn-saas bg-white border-2 border-light-border text-dark-bg hover:bg-light-bg hover:border-gray-300 px-6 font-semibold shadow-sm">Back</button>
                  <button onClick={() => setStep(3)} className="btn-saas btn-saas-primary flex-1 py-3.5 text-lg shadow-saas-md hover:-translate-y-0.5">Review Details</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-6">
                
                <div className="flex items-center gap-4 p-5 bg-white shadow-sm rounded-2xl border border-light-border">
                  <div className="w-20 h-14 relative rounded-xl overflow-hidden shrink-0 shadow-sm border border-black/5">
                    <Image src={vehicle.image} alt={vehicle.label} fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-bg text-lg">{vehicle.label}</h4>
                    {scheduleType === "schedule" ? (
                      <p className="text-sm text-primary font-semibold mt-0.5">
                        Scheduled for {availableDates.find(d => d.value === scheduleDate)?.label}
                      </p>
                    ) : (
                      <p className="text-sm text-text-muted font-medium mt-0.5">Estimated {vehicle.eta}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-sm px-3 bg-light-bg p-5 rounded-2xl border border-light-border shadow-inner">
                  <div className="flex items-start gap-4">
                    <span className="w-3 h-3 rounded-full bg-primary mt-1 shrink-0 shadow-sm" />
                    <div className="flex-1 pb-4 border-b border-gray-200">
                      <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Pickup</p>
                      <p className="font-semibold text-dark-bg text-base">{pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-3 h-3 rounded-none bg-dark-bg mt-1 shrink-0 shadow-sm" />
                    <div className="flex-1">
                      <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Dropoff</p>
                      <p className="font-semibold text-dark-bg text-base">{dropoff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-5 bg-dark-bg rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex flex-col gap-1 z-10">
                    <span className="text-text-dim text-xs font-bold uppercase tracking-wider">Total Fare</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💳</span>
                      <span className="font-semibold text-white text-sm">Cash / Card via Driver</span>
                    </div>
                  </div>
                  <span className="font-bold text-3xl text-primary z-10">{vehicle.price}</span>
                </div>

                <div className="flex gap-4 mt-2">
                  <button onClick={() => setStep(2)} className="btn-saas bg-white border-2 border-light-border text-dark-bg hover:bg-light-bg hover:border-gray-300 px-6 font-semibold shadow-sm">Back</button>
                  <button 
                    onClick={handleConfirm} 
                    disabled={isLoading}
                    className="btn-saas btn-saas-primary flex-1 py-4 text-lg shadow-saas-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-dark-bg" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-25"></circle>
                          <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75"></path>
                        </svg>
                        Processing...
                      </>
                    ) : scheduleType === "schedule" ? "Confirm Schedule" : "Confirm Ride"}
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Why DashDrive Section */}
      <section className="w-full bg-white border-t border-light-border py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-2xl md:text-3xl font-secondary font-bold text-dark-bg">Ride with Confidence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: "Verified Drivers",
                desc: "Every driver passes background checks and in-person verification before hitting the road.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                title: "On-Time Pickup",
                desc: "Our intelligent dispatch guarantees pickups in under 5 minutes for all major cities.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                ),
                title: "No Hidden Fees",
                desc: "The price you see at booking is the price you pay. Always transparent, always fair.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
                title: "24/7 Support",
                desc: "Our team is always on standby. Chat with us anytime for instant assistance.",
              },
            ].map((feature) => (
              <div key={feature.title} className="group flex flex-col gap-4 p-5 bg-light-bg rounded-2xl border border-light-border hover:border-primary/30 hover:shadow-saas-sm hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-saas-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-dark-bg text-base mb-1">{feature.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Rebook Section */}
      <section className="w-full bg-[#fafafa] border-t border-light-border py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Quick Access</p>
              <h2 className="text-xl font-secondary font-bold text-dark-bg">Popular Routes</h2>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline">View All →</button>
          </div>
          <DummyDataBanner message="Demo Routes Only. These popular routes and fare estimates are illustrative placeholders and do not reflect real-time pricing or actual route data." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { from: "Koramangala", to: "Whitefield", time: "~28 min", price: "₹180", tag: "Most Popular" },
              { from: "Indiranagar", to: "Electronic City", time: "~35 min", price: "₹220", tag: "Work Commute" },
              { from: "HSR Layout", to: "Kempegowda Airport", time: "~55 min", price: "₹480", tag: "Airport Run" },
            ].map((route) => (
              <button
                key={route.to}
                onClick={() => { setPickup(route.from); setDropoff(route.to); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group text-left flex flex-col gap-3 p-5 bg-white rounded-2xl border border-light-border hover:border-primary/40 hover:shadow-saas-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full w-fit">{route.tag}</span>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="w-px h-6 bg-light-border" />
                    <span className="w-2 h-2 rounded-sm bg-dark-bg" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="font-semibold text-dark-bg">{route.from}</span>
                    <span className="font-semibold text-dark-bg">{route.to}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-light-border">
                  <span className="text-text-muted text-xs font-medium">{route.time}</span>
                  <span className="text-dark-bg font-bold text-base">{route.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
