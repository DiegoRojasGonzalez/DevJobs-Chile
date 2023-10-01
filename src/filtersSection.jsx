import React, { useState, useEffect } from 'react';

function FiltersSection() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [publishers, setPublishers] = useState([]);
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

  return (
    <section>
      <div className="space-y-2">
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium">Ubicacion</span>

            <span className="transition group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">{selectedLocations.length} Seleccionados</span>

              <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={handleResetLocations}>Reiniciar</button>
            </header>
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {locations.map((loc, index) => (
                <li key={index}>
                  <label htmlFor={`Location${index}`} className="inline-flex items-center gap-2">
                    <input type="checkbox" id={`Location${index}`} className="h-5 w-5 rounded border-gray-300" onChange={handleCheckboxChangeLocation} checked={selectedLocations.includes(index.toString())} />
                    <span className="text-sm font-medium text-gray-700">{loc.location} ({loc.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium">Publicante</span>

            <span className="transition group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">{selectedPublishers.length} Seleccionados</span>

              <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={handleResetPublishers}>Reiniciar</button>
            </header>
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {publishers.map((pub, index) => (
                <li key={index}>
                  <label htmlFor={`Publisher${index}`} className="inline-flex items-center gap-2">
                    <input type="checkbox" id={`Publisher${index}`} className="h-5 w-5 rounded border-gray-300" onChange={handleCheckboxChangePublisher} checked={selectedPublishers.includes(index.toString())} />
                    <span className="text-sm font-medium text-gray-700">{pub.publisher} ({pub.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="overflow-hidden rounded border border-gray-300 ">
          <summary className="flex cursor-pointer items-center justify-center gap-2 bg-white text-gray-900 transition ">
            <button className="p-4 text-sm font-medium w-full h-full hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500" onClick={handleFetchData}>Filtrar</button>
          </summary>
        </details>

      </div>
    </section>
  );
}

export default FiltersSection;
