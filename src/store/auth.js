import { defineStore } from 'pinia';

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