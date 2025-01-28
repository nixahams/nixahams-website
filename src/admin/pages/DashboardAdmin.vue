<template>
  <div class="dashboard-admin">
    <h2>Admin Dashboard</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Members</h3>
        <div class="stat-value">{{ memberCount }}</div>
      </div>
      <div class="stat-card">
        <h3>Active Repeaters</h3>
        <div class="stat-value">{{ activeRepeaters }}</div>
      </div>
      <div class="stat-card">
        <h3>Next Meeting</h3>
        <div class="stat-value">{{ nextMeeting }}</div>
      </div>
      <div class="stat-card">
        <h3>Recent Announcements</h3>
        <div class="stat-value">{{ recentAnnouncements }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";

const memberCount = ref(0);
const activeRepeaters = ref(0);
const nextMeeting = ref("Loading...");
const recentAnnouncements = ref(0);

const fetchDashboardData = async () => {
  try {
    // These endpoints will need to be implemented on the backend
    const [membersRes, repeatersRes, meetingsRes, announcementsRes] =
      await Promise.all([
        axios.get("/v1/members/count"),
        axios.get("/v1/repeaters/count?status=Operational"),
        axios.get("/v1/meetings/next"),
        axios.get("/v1/announcements/count?recent=true"),
      ]);

    memberCount.value = membersRes.data.count;
    activeRepeaters.value = repeatersRes.data.count;
    nextMeeting.value = new Date(meetingsRes.data.date).toLocaleDateString();
    recentAnnouncements.value = announcementsRes.data.count;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(fetchDashboardData);
</script>

<style scoped>
.dashboard-admin {
  padding: 1rem;
}

h2 {
  color: #e5e7eb;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: rgba(31, 31, 31, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
  color: #e5e7eb;
}

.stat-card h3 {
  color: #fcd34d;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
