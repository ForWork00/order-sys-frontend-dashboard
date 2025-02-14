import { defineStore } from 'pinia';
import.meta.evn.VITE_API_URL


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    loginUser(payload) {
      console.log('Logging in:', payload);
      console.log('register in:', payload);
      
    },
  },
});