"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE = process.env.BASE_URL;

export const createConnection = async (formData: FormData) => {
  const data = {
    database_name: formData.get("database_name"),
    database_type: formData.get("db_type"),
    host: formData.get("host"),
    port: Number(formData.get("port")),
    username: formData.get("username"),
    password: formData.get("password"),
    uri: formData.get("uri"),
  };
  const cookieStore = cookies()
  const token = (await cookieStore).get("access")?.value

  const res = await fetch(`${BASE}/connections/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Connection creation failed: ${err}`);
  }

  const result = await res.json();
  revalidatePath("/connections");
  return result;
};

export const deleteConnection = async (formData: FormData) => {
  const id = formData.get("id");
  const res = await fetch(`${BASE}/connections/${id}/`, { method: "DELETE" });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Connection deletion failed: ${err}`);
  }

  revalidatePath("/connections");
};

export const testConnection = async (formData: FormData) => {
  const id = formData.get("id");

  const res = await fetch(`${BASE}/connections/${id}/test/`, {
    method: "POST",
  });

  if (!res.ok) {
    return { result: "failed", message: "Could not reach the database." };
  }

  const data = await res.json();
  return {
    result: data.success ? "success" : "failed",
    message: data.success
      ? "Connection successful!"
      : data.error || "Connection failed.",
  };
};
