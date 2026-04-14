import { signIn } from "@/lib/authActions";
import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SignIn() {
  return (
    <>
      <div className="h-screen bg-linear-to-br from-lime-600 to-green-400 grid place-items-center">
        <div className="bg-gray-400/60 rounded-lg backdrop-blur-4xl w-1/2 md:w-1/3 lg:w-1/3 mx-auto p-6">
          <DatabaseZap className="flex mx-auto" size={35} color="green" />
          <h2 className="text-center p-2 text-2xl">Welcome Back </h2>
          <form className="justify-center flex flex-col" action={signIn}>
            <input
              className="border rounded px-3 h-10 mb-4"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
            <input
              className="border rounded px-3 h-10 mb-4 focus:border-cyan-600"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <div className="justify-between flex mb-4">
              <Link className="text-sm font-extralight" href={"/"}>
                Forgot Password?
              </Link>
              <Link className="text-sm font-extralight" href={"/signup"}>
                Create An Account
              </Link>
            </div>
            <button
              type="submit"
              className="border w-1/2 mx-auto rounded hover:bg-green-700 "
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
