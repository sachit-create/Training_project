import React, { useState } from "react";
import axios from "axios";
import './fade.css';

const Delete = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setColor("red");
        setMessage("Admin not logged in");
        return;
      }

      const res = await axios.delete(
        `http://localhost:3000/api/admin/employees/${employeeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setColor("green");
      setMessage(res.data.message || "Employee deleted successfully");

      setEmployeeId("");

    } catch (err) {
      setColor("red");
      setMessage(err.response?.data?.message || "Error deleting employee");
    }
  };

  return (
    <>
      <h1 className="text-3xl animate-fadeIn text-white">Delete Employee</h1>
      <form
        onSubmit={handleDelete}
        className="p-4 h-[200px] w-full sm:w-full items-center flex flex-col gap-5 justify-around border-white border-2 border-solid rounded-xl shadow-green-400 shadow-md animate-fadeIn"
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
          Delete
        </button>
        {message && (
          <p className={`text-${color === "green" ? "green-600" : "red-600"}`}>
            {message}
          </p>
        )}
      </form>
    </>
  );
};

export default Delete;
