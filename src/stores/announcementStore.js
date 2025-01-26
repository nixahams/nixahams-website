// src/stores/announcements.js or announcements.ts
import { defineStore } from "pinia";
import axios from "@/utils/axiosClient";

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    announcements: [],
  }),
  actions: {
    async fetchAnnouncementsWithLimit(limit) {
      try {
        const response = await axios.get(
          `/v1/announcements/recentPosts?limit=${limit}`
        );
        this.announcements = response.data;
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    },
    async fetchAllAnnouncements() {
      try {
        const response = await axios.get("/v1/announcements/allPosts");
        this.announcements = response.data;
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    },
    async addAnnouncement(newAnnouncement) {
      try {
        const response = await axios.post(
          "/v1/announcements/addPost",
          newAnnouncement
        ); // Adjust API endpoint as needed
        this.announcements.push(response.data);
      } catch (error) {
        console.error("Error adding announcement:", error);
      }
    },
  },
});
