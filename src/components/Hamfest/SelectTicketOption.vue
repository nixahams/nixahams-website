<template>
  <div class="col-12">
    <h3 class="text-center">What ticket type would you like to purchase?</h3>
    <div
      class="row d-flex flex-column justify-content-between align-items-center p-5"
    >
      <div class="col-6 m-auto">
        <button
          class="btn btn-primary w-100"
          @click="$emit('changeTicketType', 'admission')"
        >
          Regular Admission
        </button>
      </div>
      <div class="col-6 m-auto mt-3">
        <button
          class="btn btn-primary w-100"
          @click="$emit('changeTicketType', 'table')"
        >
          Reserve a Table
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectTicketOption",
  data() {
    return {
      ticketType: "",
    };
  },
};
</script>
