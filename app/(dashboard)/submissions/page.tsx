"use client";
import SubmitButton from "@/components/SubmitButton";
import { createSubmissions } from "@/lib/SubmitActions";
import { useEffect, useState } from "react";

export default function Submissions() {

  return (
    <>
      <div className="ml-7">
        <h2 className="font-semibold text-2xl text-gray-600">
          Extract Data from Database
        </h2>
        <hr />

        <div className="my-5 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6 border  border-green-500">
          <h3 className="font-light">Fill in the fields to submit files </h3>
          <form action={createSubmissions} className="mt-5 ">
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
              <select
                name="database_type"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              >
                <option value="" disabled>
                  Select Database Type
                </option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mongodb">MongoDB</option>
                <option value="clickhouse">ClickHouse</option>
              </select>
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              {/* Connection details */}
              <input
                type="text"
                name="host"
                placeholder="Host"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
              <input
                type="number"
                name="port"
                placeholder="Port"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                name="table"
                placeholder="Table"
                required
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
              <input
                type="text"
                name="collection"
                placeholder="Collection"
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="file"
                name="file_upload"
                className="border  border-green-500 p-2 rounded-xl w-full"
              />
              <input
                type="number"
                name="batch_size"
                className="border  border-green-500 p-2 rounded-xl w-full"
                placeholder="Batch Size of the file"
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <textarea
                name="documentation"
                placeholder="Documentation"
                className="border  border-green-500 p-2 rounded-xl"
              ></textarea>
            </div>
            <SubmitButton
              label="Submit"
              pendingLabel="Saving..."
              className="bg-blue-600 text-white px-4 py-2 rounded-xl mt-2 "
            />
          </form>
        </div>
      </div>
    </>
  );
}
