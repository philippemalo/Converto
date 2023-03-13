<script setup lang="ts">
import { signin } from "../services/api";
import router from "../router";
import { useAuthStore } from "../stores/auth";
import ColorfulContainer from "../components/ColorfulContainer.vue";
import { ref } from "vue";

const authStore = useAuthStore();

const wrongCredentials = ref(false);

const login = async () => {
  const email = document.querySelector(
    "input[name=emailOrUsername]"
  ) as HTMLInputElement;
  const password = document.querySelector(
    "input[name=password]"
  ) as HTMLInputElement;

  await signin(email.value, password.value)
    .then((res) => {
      if (res.status === 200) {
        authStore.setUser(res.data);
        router.push("/");
      }
    })
    .catch((err) => {
      wrongCredentials.value = true;
    });
};

addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const element = document.activeElement as HTMLElement;
    if (!element) return;
    element.blur();
  }
});

addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const element = document.activeElement as HTMLElement;
    const passwordInput = document.querySelector(
      "input[name=password]"
    ) as HTMLElement;
    if (!element) return;
    if (element === passwordInput) {
      login();
    }
  }
});
</script>

<template>
  <div
    v-if="wrongCredentials"
    class="absolute top-5 left-1/2 transform -translate-x-1/2 border rounded p-2 bg-red-100 text-red-500"
  >
    Invalid Email/Username or Password
  </div>
  <ColorfulContainer>
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
  </ColorfulContainer>
</template>
