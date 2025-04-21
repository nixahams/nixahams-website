<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/utils/axiosClient";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const otp = ref("");

function checkPasswordsMatch() {
  return password.value === passwordConfirm.value;
}

function changePassword() {
  if (!email.value || !password.value || !otp.value) {
    toast.error("Please fill in all fields.");
    return;
  }

  if (!checkPasswordsMatch()) {
    toast.error("Passwords do not match. Please try again.");
    return;
  }

  apiClient
    .post("/v1/auth/reset-password", {
      email: email.value,
      password: password.value,
      confirmPassword: passwordConfirm.value,
      otp: otp.value,
    })
    .then(() => {
      toast.success("Password reset successfully. You can now log in.");
      router.push("/login");
    })
    .catch((error) => {
      toast.error(
        error.response.data.message ||
          "Error resetting password. Please try again."
      );
      console.error(error);
    });
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h2 class="text-center">Reset Password</h2>
      <p class="text-center">
        Please enter your new password and the OTP sent to your email.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-3 m-auto">
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="otp">One Time Code</label>
          <input
            type="text"
            id="otp"
            v-model="otp"
            class="form-control"
            placeholder="Enter the code sent to your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordConfirm">Confirm New Password</label>
          <input
            type="password"
            id="passwordConfirm"
            v-model="passwordConfirm"
            class="form-control"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mt-3">
            Reset Password
          </button>
        </div>
      </form>
    </div>
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
