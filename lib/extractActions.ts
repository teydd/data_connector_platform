'use server'
import { cookies } from "next/headers"

const BASE = process.env.BASE_URL

export async function extract(formData:FormData) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("access")?.value

  // Convert formData into a payload
  const payload = {
    name: formData.get("name"),
    connection: formData.get("connection"),
    batch_size: Number(formData.get("batch_size")),
    host: formData.get("host"),
    port: Number(formData.get("port")),
    collection: formData.get("collection"),
    dbname : formData.get("dbname"),
    password: formData.get("password")
  }

  // Step 1: create extraction
  const createRes = await fetch(`${BASE}/extractions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  if (!createRes.ok) throw new Error("Error creating extraction")
  const extraction = await createRes.json()

  // Step 2: run extraction
  const runRes = await fetch(`${BASE}/extractions/${extraction.id}/extract/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!runRes.ok) throw new Error("Error running extraction")
  const result = await runRes.json()

  return result
}
