<template>
  <div class="subroute_area">
    <div class="table-responsive">
      <button type="button" class="btn btn-success mb-1" @click="addRepeater">
        Add Repeater
      </button>
      <table class="table table-striped table-hover text-center">
        <thead>
          <tr class="text-decoration-underline">
            <th></th>
            <th>Repeater Name</th>
            <th>Frequency</th>
            <th>Location</th>
            <th>Date</th>
            <th>Short Description</th>
            <th>Long Description</th>
            <th>Long Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in repeaterData">
            <td class="d-flex flex-column flex-md-row">
              <button
                type="button"
                class="btn btn-primary m-1 w-100"
                @click="editRow(row._id)"
              >
                Edit
              </button>
              <button
                class="btn btn-danger m-1 w-100"
                @click="deleteRow(row._id)"
              >
                Delete
              </button>
            </td>
            <td></td>
            <td>{{ row.freq }}</td>
            <td>{{ row.location }}</td>
            <td>{{ row.date }}</td>
            <td>{{ row.short_desc }}</td>
            <td>{{ row.long_desc }}</td>
            <td>{{ row.long_title }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="formModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">{{ modalTitle }}</h5>
            <button
              type="button"
              class="close"
              @click="closeModal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-dark">
            <form class="d-flex flex-column">
              <div class="form-group">
                <label for="freq">Frequency</label>
                <input
                  type="text"
                  class="form-control"
                  id="freq"
                  v-model="repeater.freq"
                />
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="repeater.location"
                />
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="text"
                  class="form-control"
                  id="date"
                  v-model="repeater.date"
                />
              </div>
              <div class="form-group">
                <label for="short_desc">Long Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="short_desc"
                  v-model="repeater.short_desc"
                />
              </div>
              <div class="form-group">
                <label for="long_desc">Long Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="long_desc"
                  v-model="repeater.long_desc"
                />
              </div>
              <div class="form-group">
                <label for="long_title">Long Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="long_title"
                  v-model="repeater.long_title"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="submitForm">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackHead from "../../components/packs/PackHead.vue";
import PackFooter from "../../components/packs/PackFooter.vue";
import PackRow from "../../components/packs/PackRow.vue";
import axios from "axios";

import { reactive } from "vue";
const state = reactive({
  formModal: null,
});
export default {
  name: "EditRepeater",
  props: ["newdata"],
  components: {
    PackHead,
    PackFooter,
    PackRow,
  },
  data() {
    return {
      repeaterData: [],
      modalTitle: "Edit Repeater Listing",
      url: "/admin/repeaters",
      repeater: {},
    };
  },
  methods: {
    addRepeater() {
      this.modalTitle = "Add Repeater Listing";
      this.url = "/admin/repeaters/add";
      this.repeater = {};
      state.formModal.show();
    },
    closeModal() {
      state.formModal.hide();
    },
    editRow(id) {
      this.modalTitle = "Edit Repeater Listing";
      this.url = "/admin/repeaters/edit";
      // TODO: Need to implement an endpoint to get a single repeater listing from the db
      this.repeater = this.repeaterData.find((row) => row._id === id);
      console.log(this.repeater);
      state.formModal.show();
    },
    submitForm() {
      axios(this.url, {
        method: "POST",
        withCredentials: true,
        data: this.repeater,
      }).then((response) => {
        console.log(response);
        this.getRepeaters();
      });
      this.closeModal();
    },
    deleteRow(id) {
      console.log(id);
      axios("/admin/repeaters/delete", {
        method: "POST",
        withCredentials: true,
        data: {
          id: id,
        },
      }).then((response) => {
        console.log(response);
        this.getRepeaters();
      });
    },
    getRepeaters() {
      axios("/admin/repeaters", {
        method: "GET",
        withCredentials: true,
      }).then((response) => {
        this.repeaterData = response.data;

        this.allowFooter = true;

        this.dataAvailable = true;
      });
    },
  },
  mounted() {
    this.getRepeaters();
    state.formModal = new bootstrap.Modal(document.getElementById("formModal"));
  },
};
</script>

<style scoped>
/* background-color: #1a1a1a; */
</style>
