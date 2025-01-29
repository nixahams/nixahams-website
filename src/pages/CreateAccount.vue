<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/utils/axiosClient";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();
const step = ref(1);
const email = ref("");

const userInfo = ref({
  name: "",
  callsign: "",
  password: "",
  passwordConfirm: "",
  isArrlMember: false,
  formResponse: "",
});

function checkEmail() {
  apiClient
    .get("/v1/users/checkPersonExists", {
      params: {
        email: email.value,
      },
    })
    .then((response) => {
      if (response.data.existingUser) {
        router.push("/login");
      } else if (response.data.existsInPeople) {
        step.value = 2;
      } else {
        step.value = 3;
      }
    });
}

function addPerson() {
  // check passwords match
  if (!checkPasswordsMatch()) {
    toast.error("Passwords do not match. Please try again.");
    return;
  }
  apiClient
    .post("/v1/users/addPerson", {
      name: userInfo.value.name,
      email: email.value,
      password: userInfo.value.password,
      callsign: userInfo.value.callsign,
      arrl_membership: userInfo.value.isArrlMember,
    })
    .then(() => {
      return apiClient.post("/v1/users/addUser", {
        email: email.value,
        password: userInfo.value.password,
      });
    })
    .then(() => {
      toast.success("Account created successfully.");
      router.push("/login");
    })
    .catch((err) => {
      toast.error("Error creating account. Please try again.");
    });
}

function addUser() {
  // check passwords match
  if (!checkPasswordsMatch()) {
    toast.error("Passwords do not match. Please try again.");
    return;
  }
  apiClient
    .post("/v1/users/addUser", {
      email: email.value,
      password: userInfo.value.password,
    })
    .then(() => {
      toast.success("Account created successfully.");
      router.push("/login");
    })
    .catch((err) => {
      toast.error("Error creating account. Please try again.");
    });
}

function checkPasswordsMatch() {
  return userInfo.value.password === userInfo.value.passwordConfirm;
}
</script>

<template>
  <!-- Get email and check if person exists -->
  <div v-if="step === 1">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">Welcome to the club!</h2>
        <p class="text-center">
          Please enter your email address to get started.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-3 m-auto">
        <form @submit.prevent="checkEmail">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
            />
            <button type="submit" class="btn btn-primary mt-3">Next</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Person already exists, just create a user -->
  <div v-if="step === 2">
    <div class="text-center mb-4">
      <h2 class="mb-3">Looks like we already have your information!</h2>
      <h3>Please choose a password to finish creating your account.</h3>
    </div>
    <form @submit.prevent="addUser" class="col-md-6 col-lg-4 mx-auto">
      <div class="form-group mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="userInfo.password"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="userInfo.passwordConfirm"
          required
        />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary mt-3 w-100">Next</button>
      </div>
    </form>
  </div>
  <!-- Person does not exist, fill in personal info as well as create a user -->
  <div v-if="step === 3">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">Create Account</h2>
      </div>
    </div>
    <form @submit.prevent="addPerson" class="col-md-6 col-lg-4 mx-auto">
      <div class="form-group mb-3">
        <label for="firstName">Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="userInfo.name"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="callsign">Callsign</label>
        <input
          type="text"
          class="form-control"
          id="callsign"
          v-model="userInfo.callsign"
          required
        />
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="userInfo.password"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="userInfo.passwordConfirm"
          required
        />
      </div>
      <div class="form-group mb-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="arrlMembership"
            v-model="userInfo.arrlMembership"
          />
          <label class="form-check-label" for="arrlMembership">
            ARRL Member
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100">
        Create Account
      </button>
    </form>
  </div>
</template>

<style scoped>
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

h2,
h3,
p {
  color: rgb(208, 213, 239);
}

.form-check-label {
  color: rgb(208, 213, 239);
}

.form-check-input:checked {
  background-color: #fd9947 !important;
  border-color: #fd9947 !important;
}
</style>
