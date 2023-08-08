<template>
  <form>
    <div class="form-group">
      <label for="numTables">Number of Tables</label>
      <input
        type="number"
        class="form-control"
        id="numTables"
        v-model="numTables"
      />
    </div>
    <div class="form-group mt-2">
      <label for="numPrizeTickets">Number of Raffle Tickets</label>
      <input
        type="number"
        class="form-control"
        id="numPrizeTickets"
        v-model="numPrizeTickets"
      />
    </div>
    <div class="form-group mt-2">
      <label for="extraAdmission">Extra Admission Tickets?</label><br />
      <input
        type="radio"
        v-model="needsExtraAdmission"
        value="yes"
        class="m-1"
      />
      <label for="yes">Yes</label>
      <input
        type="radio"
        v-model="needsExtraAdmission"
        value="no"
        class="m-1"
      />
      <label for="no">No</label>
    </div>
    <div v-if="needsExtraAdmission == 'yes'" class="form-group">
      <label for="numExtraAdmission">How many?</label>
      <input
        type="number"
        class="form-control"
        id="numExtraAdmission"
        v-model="numExtraAdmission"
      />
    </div>
    <button
      type="button"
      class="btn btn-primary float-right mt-2"
      @click="toCheckout"
    >
      Continue
    </button>
  </form>
</template>

<script>
export default {
  name: "ReserveTable",
  props: {},
  data() {
    return {
      numTables: 0,
      numExtraAdmission: 0,
      numPrizeTickets: 0,
      needsExtraAdmission: "",
    };
  },
  methods: {
    toCheckout() {
      if (this.needsExtraAdmission == "") {
        // Do something to notify user
      } else if (this.numTables == 0) {
        // Do something to notify user
      } else {
        if (this.needsExtraAdmission == "no") {
          this.numExtraAdmission = 0;
        }

        let ticketInfo = {
          numTables: this.numTables,
          numRegAdmission: this.numExtraAdmission,
          numPrizeTickets: this.numPrizeTickets,
          numSuperTickets: 0,
        };

        this.$emit("toCheckout", ticketInfo);
      }
    },
  },
};
</script>
