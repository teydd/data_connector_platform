'use client'
import Grid from "@/components/DataGrid";
import SubmitButton from "@/components/SubmitButton";
import { extract } from "@/lib/extractActions";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";


export default function Extraction() {
  return (
    <div className="ml-7">
      <h2 className="font-semibold text-2xl text-gray-600">
        Extract Data from Database
      </h2>
      <hr />
      {/* Batch Extraction */}
      <div className="my-10 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h3 className="font-light">Fill in the fields to submit files </h3>
        <form className="mt-5" action={extract}>
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              type="text"
              className="border border-green-500 w-100 p-2 rounded-xl"
              required
              name="name"
              placeholder="Title "
            />
            <select
              className="w-100 border border-green-500 p-2 rounded-xl"
              name="connection"
              id=""
              required
              defaultValue={""}
            >
              <option value="" disabled>
                Select a Database Type
              </option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="clickhouse">ClickHouse</option>
            </select>
          </div>
          <br />
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="batch_size"
              placeholder='{"batch_size": 10, "project": "Q2 analysis"}'
            />
            <input
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="host"
              placeholder="Host"
            />
          </div>
          <br />
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="port"
              placeholder="Port"
            />
            <input
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="collection"
              placeholder="Collection"
            />
          </div>
          <br />
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="dbname"
              placeholder="Database Name"
            />
            <input
              type="password"
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="password"
              placeholder="Password"
            />
          </div>
          <br />
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <SubmitButton
              label="Submit"
              pendingLabel="Saving..."
              className="bg-blue-600 text-white border-green-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
