<template>
  <div class="container-fluid">
    <!-- Hero Section -->
    <div class="hero-section">
      <img
        src="@/assets/home/bg3.jpg"
        alt="An image of an antenna tower."
        class="hero-image"
      />
      <h1 class="hero-title">Welcome to the Nixa Amateur Radio Club!</h1>
    </div>

    <!-- Main Content Container -->
    <div class="main-content">
      <div class="container">
        <!-- Updates and Meeting Section -->
        <div class="row content-section">
          <!-- Club Updates Column -->
          <div class="col-lg-6">
            <div class="content-block">
              <h2 class="section-title">Club Updates</h2>
              <div class="announcements-container">
                <ClubAnnouncementCard
                  v-for="announcement in announcements"
                  :announcement="announcement"
                />
                <div class="view-all-wrapper">
                  <RouterLink to="/announcements" class="view-all-button">
                    View all announcements
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Meeting Info Column -->
          <div class="col-lg-6">
            <div class="content-block">
              <h2 class="section-title">Upcoming Meeting</h2>
              <div class="meeting-preview" v-if="meeting">
                <div class="meeting-date">
                  <div class="date-badge">
                    <span class="month">{{ month }}</span>
                    <span class="day">{{ day }}</span>
                  </div>
                  <div class="time">6:00 PM Central</div>
                </div>

                <div class="meeting-content">
                  <div class="meeting-details">
                    <div class="location">
                      <i class="fas fa-map-marker-alt"></i>
                      <span>{{ meeting.address }}</span>
                    </div>

                    <div
                      class="description"
                      v-html="formattedDescription"
                    ></div>
                  </div>

                  <div class="meeting-actions">
                    <a
                      :href="meeting.meeting_link"
                      target="_blank"
                      class="join-button"
                    >
                      <i class="fas fa-video"></i>
                      Join Online
                    </a>
                    <RouterLink to="/meetings" class="more-info">
                      More Information
                    </RouterLink>
                    <RouterLink to="/testing" class="testing-info">
                      <i class="fas fa-clipboard-check"></i>
                      License Testing
                    </RouterLink>
                  </div>
                </div>
              </div>

              <!-- Loading state -->
              <div v-else-if="loading" class="meeting-preview loading">
                <div class="spinner"></div>
                <p>Loading meeting information...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="row content-section">
          <div class="col-12">
            <form
              id="contact-form"
              action="https://formspree.io/f/mjvdnenz"
              method="POST"
            >
              <h2 class="section-title text-center">Contact Us</h2>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  required
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  name="name"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  required
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  name="email"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  required
                  placeholder="What would you like to tell us?"
                  name="message"
                  id="message"
                  rows="5"
                  class="form-input"
                ></textarea>
              </div>

              <button type="submit" class="submit-button">
                <i class="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "@/utils/axiosClient";
import ClubAnnouncementCard from "@/components/ClubAnnouncementCard.vue";
import { useAnnouncementStore } from "@/stores/announcementStore";

const meeting = ref(null);
const loading = ref(true);
const month = ref("");
const day = ref("");

const announcementStore = useAnnouncementStore();
const announcements = computed(() => announcementStore.announcements);

const getMeetingInfo = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/meetings/upcoming");
    meeting.value = response.data;

    if (meeting.value) {
      const meetingDate = new Date(meeting.value.meeting_date);
      month.value = meetingDate.toLocaleString("default", {
        month: "short",
      });
      day.value = meetingDate.getDate();
    }
  } catch (error) {
    console.error("Error fetching meeting:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  scrollToTop();
  getMeetingInfo();
  announcementStore.fetchAnnouncementsWithLimit(2);
});

const scrollToTop = () => {
  document.body.scrollTop = 0;
};

const formattedDescription = computed(() => {
  if (!meeting.value?.description) return "";

  // Truncate text if it's too long
  const maxLength = 300;
  let description = meeting.value.description;
  if (description.length > maxLength) {
    description = description.substring(0, maxLength) + "...";
  }

  // Split by newlines and wrap each paragraph
  return description
    .split("\n")
    .filter((para) => para.trim())
    .map((para) => `<p>${para}</p>`)
    .join("");
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: #fff;
}

.container-fluid {
  padding: 0;
  background-color: #111111;
  min-height: 100vh;
}

.hero-section {
  position: relative;
  height: 400px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
}

.hero-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(44, 40, 59, 0.9);
  padding: 2rem 3rem;
  border-radius: 12px;
  text-align: center;
  font-size: 2.5rem;
  color: #fff;
  max-width: 90%;
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.main-content {
  padding: 0 1rem;
}

.content-section {
  margin-bottom: 4rem;
}

.content-block {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 600;
  text-align: left;
}

.view-all-wrapper {
  margin-top: 1rem;
  text-align: center;
}

.view-all-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #f58937;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.view-all-button:hover {
  background-color: #e67825;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(245, 137, 55, 0.2);
}

/* Contact Form */
#contact-form {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #2c283b;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e5e7eb;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #f58937;
  box-shadow: 0 0 0 2px rgba(245, 137, 55, 0.2);
}

.form-input::placeholder {
  color: #9ca3af;
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f58937;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
  font-size: 1rem;
}

.submit-button:hover {
  background: #e67825;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(245, 137, 55, 0.2);
}

.submit-button:active {
  transform: translateY(0);
}

.text-center {
  text-align: center;
}

@media (max-width: 991px) {
  .hero-section {
    height: 300px;
    margin-bottom: 2rem;
  }

  .hero-title {
    font-size: 2rem;
    padding: 1.5rem 2rem;
  }

  .content-section {
    margin-bottom: 2rem;
  }

  .content-block {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
  }

  .section-title {
    font-size: 1.75rem;
    text-align: center;
  }
}

.meeting-preview {
  background: #2c283b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
}

.meeting-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Important for proper flex behavior */
}

.meeting-date {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.date-badge {
  background: #f58937;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  text-align: center;
  min-width: 100px;
}

.date-badge .month {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
}

.date-badge .day {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-top: 0.25rem;
}

.time {
  font-size: 1.2rem;
  color: #9ca3af;
}

.meeting-details {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e5e7eb;
}

.location i {
  color: #f58937;
}

.description {
  color: #9ca3af;
  line-height: 1.6;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.description :deep(p) {
  margin-bottom: 1rem;
}

.description :deep(p:last-child) {
  margin-bottom: 0;
}

/* Custom scrollbar for webkit browsers */
.description::-webkit-scrollbar {
  width: 6px;
}

.description::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.description::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.meeting-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.join-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f58937;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.join-button:hover {
  background: #e67825;
  transform: translateY(-1px);
}

.more-info {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(245, 137, 55, 0.3);
  border-radius: 8px;
  color: #f58937;
  text-decoration: none;
  transition: all 0.2s ease;
}

.more-info:hover {
  background: rgba(245, 137, 55, 0.1);
}

.testing-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e5e7eb;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
}

.testing-info:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.testing-info i {
  color: #9ca3af;
}

/* Loading state */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #9ca3af;
}

.spinner {
  border: 3px solid rgba(245, 137, 55, 0.1);
  border-top: 3px solid #f58937;
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

@media (max-width: 768px) {
  .meeting-date {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .meeting-actions {
    flex-direction: column;
  }

  .join-button,
  .more-info,
  .testing-info {
    width: 100%;
    justify-content: center;
  }
}

.announcements-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#view-all-announcements {
  display: none;
}

/* Update responsive styles */
@media (max-width: 768px) {
  .content-section {
    padding: 1rem 0;
  }

  .content-block {
    margin-bottom: 2rem;
  }

  .section-title {
    text-align: center;
    font-size: 1.75rem;
  }
}
</style>
