"use client";
import SubmitButton from "@/components/SubmitButton";
import { extractBatch } from "@/lib/SubmitActions";

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
        <form className="mt-5" action={extractBatch}>
          <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
            <input
              type="text"
              className="border border-green-500 w-100 p-2 rounded-xl"
              required
              name="title"
              placeholder="Title "
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
            <input
              type="number"
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="batch_size"
              placeholder="Batch Size"
              defaultValue={10}
            />
            <input
              type="text"
              className="border border-green-500 w-100 p-2 rounded-xl"
              name="table"
              placeholder="Table name"
              required
            />
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
    </div>
  );
}
