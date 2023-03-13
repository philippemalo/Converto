<script setup lang="ts">
import { signout, session } from "./services/api";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const logout = async () => {
  const response = await signout();
  if (response.status !== 200) {
    console.log("Logout failed");
    return;
  }
  authStore.setUser(null);
};

const checkSession = async () => {
  const response = await session();
  authStore.setUser(response.data);
};

checkSession();
</script>

<template>
  <router-link
    class="absolute top-5 left-5 font-bold hover:underline z-10"
    to="/"
    >Home</router-link
  >
  <button
    v-if="authStore.isAuthenticated"
    @click="logout"
    class="absolute top-5 right-5 font-bold hover:underline z-10"
  >
    Logout
  </button>
  <div class="grid w-screen h-screen place-items-center bg-slate-50">
    <router-view />
  </div>
</template>
