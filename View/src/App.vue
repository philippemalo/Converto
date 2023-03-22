<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { session } from "./services/api";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const checkSession = async () => {
  const response = await session();
  authStore.setUser(response.data);
};

checkSession();
</script>

<template>
  <navbar />
  <div class="grid w-screen h-screen place-items-center bg-slate-50">
    <router-view />
  </div>
</template>
