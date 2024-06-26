"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { HoveredLink, MenuItem } from "../ui/navbar-menu";

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuHover = (item: string | null) => {
    setActive(item);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 bg-black bg-opacity-90 backdrop-blur-lg rounded-full py-3 px-8 w-full max-w-7xl mx-auto",
        hidden ? "-translate-y-full" : "translate-y-0",
        className
      )}
    >
      <div className="flex justify-between items-center w-full text-white">
        {/* Left section: BlockDevs */}
        <Link href="/" className="text-xl font-bold">
          BlockDevs
        </Link>

        {/* Center section: Menu items */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            Home
          </Link>

          <Link href="#" className="hover:text-gray-400 transition-colors">
            Resources
          </Link>

          <Link href="#" className="hover:text-gray-400 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Right section: Registration button */}
        <div className="hidden md:flex items-center space-x-4 ml-8">
          <Link
            href="https://app.deform.cc/form/44c28c9a-940e-405b-9a55-ef3cdcaefc8b"
            target="_blank"
          >
            <button className="bg-custom-pink text-white px-4 py-2 rounded-full">
              Sign up
            </button>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex md:hidden items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-white">
          <Link
            href="/"
            className="block hover:text-gray-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block hover:text-gray-400 transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/contact"
            className="block hover:text-gray-400 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="https://app.deform.cc/form/44c28c9a-940e-405b-9a55-ef3cdcaefc8b"
            target="_blank"
          >
            <button className="bg-custom-pink text-white px-4 py-2 rounded-full w-full">
              Registration
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
