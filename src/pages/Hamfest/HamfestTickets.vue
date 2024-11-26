<template>
  <div class="container text-white">
    <div class="row pt-2">
      <h1>Hamfest Tickets</h1>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <p>
          Hamfest doors open at 8 AM. This year, we are selling tickets in
          advance, but you can still purchase them at the door when you arrive
          if you'd prefer.
        </p>
        <p>
          After checkout, you will be redirected to a form to fill out your
          information. If you are purchasing multiple tickets, please be sure
          you include the names of each person.
        </p>
        <p>
          If you have any questions, please contact us at
          <a href="mailto:k0nxa@nixahams.net">k0nxa@nixahams.net</a>
        </p>

        <p>Regular Admission Options:</p>
        <ul>
          <li>Regular Admission - $10</li>
          <li>Additional Raffle Tickets - $1 each</li>
          <li>Super Ticket (1 admission + 20 raffle tickets) - $20</li>
        </ul>

        <p>Reserve a Table:</p>
        <ul>
          <li>Table + 1 Entry - $20</li>
          <li>Additional Tables - $10 each</li>
        </ul>
      </div>
      <div class="col-12 col-lg-6">
        <div class="clearfix">
          <h3 class="text-center text-decoration-underline">Your Tickets</h3>
          <p
            v-if="
              numTables == 0 &&
              numRegAdmission == 0 &&
              numSuperTicket == 0 &&
              numPrizeTicket == 0
            "
            class="text-center"
          >
            Nothing to see yet. Purchase tickets below...
          </p>
          <ul class="ticket-cart">
            <li v-if="numTables > 0">
              {{ numTables }} x Table(s) (Includes 1 entry ticket)
            </li>
            <li v-if="numRegAdmission > 0">
              {{ numRegAdmission }} x Regular Admission
            </li>
            <li v-if="numSuperTicket > 0">
              {{ numSuperTicket }} x Super Ticket(s)
            </li>
            <li v-if="numPrizeTicket > 0">
              {{ numPrizeTicket }} x Raffle Ticket(s)
            </li>
          </ul>
          <p v-if="totalCost != 0">Total Cost: ${{ totalCost }}</p>
          <form
            action="https://api.nixahams.net/stripe/hamfest-checkout"
            method="POST"
          >
            <input type="hidden" name="lineItems" v-model="lineItems" />
            <button
              type="submit"
              v-if="totalCost != 0"
              class="btn btn-primary float-end"
            >
              Continue to Payment
            </button>
          </form>
        </div>
        <hr />
        <div class="">
          <SelectTicketOption
            v-if="ticketType == ''"
            :tablesRemaining="tablesRemaining"
            @changeTicketType="changeTicketType"
          />
          <AdmissionTickets
            v-if="ticketType == 'admission'"
            @toCheckout="showCheckout"
          ></AdmissionTickets>
          <ReserveTable
            v-if="ticketType == 'table'"
            @toCheckout="showCheckout"
          ></ReserveTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdmissionTickets from "@/components/Hamfest/AdmissionTickets.vue";
import ReserveTable from "@/components/Hamfest/ReserveTable.vue";
import SelectTicketOption from "@/components/Hamfest/SelectTicketOption.vue";
import axios from "@/utils/axiosClient";

export default {
  name: "HamfestTickets",
  components: {
    AdmissionTickets,
    ReserveTable,
    SelectTicketOption,
  },

  data() {
    return {
      ticketType: "", // admission or table
      numTables: 0,
      numRegAdmission: 0,
      numSuperTicket: 0,
      numPrizeTicket: 0,
      totalCost: 0,
      lineItems: [],
      tablesRemaining: 0,
    };
  },
  methods: {
    getTotalTablesSold() {
      axios("/stripe/hamfest-tables-sold", {
        method: "GET",
      }).then((response) => {
        this.tablesRemaining = 32 - response.data;
      });
    },
    changeTicketType(type) {
      this.ticketType = type;
    },
    showCheckout(ticketInfo) {
      this.numTables = ticketInfo.numTables;
      this.numRegAdmission = ticketInfo.numRegAdmission;
      this.numSuperTicket = ticketInfo.numSuperTickets;
      this.numPrizeTicket = ticketInfo.numPrizeTickets;

      // Calculate cost
      let tableCost;
      let AdmissionCost;
      let raffleCost;
      let superTicketCost;

      if (this.numTables > 0) {
        this.lineItems.push({
          price: "price_1NcfqNFTeL1911WTRxWBco89",
          quantity: 1,
        });

        let extraTables = this.numTables - 1;

        if (extraTables > 0) {
          this.lineItems.push({
            price: "price_1Ncfq9FTeL1911WTp7UtonnT",
            quantity: extraTables,
          });
        }

        tableCost = 20 + (this.numTables - 1) * 10;
      } else {
        tableCost = 0;
      }

      if (this.numRegAdmission > 0) {
        this.lineItems.push({
          price: "price_1NcfqQFTeL1911WT5TiwuRo7",
          quantity: this.numRegAdmission,
        });
        AdmissionCost = this.numRegAdmission * 10;
      } else {
        AdmissionCost = 0;
      }

      if (this.numPrizeTicket > 0) {
        this.lineItems.push({
          price: "price_1NcfqKFTeL1911WTVbb8sSVE",
          quantity: this.numPrizeTicket,
        });
        raffleCost = this.numPrizeTicket * 1;
      } else {
        raffleCost = 0;
      }

      if (this.numSuperTicket > 0) {
        this.lineItems.push({
          price: "price_1NcfqGFTeL1911WTiqhYgZ1R",
          quantity: this.numSuperTicket,
        });
        superTicketCost = this.numSuperTicket * 20;
      } else {
        superTicketCost = 0;
      }

      this.totalCost = tableCost + AdmissionCost + raffleCost + superTicketCost;

      this.lineItems = JSON.stringify(this.lineItems);

      this.ticketType = "checkout";
    },
  },
  mounted() {
    this.getTotalTablesSold();
  },
};
</script>

<style scoped>
.container {
  min-height: 60vh;
}
.ticket-selector {
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.ticket-selector:hover {
  background-color: #495057;
}

.ticket-selector-active {
  border-bottom: 1px solid #495057;
}

.ticket-cart li {
  list-style-type: "🎟️ ";
}
</style>
