<template>
  <div ref="filterModal">
    <transition name="fade">
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
        v-if="isOpen"
      >
        <div class="bg-white filtercontent rounded-lg p-8">
          <!-- Filter options -->
          <h2 class="text-xl font-semibold mb-4">Filter</h2>
          <hr class="my-5" />
          <!-- Filter options -->
          <div class="mb-6">
            <label class="block mb-2">Ariza holati:</label>
            <select
              v-model="selectedStatus"
              class="bg-gray-50 border border-gray-200 text-gray-500 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            >
              <option selected value="">Barchasi</option>
              <option
                v-for="status in uniqueStatuses"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block mb-3">Homiylik summasi:</label>
            <main class="flex items-center justify-center" x-data="app">
              <!-- tabs -->
              <div class="grid w-[40rem] grid-cols-4 space-x-2">
                <input
                  type="radio"
                  name="option"
                  id="all"
                  class="peer hidden"
                  v-model="selectedSum"
                  value=""
                />
                <label
                  for="all"
                  class="block all cursor-pointer select-none border mb-3 border-gray-200 text-gray-800 rounded-md p-3 text-center bg-blue-200 peer-checked:border-blue-600 peer-checked:font-bold peer-checked:text-black-400"
                  x-text="option"
                  >Barchasi</label
                >
                <template v-for="option in sums" :key="option">
                  <div>
                    <input
                      type="radio"
                      name="option"
                      :id="option"
                      class="peer hidden"
                      v-model="selectedSum"
                      :value="option"
                    />
                    <label
                      :for="option"
                      class="block cursor-pointer select-none border mb-3 border-gray-200 text-gray-800 rounded-md p-3 text-center peer-checked:border-blue-600 peer-checked:font-bold peer-checked:text-black-400"
                      x-text="option"
                      >{{ option }} <span class="UZS">UZS</span></label
                    >
                  </div>
                </template>
              </div>
            </main>
          </div>

          <div class="mb-4">
            <label class="block mb-2">Sana:</label>
            <input
              class="bg-gray-50 border border-gray-200 text-gray-400 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 w-60 p-1.5"
              type="date"
              v-model="selectedDate"
            />
          </div>
          <!-- Filter actions -->
          <button @click="close" class="absolute top-0 right-0 mt-6 mr-6">
            <img src="../assets/close.svg" class="h-8" alt="Close Icon" />
          </button>
          <hr class="my-5" />

          <div class="flex items-center justify-end">
            <button
              @click="clearFilter"
              class="flex mr-4 items-center border border-gray-200 text-gray-400 py-2 px-4 rounded-md p-2"
            >
              <img src="../assets/icons8-broom1.svg" class="mr-2" alt="eye" />
              Tozalash
            </button>
            <button
              @click="applyFilter"
              class="flex mr-4 bg-blue-500 text-white py-2 px-4 rounded-md p-2"
            >
              <img src="../assets/eye2.svg" class="mr-2" alt="eye" />
              Natijalarni ko‘rish
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  props: {
    uniqueStatuses: {
      type: Array,
      default: () => [],
    },
    sums: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const selectedStatus = ref("");
    const selectedSum = ref("");
    const selectedDate = ref("");
    const open = () => {
      emit("update:isOpen", true);
    };

    const close = () => {
      emit("close");
    };

    const applyFilter = () => {
      const filterData = {
        selectedStatus: selectedStatus.value,
        selectedSum: selectedSum.value,
        selectedDate: selectedDate.value,
      };

      emit("apply-filter", filterData);
    };

    const clearFilter = () => {
      selectedStatus.value = "";
      selectedSum.value = "";
      selectedDate.value = "";
    };

    // Close the modal when clicking outside the modal content
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest(".bg-white")) {
        close();
      }
    };

    return {
      selectedStatus,
      selectedSum,
      selectedDate,
      open,
      close,
      applyFilter,
      clearFilter,
    };
  },
};
</script>
