import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ShowEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data));
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-start flex-col gap-10 mt-10">
      <div className="h-[80px] w-[90%] bg-black text-white rounded-2xl flex justify-around items-center">
        <Link to="/">Home</Link>
        <Link to="/deleteemp">Delete Employees</Link>
        <Link to="/updateemp">Update Employees</Link>
        <Link to="/showemp">Show Employees</Link>
        <Link to="/findall">Find All</Link>
      </div>
      <h2 className="text-xl mb-4">Employee List</h2>
      <table className="border w-[90%] h-auto">
        <thead>
          <tr>
            <th className="border px-2">Id</th>
            <th className="border px-2">Name</th>
            <th className="border px-2">Salary</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-white">
          {employees.map((emp, index) => (
            <tr key={index}>
              <td className="border px-2">{emp.empNo}</td>
              <td className="border px-2">{emp.empName}</td>
              <td className="border px-2">{emp.empSal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowEmployees;
