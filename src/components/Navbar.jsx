import React from "react"

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
            <div className="logo font-bold text-white text-3xl pb-2">
                <span className="text-purple-500">&lt;</span>
                pass<span className="text-purple-500">BanK&gt;</span>
            </div>
            <a href="https://github.com/Pskoushi9reddy"><button className="text-black bg-white rounded-full flex">
                <img className="w-10" src="icons/github.svg" alt="github" />
                <span className="font-bold p-2">GitHub</span>
            </button></a>
        </div>
    </nav>
  )
}
export default Navbar