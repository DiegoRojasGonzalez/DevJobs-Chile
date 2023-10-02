import React, { useState, useEffect } from 'react';

function FiltersSection() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [publishers, setPublishers] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [selectedPublishers, setSelectedpublishers] = useState([]);
  const [selectedLocationNames, setSelectedLocationNames] = useState([]);
  const [selectedPublisherNames, setSelectedPublisherNames] = useState([]);

  const [filteredByLocation, setFilteredByLocation] = useState([]);
  const [filteredByPublisher, setFilteredByPublisher] = useState([]);
  const [timefilterobjet, setTimefilterobjet] = useState(null);

  const handleFetchData = () => {
    setFilteredByLocation([]);
    setFilteredByPublisher([]);
  
    const jobData = JSON.parse(localStorage.getItem('jobData')).data;
  
    let filteredLocation = jobData;
    if (selectedLocationNames.length > 0) {
      filteredLocation = filteredLocation.filter((job) => {
        return selectedLocationNames.includes(job.location);
      });
    }
  
    let filteredPublisher = jobData;
    if (selectedPublisherNames.length > 0) {
      filteredPublisher = filteredPublisher.filter((job) => {
        return selectedPublisherNames.some((publisherName) => job.publisher.includes(publisherName));
      });
    }
  
    const finalFilteredJobs = filteredLocation.filter((job) => filteredPublisher.includes(job));
  
    // Obtener la fecha y hora actual
    const currentDateTime = new Date();
    const timestamp = currentDateTime.toISOString();
    localStorage.setItem('timestampfiltered', timestamp);

    
    // Guardar finalFilteredJobs en el Local Storage
    localStorage.setItem('filteredJobs', JSON.stringify(finalFilteredJobs));
    // Obtener la fecha y hora actual

    setFilteredByLocation(finalFilteredJobs);
    //actualizar la web 
    window.location.reload();

  };
  

  useEffect(() => {
    const localStorageData = localStorage.getItem('jobData');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData.data && Array.isArray(parsedData.data)) {
        const jobData = parsedData.data;
        const allLocations = jobData.map((job) => job.location);
        const allPublishers = jobData.map((job) => job.publisher);

        const locationCount = {};
        allLocations.forEach((location) => {
          if (!locationCount[location]) {
            locationCount[location] = 1;
          } else {
            locationCount[location]++;
          }
        });

        const publisherCount = {};
        allPublishers.forEach((publisher) => {
          if (!publisherCount[publisher]) {
            publisherCount[publisher] = 1;
          } else {
            publisherCount[publisher]++;
          }
        });
        
        const uniqueLocations = Array.from(new Set(allLocations));
        const locationList = uniqueLocations.map((location) => ({
          location,
          count: locationCount[location],
        }));

        const publisherList = Object.keys(publisherCount).map((publisher) => ({
          publisher,
          count: publisherCount[publisher],
        }));

        const countallJobs = jobData.length
        setAllJobs(countallJobs);
        
        setPublishers(publisherList);
        setLocations(locationList);
      }
    }
  }, []);


  const handleCheckboxChangePublisher = (event) => {
    const publisherId = event.target.id.replace('Publisher', '');
    const newSelectedPublishers = [...selectedPublishers];
    const publisherName = publishers[publisherId]?.publisher;
  
    if (event.target.checked) {
      if (!newSelectedPublishers.includes(publisherId)) {
        newSelectedPublishers.push(publisherId);
        setSelectedPublisherNames((prevState) => [...prevState, publisherName]);
      }
    } else {
      const index = newSelectedPublishers.indexOf(publisherId);
      if (index !== -1) {
        newSelectedPublishers.splice(index, 1);
        setSelectedPublisherNames((prevState) =>
          prevState.filter((name) => name !== publisherName)
        );
      }
    }
  
    setSelectedpublishers(newSelectedPublishers);
  };
  
  const handleCheckboxChangeLocation = (event) => {
    const locationId = event.target.id.replace('Location', '');
    const newSelectedLocations = [...selectedLocations];
    const locationName = locations[locationId]?.location;
  
    if (event.target.checked) {
      if (!newSelectedLocations.includes(locationId)) {
        newSelectedLocations.push(locationId);
        setSelectedLocationNames((prevState) => [...prevState, locationName]);
      }
    } else {
      const index = newSelectedLocations.indexOf(locationId);
      if (index !== -1) {
        newSelectedLocations.splice(index, 1);
        setSelectedLocationNames((prevState) =>
          prevState.filter((name) => name !== locationName)
        );
      }
    }
  
    setSelectedLocations(newSelectedLocations);
  };
    

  const handleResetLocations = () => {
    setSelectedLocations([]);
  };

  const handleResetPublishers = () => {
    setSelectedpublishers([]);
  };
  
  const handleReloadWeb = () => {
    localStorage.clear();
    window.location.reload();
  }

 if (locations.length === 0 || publishers.length === 0 ){
  return(
<div role="status" class="max-w-sm animate-pulse rounded-lg border-gray-200 p-4 md:p-6">
  <div role="status" class="m-2 flex animate-pulse flex-col items-center rounded-lg p-4 dark:border-gray-700">
    <div class="mb-2.5 h-10 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
    <div class="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>

  <div role="status" class="m-2 max-w-sm animate-pulse rounded-lg p-4 dark:border-gray-200 md:p-3">
    <div class="mb-2.5 h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
  <div role="status" class="m-2 max-w-sm animate-pulse rounded-lg p-4 dark:border-gray-200 md:p-3">
    <div class="mb-2.5 h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
  <div role="status" class="m-2 max-w-sm animate-pulse rounded-lg p-4 dark:border-gray-200 md:p-3">
    <div class="mb-2.5 h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
  <div role="status" class="m-2 max-w-sm animate-pulse rounded-lg p-4 dark:border-gray-200 md:p-3">
    <div class="mb-2.5 h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
  </div>
</div>

  )
 }

 


  return (
    <section>
      <div class="flex flex-col rounded-lg  px-4 py-8 text-center">
        <dd class="text-4xl font-extrabold  md:text-5xl dark:text-slate-200">{allJobs}</dd>
        <dt class="order-last text-lg font-medium text-gray-500 dark:text-sky-400 ">Ofertas Disponibles</dt>

      </div>
      <div className="space-y-2">
        <details className=" overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden  dark:bg-slate-900 dark:border-slate-200 ">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900  dark:bg-slate-900 ">
            <span className="text-sm font-medium dark:text-sky-400 ">Ubicacion</span>
            <span className="transition group-open:-rotate-180 dark:text-sky-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white dark:bg-slate-900">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700 dark:text-slate-400 ">{selectedLocations.length} Seleccionados</span>

              <button type="button" className="text-sm text-gray-900 underline underline-offset-4 dark:text-sky-50" onClick={handleResetLocations}>Reiniciar</button>
            </header>
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {locations.map((loc, index) => (
                <li key={index}>
                  <label htmlFor={`Location${index}`} className="inline-flex items-center gap-2 ">
                  <input type="checkbox" id={`Location${index}`} className="h-5 w-5 rounded checked:bg-blue-500" onChange={handleCheckboxChangeLocation} checked={selectedLocations.includes(index.toString())} />
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-400 ">{loc.location} ({loc.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900  dark:bg-slate-900">
            <span className="text-sm font-medium dark:text-sky-400 ">Publicante</span>

            <span className="transition group-open:-rotate-180 dark:text-sky-400 " >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white dark:bg-slate-900">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700 dark:text-slate-400">{selectedPublishers.length} Seleccionados</span>

              <button type="button" className="text-sm text-gray-900 underline underline-offset-4 dark:text-sky-50" onClick={handleResetPublishers}>Reiniciar</button>
            </header>
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {publishers.map((pub, index) => (
                <li key={index}>
                  <label htmlFor={`Publisher${index}`} className="inline-flex items-center gap-2">
                    <input type="checkbox" id={`Publisher${index}`} className="h-5 w-5 rounded border-gray-300" onChange={handleCheckboxChangePublisher} checked={selectedPublishers.includes(index.toString())} />
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-400">{pub.publisher} ({pub.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 ">
          <summary className="flex cursor-pointer items-center justify-center gap-2 bg-white text-gray-900 transition ">
            <button className="p-4 text-sm font-medium w-full h-full hover:bg-gray-500 hover:text-white dark:text-sky-400 dark:bg-slate-900 dark:hover:bg-slate-800" onClick={handleFetchData}>Filtrar</button>
          </summary>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 ">
          <summary className="flex cursor-pointer items-center justify-center gap-2 bg-white text-gray-900 transition ">
            <button className="p-4 text-sm font-medium w-full h-full hover:bg-gray-500 hover:text-white dark:text-sky-400 dark:bg-slate-900 dark:hover:bg-slate-800" onClick={handleReloadWeb}>Buscar nuevas ofertas</button>
          </summary>
        </details>

      </div>
    </section>
  );
}

export default FiltersSection;
