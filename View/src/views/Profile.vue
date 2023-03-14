<script setup lang="ts">
import ColorfulContainer from "../components/ColorfulContainer.vue";
import { useAuthStore } from "../stores/auth";
import { user } from "../services/api";
import router from "../router";
import { onBeforeMount, ref } from "vue";

const authStore = useAuthStore();
const userInfo = ref({ name: "", username: "", owner: false });

onBeforeMount(async () => {
  await user(window.location.pathname.slice(1))
    .then((res) => {
      if (res.status === 404) {
        router.replace("/notfound");
      }

      userInfo.value = {
        name: res.data.name,
        username: res.data.username,
        owner: authStore.getUser!.username === res.data.username,
      };
    })
    .catch((err) => {
      console.log("ERROR", err);
      router.replace("/notfound");
    });
});
</script>

<template>
  <ColorfulContainer>
    <div v-if="!userInfo.owner" class="text-lg font-light">
      Welcome to {{ userInfo.name }}'s page
    </div>
    <div v-else class="text-lg font-light">Welcome to your page</div>
  </ColorfulContainer>
</template>
