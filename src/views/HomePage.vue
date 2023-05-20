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

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useAuthStore } from "../store";
import FilterModal from "../components/FilterModal.vue";
import Header from "../components/Header.vue";
import ContentSection from "../components/ContentSection.vue";
import axios from "axios";
import { Sponsor } from "../hooks/SponsorInterface.ts";

export default defineComponent({
  name: "HomePage",
  components: {
    FilterModal,
    Header,
    ContentSection,
  },
  setup() {
    const entries = ref<Sponsor[]>([]);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const searchQuery = ref("");
    const isFilterModalOpen = ref(false);
    const selectedStatus = ref("");
    const selectedSum = ref("");
    const selectedDate = ref("");
    const filteredEntries = ref<Sponsor[]>([]);
    const alldata = ref<Sponsor[]>([]);
    const statuses = ref<string[]>([]);
    const sums = ref<string[]>(["500000", "555", "0", "1000"]);

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
        filteredEntries.value = response.data.results;
      } catch (error) {
        console.error(error);
        entries.value = [];
      }
    };

    const paginatedEntries = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;

      const filteredEntries = entries.value.filter((entry) =>
        entry.full_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      return filteredEntries.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      return Math.ceil(entries.value.length / pageSize.value);
    });

    const formatCreatedAt = (dateString: string) => {
      const date = new Date(dateString);
      const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    const getClassNames = (status: string) => {
      if (status === "Yangi") {
        return "text-blue-400";
      } else if (status === "Moderatsiyada") {
        return "text-orange-500";
      } else {
        return "text-gree-400";
      }
    };

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

    const applyFilterModal = (filterData: {
      selectedStatus: string;
      selectedSum: string;
      selectedDate: string;
    }) => {
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
      openFilterModal,
      applyFilterModal,
      formatCreatedAt,
      getClassNames,
      sums,
      prevPage,
      nextPage,
      clearFilterModal
    };
  },
});
</script>
