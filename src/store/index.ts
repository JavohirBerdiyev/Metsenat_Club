import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    setUser(user: any) {
      this.user = user;
    },
  },
});
