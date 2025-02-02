import { defineStore } from "pinia";
import axios from "../utils/axiosClient";
import { ref } from "vue";

export const useOfficerStore = defineStore("officerStore", () => {
  const officers = ref([]);

  const loadOfficers = async () => {
    const order = ["President", "Vice-President", "Treasurer", "Secretary"];
    const response = await axios.get("/v1/officers");
    officers.value = response.data.sort((a, b) => {
      return order.indexOf(a.position) - order.indexOf(b.position);
    });
  };

  const updateOfficer = async (officer) => {
    const response = await axios.put("/v1/officers/updateOfficer", officer);
    loadOfficers();
  };

  return { officers, loadOfficers, updateOfficer };
});
