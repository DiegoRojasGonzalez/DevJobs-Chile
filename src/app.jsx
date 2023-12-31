import React, { useState, useEffect } from 'react'; 
import JobsCards from './jobsCards.jsx';
import FiltersSection from './filtersSection.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

 useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { 
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 8 sm:px-6 sm:py-12 lg:px-8">
      <header>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-slate-200 ">Developer Jobs in Chile</h1>
          <p className="mt-4 max-w-md text-gray-500  dark:text-slate-400">Dev jobs chile es una web que realiza scraping web en tiempo real con la intención de encontrar ofertas laborales de distintas páginas web en una sola. Así, los desarrolladores pueden acceder a las mejores oportunidades de trabajo sin tener que buscar en múltiples sitios.</p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button onClick={toggleMenu} className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium  dark:text-sky-400">Abrir Menú</span>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="p-6 pt-12 fixed top-0 right-0 w-2/3 h-full bg-white shadow-md z-50 dark:bg-slate-900	">
            <button onClick={toggleMenu} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:bg-blue-50 dark:border rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <FiltersSection />
          </div>
        )}

        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className={`h-full opacity-40 ${isMenuOpen ? 'block' : 'hidden'}`}></div>
        </div>

        <div className=" mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <div className="hidden lg:block sticky lg:top-4 ">
            <div>
              <FiltersSection />
            </div>
          </div>

          <div className="lg:col-span-3">
            <JobsCards/>
          </div>
        </div>
      </div>
    {showScrollButton && (
        <button
          className="fixed bottom-4 right-4 bg-gray-500 hover:bg-gray-700 dark:bg-sky-400 dark:hover:bg-sky-700 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={scrollToTop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

    </section>
  );
}

export default App;
