"use client";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { createSubmissions, listSubmission } from "@/lib/SubmitActions";
import React, { useEffect, useState } from "react";

export default function Submissions() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [batchSize, setBatchSize] = useState<number>(10);
    const [selectedSource, setSelectedSource] = useState<string>("");
  
    useEffect(() => {
      async function fetchData() {
        const data = await listSubmission();
        setSubmissions(data);
      }
      fetchData();
    }, []);
  return (
    <>
      <div className="ml-7">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl text-gray-600">
            Submit Data/ Files To a Database
          </h2>
        </div>
        <hr />
        <div className="my-10 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h3 className="font-light">Fill in the fields to submit files </h3>
          <form
            action={createSubmissions}
            className="mt-5"
          >
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                className="border border-green-500 w-100 p-2 rounded-xl"
                required
                name="title"
                placeholder="Title "
              />

              <select
                className="w-100 border-green-500 border p-2 rounded-xl"
                name="database_type"
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
                type="file"
                className="border border-green-500 w-100 p-2 rounded-xl"
                name="file_upload"
              />
              <input
                type="url"
                className="border border-green-500 w-100 p-2 rounded-xl"
                placeholder="Video Link"
                name="video_link"
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <textarea
                className="border border-green-500  p-2 rounded-xl w-100"
                name="documentation"
                id=""
                placeholder="Documentation/ Small Explanation"
              ></textarea>
              <SubmitButton
                label="Submit"
                pendingLabel="Saving..."
                className="bg-blue-600 text-white border-green-400 w-fit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="my-10 bg-lime-500/30 rounded-xl shadow-lg p-6">
        <h3 className="font-light">Available Submissions</h3>
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <ul className="space-y-3 mt-3">
            {submissions.map((sub) => (
              <li
                key={sub.id}
                className="border p-3 rounded-lg bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSource(sub.database_type)}
              >
                <p className="font-bold">{sub.title}</p>
                <p className="text-sm">Database: {sub.database_type}</p>
                {sub.file_upload && (
                  <a
                    href={sub.file_upload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download File
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
