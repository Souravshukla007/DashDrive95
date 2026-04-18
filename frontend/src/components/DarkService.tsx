"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const vehicles = [
  { name: "DashBike", type: "Motorcycle", img: "/images/bike.jpg", desc: "Beat the traffic quickly and affordably. Perfect for solo commuters." },
  { name: "DashAuto", type: "Tuk-Tuk", img: "/images/auto.jpg", desc: "The classic local ride. Spacious enough for quick trips across town." },
  { name: "DashCab", type: "Hatchback", img: "/images/taxi.jpg", desc: "Comfortable standard cars for everyday travel with AC standard." },
  { name: "DashEV", type: "Electric", img: "/images/e-car.jpg", desc: "Premium zero-emission electric vehicles for a greener planet." },
];

export default function DarkService() {
  return (
    <section className="py-24 bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-animation-on-scroll="">
          <div className="max-w-xl">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Fleet</h2>
            <h3 className="text-3xl md:text-5xl font-secondary font-bold text-white leading-tight">
              A vehicle for every occasion.
            </h3>
          </div>
          <p className="text-white/60 text-lg max-w-md">
            From affordable daily commutes to premium eco-friendly travel, we have the right vehicle waiting for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((v, i) => (
            <div 
              key={v.name}
              data-animation-on-scroll=""
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-dark-surface shadow-saas-sm group-hover:shadow-saas-lg transition-all duration-300">
                <Image 
                  src={v.img} 
                  alt={v.name} 
                  fill 
                  unoptimized 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-xl font-bold text-white">{v.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-white/60">{v.type}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
