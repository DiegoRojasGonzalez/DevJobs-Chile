import React from 'react';

function filtersSection() {

  return (
<section>

  <div>
    <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> Ordenar por </label>

    <select name="HeadlineAct" id="HeadlineAct" class="mt-1.5 w-full rounded-lg  text-gray-700 sm:text-sm">
      <option value="">Mas Nuevos</option>
      <option value="">Mas Antiguos</option>
    </select>
  </div>

  <div>
    <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> Filtros </label>
    <select name="HeadlineAct" id="HeadlineAct" class="mt-1.5 w-full rounded-lg  text-gray-700 sm:text-sm">
      <option value="">Comuna</option>
    </select>
    <select name="HeadlineAct" id="HeadlineAct" class="mt-1.5 w-full rounded-lg  text-gray-700 sm:text-sm">
      <option value="">Comuna</option>
      <option value="">Maule</option>
      <option value="">Metropolitana</option>
      <option value="">ñuble</option>



    </select>
  </div>
</section>

    );
}

export default filtersSection;
