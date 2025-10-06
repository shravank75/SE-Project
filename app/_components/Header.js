import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className="bg-white border-b w-full">
      <header>
        <div
          className="flex h-16 
          w-full items-center 
          justify-between px-4 sm:px-6 lg:px-8 
          transition-all duration-500"
        >
          <div className="flex items-center gap-8 transition-all duration-500">
            <Image
              src="/logo.svg"
              alt="logo"
              width={150}
              height={150}
              className="rounded-full transition-all duration-500"
            />

            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                    Upload
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="/sign-in"
              >
                Get Started
              </a>
            </div>
            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
