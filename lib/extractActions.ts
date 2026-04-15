'use server'
import { cookies } from "next/headers"

const BASE = process.env.BASE_URL


export async function extract() {
    const cookieStore = cookies()
    const token = (await cookieStore).get("access")?.value

    const res = await fetch(`${BASE}/extractions/extract/`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Error fetching");
        
    }
    const result = res.json()
    return result    
}