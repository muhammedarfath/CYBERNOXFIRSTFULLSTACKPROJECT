import React from "react";
import { useDisclosure } from "@nextui-org/react";
import Login from "../../Modal/Login";
import { Link } from "react-router-dom";

function RegisterNav() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <nav
       className="flex w-full "
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              className="w-auto md:max-h-9 max-h-6 object-contain"
              src="https://assets.aceternity.com/logo-dark.png"
              alt="Company Logo"
            />
          </a>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <Link
            to="/register"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Home
          </Link>
          <Link to="/about" className="text-sm/6 font-semibold text-gray-900">
            About
          </Link>
          <Link to="/contact" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </Link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            className="border-none mr-4 rounded-lg px-5 py-2 bg-button text-white"
            onClick={onOpen}
          >
            Login
          </button>
        </div>
      </nav>

      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default RegisterNav;
