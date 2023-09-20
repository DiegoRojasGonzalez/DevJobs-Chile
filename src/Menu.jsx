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
    <header class="bg-gray-50 dark:bg-gray-800">
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex items-center justify-end gap-4">
          <div class="flex items-center gap-4">
            <div class="relative">

              <input class="text-m border-1 h-12 w-full rounded-full bg-white pe-10 ps-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 sm:w-56" id="search" type="search" placeholder="Escribe lo que buscas..." />

              <button type="button" class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-600 transition">
                <img class="w-4" src="https://img.icons8.com/?size=256&id=KPmthqkeTgDN&format=png" />
              </button>
            </div>

            <button   onClick={handleChangeTheme} class="group block w-12 transform rounded-full border-1 bg-white p-2.5 shadow-sm transition-all duration-100 ease-in-out focus:ring-1 focus:ring-gray-300  hover:border-2">
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
