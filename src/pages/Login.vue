<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import apiClient from "@/utils/axiosClient";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const success = await userStore.login(email.value, password.value);
    if (success) {
      await nextTick();
      router.push("/");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login error here
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (userStore.isAuthenticated) {
    router.push("/");
  }
});
</script>

<template>
  <div>
    <div class="login-container">
      <div class="login-box">
        <h1 class="welcome-text">Welcome Back!</h1>
        <p class="subtitle">Please login to access your account</p>

        <form class="login-form" @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" class="login-btn">Login</button>
          <p class="text-center">
            Don't have an account?
            <router-link to="/create-account">Create one here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.welcome-text {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.login-btn {
  background: #3498db;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #2980b9;
}

@media (max-width: 480px) {
  .login-box {
    padding: 1.5rem;
  }
}
</style>
