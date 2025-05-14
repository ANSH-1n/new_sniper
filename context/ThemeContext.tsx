
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  // Persist theme with localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkTheme(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    document.body.classList.toggle('bg-gray-900', isDarkTheme);
    document.body.classList.toggle('bg-white', !isDarkTheme);
    document.body.classList.toggle('text-white', isDarkTheme);
    document.body.classList.toggle('text-gray-900', !isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
