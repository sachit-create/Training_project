import React, { useState, useEffect } from "react";
import axios from "axios";
import './fade.css';

const FindAll = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  useEffect(() => {
    const fetchEmployees = async () => {
      setMessage("");
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setColor("red");
          setMessage("Admin not logged in");
          return;
        }

        const res = await axios.get("http://localhost:3000/api/admin/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployees(res.data);
        setColor("green");
        setMessage(`Found ${res.data.length} employees`);

      } catch (err) {
        setColor("red");
        setMessage(err.response?.data?.message || "Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <h1 className="text-3xl animate-fadeIn text-white mb-4">All Employees</h1>
      {message && (
        <p className={`text-${color === "green" ? "green-600" : "red-600"} mb-2 text-3xl`}>
          {message}
        </p>
      )}

      <div className="w-full overflow-auto border-2 border-white rounded-xl shadow-md bg-white animate-fadeIn">
        <table className="min-w-[700px] w-full border-collapse border border-gray-300 text-black">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2">Employee ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{emp.employeeId}</td>
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.position}</td>
                  <td className="border px-4 py-2">{emp.department}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.salary}</td>
                  <td className="border px-4 py-2">
                    {new Date(emp.dateOfJoining).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FindAll;
