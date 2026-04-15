"use client";
import Grid from "@/components/DataGrid";
import React, { useState } from "react";

export default function Dashboard() {
  // For demo purposes, hardcode an extractionId
  // Later you can fetch or select this dynamically
  const [extractionId] = useState<number>(23);

  return (
    <div className="ml-7 h-screen">
      <h2 className="font-semibold text-2xl text-gray-600">
        Welcome to the Dashboard
      </h2>
      <hr />
      <div className="my-10 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h3 className="font-light">Welcome to the Dashboard </h3>
        <Grid extractionId={extractionId} />
      </div>
    </div>
  );
}
