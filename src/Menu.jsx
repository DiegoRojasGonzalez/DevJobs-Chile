import { useEffect, useState } from "react";

function menu() {
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

  const lightThemeIconSrc = 'https://img.icons8.com/?size=256&id=H3yHeysB1dxv&format=png';
  const darkThemeIconSrc = 'https://img.icons8.com/?size=256&id=62034&format=png';

  return (
    <header class="bg-gray-50 dark:bg-slate-900	">
      <div class="mx-auto max-w-screen-xl py-8 sm:px-6 lg:px-8">
        <div class="flex items-center justify-end gap-4">
          <div class="flex items-center gap-4">
            <div class="relative">


            </div>

            <button   onClick={handleChangeTheme} class="group block w-12 transform rounded-full border-1 bg-white p-2.5 shadow-sm transition-all duration-100 ease-in-out focus:ring-1 focus:ring-gray-300  hover:border-2 dark:bg-slate-900	">
            {theme === "light" ? (
                <>
                  <img src={lightThemeIconSrc} alt="lightTheme" />
                  <img src={darkThemeIconSrc} alt="darkTheme" style={{ display: 'none' }} />
                </>
              ) : (
                <>
                  <img src={lightThemeIconSrc} alt="lightTheme" style={{ display: 'none' }} />
                  <img src={darkThemeIconSrc} alt="darkTheme" />
                </>
              )}

            </button>
          </div>
        </div>
      </div>
      
    </header>

  );
}
export default menu;
