<template>
  <div class="subroute_area">
    <div class="d-flex flex-column w-100">
      <div v-for="officer in dataList" class="card m-3 w-100">
        <div class="card-header">
          <h3 class="card-title">{{ officer.position }}</h3>
        </div>
        <div class="card-body">
          <form class="d-flex flex-column">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="officer.name"
              />
            </div>
            <div class="form-group">
              <label for="callsign">Callsign</label>
              <input
                type="text"
                class="form-control"
                id="callsign"
                v-model="officer.callsign"
              />
            </div>
            <div class="form-group">
              <label for="info">Info</label>
              <textarea
                class="form-control"
                rows="5"
                id="info"
                v-model="officer.info"
              ></textarea>
            </div>
            <button
              type="button"
              class="btn btn-primary w-25 mt-2 align-self-end"
              @click="submitForm(officer)"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { reactive } from "vue";
const state = reactive({
  formModal: null,
});
export default {
  name: "EditOfficer",
  props: ["newdata"],
  components: {},
  data() {
    return {
      dataList: [],
      url: "/admin/officers",
      data: {},
    };
  },
  methods: {
    submitForm(row) {
      this.url = "/admin/officers/edit";
      this.data = row;
      axios(this.url, {
        method: "POST",
        withCredentials: true,
        data: this.data,
      }).then((response) => {
        console.log(response);
        this.getData();
      });
    },
    getData() {
      axios("/admin/officers", {
        method: "GET",
        withCredentials: true,
      }).then((response) => {
        this.dataList = response.data;

        this.allowFooter = true;

        this.dataAvailable = true;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
/* background-color: #1a1a1a; */
</style>
