"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE = process.env.BASE_URL;

export const registerUser = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
    role: formData.get("role"),
    first_name:formData.get("fname"),
    last_name:formData.get("lname")
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
    throw new Error("Login Unsuccessful: Invalid password or username");
  }

  const result = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("access", result.access);

  redirect("/connections");
  return result;
};

export async function logoutAction(){
  const cookieStore = await cookies()
  cookieStore.delete("access")
  redirect("/")
} 
