import React, { useState } from "react";
import axios from "axios";
import './fade.css';

const Find = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const handleFind = async (e) => {
    e.preventDefault();
    setMessage("");
    setEmployee(null);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setColor("red");
        setMessage("Admin not logged in");
        return;
      }

      const res = await axios.get(
        `http://localhost:3000/api/admin/employees/${employeeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmployee(res.data);
      setColor("green");
      setMessage("Employee found");

    } catch (err) {
      setColor("red");
      setMessage(err.response?.data?.message || "Error finding employee");
    }
  };

  return (
    <>
      <h1 className="text-3xl animate-fadeIn text-white">Find Employee</h1>
      <form
        onSubmit={handleFind}
        className="p-4 h-[300px] w-full sm:w-full items-center flex flex-col gap-5 justify-around border-white border-2 border-solid rounded-xl shadow-green-400 shadow-md animate-fadeIn"
      >
        <input
          type="text"
          placeholder="Employee ID"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-400 w-[90%] border-2 border-black rounded-xl hover:bg-green-300 shadow-md"
        >
          Find
        </button>
        {message && (
          <p className={`text-${color === "green" ? "green-600" : "red-600"}`}>
            {message}
          </p>
        )}
      </form>

      {employee && (
        <div className="mt-4 p-4 w-full sm:w-full border-2 border-white rounded-xl shadow-md bg-white text-black animate-fadeIn">
          <h2 className="text-xl font-bold">Employee Details:</h2>
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
        </div>
      )}
    </>
  );
};

export default Find;
