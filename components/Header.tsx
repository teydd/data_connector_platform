import React from "react";
import { Button } from "./ui/button";
import { DatabaseZap } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const links = [
        {
            name:"SignIn", href:"/signin"
        },
    ]
  return (
    <>
      <main className="bg-lime-300/70 flex justify-between items-center backdrop-blur-3xl container mx-auto border border-green-700 rounded-xl p-1 h-15 max-w-md">
        <div>
          <Link className="flex  items-center gap-1.5" href={"/"}>
          <DatabaseZap size={35} color="green"/>
          <h1 className="text-green-700 hover:text-black ">Database Connector</h1>
          </Link>
        </div>
        <div className="">
            <ul className="gap-2 flex">
                {links.map((items,key)=>(
                    <li key={key} className="items-center"> <Link href={items.href}> {items.name} </Link> </li>
                ))}
            </ul>
        </div>
      </main>
    </>
  );
}
