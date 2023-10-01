import React, { useState, useEffect } from 'react';
import axios from 'axios';

function jobsCards() {
  const [jobData, setJobData] = useState([]);

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
          window.location.reload();

        })
        .catch((error) => {
          console.error('Error al cargar datos:', error);
        });
    }

    const localStorageData = localStorage.getItem('jobData');
    const localStorageFilteredData = localStorage.getItem('filteredJobs');
    
    if (localStorageFilteredData) {
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
        fetchJobData();
      }
    } else if (localStorageData) {
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


  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobData.map((job, index) => (
        <div key={index}>
          <a href={job.urlJob} class="h-full relative block overflow-hidden rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8">
            <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div class="sm:flex sm:justify-between sm:gap-4 ">
              <div>
                <h3 class="text-lg font-bold text-gray-900 sm:text-xl">{job.name}</h3>
                <p class="mt-1 text-xs font-medium text-gray-600">Publicado por {job.publisher}</p>
              </div>
            </div>
            <div class="mt-4">
            <p class="mt-1 text-xs font-medium text-gray-600">Empresa - {job.enterprise}</p>

              <p class="max-w-[40ch] text-sm text-gray-500">{job.deatilsCut}</p>
            </div>
            <dl class="mt-6 flex gap-4 sm:gap-6">
              
            {job.expirationDate !== "" && (
              <div class="flex flex-col">
                <dd class="text-xs text-gray-500">Termino postulacion</dd>
                <dt class="text-sm font-medium text-gray-600">{job.expirationDate}</dt>
              </div>
            )}

              <div class="flex flex-col">
                <dd class="text-xs text-gray-500">Ubicacion </dd>
                <dt class="text-sm font-medium text-gray-600">{job.location}</dt>

              </div>
            </dl>
          </a>

        </div>
      ))}
    </ul>
  );
}

export default jobsCards;
