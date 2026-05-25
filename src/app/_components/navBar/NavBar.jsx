"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();
  // console.log(session);
  // console.log(status);
  function logout(){
    signOut({callbackUrl:"/login"})
  }
  return (
    <nav className="bg-emerald-500 text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto w-[90%] lg:w-[85%]">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link
            href="/"
            className="lg:text-2xl text-[16px] font-bold flex items-center gap-3 tracking-wide"
          >
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <i className="fa-solid fa-store text-white"></i>
            </div>

            <span className="hover:text-black duration-300">
              Store App
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            
            {/* Pages */}
            <ul className="flex items-center gap-3 font-medium">
              
              <li>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-black transition-all duration-300"
                >
                  Home
                </Link>
              </li>

              {session && (
                <li>
                  <Link
                    href="/cart"
                    className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-black transition-all duration-300"
                  >
                    Cart
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/products"
                  className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-black transition-all duration-300"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-black transition-all duration-300"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/brand"
                  className="px-4 py-2 rounded-xl hover:bg-white/10 hover:text-black transition-all duration-300"
                >
                  Brand
                </Link>
              </li>
            </ul>

            {/* Social + Auth */}
            <ul className="flex items-center gap-4 text-sm">
              
              {!session ? (
                <>
                  {/* Social */}
                  <div className="flex items-center gap-3 text-lg">
                    
                    <li>
                      <Link
                        href="https://facebook.com"
                        target="_blank"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-emerald-500 duration-300"
                      >
                        <i className="fa-brands fa-facebook"></i>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-emerald-500 duration-300"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="https://instagram.com"
                        target="_blank"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-emerald-500 duration-300"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="https://linkedin.com"
                        target="_blank"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-emerald-500 duration-300"
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                  </div>

                  {/* Auth */}
                  <li>
                    <Link
                      href="/register"
                      className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-emerald-500 duration-300"
                    >
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-xl bg-white text-emerald-500 hover:bg-black hover:text-white duration-300"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Welcome */}
                  {session && (
                    <li className="px-4 py-2 rounded-full bg-white/10 font-medium">
                      WELCOME {session.user.name}
                    </li>
                  )}

                  {/* Sign Out */}
                  <li>
                    <span
                     onClick={logout}
                      className="px-4 cursor-pointer py-2 rounded-xl bg-white text-emerald-500 hover:bg-black hover:text-white duration-300"
                    >
                      Sign Out
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl"
          >
            <i
              className={`fa-solid ${
                isOpen ? "fa-xmark" : "fa-bars"
              }`}
            ></i>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden pb-5">

            {/* Pages */}
            <ul className="flex flex-col gap-3 border-t border-white/20 pt-5">

              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Home
                </Link>
              </li>

              {session && (
                <li>
                  <Link
                    href="/cart"
                    className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
                  >
                    Cart
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/products"
                  className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/brand"
                  className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Brand
                </Link>
              </li>
            </ul>

            {/* Mobile Social + Auth */}
            {!session ? (
              <>
                {/* Social */}
                <div className="flex gap-4 text-lg mt-6">
                  
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </Link>

                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </Link>

                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>

                {/* Auth */}
                <ul className="flex flex-col gap-3 mt-6">
                  
                  <li>
                    <Link
                      href="/register"
                      className="block text-center py-3 rounded-xl border border-white/20"
                    >
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/login"
                      className="block text-center py-3 rounded-xl bg-white text-emerald-500 font-semibold"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="flex flex-col gap-4 mt-6">
                  
                  {session && (
                    <li className="bg-white/10 rounded-xl p-4 text-center font-medium">
                      WELCOME {session?.user.name}
                    </li>
                  )}

                  <li>
                    <span onClick={logout}
                      className="block cursor-pointer text-center py-3 rounded-xl bg-white text-emerald-500 font-semibold"
                    >
                      Sign Out
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}