import React, { useState, useEffect } from 'react';

function FiltersSection() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [publishers, setPublishers] = useState([]);
  const [selectedPublishers, setSelectedpublishers] = useState([]);

  useEffect(() => {
    // Obtener los datos del localStorage
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
        
        // Crear un array de ubicaciones únicas y contar
        const uniqueLocations = Array.from(new Set(allLocations));
        const locationList = uniqueLocations.map((location) => ({
          location,
          count: locationCount[location],
        }));

        // Obtener un array de objetos con el nombre y la cantidad de repeticiones
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
      const publisherId = event.target.id.replace('Publisher', ''); // Usar el identificador adecuado aquí
      const newSelectedPublishers = [...selectedPublishers];
      
      if (event.target.checked) {
        newSelectedPublishers.push(publisherId);
      } else {
        const index = newSelectedPublishers.indexOf(publisherId);
        if (index !== -1) {
          newSelectedPublishers.splice(index, 1);
        }
      }
      
      setSelectedpublishers(newSelectedPublishers);
    };

  const handleCheckboxChangeLocation = (event) => {
    const location = event.target.id.replace('Location', '');
    const newSelectedLocations = [...selectedLocations];
    
    if (event.target.checked) {
      newSelectedLocations.push(location);
    } else {
      const index = newSelectedLocations.indexOf(location);
      if (index !== -1) {
        newSelectedLocations.splice(index, 1);
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

      </div>
    </section>
  );
}

export default FiltersSection;
