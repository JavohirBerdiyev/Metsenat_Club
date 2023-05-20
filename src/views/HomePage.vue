<template>
  <div>
    <!-- Header section -->

    <header>
      <nav class="bg-white">
        <div
          class="container flex flex-wrap items-center justify-between mx-auto p-5"
        >
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="../assets/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
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
                    placeholder="Search"
                    v-model="searchQuery"
                    @input="applyFilter"
                  />
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <img src="../assets/search.svg" alt="Flowbite Logo" />
                  </div>
                </div>
                <!-- Filter button -->
                <button
                  @click="openFilterModal"
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
    <!-- Content section -->
    <div class="container mx-auto px-4">
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      <!-- bg-gray-900 -->
      <div class="overflow-auto lg:overflow-visible mt-6">
        <table
          class="table text-gray-400 border-separate space-y-6 text-sm w-full"
        >
          <thead>
            <tr>
              <th class="text-left uppercase">#</th>
              <th class="px-3 text-left uppercase">f.i.sh.</th>
              <th class="px-3 text-left uppercase">Tel.Raqami</th>
              <th class="px-3 text-left uppercase text-center">
                Homiylik summasi
              </th>
              <th class="px-3 text-left uppercase text-center">
                Sarflangan summa
              </th>
              <th class="px-3 text-left uppercase text-center">Sana</th>
              <th class="px-3 text-left uppercase text-center">Holati</th>
              <th class="px-3 text-left uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, index) in paginatedEntries"
              key="entry.id"
              class="bg-white"
            >
              <td class="py-4 px-4">
                <div>
                  <div class="mb-3">
                    <div class="text-black">{{ index + 1 }}</div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-semibold fullname">{{ entry.full_name }}</td>
              <td class="p-3 text-black">{{ entry.phone }}</td>
              <td class="p-3 text-center">
                <span class="font-semibold fullname text-center">{{
                  entry.sum
                }}</span>
                UZS
              </td>
              <td class="p-3 text-center">
                <span class="font-semibold fullname">{{ entry.spent }}</span>
                UZS
              </td>
              <td class="p-3 text-black text-center">
                {{ formatCreatedAt(entry.created_at) }}
              </td>

              <td class="p-3 text-center">
                <span
                  :class="getClassNames(entry.get_status_display)"
                  class="rounded-md px-2"
                  >{{ entry.get_status_display }}</span
                >
              </td>
              <td class="p-3 text-center">
                <img src="../assets/eye.svg" alt="Flowbite Logo" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end">
        <nav aria-label="Page navigation example ">
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                @click="prevPage"
                class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a
                :disabled="currentPage === 1"
                @click="prevPage"
                href="#"
                :aria-current="currentPage === page ? 'page' : undefined"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >{{ page }}</a
              >
            </li>
            <li>
              <a
                href="#"
                @click="nextPage"
                class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Filter modal -->
    <FilterModal
      :isOpen="isFilterModalOpen"
      :uniqueStatuses="uniqueStatuses"
      :sums="sums"
      @apply-filter="applyFilterModal"
      @clear-filter="clearFilterModal"
      @close="isFilterModalOpen = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../store";
import FilterModal from "../components/FilterModal.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    FilterModal,
  },

  setup(props, { emit }) {
    const entries = ref([]); // Reactive array of Sponsor objects
    const pageSize = ref(10); // Reactive variable for page size
    const currentPage = ref(1); // Reactive variable for current page
    const searchQuery = ref(""); // Reactive variable for search query
    const filterModalRef = ref(null);
    const isFilterModalOpen = ref(false); // Reactive variable for filter modal state
    const selectedStatus = ref(""); // Reactive variable for selected status
    const selectedSum = ref(""); // Reactive variable for selected sum
    const selectedDate = ref(""); // Reactive variable for selected date
    const filteredEntries = ref([]); // Reactive array for filtered entries
    const alldata = ref([]); // Reactive array to store filtered entries
    const statuses = ref(["Old", "Inactive"]);
    const sums = ref(["500000", "555", "0", "1000"]);

    // Rest of the data properties
    const fetchEntries = async () => {
      const authStore = useAuthStore();
      const token = authStore.token;

      try {
        const response = await axios.get(
          "https://club.metsenat.uz/api/v1/sponsor-list/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alldata.value = response.data.results;
        entries.value = response.data.results;
        filteredEntries.value = response.data;
      } catch (error) {
        console.error(error);
        entries.value = [];
      }
    };
    // Computed properties
    const paginatedEntries = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;

      // Filter the entries based on the search query
      const filteredEntries = entries.value.filter((entry) =>
        entry.full_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      return filteredEntries.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      return Math.ceil(this.entries.length / this.pageSize);
    });

    const formatCreatedAt = (dateString) => {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    const getClassNames = (status) => {
      if (status == "Yangi") {
        return "text-blue-400";
      } else if (status == "Moderatsiyada") {
        return "text-orange-500";
      } else {
        return "text-gree-400";
      }
    };
    // Rest of the computed properties

    const openFilterModal = () => {
      isFilterModalOpen.value = true;
      entries.value = alldata.value;
    };

    const uniqueStatuses = computed(() => {
      const statusSet = new Set(
        entries.value.map((entry) => entry.get_status_display)
      );
      return Array.from(statusSet);
    });

    const applyFilterModal = (filterData) => {
    // Implement the logic of `applyFilterModal` here using the `filterData` object
    // Access the filter values like filterData.selectedStatus, filterData.selectedSum, etc.
    // ...

    // Example usage:
    const filteredEntries = alldata.value.filter((entry) => {
      let matchesStatus = true;
      let matchesSum = true;
      let matchesDate = true;

      if (filterData.selectedStatus) {
        matchesStatus = entry.get_status_display === filterData.selectedStatus;
      }

      if (filterData.selectedSum) {
        matchesSum = entry.sum.toString() === filterData.selectedSum;
      }

      if (filterData.selectedDate) {
        const entryDate = new Date(entry.created_at);
        const selectedDate = new Date(filterData.selectedDate);
        matchesDate = entryDate.toDateString() === selectedDate.toDateString();
      }
      return matchesStatus && matchesSum && matchesDate;
    });

    entries.value = filteredEntries;
    isFilterModalOpen.value = false;
  };
    // Rest of the methods

    onMounted(fetchEntries);
    return {
      entries,
      pageSize,
      currentPage,
      filteredEntries,
      alldata,
      searchQuery,
      isFilterModalOpen,
      selectedStatus,
      selectedSum,
      selectedDate,
      paginatedEntries,
      uniqueStatuses,
      statuses,
      // Rest of the properties
      openFilterModal,
      applyFilterModal,
      // Rest of the methods
      formatCreatedAt,
      getClassNames,
      sums,
    };
  },
};
</script>

<style>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

user-btn {
  background: #00009c;
}
.fullname {
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 30px;
  letter-spacing: 0.5px;
  color: #1d1d1fda;
}
tr th {
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1.125px;
  text-transform: uppercase;
  color: #b1b1b8;
}
.backdrop {
  width: 100vw;
  height: 100vh;
  z-index: 2;
}
.filtercontent {
  position: relative;
  z-index: 10;
  width: 586px;
}
.UZS {
  width: 24px;
  height: 20px;

  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  text-transform: uppercase;

  color: #2e5bff;
}

.all {
  text-transform: none !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
  color: #2e384d;
}
</style>
