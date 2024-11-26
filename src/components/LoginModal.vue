<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent="handleLogin">
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
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

export default {
  setup() {
    const userStore = useUserStore();
    const email = ref("");
    const password = ref("");
    const loginMessage = ref("");

    const handleLogin = async () => {
      try {
        await userStore.login(email.value, password.value);
        loginMessage.value = "";
        document.getElementById("closeLoginModal").click();
      } catch (error) {
        loginMessage.value = error.response.data.message;
      }
    };

    return {
      email,
      password,
      loginMessage,
      handleLogin,
    };
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
