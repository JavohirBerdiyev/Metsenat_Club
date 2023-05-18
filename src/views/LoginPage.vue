<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="max-w-md w-full p-6">
      <h1 class="text-3xl font-bold mb-6"><img src="../assets/logo-group.svg" class="w-full p-6" alt="logo"></h1>
      <div class="mb-6">
       
      </div>
      <form @submit="login" class="bg-white p-8 rounded-lg">
        <h1 class="text-3xl text-gray-700 font-bold mb-7">Kirish</h1>
        <div class="mb-5">
          <label for="username" class="block text-sm text-gray-700">LOGIN:</label>
          <input type="text" id="username" v-model="username" class="w-full mt-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-5">
          <label for="password" class="block text-sm text-gray-700">PAROL:</label>
          <input type="password" id="password" v-model="password" class="w-full mt-1 px-4 py-2 rounded-lg  focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" class="bg-blue-500 text-white w-full py-3 px-5 rounded-lg hover:bg-blue-600">Kirish</button>
      </form>
      <div v-if="showAlert" :class="[alertType === 'error' ? 'bg-red-500' : 'bg-green-500', 'p-4 mt-4 rounded-lg text-white']">{{ alertMessage }}</div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showAlert: false,
      alertType: '',
      alertMessage: '',
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      const authStore = useAuthStore();
      try {
        // Call the login API endpoint
        const response = await axios.post('https://club.metsenat.uz/api/v1/auth/login/', {
          username: this.username,
          password: this.password,
        });
        // Store the user in the auth store
        authStore.setUser(response.data.user);
        // Close the login page and go to the table page
        this.$router.replace('/table');
      } catch (error) {
        console.error(error);
        // Handle login error
        this.showAlert = true;
        this.alertType = 'error';
        this.alertMessage = 'Please try again.';
      }
    },
  },
};
</script>

<style>
  .block {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 1.125px;
    text-transform: uppercase;
    color: #1D1D1F;
  }
  input {
    background: rgba(224, 231, 255, 0.2);
    border: 1px solid #E0E7FF;
  }
</style>
