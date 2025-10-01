import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [admin, setAdmin] = useState(() => localStorage.getItem("isAdmin") !== "false");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [unicode, setUnicode] = useState("");
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  const toggleAdmin = () => {
    setFadeOut(true);
    setTimeout(() => {
      const newAdmin = !admin;
      setAdmin(newAdmin);
      localStorage.setItem("isAdmin", newAdmin);
      setFadeOut(false);
      setMessage("");
    }, 500);
  };

  // ---------------- Admin Login ----------------
  const handleAdminLogin = async () => {
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Admin login failed");
    }
  };

  // ---------------- Employee Login ----------------
  const handleEmployeeLogin = async () => {
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/employee/login", {
        employeeId: unicode || undefined,
        email: email || undefined,
      });

      if (res.data.token) {
        localStorage.setItem("employeeToken", res.data.token);
        navigate("/employee"); // navigate only if token is valid
      } else {
        setMessage(res.data.message); // e.g., "Employee ID sent to your email"
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Employee login failed");
    }
  };

  return (
    <div className="w-full sm:w-screen min-h-[600px] h-screen flex items-center justify-center p-4 bg-gray-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-col h-80 w-80 rounded-xl items-center justify-around border-2 border-black shadow-xl p-4 transition-opacity duration-500 ${
          fadeOut ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      >
        <h1 className="text-xl">Enter {admin ? "Details" : "Unicode"}</h1>

        {admin ? (
          <>
            <input
              type="text"
              placeholder="Username"
              className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="h-[36px] w-[90%] flex justify-around items-center gap-2 px-2 flex-wrap">
              <input
                type="text"
                placeholder="Email"
                className="outline-none w-[70%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="text-green-600 underline hover:text-green-400"
                onClick={handleEmployeeLogin}
              >
                Get
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter Unicode"
              className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
              value={unicode}
              onChange={(e) => setUnicode(e.target.value)}
            />
          </>
        )}

        <button
          type="button"
          className="bg-green-400 w-[90%] border-2 border-black rounded-xl hover:bg-green-300 shadow-md"
          onClick={admin ? handleAdminLogin : handleEmployeeLogin} // Handles both logins
        >
          Login
        </button>

        {message && <p className="text-red-600">{message}</p>}

        <p>
          Are you a{" "}
          <button
            className="text-blue-600 hover:text-blue-800 hover:underline"
            onClick={toggleAdmin}
          >
            {admin ? "Employee" : "Admin"}
          </button>{" "}
          ?
        </p>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeOut {
            0% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(20px); }
          }
          .animate-fadeIn { animation: fadeIn 0.5s forwards; }
          .animate-fadeOut { animation: fadeOut 0.5s forwards; }
        `}
      </style>
    </div>
  );
};

export default Login;
