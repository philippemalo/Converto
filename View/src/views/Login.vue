<script setup lang="ts">
import { signin } from "../services/api";
import router from "../router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const login = async () => {
  const email = document.querySelector(
    "input[name=emailOrUsername]"
  ) as HTMLInputElement;
  const password = document.querySelector(
    "input[name=password]"
  ) as HTMLInputElement;

  const response = await signin(email.value, password.value);

  if (response.status === 200) {
    console.log(response);
    console.log("Login successful");
    authStore.setUser(response.data);
    router.push("/");
  } else {
    console.log(response);
  }
};
</script>

<template>
  <div class="grid w-screen h-screen place-items-center bg-slate-50">
    <div
      class="transition p-1 m-4 rounded bg-gradient-to-tr from-sky-400 via-amber-400 to-fuchsia-500 drop-shadow-md"
    >
      <div
        class="p-8 rounded bg-slate-200 bg-opacity-90 flex flex-col justify-center items-center"
      >
        <form class="flex flex-col text-lg font-light">
          <label name="emailOrUsername">Email or Username</label>
          <input
            class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
            type="text"
            name="emailOrUsername"
            required
          />
          <label name="password">Password</label>
          <input
            class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
            type="password"
            name="password"
            required
          />
          <input
            id="login-btn"
            class="bg-fuchsia-500 my-4 p-1 rounded text-white transition cursor-pointer hover:scale-105"
            type="button"
            value="Sign in"
            @click="login"
          />
        </form>
        <div class="mt-4">
          Don't have an account?
          <router-link class="text-blue-600" to="/register"
            >Register here</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
