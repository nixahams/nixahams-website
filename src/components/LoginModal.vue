<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="loginModalLabel">
            Member Login
            <a href="/account?method=signup" class="h5 fs-6 text-primary">(Register here)</a>
          </h1>
          <button
            type="button"
            id="closeLoginModal"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </form>
          <span id="loginMessage" class="text-danger">{{ loginMessage }}</span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="loginUser()">
            Login
          </button>
        </div>
      </div>
    </div>
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
    allowLogin: function () {
      this.toggleLoggedIn(true);
      this.changeUser(this.email);
      this.$router.push("/");
    },
    loginUser: function () {
      let self = this;
      axios({
        method: "post",
        url: "/users/login",
        data: {
          username: self.email,
          password: self.password,
        },
        withCredentials: true,
      })
        .then(() => {
          self.allowLogin();
          document.getElementById("closeLoginModal").click();
          self.$router.push("/");
        })
        .catch((error) => {
          self.loginMessage = error;
        });
    },
  },
};
</script>
