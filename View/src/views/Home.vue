<script setup lang="ts">
import ColorfulContainer from "../components/ColorfulContainer.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const items = [
  {
    name: "Vite",
    url: "https://vitejs.dev/",
  },
  {
    name: "Vue",
    url: "https://vuejs.org/",
  },
  {
    name: "Tailwind",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Typescript",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Nodejs",
    url: "https://nodejs.org/en/",
  },
  {
    name: "Prisma",
    url: "https://www.prisma.io/",
  },
  {
    name: "MongoDB",
    url: "https://www.mongodb.com/",
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
  },
];
</script>

<template>
  <ColorfulContainer>
    <div class="font-bold text-2xl">MVC-TEMPLATE</div>
    <ul
      class="p-4 flex flex-row flex-wrap gap-3 text-lg hover:a font-light justify-center items-center"
    >
      <li class="hover:text-orange-600" v-for="item in items">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
      </li>
    </ul>
    <div class="text-sm font-light">
      <a href="https://github.com/philippemalo" target="_blank">
        By Philippe Malo
      </a>
    </div>
    <div v-if="!authStore.isAuthenticated" class="flex gap-4">
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
    <div v-if="authStore.isAuthenticated">
      <div class="text-lg font-light mt-4">
        Welcome
        <router-link :to="authStore.getUser!.username">{{
          authStore.getUser!.username
        }}</router-link>
      </div>
    </div>
  </ColorfulContainer>
</template>
