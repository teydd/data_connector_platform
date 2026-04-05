
import { registerUser } from "@/lib/authActions";
import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <>
      <div className="h-screen bg-linear-to-br from-lime-600 to-green-400 grid place-items-center">
        <div className="bg-gray-400/60 rounded-lg backdrop-blur-4xl w-1/2 md:w-1/3 lg:w-1/3 mx-auto p-6">
        <DatabaseZap className="flex mx-auto" size={35} color="green"/>
          <h2 className="text-center p-2 text-2xl">Create An Account </h2>
          <form className="justify-center flex flex-col" action= {registerUser}>
            <div className="gap-2 grid grid-cols-2">
               <input className="border rounded px-3 h-10 mb-4" type="text" name="fname" id="name" placeholder="First Name" required/>
                <input className="border rounded px-3 h-10 mb-4" type="text" name="lname" id="lname" placeholder="Last Name" required/>
            </div>
            <input className="border rounded px-3 h-10 mb-4" type="email" name="email" id="email" placeholder="Email" required/>
            <input className="border rounded px-3 h-10 mb-4" type="text" name="username" id="username" placeholder="Username" required/>
            <input className="border rounded px-3 h-10 mb-4" type="password" name="password" id="password"  placeholder="Password" required/>
            <input className="border rounded px-3 h-10 mb-4" type="password" name="password_confirm" id="password"  placeholder="Confirm Password" required/>
            <select className="border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="role" id="role" defaultValue={""} required>
              <option  value="" disabled>Select your role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <br />
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
