import React, { useState, useEffect } from "react";
import axios from "axios";
import './btn.css';

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setMessage("");
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
          setColor("red");
          setMessage("Employee not logged in");
          return;
        }

        const res = await axios.get("http://localhost:3000/api/employee/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployee(res.data);
        setColor("green");
      } catch (err) {
        setColor("red");
        setMessage(err.response?.data?.message || "Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return <p className={`text-${color === "green" ? "green-600" : "red-600"} mt-6 text-center`}>{message}</p>;
  }

  if (!employee) {
    return <p className="text-white mt-6 text-center">Loading profile...</p>;
  }

  return (
    <div className="relative w-full sm:w-[90%] lg:w-[70%] mx-auto mt-6 p-4 bg-gray-900 text-white rounded-2xl shadow-xl animate-fadeIn">
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-400 px-4 py-1 rounded-xl shadow-md"
      >
        Logout
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Your Unicode</span>
          <span className="text-lg font-semibold">{employee.employeeId}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Name</span>
          <span className="text-lg font-semibold">{employee.name}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Position</span>
          <span className="text-lg font-semibold">{employee.position}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Department</span>
          <span className="text-lg font-semibold">{employee.department || "N/A"}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Email</span>
          <span className="text-lg font-semibold">{employee.email}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-center">
          <span className="text-gray-400">Salary</span>
          <span className="text-lg font-semibold">{employee.salary || "N/A"}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md col-span-1 sm:col-span-2 flex flex-col justify-center">
          <span className="text-gray-400">Date of Joining</span>
          <span className="text-lg font-semibold">{new Date(employee.dateOfJoining).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
