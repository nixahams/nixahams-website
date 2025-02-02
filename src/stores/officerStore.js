import { defineStore } from "pinia";
import axios from "../utils/axiosClient";
import { ref } from "vue";

export const useOfficerStore = defineStore("officerStore", () => {
  const officers = ref([]);

  const loadOfficers = async () => {
    const response = await axios.get("/v1/officers");
    officers.value = response.data;
  };

  const updateOfficer = async (officer) => {
    const response = await axios.put(`/officers/${officer.id}`, officer);
    officers.value = response.data;
  };

  return { officers, loadOfficers, updateOfficer };
});
