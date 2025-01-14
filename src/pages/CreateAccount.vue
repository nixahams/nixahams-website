<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/utils/axiosClient";

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
      router.push("/login");
    })
    .catch((err) => {
      console.error("Error creating account:", err);
      userInfo.value.formResponse = "Error creating account. Please try again.";
    });
}

function addUser() {
  console.log(userInfo.value);
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
          v-model="userInfo.confirmPassword"
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
* {
  color: #fff;
}
</style>
