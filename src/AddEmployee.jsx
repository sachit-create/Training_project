import React from "react";
import { useState } from "react";

const AddEmployee = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [msg, setMsg] = useState("");

  const handleAdd = async () => {
    if (!id || !name || !salary) {
      setMsg("Please fill all fields!");
      setTimeout(() => setMsg(""), 5000);
      return;
    }
    const emp = {
      empNo: Number(id),
      empName: name,
      empSal: Number(salary),
    };
    try {
      const res = await axios.post("http://localhost:3000/api/employees", emp);
      setMsg(res.data.message);
      setId("");
      setName("");
      setSalary("");
      setTimeout(() => setMsg(""), 5000);
    } catch (err) {
      setMsg("Error adding employee");
      setTimeout(() => setMsg(""), 5000);
    }
  };

  return (
      <main className="sm:h-[60%] sm:w-[50%] flex items-center justify-center mx-4 my-4">
        <div className="flex flex-col h-80 w-80 rounded-xl items-center justify-around border-2 border-black shadow-md">
          <h1 className="text-xl">Enter Employee details</h1>
          <input
            type="text"
            placeholder="Id"
            className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <input
            type="text"
            placeholder="Name"
            className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Salary"
            className="outline-none w-[90%] border-2 border-black rounded-xl p-1 shadow-md duration-200 hover:scale-[105%]"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
          <button
            className="bg-green-400 w-[90%] border-2 border-black rounded-xl hover:bg-green-300 shadow-md"
            onClick={handleAdd}
          >
            Add
          </button>
          <div className="text-sm p-2 text-blue-600 h-2">
            <p>{msg}</p>
          </div>
        </div>
      </main>
  );
};

export default AddEmployee;
