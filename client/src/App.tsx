import { useState, useEffect } from "react";
import { getEmployees, addEmployee } from "./api";
import type { Employee } from "./types";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ name: "", role: "", department: "" });

  // 1. Define AND Call the function inside useEffect
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to load employees", error);
      }
    };

    loadData();
  }, []); // Empty dependency array = runs once on mount

  // 2. We still need a way to reload data after submitting a form.
  // We can create a separate function for that or just reuse the logic.
  // For simplicity, let's create a standalone refresher function.
  const refreshData = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    // Send to Backend
    await addEmployee(form);

    // Refresh List
    await refreshData();

    // Clear Form
    setForm({ name: "", role: "", department: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
        TeamMate Directory 👥
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: FORM */}
        <div className="bg-white p-6 rounded shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold"
            >
              Add to Team
            </button>
          </form>
        </div>

        {/* RIGHT: LIST */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Team Members ({employees.length})
          </h2>
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-blue-500"
            >
              <div>
                <p className="font-bold text-lg">{emp.name}</p>
                <p className="text-gray-600">{emp.role}</p>
              </div>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded uppercase font-bold">
                {emp.department}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
