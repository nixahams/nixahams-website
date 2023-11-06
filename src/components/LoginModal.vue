<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent="loginUser">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="loginModalLabel">Member Login</h1>
            <button
              type="button"
              id="closeLoginModal"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              required
              type="test"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
            <input
              required
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <span id="loginMessage" class="text-danger">{{
              loginMessage
            }}</span>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginModal",
  computed: {
    loggedIn: function () {
      return this.$store.state.loggedIn;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      loginMessage: "",
    };
  },
  methods: {
    toggleLoggedIn: function (newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
    },
    changeUser: function (newUser) {
      this.$store.commit("changeUser", newUser);
    },
    allowLogin: function (user) {
      this.toggleLoggedIn(true);
      this.changeUser(user);
      this.$router.push("/");
    },
    loginUser: function () {
      let self = this;
      axios({
        method: "post",
        url: "/users/login",
        data: {
          email: self.email,
          password: self.password,
        },
        withCredentials: true,
      })
        .then((res) => {
          self.allowLogin(self.getUserInfo());
          document.getElementById("closeLoginModal").click();
        })
        .catch((error) => {
          console.log(error);
          self.loginMessage = error;
        });
    },
    getUserInfo() {
      axios({
        method: "get",
        url: "/users",
        withCredentials: true,
      }).then((res) => {
        if (res.data) {
          this.$store.commit("changeUser", res.data.user);
          this.$store.commit("changeLoggedIn", true);
        } else {
          this.$store.commit("changeUser", {});
          this.$store.commit("changeLoggedIn", false);
        }
      });
    },
  },
};
</script>

<style>
.modal-backdrop {
  /* display: none;     */
  /* overriding style to place behind login modal */
  z-index: 98 !important;
}
</style>
