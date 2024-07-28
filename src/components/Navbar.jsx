import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { setSearchQuery } = useContext(UserContext);
  const [isSideMenuOpen, setMenu] = useState(false);

  const navlinks = [
    { label: "Collections", link: "#" },
    { label: "Men", link: "#" },
    { label: "About", link: "#" },
    { label: "Contact", link: "#" },
  ];

  const styleBar = ({ isActive }) => ({
    color: isActive ? "red" : "",
    fontWeight: isActive ? "bold" : "",
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <main>
        <nav className="flex justify-between px-4 md:px-8 items-center py-6">
          <div className="flex items-center gap-8">
            <section className="flex items-center gap-4">
              {/* menu */}
              <FiMenu
                onClick={() => setMenu(true)}
                className="text-3xl cursor-pointer lg:hidden"
              />
              {/* logo */}
              <Link to="/" className="text-4xl font-mono">
                logo
              </Link>
            </section>
            {navlinks.map((d, i) => (
              <Link
                key={i}
                className="hidden lg:block text-gray-400 hover:text-black"
                to={d.link}
              >
                {d.label}
              </Link>
            ))}
          </div>
          <input
            type="text"
            className="text-black rounded-md p-1"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          {/* sidebar mobile menu */}
          <div
            className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-transform z-20 ${
              isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex">
              <IoCloseOutline
                onClick={() => setMenu(false)}
                className="mt-0 mb-8 text-3xl cursor-pointer"
              />

              {navlinks.map((d, i) => (
                <Link key={i} className="font-bold" to={d.link}>
                  {d.label}
                </Link>
              ))}
            </section>
          </div>

          {/* last section */}
          <section className="flex items-center gap-4">
            {/* cart icon */}
            <NavLink to="/Cart" style={styleBar}>
              <AiOutlineShoppingCart className="text-3xl" />
            </NavLink>
            <NavLink to="/SignUp" style={styleBar}>
              <IoPerson className="text-3xl" />
            </NavLink>
            {/* avatar img */}
          </section>
        </nav>
        <hr />
      </main>
    </>
  );
}
