import { registerUser } from "@/lib/authActions";
import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-lime-600 to-green-400 grid place-items-center">
        <div className="bg-gray-400/60 rounded-lg backdrop-blur-4xl w-1/2 md:w-1/3 lg:w-1/3 mx-auto p-6">
        <DatabaseZap className="flex mx-auto" size={35} color="green"/>
          <h2 className="text-center p-2 text-2xl">Create An Account </h2>
          <form className="justify-center flex flex-col" action= {registerUser}>
            <input className="border rounded px-3 h-10 mb-4" type="text" name="email" id="email" placeholder="Email"/>
            <input className="border rounded px-3 h-10 mb-4" type="text" name="username" id="username" placeholder="Username"/>
            <input className="border rounded px-3 h-10 mb-4" type="password" name="password" id="password"  placeholder="Password"/>
            <Link className="text-sm w-fit font-extralight mb-4" href={"/"}>Forgot Password?</Link>
            <button type="submit" className="border w-1/2 mx-auto rounded ">Sign Up</button>
            <br />
            <hr />
            <p className="text-center pt-4"> Already have an Account? <Link href={"/signin"}> Sign In</Link></p>
            
          </form>
        </div>
      </div>
    </>
  );
}
