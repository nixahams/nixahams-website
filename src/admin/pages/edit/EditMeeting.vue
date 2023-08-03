<template>
  <div class="subroute_area">
    <div class="row d-flex flex-row justify-content-between">
      <div class="col-2">
        <button type="button" class="btn btn-success" @click="openModal">
          Add New
        </button>
      </div>

      <div class="col-3">
        <select @change="addMonths">
          <option v-for="year in yearsList" :key="year" class="form-control">
            {{ year }}
          </option>
        </select>
        <select @change="getMeetingByDate">
          <option v-for="month in monthsList" :key="month" class="form-control">
            {{ month }}
          </option>
        </select>
      </div>

      <div class="row">
        <form>
          <div class="form-group">
            <label for="date">Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="selectedMeeting.date"
            />
          </div>
          <div class="form-group">
            <label for="link">Link</label>
            <input
              type="text"
              class="form-control"
              id="link"
              v-model="selectedMeeting.link"
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-control"
              rows="5"
              id="description"
              v-model="selectedMeeting.desc"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="selectedMeeting.address"
            />
          </div>
          <button type="button" class="btn btn-primary" @click="editMeeting">
            Save
          </button>
        </form>
      </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="formModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Add New Meeting</h5>
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
              <label for="date">Date</label>
              <input
                type="date"
                class="form-control mb-1"
                v-model="newMeeting.date"
              />
              <label for="description">Description</label>
              <textarea
                class="form-control mb-1"
                rows="5"
                placeholder="Description"
                v-model="newMeeting.description"
              ></textarea>
              <label for="link">Link</label>
              <input
                type="text"
                class="form-control mb-1"
                placeholder="Link"
                v-model="newMeeting.link"
              />
              <label for="address">Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                v-model="newMeeting.address"
              />
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
import axios from "axios";

import { reactive } from "vue";
const state = reactive({
  formModal: null,
});

export default {
  name: "EditMeeting",
  data() {
    return {
      newMeeting: {
        date: "",
        link: "",
        description: "",
        address: "711 N. Main",
      },
      yearsList: [],
      monthsList: [],
      meetingsList: [],
      selectedYear: "2023",
      selectedMonth: "",
      selectedMeeting: {
        id: "",
        date: "",
        link: "",
        desc: "",
        address: "",
      },
    };
  },
  mounted() {
    state.formModal = new bootstrap.Modal("#formModal", {});
    this.getTimeData();
  },
  methods: {
    getTimeData() {
      axios({
        method: "get",
        url: "/admin/meetings/dates",
        withCredentials: true,
      })
        .then((response) => {
          // Add all unique years to the yearsList
          response.data.forEach((meeting) => {
            this.meetingsList.push(meeting);
            if (!this.yearsList.includes(meeting.year)) {
              this.yearsList.push(meeting.year);
            }
          });
        })
        .then(() => {
          this.addMonths();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal() {
      state.formModal.show();
    },
    closeModal() {
      state.formModal.hide();
    },
    submitForm() {
      axios({
        method: "post",
        url: "/admin/meetings/add",
        withCredentials: true,
        data: {
          date: this.newMeeting.date,
          link: this.newMeeting.link,
          desc: this.newMeeting.description,
          address: this.newMeeting.address,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.getTimeData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMonths() {
      // based on the year selected, add all available months to the monthsList
      this.selectedYear = document.querySelector("select").value;
      this.monthsList = [];
      this.meetingsList.forEach((meeting) => {
        if (meeting.year == this.selectedYear) {
          if (!this.monthsList.includes(meeting.month)) {
            this.monthsList.push(meeting.month);
          }
        }
      });

      // sort the monthsList
      this.monthsList.sort();
    },

    getMeetingByDate() {
      this.selectedYear = document.querySelector("select").value;
      this.selectedMonth = document.querySelectorAll("select")[1].value;

      axios({
        method: "get",
        url: "/admin/meetings/getmeeting",
        withCredentials: true,
        params: {
          year: this.selectedYear,
          month: this.selectedMonth,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.selectedMeeting.id = response.data._id;
          this.selectedMeeting.date = response.data.date;
          this.selectedMeeting.link = response.data.link;
          this.selectedMeeting.desc = response.data.desc;
          this.selectedMeeting.address = response.data.address;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editMeeting() {
      axios({
        method: "post",
        url: "/admin/meetings/edit",
        withCredentials: true,
        data: {
          id: this.selectedMeeting.id,
          date: this.selectedMeeting.date,
          link: this.selectedMeeting.link,
          desc: this.selectedMeeting.desc,
          address: this.selectedMeeting.address,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/* background-color: #1a1a1a; */
</style>
