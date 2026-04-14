'use client'
import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { logoutAction } from "@/lib/authActions";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(()=>{
    const tokens = document.cookie.includes("access=")
    setIsAuthenticated(tokens)
   },[])
  return (
    <>
      <main className=" flex justify-between items-center backdrop-blur-3xl container mx-auto border border-green-400 rounded-xl p-1 h-15 mt-1 shadow-lg w-1/2">
        <div>
          <Link className="flex  items-center gap-1.5" href={"/"}>
            <DatabaseZap size={35} color="green" />
            <h1 className="text-green-700 hover:text-black ">
              Database Connector
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? <form action={logoutAction}>
             <button className="text-sm text-gray-400 hover:text-red-600 transition-colors" type="submit">Logout</button>
          </form>: <Link href={"/signin"}>Signin</Link> }
          <ModeToggle />
        </div>
      </main>
    </>
  );
}
