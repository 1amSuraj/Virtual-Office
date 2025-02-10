"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function DepartmentPage() {
  const params = useParams();
  const departmentName = params.department as string; // Unwrap the promise

  // Generate 10 cabins + boss cabin
  const cabins = Array.from({ length: 10 }, (_, i) => `Cabin ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">{departmentName} Department</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cabins.map((cabin) => (
          <Link
            key={cabin}
            href={`/dashboard/${departmentName}/${cabin.replace(/\s/g, "").toLowerCase()}`}
            className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center hover:bg-purple-500 hover:text-white transition"
          >
            {cabin}
          </Link>
        ))}

        {/* Boss Cabin */}
        <Link
          href={`/dashboard/${departmentName}/boss`}
          className="p-5 bg-purple-700 text-white rounded-lg shadow-md text-center hover:bg-purple-900 transition"
        >
          Boss Cabin
        </Link>
      </div>
    </div>
  );
}
