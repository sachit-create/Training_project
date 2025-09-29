import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShowEmployees from "./ShowEmployees";
import DeleteEmployees from "./DeleteEmployees";
import UpdateEmployees from "./UpdateEmployees";
import AddEmployee from "./AddEmployee";
import FindAll from "./FindAll";
import { useState } from "react";

function App() {

  const [page, setPage] = useState('home')

  return (
    <div className="h-screen w-full flex items-center justify-start flex-col gap-10 mt-10">
      <BrowserRouter>
        <header className="h-[80px] max-w-[1120px] w-[90%] bg-black text-white rounded-2xl flex items-center justify-around text-xl">
          <div className="w-[20%] flex items-center justify-center  duration-200 hover:mb-2 hover:text-2xl">
            <Link to="/">Home</Link>
          </div>
          <div className="w-[20%] flex items-center justify-center duration-200 hover:mb-2 hover:text-2xl">
            {" "}
            <Link to="/deleteemp">Delete</Link>
          </div>
          <div className="w-[20%] flex items-center justify-center duration-200 hover:mb-2 hover:text-2xl">
            {" "}
            <Link to="/updateemp">Update</Link>
          </div>
          <div className="w-[20%] flex items-center justify-center duration-200 hover:mb-2 hover:text-2xl">
            {" "}
            <Link to="/showemp">Find All</Link>
          </div>
          <div className="w-[20%] flex items-center justify-center duration-200 hover:mb-2 hover:text-2xl">
            {" "}
            <Link to="/findall">Find</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<AddEmployee />} />
          <Route path="/showemp" element={<ShowEmployees />} />
          <Route path="/deleteemp" element={<DeleteEmployees />} />
          <Route path="/updateemp" element={<UpdateEmployees />} />
          <Route path="/findall" element={<FindAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
