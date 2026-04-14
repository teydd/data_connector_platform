"use client";
import {
  Database,
  DatabaseZap,
  DoorClosedLockedIcon,
  File,
  Menu,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SidebarMenu() {
  const nav = [
    { name: "Connections", href: "/connections", Icon: Database },
    { name: "Submissions", href: "/submissions", Icon: Send },
    { name: "Extractions", href: "/extractions", Icon: File },
  ];
  const pathname = usePathname();
  return (
    <>
      <div>
        <Link className="flex items-center justify-center m-2 gap-2 pb-10" href={"/"}>
          <DatabaseZap size={35} color="green" />
          <h1 className="text-green-700 font-semibold hover:text-black">
            Database Connector
          </h1>
        </Link>
      </div>
      <hr className="mt-4" />

      

      <div className="p-2 m-4">
        <ul>
          {nav.map((item, key) => {
            const isActive = pathname === item.href;
            return (
              <li className="text-gray-400 m-4" key={key}>
                <Link
                  className={`flex gap-2 text-xl items-center ${isActive ? "bg-green-200/40 p-1 rounded-2xl text-green-800 font-semibold border border-green-700" : "text-gray-400 hover:text-green-700 hover:border-green-400 border rounded-2xl p-1"}`}
                  href={item.href}
                >
                  {item.Icon && <item.Icon size={25} />} {item.name}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
