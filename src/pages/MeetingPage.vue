<template>
  <div class="meeting-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>Club Meetings</h1>
      <p>Join us in person or online for our monthly meetings</p>
    </div>

    <!-- Next Meeting Card -->
    <div class="meeting-container">
      <div class="meeting-card" v-if="meeting">
        <!-- Date and Title Section -->
        <div class="meeting-header">
          <div class="date-badge">
            <span class="month">{{ month }}</span>
            <span class="day">{{ day }}</span>
          </div>
          <div class="meeting-title">
            <h2>Next Meeting</h2>
            <p class="time">6:00 PM Central</p>
          </div>
        </div>

        <!-- Description Section -->
        <div class="info-section" v-if="meeting.description">
          <h3 class="info-title">About This Meeting</h3>
          <div class="description" v-html="formattedDescription"></div>
        </div>

        <!-- Location and Online Meeting Section -->
        <div class="meeting-details">
          <div class="location-info">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="text">
                <h3>Location</h3>
                <p>{{ meeting.address }}</p>
              </div>
            </div>

            <div class="info-item">
              <i class="fas fa-video"></i>
              <div class="text">
                <h3>Online Meeting</h3>
                <p>Join us virtually via Google Meet</p>
                <a
                  :href="meeting.meeting_link"
                  target="_blank"
                  class="join-button"
                >
                  Join Online
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading meeting information...</p>
      </div>

      <!-- Error State -->
      <div v-else class="error">
        <i class="fas fa-exclamation-circle"></i>
        <p>Unable to load meeting information</p>
        <button @click="getMeeting" class="retry-button">Try Again</button>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-section" v-if="meeting">
      <h2>How to Find Us</h2>
      <div class="map-container">
        <iframe
          :src="`https://www.google.com/maps?q=${meeting.address}&z=17&output=embed&t=m&markers=color:red|${meeting.address}`"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";

export default {
  name: "MeetingPage",
  data() {
    return {
      meeting: null,
      loading: true,
      error: false,
      month: "",
      day: "",
    };
  },
  methods: {
    async getMeeting() {
      this.loading = true;
      this.error = false;

      try {
        const response = await axios.get("/v1/meetings/upcoming");
        this.meeting = response.data;

        if (this.meeting) {
          const meetingDate = new Date(this.meeting.meeting_date);
          this.month = meetingDate.toLocaleString("default", {
            month: "short",
          });
          this.day = meetingDate.toLocaleString("en-US", { day: "2-digit" });
        }
      } catch (error) {
        console.error("Error fetching meeting:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    formattedDescription() {
      if (!this.meeting?.description) return "";
      // Split by newlines and wrap each paragraph in <p> tags
      return this.meeting.description
        .split("\n")
        .filter((para) => para.trim()) // Remove empty paragraphs
        .map((para) => `<p>${para}</p>`)
        .join("");
    },
  },
  mounted() {
    this.getMeeting();
  },
};
</script>

<style scoped>
.meeting-page {
  background-color: rgb(17, 17, 17);
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/meeting-hero.jpg") center/cover;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #fd9947;
}

.meeting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.meeting-card {
  background: #2c283b;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.meeting-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(253, 153, 71, 0.2);
}

.date-badge {
  background: #fd9947;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  min-width: 100px;
}

.month {
  display: block;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bold;
}

.day {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.meeting-title h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.time {
  color: #fd9947;
  font-size: 1.2rem;
}

.info-section {
  background: #363246;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.info-title {
  color: #fd9947;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.info-section p {
  color: #ccc;
  line-height: 1.5;
}

.meeting-details {
  display: grid;
  gap: 2rem;
}

.location-info {
  display: grid;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-item i {
  color: #fd9947;
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.info-item .text h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.info-item .text p {
  color: #ccc;
  margin-bottom: 0.25rem;
}

.join-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fd9947;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background-color 0.3s;
}

.join-button:hover {
  background: #e88835;
}

.map-section {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.map-section h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.map-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Loading and Error States */
.loading,
.error {
  text-align: center;
  padding: 3rem;
  background: #2c283b;
  border-radius: 12px;
}

.spinner {
  border: 4px solid #2c283b;
  border-top: 4px solid #fd9947;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.retry-button {
  background: #fd9947;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .meeting-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .info-section {
    text-align: left;
  }

  .date-badge {
    margin: 0 auto;
  }

  .meeting-details {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
  }

  .info-item i {
    margin: 0 auto 0.5rem;
  }
}

.description :deep(p) {
  margin-bottom: 1rem;
}

.description :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
