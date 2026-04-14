"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE = process.env.BASE_URL;

export const listSubmission = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access")?.value;
  const res = await fetch(`${BASE}/submissions/create/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch submissions");
  }
  return res.json();
};

export const createSubmissions = async (formData: FormData) => {

  const cookieStore = cookies();
  const token = (await cookieStore).get("access")?.value;

  const res = await fetch(`${BASE}/submissions/create/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Submission creation failed: ${err} `);
  }

  const result = await res.json()
  revalidatePath("/submissions")
  return result
};

export const updateSubmission = async (id: number, formData: FormData) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access")?.value;

  const res = await fetch(`${BASE}/submissions/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Submission update failed: ${err}`);
  }

  const result = await res.json();
  revalidatePath("/submissions");
  return result;
};

export async function extractBatch(formData:FormData) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access")?.value;

  const res = await fetch(`${BASE}/extractions/extract/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Extraction failed");
  return res.json();
}

