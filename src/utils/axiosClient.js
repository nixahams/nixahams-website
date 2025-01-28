import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.nixahams.net/",
  withCredentials: true,
});

export default apiClient;
