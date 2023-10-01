import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoadingComponent() {
  return (
    <div role="status" class="max-w-sm animate-pulse rounded-lg border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6">
      <div class="mb-2 h-2.5 w-65 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700"></div>
      <div class="mb-4 h-2.5 w-40 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="mt-4 flex items-center space-x-3">
        <div><div class="h-2 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div></div>
        <div><div class="h-2 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div></div>
      </div>
    </div>
    );
}



function jobsCards() {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Debe ser en minúsculas

  useEffect(() => {
    function fetchJobData() {
      axios.get('http://localhost:3000/scraped-data')
        .then((response) => {
          const newJobData = response.data;
          const currentTimestamp = new Date();
          const dataToStore = {
            data: newJobData,
            timestamp: currentTimestamp.toISOString(),
          };
          localStorage.setItem('jobData', JSON.stringify(dataToStore));
          setJobData(newJobData);
          setIsLoading(false);

          window.location.reload();

        })
        .catch((error) => {
          console.error('Error al cargar datos:', error);
        });
    }

    const localStorageData = localStorage.getItem('jobData');
    const localStorageFilteredData = localStorage.getItem('filteredJobs');
    
    if (localStorageFilteredData) {
      setIsLoading(false); // Actualiza el estado isLoading a falso

      // Si hay datos filtrados en el Local Storage, mostrarlos en lugar de los originales
      setJobData(JSON.parse(localStorageFilteredData));
      const parsedData = JSON.parse(localStorageFilteredData);
      const storedTimestamp = new Date(parsedData.timestamp);
      const currentTimestamp = new Date();
      const oneHourInMilliseconds = 1 * 60 * 60 * 1000; // 1 hora en milisegundos
    
      // Verificar si los datos filtrados son antiguos (más de 1 hora)
      if (currentTimestamp - storedTimestamp > oneHourInMilliseconds) {
        // Los datos filtrados son antiguos, eliminarlos y realizar un nuevo fetch
        localStorage.removeItem('filteredJobs');
        fetchJobData(); // Llama a fetchJobData para cargar nuevos datos
      }
    } else if (localStorageData) {
      setIsLoading(false); // Actualiza el estado isLoading a falso
    
      const parsedData = JSON.parse(localStorageData);
      const storedTimestamp = new Date(parsedData.timestamp);
      const currentTimestamp = new Date();
    
      // Verificar si ha pasado más de 6 horas y eliminar filteredJobs si es necesario
      if (currentTimestamp - storedTimestamp > 6 * 60 * 60 * 1000) {
        localStorage.removeItem('filteredJobs');
        setJobData(parsedData.data);
      } else {
        setJobData(parsedData.data);
      }
    } else {
      fetchJobData();
    }
  }, []);

  if (isLoading) {
    const numberOfLoadingComponents = 12;
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: numberOfLoadingComponents }, (_, index) => (
          <LoadingComponent key={index} />
        ))}
      </ul>
    );
  }

  const handleClearLocalStorage = () => {
    localStorage.removeItem('filteredJobs');
    window.location.reload();
  };

  if (jobData.length === 0){
    return (
        <div class="grid place-content-center ">
          <div class="text-center">
            <h1 class="text-9xl font-black text-gray-200">404</h1>
            <p class="mt-4 text-gray-500">Lo siento, no se encontraron coincidencias con los parámetros de filtro proporcionados. Por favor, revise los criterios de búsqueda y vuelva a intentarlo.</p>
            <button onClick={handleClearLocalStorage} href="#" class="inline-block px-5 py-3 mt-6 text-sm font-medium text-black rounded hover:text-white hover:bg-gray-500  border border-gray-300 dark:text-sky-400 dark:bg-slate-900 dark:hover:bg-slate-800" >Mostrar todo</button>
          </div>
        </div>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobData.map((job, index) => (
        <div key={index}>
          <a target='_blank' href={job.urlJob} class="h-full relative block overflow-hidden rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8">
            <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div class="sm:flex sm:justify-between sm:gap-4 ">
              <div>
                <h3 class="text-lg font-bold text-gray-900 sm:text-xl dark:text-slate-200">{job.name}</h3>
                <p class="mt-1 text-xs font-medium text-gray-600 dark:text-slate-400 ">Publicado por {job.publisher}</p>
              </div>
            </div>
            <div class="mt-4">
            <p class="mt-1 text-xs font-medium text-gray-600 dark:text-slate-200">Empresa - {job.enterprise}</p>

              <p class="max-w-[40ch] text-sm text-gray-500 dark:text-slate-400">{job.deatilsCut}</p>
            </div>
            <dl class="mt-6 flex gap-4 sm:gap-6">
              
            {job.expirationDate !== "" && (
              <div class="flex flex-col">
                <dd class="text-xs text-gray-500 dark:text-slate-400">Termino postulacion</dd>
                <dt class="text-sm font-medium text-gray-600  dark:text-sky-400 ">{job.expirationDate}</dt>
              </div>
            )}

              <div class="flex flex-col">
                <dd class="text-xs text-gray-500 dark:text-slate-200">Ubicacion </dd>
                <dt class="text-sm font-medium text-gray-600 dark:text-sky-400">{job.location}</dt>

              </div>
            </dl>
          </a>

        </div>
      ))}
    </ul>
  );
}

export default jobsCards;
