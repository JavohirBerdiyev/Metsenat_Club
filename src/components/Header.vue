<template>
  <header>
    <nav class="bg-white">
      <div
        class="container flex flex-wrap items-center justify-between mx-auto p-5"
      >
        <a href="https://flowbite.com/" class="flex items-center">
          <img src="../assets/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Flowbite</span
          >
        </a>
        <div class="flex md:order-2">
          <button
            type="button"
            class="user-btn text-bold py-2 px-3 mr-5 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 flex justify-between items-center"
          >
            Shoxruh
            <img
              src="../assets/user.svg"
              class="h-8 ml-3"
              alt="Flowbite Logo"
            />
          </button>
          <button @click="logout">
            <img
              src="../assets/log-out.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
          </button>
        </div>
      </div>
    </nav>
    <div class="bg-white">
      <div class="flex justify-between container mx-auto items-center p-5">
        <!-- Tab Bar -->
        <div class="flex w-1/2 h-12">
          <button
            class="w-1/3 uppercase border border-sky-400 rounded-l-lg text-sky-400"
          >
            Dashboard
          </button>
          <button
            class="w-1/3 border uppercase border-sky-400 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            Homiylar
          </button>
          <button
            class="w-1/3 border uppercase border-sky-400 rounded-r-lg text-sky-400"
          >
            Talabalar
          </button>
        </div>

        <!-- Content Section -->
        <div class="bg-white">
          <div>
            <div class="flex items-center">
              <div class="relative">
                <input
                  type="text"
                  class="pl-10 pr-4 py-2 h-12 border border-gray-300 rounded-md w-80 mr-5 focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-200"
                  :value="searchQuery"
                  @input="$emit('update-search-query', $event.target.value)"
                />

                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="../assets/search.svg" alt="Flowbite Logo" />
                </div>
              </div>
              <!-- Filter button -->
              <button
                @click="$emit('open-filter-modal')"
                class="px-4 h-12 bg-blue-100 text-blue-600 rounded-md border hover:bg-blue-200 focus:outline-none flex items-center"
              >
                <img
                  class="mx-3"
                  src="../assets/Vector.svg"
                  alt="Flowbite Logo"
                />
                Filter
              </button>
            </div>

            <!-- Content goes here -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// Import required dependencies
import { ref } from "vue";
import { useAuthStore } from "../store";
import router from "../router";

export default {
  name: "Header",
  props: ["searchQuery"],
  emits: ["update-search-query"],
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.setToken(""); // Clear the token
      router.push("/login"); // Navigate to the login page
    };

    const clearSearchQuery = () => {
      emit("update-search-query", "");
    };

    return {
      logout,
      clearSearchQuery,
    };
  },
};
</script>
