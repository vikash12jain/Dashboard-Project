import React from "react";
import { useEcom } from "../Context/EcomProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useEcom();

  const SunIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 ..."/>
    </svg>
  );

  const MoonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707 8 8 0 1017.293 13.293z"/>
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-amber-100 hover:bg-stone-700 transition"
    >
      {theme === "dark" ? SunIcon : MoonIcon}
    </button>
  );
};

export default ThemeToggle;
