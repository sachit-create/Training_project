import React from 'react'
import { Link } from 'react-router-dom'

const FindAll = () => {
  return (
      <div className="h-screen w-screen flex items-center justify-start flex-col gap-10 mt-10">
        <header className="h-[80px] w-[90%] bg-black text-white rounded-2xl flex justify-around items-center">
          <Link to="/">Home</Link>
          <Link to="/deleteemp">Delete Employees</Link>
          <Link to="/updateemp">Update Employees</Link>
          <Link to="/showemp">Show Employees</Link>
          <Link to="/findall">Find All</Link>
        </header>
    </div>
  )
}

export default FindAll