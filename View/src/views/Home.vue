<template>
  <div class="grid w-screen h-screen place-items-center bg-slate-50">
    <div
      class="transition p-1 m-4 rounded bg-gradient-to-tr from-sky-400 via-amber-400 to-fuchsia-500 drop-shadow-md"
    >
      <div
        class="p-8 rounded bg-slate-200 bg-opacity-90 flex flex-col justify-center items-center"
      >
        <div class="font-bold text-2xl">MVC-TEMPLATE</div>
        <ul
          class="p-4 flex flex-row flex-wrap gap-3 text-lg hover:a font-light justify-center items-center"
        >
          <li class="hover:text-orange-600">
            <a href="https://vitejs.dev/" target="_blank">Vite</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://vuejs.org/" target="_blank">Vue</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://www.typescriptlang.org/" target="_blank"
              >Typescript</a
            >
          </li>
          <li class="hover:text-orange-600">
            <a href="https://nodejs.org/en/" target="_blank">Nodejs</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://www.prisma.io/" target="_blank">Prisma</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>
          </li>
          <li class="hover:text-orange-600">
            <a href="https://www.docker.com/" target="_blank">Docker</a>
          </li>
        </ul>
        <div class="text-sm font-light">
          <a href="https://github.com/philippemalo" target="_blank">
            By Philippe Malo
          </a>
        </div>
        <div class="flex gap-4">
          <router-link
            to="/login"
            class="p-2 mt-4 rounded border border-slate-900 bg-slate-400 transition duration-300 hover:bg-slate-200 hover:scale-105"
          >
            Sign in
          </router-link>
          <router-link
            to="/register"
            class="p-2 mt-4 rounded border border-slate-900 bg-slate-400 transition duration-300 hover:bg-slate-200 hover:scale-105"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
