<script setup lang="ts">
import { signout } from "./services/api";
import router from "./router";

const logout = async () => {
  const response = await signout();
  if (response.status === 200) {
    console.log("Logout successful");
    router.push("/");
  } else {
    console.log("Logout failed");
  }
};
</script>

<template>
  <router-link class="absolute top-5 left-5 font-bold hover:underline" to="/"
    >Home</router-link
  >
  <button
    @click="logout"
    class="absolute top-5 right-5 font-bold hover:underline"
  >
    Logout
  </button>
  <router-view />
</template>
