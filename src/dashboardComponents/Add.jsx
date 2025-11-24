import React, { useState } from "react";
import axios from "axios";
import './fade.css';

const Add = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [color , setColor] = useState("green");

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("Admin not logged in");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/admin/employees", // match backend route
        { name, position, department, email, salary },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setColor("green")
      setMessage(res.data.message || "Employee added successfully");

      setName("");
      setPosition("");
      setDepartment("");
      setEmail("");
      setSalary("");

    } catch (err) {
      setColor("red")
      setMessage(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <>
      <h1 className="text-3xl animate-fadeIn text-white">Add Employee</h1>
      <form
        onSubmit={handleAdd}
        className="p-4 h-[400px] w-full sm:w-full items-center flex flex-col gap-5 justify-around border-white border-2 border-solid rounded-xl shadow-green-400 shadow-md animate-fadeIn"
      >
        <input
          type="text"
          placeholder="Name"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Salary"
          className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-400 w-[90%] border-2 border-black rounded-xl hover:bg-green-300 shadow-md"
        >
          Add
        </button>
        {message && <p className={`text-${color=='green' ? 'green-600' : 'red-600'}`}>{message}</p>}
      </form>
    </>
  );
};

export default Add;
