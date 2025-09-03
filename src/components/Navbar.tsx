import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-3 py-2 rounded-md text-white bg-blue-600 font-semibold"
      : "block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white transition-colors";

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-blue-600">DailyTools</div>
          <div className="hidden md:flex space-x-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/agenda" className={linkClass}>Agenda</NavLink>
            <NavLink to="/saude" className={linkClass}>Saúde</NavLink>
            <NavLink to="/financas" className={linkClass}>Finanças</NavLink>
            <NavLink to="/utilidades" className={linkClass}>Utilidades</NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <HiX size={30} /> : <HiMenu size={30} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/agenda" className={linkClass} onClick={() => setOpen(false)}>Agenda</NavLink>
          <NavLink to="/saude" className={linkClass} onClick={() => setOpen(false)}>Saúde</NavLink>
          <NavLink to="/financas" className={linkClass} onClick={() => setOpen(false)}>Finanças</NavLink>
          <NavLink to="/utilidades" className={linkClass} onClick={() => setOpen(false)}>Utilidades</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
