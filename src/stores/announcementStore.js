// src/stores/announcements.js or announcements.ts
import { defineStore } from "pinia";
import axios from "@/utils/axiosClient";

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    announcements: [],
  }),
  actions: {
    async fetchAnnouncements() {
      try {
        const response = await axios.get("/getAnnouncementPosts"); // Adjust API endpoint as needed
        this.announcements = response.data;
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    },
    async addAnnouncement(newAnnouncement) {
      try {
        const response = await axios.post(
          "/api/announcements",
          newAnnouncement
        ); // Adjust API endpoint as needed
        this.announcements.push(response.data);
      } catch (error) {
        console.error("Error adding announcement:", error);
      }
    },
  },
});
