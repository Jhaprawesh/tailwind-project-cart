import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import companylogo from "../assets/company-logo.png";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { setSearchQuery, cart, isDrawerOpen, setIsDrawerOpen } =
    useContext(UserContext);

  const styleBar = ({ isActive }) => ({
    color: isActive ? "red" : "",
    fontWeight: isActive ? "bold" : "",
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openDrawer = () => setIsDrawerOpen(true);

  return (
    <>
      <main className="sticky top-0 z-10 bg-white outline-4 outline-green-500 w-full">
        <nav className="flex justify-between px-4 md:px-8 items-center py-6">
          <div className="flex items-center gap-8">
            <section className="flex items-center gap-4">
              <IconButton
                variant="text"
                size="lg"
                onClick={openDrawer}
                className="md:hidden"
              >
                {isDrawerOpen ? (
                  <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                  <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
              </IconButton>

              <Link to="/" className="text-4xl font-mono">
                <img
                  src={companylogo}
                  alt="companylogo"
                  className="object-cover h-10 md:h-20"
                />
              </Link>
            </section>
          </div>

          <section className="flex items-center gap-4">
            <NavLink to="/Cart" style={styleBar}>
              <div className="relative py-2">
                <div className="t-0 absolute left-3 top-0">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {cart.length}
                  </p>
                </div>
                <AiOutlineShoppingCart className="text-3xl" />
              </div>
            </NavLink>
            <NavLink to="/SignUp" style={styleBar}>
              <IoPerson className="text-3xl" />
            </NavLink>
            {/* avatar img */}
          </section>
        </nav>
        <div className="pt-2  text-gray-600 text-center mb-3">
          <div className="relative">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none  "
              placeholder="Search..."
              onChange={handleSearchChange}
              name="search"
              type="text"
            />
          </div>
        </div>
        <hr />
      </main>
    </>
  );
}
