
import SubmitButton from "@/components/SubmitButton";
import { createConnection } from "@/lib/formActions";
import Link from "next/link";


export default function Connections() {
  return (
    <>
      <div className="ml-7 m">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl text-gray-600">
            Create A New Database Connection
          </h2>
        </div>
        <hr />

        <div className="my-10 bg-lime-500/30 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h3 className="font-light">
            Fill in the fields to configure a new Database{" "}
          </h3>
          <form action={createConnection} className="mt-5">
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                name="database_name"
                className="border border-green-500 w-100 p-2 rounded-xl"
                placeholder="Database Name"
                required
              />
              <select
                className="w-100 border-green-500 border p-2 rounded-xl"
                name="db_type"
                id=""
                required
                defaultValue={""}
              >
                <option value="" disabled >
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
                type="text"
                className="border border-green-500 w-100 p-2 rounded-xl"
                placeholder="Host"
                name="host"
                required
              />

              <input
                type="number"
                className="border border-green-500 w-100 p-2 rounded-xl"
                placeholder="Port"
                name="port"
                required
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <input
                type="text"
                className="border w-100 p-2 rounded-xl border-green-500"
                placeholder="Username"
                name="username"
                required
              />

              <input
                type="password"
                className="border w-100 p-2 rounded-xl border-green-500"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            <br />
            <div className="flex mx-auto justify-between flex-col md:flex-row gap-2">
              <textarea
                className="border border-green-500 p-2 rounded-xl w-100"
                name="uri"
                id=""
                placeholder="Type/ Paste the URI"
              ></textarea>
              <div className="col-span-2">
                <SubmitButton
                  label="Save Connection"
                  pendingLabel="Saving..."
                  className="bg-blue-600 text-white border-green-400"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
