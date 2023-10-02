import React from 'react'; 

function footer(){
    return(
        <footer class="bg-gray-50 dark:bg-slate-900 ">
            <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 class=" text-center text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-slate-200">DevJobsChile</h2>

            <p class="text-center mx-auto mt-4 max-w-sm text-gray-500  dark:text-slate-700 ">Gracias por visitar este sitio. Espero que te haya sido de ayuda. Si quieres ver más de mis proyectos te invito a ver mis redes sociales, donde comparto mis avances, Me encantaría saber tu opinión y tus sugerencias, así que no dudes en dejarme un comentario o enviarme un mensaje. ¡Hasta la próxima!</p>

                <ul class="mt-12 flex justify-center gap-6 md:gap-8 ">
                <li>
                    <a href="https://github.com/DiegoRojasGonzalez" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:text-gray-700/75  dark:text-sky-400">
                    <span class="sr-only ">GitHub</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/diegoignaciorojasgonzalez" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:text-gray-700/75  dark:text-sky-400">
                    <span class="sr-only">Linkedin</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.68 17H5V9.354h2.68V19zM6.84 7.579a1.895 1.895 0 11-3.79-.001 1.895 1.895 0 013.79 0zm11.384 11.421h-2.679v-4.237c0-1.012-.02-2.312-1.408-2.312-1.408 0-1.623 1.102-1.623 2.238v4.311H9.839s.036-7.654 0-8.456h2.679v1.196c.359-.542 1.002-1.043 2.453-1.043 1.794 0 3.138 1.171 3.138 3.705v4.598z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </li>
                </ul>
            </div>
        </footer>
    )
}

export default footer;
