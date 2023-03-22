<script lang="ts" setup>
import { signout } from "../services/api";
import { useAuthStore } from "../stores/auth";
import { reactive } from "vue";

const state = reactive({ showAviMenu: false });

const authStore = useAuthStore();

const logout = async () => {
  const response = await signout();
  if (response.status !== 200) {
    console.log("Logout failed");
    return;
  }
  authStore.setUser(null);
  state.showAviMenu = false;
};
</script>

<template>
  <div class="absolute top-0 p-4 flex flex-row w-screen justify-between">
    <nav
      id="site-nav-desktop"
      class="flex flex-row items-center justify-center"
    >
      <router-link class="font-bold hover:underline z-10" to="/"
        >Converto</router-link
      >
    </nav>

    <div
      id="nav-actions"
      class="flex flex-row"
      @mouseleave="state.showAviMenu = false"
    >
      <!-- Show this div if not authenticated -->
      <div
        id="loggedout-actions"
        v-if="!authStore.isAuthenticated"
        class="flex gap-4"
      >
        <router-link to="/login" class="p-2"> Sign in </router-link>
        <router-link
          to="/register"
          class="p-2 text-white font-semibold rounded-lg bg-green-500 transition duration-300 hover:bg-green-200"
        >
          Sign up
        </router-link>
      </div>

      <!-- show this  div is authenticated -->
      <div id="loggedin-actions" v-if="authStore.isAuthenticated">
        <div @mouseenter="state.showAviMenu = true">
          <router-link
            :to="authStore.getUser!.username"
            class="flex items-center justify-center rounded-full border font-bold w-10 h-10 bg-green-500 text-white"
            >{{ authStore.getUser!.username.charAt(0) }}</router-link
          >
        </div>

        <div
          v-show="state.showAviMenu"
          class="flex flex-col absolute right-5 bg-white p-4 rounded-lg shadow-lg"
        >
          <router-link :to="authStore.getUser!.username" class="hover:underline"
            >Profile</router-link
          >
          <button @click="logout" class="hover:underline">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>
