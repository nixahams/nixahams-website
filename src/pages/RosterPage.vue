<template>
  <div id="roster">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>Club Membership</h1>
      <p class="subtitle">
        Join the Nixa Amateur Radio Club - all dues help support our club in
        maintaining our evergrowing collection of repeaters!
      </p>
    </div>

    <!-- Membership Plans -->
    <div class="membership-plans">
      <div class="plan-cards">
        <!-- Single Membership Card -->
        <div
          class="plan-card"
          :class="{ active: membership_selected === 'single_side' }"
        >
          <div class="plan-header">
            <h3>Individual Membership</h3>
            <div class="price">$15<span>/year</span></div>
          </div>
          <div class="plan-features">
            <ul>
              <li><i class="fa-solid fa-check"></i> Exclusive Access</li>
              <li><i class="fa-solid fa-check"></i> Name on Roster</li>
              <li><i class="fa-solid fa-check"></i> Insider Announcements</li>
              <li><i class="fa-solid fa-check"></i> Single Member</li>
            </ul>
          </div>
          <a :href="singleMembershipUrl" target="_blank" class="plan-button">
            Select Plan
          </a>
        </div>

        <!-- Family Membership Card -->
        <div
          class="plan-card"
          :class="{ active: membership_selected === 'family_side' }"
        >
          <div class="plan-header">
            <h3>Family Membership</h3>
            <div class="price">$20<span>/year</span></div>
          </div>
          <div class="plan-features">
            <ul>
              <li><i class="fa-solid fa-check"></i> Exclusive Access</li>
              <li><i class="fa-solid fa-check"></i> Names on Roster</li>
              <li><i class="fa-solid fa-check"></i> Insider Announcements</li>
              <li><i class="fa-solid fa-check"></i> Up to 4 Members</li>
            </ul>
          </div>
          <a :href="familyMembershipUrl" target="_blank" class="plan-button">
            Select Plan
          </a>
        </div>
      </div>
    </div>

    <!-- Roster Section -->
    <div class="roster-section">
      <div class="roster-header">
        <div class="year-selector">
          <button class="year-nav" @click="prevYear()">
            <i class="fas fa-angle-left"></i>
          </button>
          <h2>{{ roster_year }} Roster</h2>
          <button class="year-nav" @click="nextYear()">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
        <div class="member-count">{{ active_list.length }} Members</div>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading roster...</p>
      </div>

      <div v-else-if="error" class="error">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
        <button @click="fetchRoster" class="retry-button">Try Again</button>
      </div>

      <div v-else-if="nodata" class="no-data">
        <i class="fa-solid fa-signal"></i>
        <p>No members found for {{ roster_year }}</p>
      </div>

      <div v-else class="roster-table-container">
        <table class="roster-table">
          <thead>
            <tr>
              <th>Callsign</th>
              <th>Name</th>
              <th>ARRL Member</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in active_list" :key="member.email">
              <td>{{ member.callsign || "N/A" }}</td>
              <td>{{ member.name }}</td>
              <td class="arrl">
                <i
                  :class="
                    member.arrl_membership
                      ? 'fa-solid fa-check'
                      : 'fa-solid fa-x'
                  "
                  :title="
                    member.arrl_membership
                      ? 'ARRL Member'
                      : 'Not an ARRL Member'
                  "
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";

export default {
  name: "RosterPage",
  components: {},
  computed: {
    singleMembershipUrl() {
      return `https://buy.stripe.com/${
        import.meta.env.VITE_SINGLE_MEMBERSHIP_LINK
      }`;
    },
    familyMembershipUrl() {
      return `https://buy.stripe.com/${
        import.meta.env.VITE_FAMILY_MEMBERSHIP_LINK
      }`;
    },
  },
  data() {
    return {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      familyItem: [
        {
          price: import.meta.env.VITE_FAMILY_MEMBERSHIP_PRICE_ID,
          quantity: 1,
        },
      ],
      singleItem: [
        {
          price: import.meta.env.VITE_SINGLE_MEMBERSHIP_PRICE_ID,
          quantity: 1,
        },
      ],
      successURL: import.meta.env.VITE_SUCCESS_URL,
      cancelURL: import.meta.env.VITE_CANCEL_URL,
      membership_selected: "single_side",
      single: "single_on",
      family: "family_off",
      card_side: "membership_card_side_front",
      roster_year: 2024,
      active_year_table: [],
      active_list: [],
      nodata: false,
      loading: true,
      error: null,
    };
  },
  methods: {
    submitSinglePayment() {
      this.$refs.checkoutRef1.redirectToCheckout();
    },
    submitFamilyPayment() {
      this.$refs.checkoutRef2.redirectToCheckout();
    },
    async nextYear() {
      this.roster_year += 1;
      await this.fetchRoster();
    },
    async prevYear() {
      this.roster_year -= 1;
      await this.fetchRoster();
    },
    async fetchRoster() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`/v1/roster/${this.roster_year}`);
        this.active_list = response.data;
        this.nodata = this.active_list.length === 0;
      } catch (err) {
        this.error = "Failed to load roster. Please try again later.";
        console.error("Error loading roster:", err);
        this.nodata = true;
        this.active_list = [];
      } finally {
        this.loading = false;
      }
    },
    scrollToTop() {
      document.body.scrollTop = 0;
    },
    scrollToRoster() {},
    membership_select(id) {
      if (id == "single_on" || id == "single_off") {
        /* single */
        document.getElementById("front_img2").className = "moveRadio";
        let j = 0;
        Array.from(document.getElementsByClassName("back_imgs")).forEach(
          (radio) => {
            radio.style.animation = "";
            radio.style.animationDelay = `${j++ * 100 - 50}ms`;
            radio.className = "back_imgs shrinkRadioL";
          }
        );
        this.membership_selected = "single_side";
        this.single = "single_on";
        this.family = "family_off";
        this.card_side = "membership_card_side_front";
      } else {
        /* family */
        document.getElementById("front_img2").className = "shrinkRadioR";
        let j = 0;
        Array.from(document.getElementsByClassName("back_imgs")).forEach(
          (radio) => {
            radio.style.animationDelay = `${j++ * 250}ms`;
            radio.className = "back_imgs moveRadioBackSide";
          }
        );
        this.membership_selected = "family_side";
        this.single = "single_off";
        this.family = "family_on";
        this.card_side = "membership_card_side_back";
      }
    },
    getRoster(VueObj) {
      const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/roster?year=${VueObj.roster_year}`;
      axios
        .get(URL)
        .then(function (response) {
          // handle success
          if (!response.data) {
            VueObj.active_list = [];
            VueObj.nodata = true;
            return;
          }
          VueObj.nodata = false;
          VueObj.active_year_table = response.data.roster;
          VueObj.active_list = VueObj.active_year_table;
        })
        .catch(function (error) {
          // handle error
          VueObj.active_list = [];
          VueObj.nodata = true;
          error;
        })
        .finally(function () {
          // always executed
        });
    },
  },
  async mounted() {
    this.roster_year = new Date().getFullYear();
    this.scrollToTop();
    await this.fetchRoster();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#roster {
  font-family: "Inter", sans-serif;
  color: rgb(208, 213, 239);
  width: 100%;
  background-color: rgb(17, 17, 17);
  padding-bottom: 4rem;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/roster/hero-bg.jpg") center/cover;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
}

.subtitle {
  font-size: 1.2rem;
  color: #fd9947;
}

/* Membership Plans */
.membership-plans {
  padding: 4rem 2rem;
}

.plan-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.plan-card {
  background: #2c283b;
  border-radius: 12px;
  padding: 2rem;
  width: 300px;
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  border: 2px solid #fd9947;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  min-height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price {
  font-size: 2.5rem;
  color: #fd9947;
}

.price span {
  font-size: 1rem;
  color: #888;
}

.plan-features {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.plan-features ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.plan-features li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plan-features i {
  color: #fd9947;
}

.plan-button {
  display: block;
  text-align: center;
  background: #fd9947;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.plan-button:hover {
  background: #e88835;
}

/* Roster Section */
.roster-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.roster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.year-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.year-nav {
  background: none;
  border: none;
  color: #fd9947;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;
}

.year-nav:hover {
  color: #e88835;
}

.member-count {
  color: #888;
}

/* Table Styles */
.roster-table-container {
  background: #2c283b;
  border-radius: 12px;
  overflow: hidden;
}

.roster-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.roster-table th {
  background: #1f1c2e;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.roster-table td {
  padding: 1rem;
  border-bottom: 1px solid #3d3654;
}

.roster-table th:nth-child(1),
.roster-table td:nth-child(1) {
  width: 25%;
  text-align: left;
}

.roster-table th:nth-child(2),
.roster-table td:nth-child(2) {
  width: 55%;
  text-align: left;
}

.roster-table th:nth-child(3),
.roster-table td:nth-child(3) {
  width: 20%;
  text-align: center;
}

.roster-table tr:hover {
  background: #3d3654;
}

.arrl {
  text-align: center;
}

.arrl i.fa-check {
  color: #4caf50;
}

.arrl i.fa-x {
  color: #f44336;
}

/* Loading and Error States */
.loading,
.error,
.no-data {
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
  transition: background-color 0.3s;
}

.retry-button:hover {
  background: #e88835;
}

/* Responsive Design */
@media (max-width: 768px) {
  .plan-cards {
    flex-direction: column;
    align-items: center;
  }

  .plan-card {
    width: 100%;
    max-width: 300px;
  }

  .roster-header {
    flex-direction: column;
    gap: 1rem;
  }

  .roster-table th,
  .roster-table td {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .roster-table th:nth-child(1),
  .roster-table td:nth-child(1) {
    width: 30%;
  }

  .roster-table th:nth-child(2),
  .roster-table td:nth-child(2) {
    width: 45%;
  }

  .roster-table th:nth-child(3),
  .roster-table td:nth-child(3) {
    width: 25%;
  }
}
</style>
