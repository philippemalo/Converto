import { defineStore } from "pinia";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AppState => ({ user: null }),
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  },
});
