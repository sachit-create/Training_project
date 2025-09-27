import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ShowEmployees from "./ShowEmployees";
import DeleteEmployees from "./DeleteEmployees";
import UpdateEmployees from "./UpdateEmployees";
import AddEmployee from "./AddEmployee";
import FindAll from "./FindAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
        <Route path="/showemp" element={<ShowEmployees />} />
        <Route path="/deleteemp" element={<DeleteEmployees />} />
        <Route path="/updateemp" element={<UpdateEmployees />} />
        <Route path="/findall" element={<FindAll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
