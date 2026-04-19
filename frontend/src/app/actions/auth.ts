"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = "http://127.0.0.1:8080/api/auth";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || data.message || "Invalid email or password." };
    }

    // Set HTTP-only cookie with the token
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Optionally save some non-sensitive user data to cookies or let client handle it
  } catch (error) {
    return { error: "Failed to connect to the server." };
  }

  // Redirect after successfully setting the cookie
  redirect("/");
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || data.message || "Registration failed." };
    }

    // Set HTTP-only cookie with the token
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

  } catch (error) {
    return { error: "Failed to connect to the server." };
  }

  redirect("/");
}
