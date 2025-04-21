<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/utils/axiosClient";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const email = ref("");

function requestPasswordReset() {
  apiClient
    .post("/v1/auth/request-password-reset", {
      email: email.value,
    })
    .then(() => {
      toast.success("Password reset email sent. Please check your inbox.");
      router.push("/login");
    })
    .catch((error) => {
      toast.error("Error sending password reset email. Please try again.");
      console.error(error);
    });
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h2 class="text-center">Password Reset Request</h2>
      <p class="text-center">
        Please enter your email address below and we will send you an email with
        information on how to change your password.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-3 m-auto">
      <form @submit.prevent="requestPasswordReset">
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
        <button type="submit" class="btn btn-primary w-100">
          Request Password Reset
        </button>
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
