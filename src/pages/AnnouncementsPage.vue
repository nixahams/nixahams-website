<template>
  <div class="announcements-page">
    <div class="container">
      <div class="page-header">
        <h1>Club Announcements</h1>
        <p class="subtitle">
          Stay up to date with the latest news and updates from the Nixa Amateur
          Radio Club
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading announcements...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
      </div>

      <!-- Announcements List -->
      <div v-else class="announcements-list">
        <ClubAnnouncementCard
          v-for="announcement in announcements"
          :key="announcement.id"
          :announcement="announcement"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";
import ClubAnnouncementCard from "@/components/ClubAnnouncementCard.vue";

const announcements = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchAnnouncements = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get("/v1/announcements");
    announcements.value = response.data;
  } catch (err) {
    console.error("Error fetching announcements:", err);
    error.value = "Failed to load announcements. Please try again later.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  document.body.scrollTop = 0;
  fetchAnnouncements();
});
</script>

<style scoped>
.announcements-page {
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

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #f58937;
  margin-bottom: 1rem;
}

.subtitle {
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.6;
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

.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .announcements-page {
    padding: 1rem 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
