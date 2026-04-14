import React from "react";

export default function Dashboard() {
  const user = "Teddy Chemos";
  return (
    <>
      <div className="mr-7">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl text-gray-600">
            Welcome {user}
          </h2>
        </div>
        <hr />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {/* Overview Cards */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Connections</h2>
            <p className="mt-2 text-gray-500">Active: 4 | Errors: 1</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Submissions</h2>
            <p className="mt-2 text-gray-500">Pending: 3 | Completed: 12</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Extractions</h2>
            <p className="mt-2 text-gray-500">Success: 45 | Failed: 2</p>
          </div>

          {/* Activity Log */}
          <div className="rounded-xl border bg-white p-6 shadow-sm md:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✔ Connected to PostgreSQL</li>
              <li>✔ Extracted 200 records from MySQL</li>
              <li>⚠ Submission failed for MongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
