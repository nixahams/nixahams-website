<template>
  <div class="container text-white">
    <div class="row w-50 m-auto">
      <div class="col-12">
        <h1>Profile</h1>
        <form>
          <div class="d-none">
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="profile._id"
              disabled
            />
          </div>
          <div>
            <label for="callsign">Callsign</label>
            <input
              type="text"
              class="form-control"
              id="callsign"
              v-model="profile.callsign"
              disabled
            />
          </div>
          <div>
            <label for="firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="profile.firstName"
              disabled
            />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="profile.lastName"
              disabled
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="profile.email"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      profile: {
        callsign: "",
      },
    };
  },
  methods: {
    getUserData() {
      axios("/users", {
        method: "GET",
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data.user);
          this.profile = response.data.user;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped>
.container {
  height: 60vh;
}
</style>
