<template>
  <div class="container text-white">
    <h1 class="text-center">Account Setup</h1>
    <form class="w-50 m-auto">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          aria-describedby="firstName"
          placeholder="First Name"
          v-model="firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          aria-describedby="lastName"
          placeholder="Last Name"
          v-model="lastName"
        />
      </div>
      <div class="form-group">
        <label for="callSign">Call Sign</label>
        <input
          type="text"
          class="form-control"
          id="callSign"
          aria-describedby="callSign"
          placeholder="Call Sign"
          v-model="callsign"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          aria-describedby="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordConfirm"
          aria-describedby="passwordConfirm"
          placeholder="Confirm Password"
          v-model="passwordConfirm"
        />
      </div>
      <button
        type="button"
        class="btn btn-primary mt-1 w-100"
        @click="submitForm"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";

export default {
  name: "AccountSetup",
  data() {
    return {
      key: this.$route.query.key,
      firstName: "",
      lastName: "",
      callsign: "",
      email: "",
      password: "",
      passwordConfirm: "",
      formResponse: "",
    };
  },
  methods: {
    initializeForm() {
      // Get key from url
      axios({
        url: "/users/getEmail",
        method: "post",
        data: { key: this.key },
      })
        .then((res) => {
          this.email = res.data.email;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      const data = {
        key: this.key,
        firstName: this.firstName,
        lastName: this.lastName,
        callsign: this.callsign,
        email: this.email,
        password: this.password,
      };

      if (this.password === this.passwordConfirm) {
        axios({
          url: "/users/create",
          method: "post",
          data: data,
        })
          .then((res) => {
            this.formResponse = res.data.message;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Passwords do not match");
        this.formResponse = "Passwords do not match";
      }
    },
  },
  mounted() {
    this.initializeForm();
  },
};
</script>

<style scoped>
.container {
  min-height: 65vh;
  padding: 2rem;
  background-color: rgb(17, 17, 17);
}

.form-control,
input.form-control {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid #3d3654 !important;
  color: rgb(208, 213, 239) !important;
  opacity: 1 !important;
}

.form-control:focus,
input.form-control:focus {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: #fd9947 !important;
  color: rgb(208, 213, 239) !important;
  box-shadow: none !important;
}

.form-control::placeholder {
  color: rgba(208, 213, 239, 0.5) !important;
  opacity: 1 !important;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  color: rgb(208, 213, 239);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.btn-primary {
  background-color: #fd9947 !important;
  border: none !important;
  padding: 0.75rem;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #e88835 !important;
}

h1 {
  color: #fd9947;
  margin-bottom: 2rem;
}
</style>
