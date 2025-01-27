<template>
  <div class="announcement-detail">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading announcement...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <RouterLink to="/announcements" class="back-link">
          Back to Announcements
        </RouterLink>
      </div>

      <!-- Announcement Content -->
      <div v-else-if="announcement" class="announcement-content">
        <div class="header">
          <RouterLink to="/announcements" class="back-link">
            <i class="fas fa-arrow-left"></i>
            Back to Announcements
          </RouterLink>
          <h1>{{ announcement.title }}</h1>
          <div class="meta">
            <span class="date">{{ formatDate(announcement.created_at) }}</span>
          </div>
        </div>

        <div class="content" v-html="formattedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "@/utils/axiosClient";

const route = useRoute();
const announcement = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchAnnouncement = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get(`/v1/announcements/${route.params.id}`);
    announcement.value = response.data;
  } catch (err) {
    console.error("Error fetching announcement:", err);
    error.value = "Failed to load announcement. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formattedContent = computed(() => {
  if (!announcement.value?.body) return "";
  return announcement.value.body
    .split("\n")
    .filter((para) => para.trim())
    .map((para) => `<p>${para}</p>`)
    .join("");
});

onMounted(fetchAnnouncement);
</script>

<style scoped>
.announcement-detail {
  background-color: rgb(17, 17, 17);
  min-height: 100vh;
  padding: 2rem 0;
  color: rgb(208, 213, 239);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.spinner {
  border: 4px solid rgba(245, 158, 11, 0.1);
  border-left-color: #f59e0b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state i {
  color: #ef4444;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #d97706;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: #fff;
}

.meta {
  color: #9ca3af;
  font-size: 0.875rem;
}

.content {
  line-height: 1.7;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .announcement-detail {
    padding: 1rem 0;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
