"use client";
import SubmitButton from "@/components/SubmitButton";
import { extractBatch } from "@/lib/SubmitActions";
import { useState } from "react";

export default function Extraction() {
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(formData: FormData) {
    const res = await extractBatch(formData);
    setResult(res); // store the response (metadata + data)
  }
  return (
    <div className="ml-7">
      <h2 className="font-semibold text-2xl text-gray-600">
        Extract Data from Database
      </h2>
      <hr />
      {/* Batch Extraction */}
      <div className="my-10 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h3 className="font-light">Fill in the fields to submit files </h3>
        <form className="mt-5" action={handleSubmit}>
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              type="text"
              className="border border-green-500 w-100 p-2 rounded-xl"
              required
              name="name"
              placeholder="File Name "
            />

            <select
              className="w-100 border border-green-500 p-2 rounded-xl"
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
            <textarea
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="metadata"
              placeholder='{"batch_size": 10, "project": "Q2 analysis"}'
            ></textarea>
          </div>
          <br />
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <textarea
              className="border border-green-500 p-2 rounded-xl w-100"
              name="documentation"
              id=""
              placeholder="Documentation/ Small Explanation"
            ></textarea>
            <SubmitButton
              label="Submit"
              pendingLabel="Saving..."
              className="bg-blue-600 text-white border-green-400"
            />
          </div>
        </form>
      </div>
            {/* Render the extracted data */}
      {result && (
        <div className="mt-10">
          <h3 className="font-semibold text-xl">Extraction Metadata</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(result.extraction, null, 2)}
          </pre>

          <h3 className="font-semibold text-xl mt-5">Extracted Data</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
