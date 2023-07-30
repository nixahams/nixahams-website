<template>
  <div class="subroute_area">
    <div class="table-responsive">
      <button type="button" class="btn btn-success mb-1" @click="addRow">
        Add Member
      </button>
      <table class="table table-striped table-hover text-center">
        <thead>
          <tr class="text-decoration-underline">
            <th></th>
            <th>Callsign</th>
            <th>Name</th>
            <th>ARRL Membership</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataList">
            <td class="d-flex flex-column flex-md-row">
              <!-- <button
                type="button"
                class="btn btn-primary m-1 w-100"
                @click="editRow(row.callsign, row.name)"
              >
                Edit
              </button> -->
              <button
                class="btn btn-danger m-1 w-100"
                @click="deleteRow(row.name, row.callsign)"
              >
                Delete
              </button>
            </td>
            <td>{{ row.callsign }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.ARRL_membership }}</td>
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
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="data.name"
                />
              </div>
              <div class="form-group">
                <label for="callsign">Callsign</label>
                <input
                  type="text"
                  class="form-control"
                  id="callsign"
                  v-model="data.callsign"
                />
              </div>
              <div class="form-group">
                <label for="arrl">ARRL Membership</label>
                <input
                  type="text"
                  class="form-control"
                  id="arrl"
                  v-model="data.ARRL_membership"
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
  name: "EditOfficer",
  props: ["newdata"],
  components: {
    PackHead,
    PackFooter,
    PackRow,
  },
  data() {
    return {
      dataList: [],
      modalTitle: "Edit Member",
      url: "/admin/roster",
      data: {},
      year: "",
    };
  },
  methods: {
    addRow() {
      this.modalTitle = "Add Member";
      this.url = "/admin/roster/add";
      this.data = {};
      state.formModal.show();
    },
    closeModal() {
      state.formModal.hide();
    },
    editRow(callsign, name) {
      this.modalTitle = "Edit Member";
      this.url = "/admin/roster/edit";
      // TODO: Need to implement an endpoint to get a single repeater listing from the db
      this.data = this.dataList.find(
        (row) => row.callsign === callsign && row.name === name
      );
      console.log(this.data);
      state.formModal.show();
    },
    submitForm() {
      axios(this.url, {
        method: "POST",
        withCredentials: true,
        data: this.data,
      }).then((response) => {
        console.log(response);
        this.getData();
      });
      this.closeModal();
    },
    deleteRow(name, callsign) {
      axios("/admin/roster/delete", {
        method: "POST",
        withCredentials: true,
        data: {
          name: name,
          callsign: callsign,
        },
      }).then((response) => {
        console.log(response);
        this.getData();
      });
    },
    getData() {
      axios("/admin/roster", {
        method: "GET",
        withCredentials: true,
      }).then((response) => {
        this.dataList = response.data.roster;
        this.year = response.data.year;

        this.allowFooter = true;

        this.dataAvailable = true;
      });
    },
  },
  mounted() {
    this.getData();
    state.formModal = new bootstrap.Modal("#formModal", {});
  },
};
</script>

<style scoped>
/* background-color: #1a1a1a; */
</style>
