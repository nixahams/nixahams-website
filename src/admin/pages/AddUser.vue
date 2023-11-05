<template>
  <div>
    <h1>Add User</h1>
    <p>
      This form can be used to manually initiate account creation. Most accounts
      will be automatically initialized when a member pays dues, but in the
      event that a member needs an account without paying dues (i.e. Family
      Dues), this form can be used to initialize the account.
    </p>
    <form class="w-25">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="name"
          placeholder="Enter users's name"
          v-model="name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Enter users's email"
          v-model="email"
        />
      </div>
      <small>{{ formResponse }}</small>
      <br />
      <button type="button" class="btn btn-primary mt-1" @click="submitForm">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      name: "",
      email: "",
      formResponse: "",
    };
  },
  methods: {
    submitForm() {
      const data = {
        name: this.name,
        email: this.email,
      };

      axios({
        url: "/users/newUser",
        method: "post",
        data: data,
      }).then((res) => {
        this.formResponse = res.data.message;
      });
    },
  },
};
</script>
