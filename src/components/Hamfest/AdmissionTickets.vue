<template>
  <form>
    <h4 class="mb-0">Regular Admission Tickets</h4>
    <p class="">
      Note: A super ticket comes with 1 entry ticket + 20 raffle tickets
    </p>
    <div class="form-group">
      <label for="numSuperTickets">Super Tickets</label>
      <input
        type="number"
        class="form-control"
        id="numSuperTickets"
        v-model="numSuperTickets"
      />
    </div>
    <div class="form-group mt-2">
      <label for="numRegAdmission">Entry Tickets</label>
      <input
        type="number"
        class="form-control"
        id="numRegAdmission"
        v-model="numRegAdmission"
      />
    </div>
    <div class="form-group mt-2">
      <label for="numPrizeTickets">Prize Tickets</label>
      <input
        type="number"
        class="form-control"
        id="numPrizeTickets"
        v-model="numPrizeTickets"
      />
    </div>
    <button type="button" class="btn btn-primary mt-2" @click="toCheckout">
      Continue
    </button>
  </form>
</template>

<script>
export default {
  name: "AdmissionTickets",
  props: {},
  data() {
    return {
      numRegAdmission: 0,
      numPrizeTickets: 0,
      numSuperTickets: 0,
    };
  },
  methods: {
    toCheckout() {
      let ticketInfo = {
        numRegAdmission: this.numRegAdmission,
        numPrizeTickets: this.numPrizeTickets,
        numSuperTickets: this.numSuperTickets,
        numTables: 0,
      };

      this.$emit("toCheckout", ticketInfo);
    },
  },
};
</script>
