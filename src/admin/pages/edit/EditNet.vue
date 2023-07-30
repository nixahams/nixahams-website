<template>
  <div class="subroute_area">
    <div class="table-responsive">
      <button type="button" class="btn btn-success mb-1" @click="addNet">
        Add Net
      </button>
      <table class="table table-striped table-hover text-center">
        <thead>
          <tr class="text-decoration-underline">
            <th></th>
            <th>Net Name</th>
            <th>Day</th>
            <th>Time</th>
            <th>Frequency</th>
            <th>PL</th>
            <th>Repeater Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in netData">
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

            <td>{{ row.net_sponsor }}</td>
            <td>{{ row.day }}</td>
            <td>{{ row.time }}</td>
            <td>{{ row.freq }}</td>
            <td>{{ row.pl }}</td>
            <td>{{ row.rep_loc }}</td>
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
                <label for="dayInput">Day</label>
                <input
                  type="text"
                  class="form-control"
                  id="dayInput"
                  v-model="net.day"
                />
              </div>
              <div class="form-group">
                <label for="time">Time</label>
                <input
                  type="text"
                  class="form-control"
                  id="time"
                  v-model="net.time"
                />
              </div>
              <div class="form-group">
                <label for="freq">Frequency</label>
                <input
                  type="text"
                  class="form-control"
                  id="freq"
                  v-model="net.freq"
                />
              </div>
              <div class="form-group">
                <label for="pl">PL</label>
                <input
                  type="text"
                  class="form-control"
                  id="pl"
                  v-model="net.pl"
                />
              </div>
              <div class="form-group">
                <label for="net_sponsor">Net Sponsor</label>
                <input
                  type="text"
                  class="form-control"
                  id="net_sponsor"
                  v-model="net.net_sponsor"
                />
              </div>
              <div class="form-group">
                <label for="rep_loc">Repeater Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="rep_loc"
                  v-model="net.rep_loc"
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
  name: "EditNet",
  props: ["newdata"],
  components: {
    PackHead,
    PackFooter,
    PackRow,
  },
  data() {
    return {
      netData: [],
      modalTitle: "Edit Net Listing",
      url: "/admin/nets",
      net: {
        day: "",
        time: "",
        freq: "",
        pl: "",
        net_sponsor: "",
        rep_loc: "",
      },
    };
  },
  methods: {
    addNet() {
      this.modalTitle = "Add Net Listing";
      this.url = "/admin/nets/add";
      this.net = {
        day: "",
        time: "",
        freq: "",
        pl: "",
        net_sponsor: "",
        rep_loc: "",
      };
      state.formModal.show();
    },
    closeModal() {
      state.formModal.hide();
    },
    editRow(id) {
      this.modalTitle = "Edit Net Listing";
      this.url = "/admin/nets/edit";
      // TODO: Need to implement an endpoint to get a single net listing from the db
      this.net = this.netData.find((row) => row._id === id);
      console.log(this.net);
      state.formModal.show();
    },
    submitForm() {
      axios(this.url, {
        method: "POST",
        withCredentials: true,
        data: this.net,
      }).then((response) => {
        console.log(response);
        this.getNets();
      });
      this.closeModal();
    },
    deleteRow(id) {
      console.log(id);
      axios("/admin/nets/delete", {
        method: "POST",
        withCredentials: true,
        data: {
          id: id,
        },
      }).then((response) => {
        console.log(response);
        this.getNets();
      });
    },
    getNets() {
      axios("/admin/nets", {
        method: "GET",
        withCredentials: true,
      }).then((response) => {
        this.netData = response.data;

        this.allowFooter = true;

        this.dataAvailable = true;
      });
    },
  },
  mounted() {
    state.formModal = new bootstrap.Modal("#formModal", {});
    axios("/admin/nets", {
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      this.netData = response.data;

      this.allowFooter = true;

      this.dataAvailable = true;
    });
  },
};
</script>

<style scoped>
/* background-color: #1a1a1a; */
</style>
