<template>
  <div class="repeaters-page">
    <div class="container">
      <h1 class="page-title">K0NXA Repeaters</h1>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading repeaters...</p>
      </div>

      <div v-else>
        <div class="filters">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search repeaters..."
              class="search-input"
            />
          </div>

          <div class="attribute-filters">
            <div
              v-for="attr in availableAttributes"
              :key="attr"
              :class="[
                'attribute-chip',
                { active: selectedAttributes.includes(attr) },
              ]"
              @click="toggleAttribute(attr)"
            >
              {{ attr }}
            </div>
          </div>
        </div>

        <div class="table-container">
          <table class="repeaters-table">
            <thead>
              <tr>
                <th @click="sort('frequency')">
                  Frequency
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('offset')">
                  Offset
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('plTone')">
                  PL/CC/NAC
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('mode')">
                  Mode
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('location')">
                  Location
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('attributes')">
                  Attributes
                  <i class="fas fa-sort"></i>
                </th>
                <th @click="sort('status')">
                  Status
                  <i class="fas fa-sort"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="repeater in filteredRepeaters" :key="repeater.id">
                <td>
                  <router-link
                    :to="`/repeaters/${repeater.id}`"
                    class="frequency-link"
                  >
                    {{ repeater.frequency }}
                  </router-link>
                </td>
                <td>{{ repeater.offset }}</td>
                <td>{{ repeater.key }}</td>
                <td>
                  <span class="mode-badge">{{ repeater.mode }}</span>
                </td>
                <td>{{ repeater.location }}</td>
                <td>
                  <div class="attributes-container">
                    <span
                      v-for="attr in repeater.attributes"
                      :key="attr"
                      class="attribute-badge"
                    >
                      {{ attr }}
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    :class="['status-badge', repeater.status.toLowerCase()]"
                  >
                    {{ repeater.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/utils/axiosClient";

const repeaters = ref([]);
const searchQuery = ref("");
const sortKey = ref("frequency");
const sortOrder = ref("asc");
const selectedAttributes = ref([]);
const loading = ref(true); // Add loading state

// Available attributes for filtering
const availableAttributes = computed(() => {
  const attrs = new Set();
  repeaters.value.forEach((repeater) => {
    repeater.attributes?.forEach((attr) => attrs.add(attr));
  });
  return Array.from(attrs);
});

const toggleAttribute = (attr) => {
  const index = selectedAttributes.value.indexOf(attr);
  if (index === -1) {
    selectedAttributes.value.push(attr);
  } else {
    selectedAttributes.value.splice(index, 1);
  }
};

const fetchRepeaters = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/repeaters");
    repeaters.value = response.data;
  } catch (error) {
    console.error("Error fetching repeaters:", error);
  } finally {
    loading.value = false;
  }
};

// Add this to call fetchRepeaters when component mounts
onMounted(() => {
  fetchRepeaters();
});

const filteredRepeaters = computed(() => {
  let filtered = [...repeaters.value];

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((repeater) =>
      Object.values(repeater).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

  // Filter by selected attributes
  if (selectedAttributes.value.length > 0) {
    filtered = filtered.filter((repeater) =>
      selectedAttributes.value.every((attr) =>
        repeater.attributes?.includes(attr)
      )
    );
  }

  return filtered.sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];

    if (sortOrder.value === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
});

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};
</script>

<style scoped>
.repeaters-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: rgb(17, 17, 17);
  color: rgb(208, 213, 239);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  color: #f59e0b;
  margin-bottom: 2rem;
  text-align: center;
}

.search-bar {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #f59e0b;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  background-color: rgba(245, 158, 11, 0.1);
  color: rgb(208, 213, 239);
}

.search-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.search-input::placeholder {
  color: rgba(208, 213, 239, 0.5);
}

.table-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow: auto;
}

.repeaters-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.repeaters-table th,
.repeaters-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}

.repeaters-table th {
  background-color: rgba(245, 158, 11, 0.1);
  font-weight: 600;
  color: #f59e0b;
  cursor: pointer;
  user-select: none;
}

.repeaters-table th:hover {
  background-color: rgba(245, 158, 11, 0.2);
}

.repeaters-table tbody tr:hover {
  background-color: rgba(245, 158, 11, 0.05);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.operational {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-badge.maintenance {
  background-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.status-badge.offline {
  background-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

@media (max-width: 768px) {
  .repeaters-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .repeaters-table th,
  .repeaters-table td {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
}

.frequency-link {
  color: #f59e0b;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.frequency-link:hover {
  color: #fbbf24;
}

.frequency-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform 0.2s;
}

.frequency-link:hover::after {
  transform: scaleX(1);
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.attribute-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.attribute-chip {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.attribute-chip:hover {
  background-color: rgba(245, 158, 11, 0.2);
}

.attribute-chip.active {
  background-color: #f59e0b;
  color: white;
}

.attributes-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.attribute-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  font-size: 0.75rem;
}

.mode-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(139, 92, 246, 0.1); /* Purple tint */
  color: rgb(139, 92, 246);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Add these new styles for loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  border: 4px solid rgba(245, 158, 11, 0.1);
  border-left: 4px solid #f59e0b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
