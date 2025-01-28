import { defineStore } from "pinia";
import axios from "../utils/axiosClient";

/**
 * Pinia store for managing user authentication and authorization state.
 *
 * @typedef {Object} User
 * @property {string} email - User's email address
 * @property {string} callsign - User's amateur radio callsign
 * @property {string} [firstName] - User's first name
 * @property {string} [lastName] - User's last name
 *
 * @typedef {('user'|'member'|'tech'|'hamfest_admin'|'officer'|'admin')} UserRole
 */

export const useUserStore = defineStore({
  id: "user",

  /**
   * Store state initialization. Attempts to load user data and roles from localStorage
   * @returns {Object} Initial state object
   */
  state: () => ({
    user: null,
    roles: [],
    loading: false,
  }),

  /**
   * Computed properties for checking user authentication and roles
   */
  getters: {
    /** @returns {boolean} Whether user is currently authenticated */
    isAuthenticated: (state) => {
      return Boolean(state.user?.email);
    },
    /** @returns {boolean} Whether user has basic user role */
    isUser: (state) => state.roles.includes("user"),
    /** @returns {boolean} Whether user is a club member */
    isMember: (state) => state.roles.includes("member"),
    /** @returns {boolean} Whether user is on technical committee */
    isTech: (state) => state.roles.includes("tech"),
    /** @returns {boolean} Whether user is a hamfest administrator */
    isHamfestAdmin: (state) => state.roles.includes("hamfest_admin"),
    /** @returns {boolean} Whether user is a club officer */
    isOfficer: (state) => state.roles.includes("officer"),
    /** @returns {boolean} Whether user is a system administrator */
    isAdmin: (state) => state.roles.includes("Admin"),
  },

  actions: {
    /**
     * Fetches the latest user data from the server and updates the store
     * Called after login and to verify authentication status
     * @async
     * @throws {Error} If authentication check fails
     */
    async hydrate() {
      try {
        this.loading = true;
        const response = await axios.get("/v1/auth");
        if (response.data.user) {
          this.setUser(response.data.user);
          this.setRoles(response.data.roles || []);
        } else {
          this.clearAuth();
        }
      } catch (error) {
        this.clearAuth();
      } finally {
        this.loading = false;
      }
    },

    /**
     * Updates the user data in both store and localStorage
     * @param {User} user - User object containing user details
     */
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    /**
     * Updates the user roles in store
     * @param {UserRole[]} roles - Array of role identifiers
     */
    setRoles(roles) {
      this.roles = roles;
    },

    /**
     * Clears all authentication data from store
     */
    clearAuth() {
      this.user = null;
      this.roles = [];
      localStorage.removeItem("user");
    },

    /**
     * Authenticates user with email and password
     * @async
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<boolean>} Success status of login attempt
     */
    async login(email, password) {
      this.loading = true;
      try {
        const credentials = { email, password };
        const response = await axios.post("/v1/auth/login", credentials);
        this.setUser(response.data.user);
        this.setRoles(response.data.roles);
        await this.hydrate();
        this.loading = false;
        return true;
      } catch (error) {
        console.error(error);
        this.loading = false;
        return false;
      }
    },

    /**
     * Logs out the current user and clears authentication data
     * @async
     */
    async logout() {
      this.loading = true;
      try {
        await axios.post("/v1/auth/logout");
        this.clearAuth();
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
