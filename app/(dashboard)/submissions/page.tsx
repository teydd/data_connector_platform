"use client";
import SubmitButton from "@/components/SubmitButton";
import { createSubmissions } from "@/lib/SubmitActions";

export default function Submissions() {
  return (
    <form action={createSubmissions} className="space-y-4 p-6 bg-lime-500/30 rounded-xl">
      {/* Title */}
      <input type="text" name="title" placeholder="Title" required className="border p-2 rounded-xl w-full" />

      {/* Database type */}
      <select name="database_type" required className="border p-2 rounded-xl w-full">
        <option value="" disabled>Select Database Type</option>
        <option value="postgresql">PostgreSQL</option>
        <option value="mysql">MySQL</option>
        <option value="mongodb">MongoDB</option>
        <option value="clickhouse">ClickHouse</option>
      </select>

      {/* Connection details */}
      <input type="text" name="host" placeholder="Host" required className="border p-2 rounded-xl w-full" />
      <input type="number" name="port" placeholder="Port" required className="border p-2 rounded-xl w-full" />
      <input type="text" name="username" placeholder="Username" required className="border p-2 rounded-xl w-full" />
      <input type="password" name="password" placeholder="Password" required className="border p-2 rounded-xl w-full" />

      {/* Target location */}
      <input type="text" name="table" placeholder="Table" required className="border p-2 rounded-xl w-full" />
      <input type="text" name="collection" placeholder="Collection" className="border p-2 rounded-xl w-full" />

      {/* File upload */}
      <input type="file" name="file_upload" className="border p-2 rounded-xl w-full" />
      <input type="number" name="batch_size" className="border p-2 rounded-xl w-full" placeholder="Batch Size of the file" />

      {/* Documentation */}
      <textarea name="documentation" placeholder="Documentation" className="border p-2 rounded-xl w-full"></textarea>

      <SubmitButton label="Submit" pendingLabel="Saving..." className="bg-blue-600 text-white px-4 py-2 rounded-xl" />
    </form>
  );
}
