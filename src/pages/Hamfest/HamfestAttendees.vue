<template>
  <div class="table-parent">
    <h1 class="text-center text-white">Hamfest Attendees 2025</h1>
    <h3 v-if="attendeeSelection === 1" class="text-center text-white">
      Total Attendees:
      {{ attendees.length }}<br />
    </h3>
    <h3 v-else-if="attendeeSelection === 2" class="text-center text-white">
      Total Vendors: {{ attendees.length }}<br />
      Total Tables:
      {{ attendees.reduce((acc, attendee) => acc + attendee.num_tables, 0) }}
    </h3>

    <div id="filters">
      <select
        class="form-select w-25 p-1"
        aria-label="Attendee Selection"
        v-model="attendeeSelection"
        @change="searchAttendees"
      >
        <option value="1">Attendees</option>
        <option value="2">Vendors</option>
      </select>
      <input
        type="text"
        class="form-control w-25"
        placeholder="Search"
        v-model="search"
        @input="searchAttendees"
      />
    </div>
    <div class="table-responsive">
      <table
        class="table table-striped table-hover text-white w-50 m-auto border border-white border-1 rounded-3 shadow-lg bg-dark text-center align-middle"
      >
        <thead>
          <td>Name</td>
          <td>Call Sign</td>
          <td>Email</td>
          <td>Number of Tables</td>
          <td>Number of Tickets</td>
        </thead>
        <tbody>
          <tr v-for="attendee in attendees">
            <td>{{ attendee.name }}</td>
            <td>{{ attendee.callsign }}</td>
            <td>{{ attendee.email }}</td>
            <td>{{ attendee.num_tables }}</td>
            <td>{{ attendee.num_tickets }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";

export default {
  name: "HamfestAttendees",
  data() {
    return {
      attendees: [],
      allAttendees: [],
      regularAttendees: [],
      search: "",
      attendeeSelection: 1,
    };
  },
  methods: {
    getAttendees() {
      axios({
        method: "get",
        url: "/hamfest/attendees",
        withCredentials: true,
      }).then((res) => {
        this.allAttendees = res.data;
        this.searchAttendees();
      });
    },
    searchAttendees() {
      this.attendeeSelection = parseInt(this.attendeeSelection);
      if (this.attendeeSelection === 1) {
        this.attendees = this.allAttendees.filter((attendee) => {
          if (attendee.num_tables === 0) {
            if (this.search === "") {
              return attendee;
            } else if (
              attendee.name.toLowerCase().includes(this.search.toLowerCase()) ||
              attendee.callsign
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              attendee.email.toLowerCase().includes(this.search.toLowerCase())
            ) {
              return attendee;
            }
          }
        });
      } else if (this.attendeeSelection === 2) {
        this.attendees = this.allAttendees.filter((attendee) => {
          if (attendee.num_tables > 0) {
            if (this.search === "") {
              return attendee;
            } else if (
              attendee.name.toLowerCase().includes(this.search.toLowerCase()) ||
              attendee.callsign
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              attendee.email.toLowerCase().includes(this.search.toLowerCase())
            ) {
              return attendee;
            }
          }
        });
      }
    },
  },
  mounted() {
    this.getAttendees();
  },
};
</script>

<style scoped>
.table-parent {
  height: 80vh;
  overflow-y: scroll;
}
td {
  padding: 0.5rem;
}

td {
  text-align: center;
}

#filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}
</style>
