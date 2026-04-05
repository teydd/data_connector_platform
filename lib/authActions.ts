"use server";

import { AuthResponse, LoginData, RegisterData } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE = process.env.BASE_URL;

export const registerUser = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const res = await fetch(`${BASE}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Registration Failed");
  }
  const result = await res.json();
  redirect("/signin");

  return result;
};

export const signIn = async (formData: FormData) => {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const res = await fetch(`${BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Login Unsuccessful");
  }

  const result = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("access", result.access);

  redirect("/");
  return result;
};
