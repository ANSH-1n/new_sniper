
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

export default function Navbar({ isDarkTheme, setIsDarkTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Showcase', href: '/showcase' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login / Sign Up', href: '/login' },
  ];

  const serviceItems = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile App Development', href: '/services/mobile-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Custom Software Development', href: '/services/custom-software-development' },
    { name: 'IT Consulting & Digital Transformation', href: '/services/it-consulting' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeInOut' } },
  };

  return (
    <header
      className={`${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } py-4 fixed top-0 w-full z-20 shadow-md transition-all duration-300`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="SniperCoders Technologies" width={40} height={40} className="mr-2" />
          <span className="text-lg font-semibold">SniperCoders</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <div
                className="flex items-center"
                onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => item.hasDropdown && !isServicesOpen && setIsServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  } uppercase px-3 py-2 hover:text-teal-300 transition-all`}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`${
                      isDarkTheme ? 'text-white' : 'text-gray-900'
                    } hover:text-teal-300 transition-all ml-1 focus:outline-none`}
                    aria-label="Toggle services dropdown"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {item.hasDropdown && isServicesOpen && (
                <AnimatePresence>
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`${
                      isDarkTheme ? 'bg-gray-900' : 'bg-white'
                    } absolute left-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${
                      isDarkTheme ? 'text-white' : 'text-gray-900'
                    }`}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {serviceItems.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          className={`${
                            isDarkTheme ? 'text-white' : 'text-gray-900'
                          } block px-4 py-2 hover:bg-teal-700 transition-all`}
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              )}
            </div>
          ))}
          <div className="flex space-x-2">
            <button
              className="p-2 hover:text-yellow-300 transition-all focus:outline-none"
              onClick={() => setIsDarkTheme(false)}
              aria-label="Switch to light theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
            <button
              className="p-2 hover:text-gray-300 transition-all focus:outline-none"
              onClick={() => setIsDarkTheme(true)}
              aria-label="Switch to dark theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          } md:hidden absolute top-16 left-0 w-full z-10`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.name} className="w-full text-center">
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`${
                      isDarkTheme ? 'text-white' : 'text-gray-900'
                    } uppercase px-3 py-2 hover:text-teal-300 transition-all block`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`${
                        isDarkTheme ? 'text-white' : 'text-gray-900'
                      } hover:text-teal-300 transition-all ml-1 focus:outline-none`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  {item.hasDropdown && isServicesOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`${
                        isDarkTheme ? 'bg-gray-900' : 'bg-white'
                      } w-full py-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
                    >
                      {serviceItems.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className={`${
                              isDarkTheme ? 'text-white' : 'text-gray-900'
                            } block px-4 py-2 hover:bg-teal-700 transition-all`}
                            onClick={() => {
                              setIsOpen(false);
                              setIsServicesOpen(false);
                            }}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </li>
            ))}
            <li>
              <div className="flex space-x-2 w-full">
                <button
                  className="p-2 hover:text-yellow-300 transition-all focus:outline-none w-full"
                  onClick={() => setIsDarkTheme(false)}
                  aria-label="Switch to light theme"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 hover:text-gray-300 transition-all focus:outline-none w-full"
                  onClick={() => setIsDarkTheme(true)}
                  aria-label="Switch to dark theme"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}