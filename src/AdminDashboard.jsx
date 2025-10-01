import React, { useState } from "react";
import Add from "./dashboardComponents/Add";
import Update from "./dashboardComponents/Update";
import Find from "./dashboardComponents/Find";
import FindAll from "./dashboardComponents/FindAll";
import Delete from "./dashboardComponents/Delete";
import AddImage from './assets/add.png'
import DeleteImg from './assets/delete.png'
import FindImg from './assets/find.png'
import FindAllImg from './assets/findall.png'
import UpdateImg from './assets/update.png'

const AdminDashboard = () => {
  const [option, setOption] = useState("add");
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  return (
    <div className="h-screen w-full text-white flex flex-col p-4 items-center justify-between sm:justify-start gap-1 sm:gap-5">
      <div className="visible sm:invisible h-[40px] rounded-xl w-full bg-cyan-400 flex items-center justify-between p-4">
        <div>theme</div>
        <div>EMS</div>
        <div className="w-[80px] duration-200 hover:rounded-xl hover:bg-red-300 hover:scale-[110%] text-center"
          onClick={()=>setLogoutConfirm(true)}>
            Logout
          </div>
      </div>

      <div className={`${!logoutConfirm ? "hidden" : "flex"} h-screen w-full bg-white/30 backdrop-blur-sm  fixed animate-fadeIn z-40 items-center justify-center`}>
        <div className="h-[200px] w-[200px] rounded-xl bg-white text-black flex flex-col items-center justify-around shadow-xl shadow-gray-600">
          <button onClick={()=>setLogoutConfirm(false)}>❌</button>
          <div>Wanna Logout ? </div>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/";
            }}
           className="duration-200 bg-blue-600 hover:scale-[105%] hover:bg-blue-400 rounded-xl h-[30px] w-[100px]">
            Confirm
          </button>
        </div>
      </div>

      <div className="h-[800px] sm:h-screen w-full flex items-center justify-around">
        <div className="hidden  h-[400px] min-w-[200px] w-[20%] bg-white rounded-xl sm:flex flex-col items-center justify-start gap-4 text-xl text-black border-white-solid p-1 shadow-green-500 shadow-md animate-fadeIn">
          <div className="h-12 w-full bg-black text-white text-xl flex items-center justify-center rounded-t-xl">
            Employee Options
          </div>
          <div
            className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-green-300 hover:scale-[110%]"
            onClick={() => setOption("add")}
          >
            Add
          </div>
          <div
            className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-green-300 hover:scale-[110%]"
            onClick={() => setOption("update")}
          >
            Update
          </div>
          <div
            className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-green-300 hover:scale-[110%]"
            onClick={() => setOption("delete")}
          >
            Delete
          </div>
          <div
            className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-green-300 hover:scale-[110%]"
            onClick={() => setOption("find")}
          >
            Find
          </div>
          <div
            className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-green-300 hover:scale-[110%]"
            onClick={() => setOption("findall")}
          >
            Find All
          </div>
          <div className="pl-4 w-full duration-200 hover:rounded-xl hover:bg-red-300 hover:scale-[110%]"
          onClick={()=>setLogoutConfirm(true)}>
            Logout
          </div>
        </div>

        <div className="h-full w-full sm:w-[60%] flex flex-col justify-around items-center animate-fadeIn text-black">
          {option == "add" && <Add />}
          {option == "update" && <Update />}
          {option == "delete" && <Delete />}
          {option == "find" && <Find />}
          {option == "findall" && <FindAll />}
        </div>
      </div>

      <div className="visible sm:invisible h-[60px] rounded-xl w-full bg-white flex items-center justify-between p-4">
            <button onClick={() => setOption("add")}>
              <img src={AddImage} alt="Example" className="h-full w-[40px]"/>
            </button>
            <button onClick={() => setOption("update")}><img src={UpdateImg} alt="Example" className="h-full w-[40px]"/></button>
            <button onClick={() => setOption("delete")}><img src={DeleteImg} alt="Example" className="h-full w-[40px]"/></button>
            <button onClick={() => setOption("find")}><img src={FindImg} alt="Example" className="h-full w-[40px]"/></button>
            <button onClick={() => setOption("findall")}><img src={FindAllImg} alt="Example" className="h-full w-[40px]"/></button>
      </div>

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
};

export default AdminDashboard;
