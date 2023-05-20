<template>
  <div>
    <!-- Header section -->
    <Header
      :searchQuery="searchQuery"
      @open-filter-modal="openFilterModal"
      @update-search-query="searchQuery = $event"
    />

    <!-- Content section -->
    <ContentSection
      :paginatedEntries="paginatedEntries"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :formatCreatedAt="formatCreatedAt"
      :getClassNames="getClassNames"
      :prevPage="prevPage"
      :nextPage="nextPage"
    />

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
import Header from "../components/Header.vue";
import ContentSection from "../components/ContentSection.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    FilterModal,
    Header,
    ContentSection,
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
    const statuses = ref([]);
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
      return Math.ceil(entries.value.length / pageSize.value);
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

    const clearFilterModal = () => {
      selectedStatus.value = "";
      selectedSum.value = "";
      selectedDate.value = "";
      entries.value = alldata.value;
      currentPage.value = 1;
      isFilterModalOpen.value = false;
    };

    const applyFilterModal = (filterData) => {
      // Implement the logic of `applyFilterModal` here using the `filterData` object

      // Example usage:
      const filteredEntries = alldata.value.filter((entry) => {
        let matchesStatus = true;
        let matchesSum = true;
        let matchesDate = true;

        if (filterData.selectedStatus) {
          matchesStatus =
            entry.get_status_display === filterData.selectedStatus;
        }

        if (filterData.selectedSum) {
          matchesSum = entry.sum.toString() === filterData.selectedSum;
        }

        if (filterData.selectedDate) {
          const entryDate = new Date(entry.created_at);
          const selectedDate = new Date(filterData.selectedDate);
          matchesDate =
            entryDate.toDateString() === selectedDate.toDateString();
        }
        return matchesStatus && matchesSum && matchesDate;
      });

      entries.value = filteredEntries;
      currentPage.value = 1;
      isFilterModalOpen.value = false;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
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

      prevPage,
      nextPage,
    };
  },
};
</script>