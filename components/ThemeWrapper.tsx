
'use client';

import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { isDarkTheme, setIsDarkTheme } = useTheme();

  // 👇 This will apply the background and text color to the <body> tag
  useEffect(() => {
    const body = document.body;

    body.classList.remove('bg-white', 'text-gray-900', 'bg-gray-900', 'text-white');
    if (isDarkTheme) {
      body.classList.add('bg-gray-900', 'text-white');
    } else {
      body.classList.add('bg-white', 'text-gray-900');
    }
  }, [isDarkTheme]);

  return (
    <>
      <Navbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <div className="transition-all duration-300">
        {children}
      </div>
    </>
  );
}
