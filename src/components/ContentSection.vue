<template>
  <div class="container mx-auto px-4">
    <link
      href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
      rel="stylesheet"
    />
    <!-- bg-gray-900 -->
    <div class="overflow-auto lg:overflow-visible mt-6">
      <table class="table text-gray-400 border-separate space-y-6 text-sm w-full">
        <thead>
          <tr>
            <th class="text-left uppercase">#</th>
            <th class="px-3 text-left uppercase">f.i.sh.</th>
            <th class="px-3 text-left uppercase">Tel.Raqami</th>
            <th class="px-3 text-left uppercase text-center">Homiylik summasi</th>
            <th class="px-3 text-left uppercase text-center">Sarflangan summa</th>
            <th class="px-3 text-left uppercase text-center">Sana</th>
            <th class="px-3 text-left uppercase text-center">Holati</th>
            <th class="px-3 text-left uppercase">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in paginatedEntries" :key="entry.id" class="bg-white">
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
              <span class="font-semibold fullname text-center">{{ entry.sum }}</span>
              UZS
            </td>
            <td class="p-3 text-center">
              <span class="font-semibold fullname">{{ entry.spent }}</span>
              UZS
            </td>
            <td class="p-3 text-black text-center">{{ formatCreatedAt(entry.created_at) }}</td>
            <td class="p-3 text-center">
              <span :class="getClassNames(entry.get_status_display)" class="rounded-md px-2">
                {{ entry.get_status_display }}
              </span>
            </td>
            <td class="p-3 text-center">
              <img src="../assets/eye.svg" alt="Flowbite Logo" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end">
      <nav aria-label="Page navigation example">
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
            >{{ page }}</a>

          
          </li>
          <li>  <a
            href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >1</a></li>
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
</template>

<script>
export default {
  props: {
    paginatedEntries: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    formatCreatedAt: {
      type: Function,
      required: true
    },
    getClassNames: {
      type: Function,
      required: true
    },
    prevPage: {
      type: Function,
      required: true
    },
    nextPage: {
      type: Function,
      required: true
    }
  }
};
</script>
