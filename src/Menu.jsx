import { useEffect, useState } from "react";

function Menu() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((actualTheme) => (actualTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="h-screen flex justify-center items-center dark:bg-neutral-900">
      <button
        className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
        onClick={handleChangeTheme}
      >
        Cambiar tema desde menu.jsx
      </button>
    </div>
  );
}
export default Menu;
