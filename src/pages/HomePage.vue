<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0" id="top-bg-container">
        <img
          src="@/assets/home/bg3.jpg"
          alt="An image of an antenna tower."
          id="top-bg-img"
        />
        <h1 id="welcome-text">Welcome to the Nixa Amateur Radio Club!</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <h2>Club Updates</h2>
        <ClubAnnouncementCard
          v-for="announcement in announcements"
          :title="announcement.title"
          :description="announcement.body"
          :date="announcement.date"
        />

        <div id="view-all-announcements">
          <a href="/announcements">View all announcements</a>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <h2>Upcoming Meetings</h2>
        <p>Join us for our monthly meetings, either in person or online!</p>
        <div id="meeting-info">
          <p>
            <strong>SOMEDAY, {{ month }} {{ day }}</strong>
          </p>
          <p>
            This is some placeholder text for the description of the upcoming
            meeting. Currently, the description is not being pulled from the
            database, so I need to figure out why that isn't working as
            expected.
          </p>
          <a :href="link" target="_blank">Join Online</a>
        </div>
        <p class="text-center mt-2">
          For testing information, please go to the
          <RouterLink to="#">Testing Information Page</RouterLink>.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form id="form" action="https://formspree.io/f/mjvdnenz" method="POST">
          <div id="form_title_parent">
            <div id="form_title">Send us a message</div>
          </div>
          <div class="input_parent">
            <input
              required
              placeholder="Your name..."
              class="input"
              type="text"
              id="name"
              name="name"
            /><br />
          </div>
          <div class="input_parent">
            <input
              required
              placeholder="Your email..."
              class="input"
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div id="textarea_parent">
            <textarea
              required
              placeholder="Your message..."
              class="textarea"
              name="message"
              id="message"
              cols="20"
              rows="7"
            ></textarea>
          </div>
          <div id="form_btn_parent">
            <input id="form_btn" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "@/utils/axiosClient";
import ClubAnnouncementCard from "@/components/ClubAnnouncementCard.vue";
import { useAnnouncementStore } from "@/stores/announcementStore";

const year = ref("");
const month = ref("");
const day = ref("");
const description = ref("");
const link = ref("");

const announcementStore = useAnnouncementStore();

// Fetch the announcements when the component is mounted
onMounted(() => {
  scrollToTop();
  getMeetingInfo();
  announcementStore.fetchAnnouncements(); // Trigger the fetch of announcements
});

// Create a computed property to get the announcements from the store
const announcements = computed(() => announcementStore.announcements);

const scrollToTop = () => {
  document.body.scrollTop = 0;
};

const getMeetingInfo = () => {
  const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meetings/all`;
  axios
    .get(URL)
    .then((response) => {
      // Find meeting that is the closest to current date, but occurs after current date
      const meetings = response.data;

      // Get last meeting in the list
      const upcomingMeeting = meetings[meetings.length - 1];
      const meetingDate = new Date(upcomingMeeting.date);

      year.value = meetingDate.getFullYear();
      month.value = meetingDate.toLocaleString("default", {
        month: "long",
      });
      day.value = meetingDate.getDate() + 1;
      description.value = upcomingMeeting.description;
      link.value = upcomingMeeting.link;
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: #fff;
}

.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #111111;
}

#top-bg-container {
  height: 300px;
  margin-bottom: 1rem;
  overflow: hidden;
}

#top-bg-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: 0 15%;
}

#welcome-text {
  position: relative;
  top: -75%;
  left: 5%;
  font-size: 3em;
  z-index: 1;
  background-color: #333;
  padding: 2.5rem;
  border-radius: 5px;
  width: 50%;
  opacity: 0.8;
}

#meeting-info {
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}

#view-all-announcements {
  margin-top: 10px auto;
  border: #333 1px solid;
  width: fit-content;
  padding: 1rem;
  border-radius: 5px;
  background-color: #f58937;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
}

#view-all-announcements a {
  color: #000;
  text-decoration: none;
}

#view-all-announcements:hover {
  background-color: #f5a962;
}

/* Contact Form */
#form {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #333;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}

#form_title_parent {
  text-align: center;
}

#form_title {
  font-size: 1.6rem;
  font-weight: bold;
}

.input_parent {
  text-align: center;
  margin-top: 1rem;
}

.input {
  padding: 0.7rem;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: #333;
  color: #fff;
}

#textarea_parent {
  text-align: center;
  margin-top: 1rem;
}

.textarea {
  padding: 0.7rem;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: #333;
  color: #fff;
}

#form_btn_parent {
  text-align: center;
  margin-top: 1rem;
}

#form_btn {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: #f58937;
  color: #fff;
  cursor: pointer;
}

#form_btn:hover {
  background-color: #f5a962;
}

#form_btn:active {
  background-color: #f58937;
}

#form_btn:focus {
  outline: none;
}
</style>
