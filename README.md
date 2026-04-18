<div align="center">

# 🚀 DashDrive

### *Where Speed Meets Convenience*

**India's most trusted ride-hailing platform — built with a skeuomorphic car dashboard UI, Next.js, Rust, and MongoDB.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Rust](https://img.shields.io/badge/Rust-Axum-orange?style=for-the-badge&logo=rust)](https://www.rust-lang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Design System](#-design-system)
- [Contributing](#-contributing)

---

## 🌟 Overview

**DashDrive** is a full-stack, production-ready ride-hailing web application with a **skeuomorphic car dashboard UI**. Every element is designed to feel physical and tactile — raised surfaces, pressed-in inputs, metallic gradients, and real-world-inspired controls.

The platform features:
- ⚡ Instant & pre-scheduled ride booking
- 🚑 Emergency hospital transport (one-tap dispatch)
- 🔐 No Pin No Pay — OTP-verified payments (you pay only after confirming)
- 🏆 Gamification — ride streaks, eco badges, rewards
- 💳 Dash+ subscription tiers (Basic / Pro / Premium)
- 📡 Real-time ride tracking via WebSocket
- 🌍 Social impact dashboard with animated counters

---

## ✨ Features

### 🎨 UI / Design
| Feature | Description |
|---|---|
| **Skeuomorphic Design** | Physical buttons, inset inputs, metallic card surfaces |
| **Animated Speedometer** | SVG speedometer with Framer Motion needle sweep on load |
| **Dark Dashboard Theme** | Deep blue + neon cyan + electric green palette |
| **Scroll Animations** | Intersection Observer–based fade/slide/scale entry effects |
| **Animated Counters** | Scroll-triggered count-up for social impact metrics |
| **Vehicle Hover Effects** | Cards lift and wheels spin on hover |
| **Physical Button Press** | Buttons depress inward on click with shadow reversal |
| **Toggle Switches** | Realistic sliding toggles for AC/EV/Prebook preferences |
| **Mobile-First** | Fully responsive — stacks to cards on all screen sizes |

### 🚗 Ride Booking
| Feature | Description |
|---|---|
| **Instant Booking** | 4 vehicle types: Taxi, Bike, EV Car, Auto |
| **Pre-Book** | Schedule rides in advance with date/time picker |
| **3-Step Wizard** | Location → Vehicle → Confirm flow |
| **Fare Estimation** | Live fare displayed per vehicle type |
| **AC / EV Toggle** | Rider preferences with skeuomorphic switches |

### 🔐 Safety & Payments
| Feature | Description |
|---|---|
| **No Pin No Pay** | ATM-style OTP keypad — ride only completes when you verify |
| **JWT Auth** | Secure authentication with 7-day token expiry |
| **Live Tracking** | WebSocket connection for real-time driver location |

### 🎮 Gamification
| Feature | Description |
|---|---|
| **Ride Streaks** | Daily streak calendar with visual progress bar |
| **Achievement Badges** | Eco Warrior, Streak Master, Speed Demon, Safe Rider, and more |
| **Points System** | Earn points per ride, redeem for free trips |

---

## 🛠 Tech Stack

### Frontend
```
Next.js 16 (App Router)     → Framework & SSG
Tailwind CSS v4             → Utility-first styling
Framer Motion               → Micro-animations & transitions
TypeScript 5                → Type safety
Inter + Poppins             → Google Fonts
MongoDB / Mongoose          → DB client for SSR routes
```

### Backend (Rust Microservices)
```
Axum 0.7                    → Web framework
Tokio                       → Async runtime
MongoDB Driver 3.1          → Database
jsonwebtoken                → JWT generation & validation
bcrypt                      → Password hashing
tokio-tungstenite           → WebSocket support
tower-http                  → CORS middleware
serde / serde_json          → Serialization
chrono                      → Date/time handling
tracing                     → Structured logging
```

### Database (MongoDB)
```
users          → Auth, profile, subscription tier
rides          → Booking records, status, fare, driver
bookings       → Payment reference and OTP
payments       → OTP verification, payment status
rewards        → Badge definitions and unlocks
```

---

## 📁 Project Structure

```
Dash_drive/
├── frontend/                   # Next.js App
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css         ← Full skeuomorphic design system
│   │   │   ├── layout.tsx          ← Root layout (Poppins + Inter fonts)
│   │   │   ├── page.tsx            ← Homepage (all sections assembled)
│   │   │   ├── login/page.tsx      ← Login with biometric card
│   │   │   ├── book/page.tsx       ← 3-step ride booking wizard
│   │   │   ├── hospital/page.tsx   ← Emergency transport booking
│   │   │   └── pricing/page.tsx    ← Dash+ subscription plans
│   │   ├── components/
│   │   │   ├── Navbar.tsx              ← Dark glassmorphic nav
│   │   │   ├── Hero.tsx                ← Speedometer + 4 CTA buttons
│   │   │   ├── DrivingChange.tsx       ← Ride booking section
│   │   │   ├── Industries.tsx          ← Unique features section
│   │   │   ├── DarkService.tsx         ← Fleet showcase
│   │   │   ├── Testimonials.tsx        ← Social impact dashboard
│   │   │   ├── FooterCTA.tsx           ← Gamification + Investor
│   │   │   ├── Footer.tsx              ← Contact (pushpin) + footer
│   │   │   └── ScrollAnimationInitializer.tsx
│   │   ├── lib/
│   │   │   └── mongodb.ts          ← MongoDB singleton connection
│   │   └── services/
│   │       └── api.ts              ← All Rust API service calls
│   ├── public/
│   │   └── images/                 ← 31 project images
│   ├── .env.local                  ← Frontend env vars
│   ├── next.config.ts
│   └── package.json
│
├── backend/                    # Rust Axum Microservices
│   ├── src/
│   │   ├── main.rs                 ← Axum app, CORS, WebSocket mount
│   │   ├── models.rs               ← All MongoDB data models
│   │   ├── db.rs                   ← AppState + collection accessors
│   │   ├── auth.rs                 ← JWT create/validate + extractor
│   │   ├── errors.rs               ← AppError → HTTP response
│   │   └── routes/
│   │       ├── mod.rs
│   │       ├── auth.rs             ← POST /api/auth/register, /login
│   │       ├── rides.rs            ← POST/GET /api/rides/*
│   │       ├── payments.rs         ← POST /api/payments/*
│   │       ├── subscriptions.rs    ← GET/POST /api/subscriptions/*
│   │       └── rewards.rs          ← GET/POST /api/rewards/*
│   ├── .env                        ← Backend env vars
│   └── Cargo.toml
│
└── public/
    └── images/                 ← Source images (31 files)
```

---

## 🗺 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Homepage | Hero → Booking → Features → Fleet → Impact → Rewards → Investor → Contact |
| `/login` | Login | Skeuomorphic login card with biometric, toggles, social sign-in |
| `/book` | Book a Ride | 3-step wizard: location, vehicle selection, confirm |
| `/hospital` | Hospital on Road | Emergency type selector, live map, dispatch confirmation |
| `/pricing` | Dash+ Pricing | 3-tier plans (Basic/Pro/Premium) with yearly/monthly toggle |

---

## 🔌 API Reference

All API endpoints are served by the Rust/Axum backend at `http://localhost:8080`.

### Auth
```
POST /api/auth/register    Body: { name, email, password, phone? }
POST /api/auth/login       Body: { email, password }
```

### Rides
```
POST /api/rides/book           🔒 Book an instant ride
POST /api/rides/prebook        🔒 Schedule a future ride
POST /api/rides/emergency      Book emergency/ambulance ride
GET  /api/rides/:id            🔒 Get ride details
GET  /api/rides/user/:userId   🔒 List all rides for user
POST /api/rides/:id/cancel     🔒 Cancel a ride
```

### Payments (No Pin No Pay)
```
POST /api/payments/initiate     🔒 Generate OTP for ride payment
POST /api/payments/verify-otp  🔒 Verify OTP to complete payment
POST /api/payments/cancel       🔒 Cancel a pending payment
```

### Subscriptions
```
GET  /api/subscriptions/plans      List all Dash+ plans
POST /api/subscriptions/subscribe  🔒 Subscribe to a plan
POST /api/subscriptions/cancel     🔒 Cancel subscription
```

### Rewards
```
GET  /api/rewards/:userId   🔒 Get badges, streak, points
POST /api/rewards/claim     🔒 Claim an earned reward
```

### WebSocket
```
WS /ws/ride/:rideId   Real-time ride status updates
```

> 🔒 = Requires `Authorization: Bearer <token>` header

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Rust** (stable) — [install](https://rustup.rs)
- **MongoDB** running locally on port `27017`

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/dashdrive.git
cd dashdrive
```

---

### 2️⃣ Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

> Opens at **http://localhost:3000**

---

### 3️⃣ Start the Rust Backend

```bash
cd backend
cargo run
```

> API server starts at **http://localhost:8080**
> Make sure MongoDB is running: `mongod --dbpath ./data`

---

### 4️⃣ (Optional) Build for Production

```bash
# Frontend
cd frontend && npm run build && npm run start

# Backend
cd backend && cargo build --release && ./target/release/backend
```

---

## 🔧 Environment Variables

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080
MONGODB_URI=mongodb://localhost:27017/dashdrive
```

### Backend — `backend/.env`

```env
MONGODB_URI=mongodb://localhost:27017/dashdrive
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=8080
```

> ⚠️ **Never commit `.env` or `.env.local` to version control.**

---

## 🎨 Design System

DashDrive uses a custom **skeuomorphic design system** defined in `globals.css`.

### CSS Classes

| Class | Effect |
|---|---|
| `.card-raised` | Metallic raised surface with layered box shadows |
| `.card-inset` | Pressed-in recessed surface |
| `.glass-panel` | Frosted glass effect with backdrop-filter |
| `.btn-physical` | Base physical button (use with variant) |
| `.btn-physical-primary` | Neon cyan push button |
| `.btn-physical-green` | Electric green push button |
| `.btn-physical-dark` | Dark metallic button |
| `.btn-physical-danger` | Red emergency button |
| `.input-skeuomorphic` | Inset pressed-in form input |
| `.toggle-track` | Toggle switch track (add `.on` for active) |
| `.glow-cyan` | Cyan outer glow box shadow |
| `.glow-green` | Green outer glow box shadow |
| `.text-glow-cyan` | Cyan text glow via text-shadow |
| `.metallic-text` | Silver gradient text |
| `.shimmer-text` | Animated shimmer gradient text |
| `.scan-line` | Animated horizontal scan line |
| `.gradient-border` | Pseudo-element gradient border |
| `.animation-float` | Gentle floating up/down animation |
| `.animate-on-scroll-hidden` | Fade up on scroll (add `-visible` to trigger) |
| `.animate-on-scroll-left` | Slide in from left on scroll |
| `.animate-on-scroll-right` | Slide in from right on scroll |

### Color Palette

| Token | Value | Use |
|---|---|---|
| `--color-dash-deep` | `#0a0e1a` | Page background |
| `--color-dash-navy` | `#0f172a` | Section backgrounds |
| `--color-dash-surface` | `#242b42` | Card surfaces |
| `--color-cyan` | `#00d4ff` | Primary accent |
| `--color-green` | `#39ff14` | Success / eco accent |
| `--color-amber` | `#f59e0b` | Warning / rewards |
| `--color-text-primary` | `#f1f5f9` | Main text |
| `--color-text-secondary` | `#94a3b8` | Subdued text |
| `--color-text-muted` | `#64748b` | Placeholder / labels |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit with a descriptive message: `git commit -m "feat: add ride cancellation UI"`
4. Push and open a Pull Request

### Code Style
- **Frontend**: Follow existing component patterns. Use `framer-motion` for animations, `btn-physical` classes for buttons
- **Backend**: Follow Rust idioms. All handlers return `AppResult<Json<T>>`
- **No hardcoded secrets**: Use `.env` / `.env.local`

---

## 📊 Roadmap

- [ ] Real-time driver location on map (Google Maps / Mapbox)
- [ ] Push notifications for ride updates
- [ ] In-app chat between rider and driver
- [ ] Driver partner onboarding portal
- [ ] Analytics dashboard for admins
- [ ] iOS & Android app (React Native)
- [ ] Multi-language support (Hindi, Tamil, Bengali)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ by the DashDrive Team**

*Making every ride safer, smarter, and more sustainable — one trip at a time.*

</div>
