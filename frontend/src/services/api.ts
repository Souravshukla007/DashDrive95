// Base API client pointing to Rust Axum backend
const RUST_API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// ─── Generic Fetch Helper ───────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${RUST_API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subscription?: "basic" | "pro" | "premium";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Ride {
  id: string;
  userId: string;
  pickup: string;
  dropoff: string;
  vehicleType: "taxi" | "bike" | "ev" | "auto";
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  fare: number;
  driverName?: string;
  driverRating?: number;
  eta?: string;
  isPrebook?: boolean;
  prebookTime?: string;
  isAC?: boolean;
  isEV?: boolean;
  createdAt: string;
}

export interface BookingRequest {
  pickup: string;
  dropoff: string;
  vehicleType: string;
  isAC?: boolean;
  isEV?: boolean;
  isPrebook?: boolean;
  prebookTime?: string;
}

export interface PaymentVerification {
  rideId: string;
  otp: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  earnedAt?: string;
  unlocked: boolean;
}

export interface RideStreak {
  currentStreak: number;
  longestStreak: number;
  lastRideDate: string;
}

// ─── Auth Service ────────────────────────────────────────────────────────────

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string, phone?: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    });
  },

  async refreshToken(token: string): Promise<{ token: string }> {
    return apiFetch<{ token: string }>("/api/auth/refresh", {
      method: "POST",
    }, token);
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("dashdrive_token");
  },

  storeToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("dashdrive_token", token);
  },

  clearToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("dashdrive_token");
  },
};

// ─── Rides Service ───────────────────────────────────────────────────────────

export const ridesService = {
  async bookRide(req: BookingRequest, token: string): Promise<Ride> {
    return apiFetch<Ride>("/api/rides/book", {
      method: "POST",
      body: JSON.stringify(req),
    }, token);
  },

  async preBookRide(req: BookingRequest & { prebookTime: string }, token: string): Promise<Ride> {
    return apiFetch<Ride>("/api/rides/prebook", {
      method: "POST",
      body: JSON.stringify({ ...req, isPrebook: true }),
    }, token);
  },

  async getRide(rideId: string, token: string): Promise<Ride> {
    return apiFetch<Ride>(`/api/rides/${rideId}`, {}, token);
  },

  async getUserRides(userId: string, token: string): Promise<Ride[]> {
    return apiFetch<Ride[]>(`/api/rides/user/${userId}`, {}, token);
  },

  async cancelRide(rideId: string, token: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>(`/api/rides/${rideId}/cancel`, {
      method: "POST",
    }, token);
  },

  async bookEmergencyRide(location: string, emergencyType: string, token?: string): Promise<Ride> {
    return apiFetch<Ride>("/api/rides/emergency", {
      method: "POST",
      body: JSON.stringify({ location, emergencyType, vehicleType: "taxi", pickup: location, dropoff: "Hospital" }),
    }, token);
  },
};

// ─── Payments Service ────────────────────────────────────────────────────────

export const paymentsService = {
  async initiatePayment(rideId: string, token: string): Promise<{ paymentId: string; amount: number }> {
    return apiFetch<{ paymentId: string; amount: number }>("/api/payments/initiate", {
      method: "POST",
      body: JSON.stringify({ rideId }),
    }, token);
  },

  async verifyOTP(payload: PaymentVerification, token: string): Promise<{ success: boolean; message: string }> {
    return apiFetch<{ success: boolean; message: string }>("/api/payments/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }, token);
  },

  async cancelPayment(paymentId: string, token: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/api/payments/cancel", {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    }, token);
  },
};

// ─── Subscriptions Service ───────────────────────────────────────────────────

export const subscriptionsService = {
  async getPlans(): Promise<SubscriptionPlan[]> {
    return apiFetch<SubscriptionPlan[]>("/api/subscriptions/plans");
  },

  async subscribe(planId: string, token: string): Promise<{ success: boolean; subscription: SubscriptionPlan }> {
    return apiFetch<{ success: boolean; subscription: SubscriptionPlan }>("/api/subscriptions/subscribe", {
      method: "POST",
      body: JSON.stringify({ planId }),
    }, token);
  },

  async cancelSubscription(token: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/api/subscriptions/cancel", {
      method: "POST",
    }, token);
  },
};

// ─── Rewards Service ─────────────────────────────────────────────────────────

export const rewardsService = {
  async getUserRewards(userId: string, token: string): Promise<{ badges: Reward[]; streak: RideStreak; points: number }> {
    return apiFetch<{ badges: Reward[]; streak: RideStreak; points: number }>(
      `/api/rewards/${userId}`, {}, token
    );
  },

  async claimReward(rewardId: string, token: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/api/rewards/claim", {
      method: "POST",
      body: JSON.stringify({ rewardId }),
    }, token);
  },
};

// ─── WebSocket Helper ─────────────────────────────────────────────────────────

export function createRideWebSocket(rideId: string, onUpdate: (data: Partial<Ride>) => void): WebSocket {
  const wsUrl = (process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080").replace(/^http/, "ws");
  const ws = new WebSocket(`${wsUrl}/ws/ride/${rideId}`);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onUpdate(data);
    } catch {
      console.error("WebSocket parse error", event.data);
    }
  };

  ws.onerror = (err) => console.error("WebSocket error:", err);

  return ws;
}
