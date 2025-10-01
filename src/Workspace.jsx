import { useState, useEffect } from "react";
import "./btn.css";
import AdminDashboard from "./AdminDashboard";

export default function App() {

  const [showWork, setShowWork] = useState(() => {
    return localStorage.getItem("showWork") === "true";
  });

  const handleGetStarted = () => {
    setShowWork(true);
    localStorage.setItem("showWork", "true");
  };

  return (
    <div
      className={`w-full sm:w-screen min-h-[600px] h-screen flex flex-col items-center justify-center p-4 bg-${!showWork ? "white" : "black"} transition-all duration-500`}
    >
      {!showWork && (
        <div className="text-white rounded-xl h-screen w-full sm:w-[100%]  shadow-xl bg-black flex flex-col items-center gap-4 animate-fadeIn">
          <div className="h-[10%] w-full flex justify-start p-8 text-2xl sm:text-3xl font-bold mt-5 text-green-500">
            Welcome ,&nbsp;<span className="text-white">{"Sachit"}</span>
          </div>
          <div className="h-[50%] w-full flex flex-col items-center justify-around flex-wrap  p-4 font-bold">
            <div className="text-4xl sm:text-7xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Employee Management System
              </span>
            </div>
            <div className="text-3xl sm:text-5xl text-green-500">
              Admin Panel
            </div>
          </div>
          <div className="h-[10%] w-full flex items-center justify-center">
            <button
              className="button-85"
              role="button"
              onClick={handleGetStarted}
            >
              {"Get Started ->"}
            </button>
          </div>
        </div>
      )}

      {showWork && (
          <>
            <AdminDashboard />
          </>
      )}

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s forwards;
          }
        `}
      </style>
    </div>
  );
}
