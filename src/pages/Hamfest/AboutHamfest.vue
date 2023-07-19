<template>
  <div class="container text-white">
    <div class="row">
      <div class="col-12 m-3">
        <h1>Nixa Amateur Radio Club Hamfest</h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-8 text-start">
        <p>
          The Nixa Amateur Radio Club Hamfest takes place on the second Saturday
          in November. We have some amazing prizes in store as well as some
          great vendors including Associated Radio and D&L Antenna Supply! We
          will also have a VE testing session at 9:00 AM.
        </p>
        <div class="row">
          <div class="col-4">
            <p class="text-decoration-underline m-0">Ticket Information:</p>
            <ul>
              <li>Table + Entry: $20</li>
              <li>Additional Tables: $10 each</li>
              <li>Regular Entry: ??</li>
              <li>Super Tickets: ??</li>
            </ul>
          </div>
          <div class="col-4">
            <p class="text-decoration-underline m-0">Presentations:</p>
            <ul>
              <li>Hex Beam Antenna Building</li>
              <li>Queen City Digital Cluster</li>
            </ul>
          </div>
          <div class="col-4">
            <p class="text-decoration-underline m-0">Prizes:</p>
            <ul>
              <li>A Radio</li>
              <li>A Meter</li>
              <li>Much Much More!</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card w-75 m-auto">
          <div class="card-header">
            <h3>Hamfest 2023</h3>
          </div>
          <div class="card-body">
            <p>When: November 13, 2021</p>
            <p>Time: 8:00 AM - 2:00 PM</p>
            <p>Where: Aldersgate Church</p>
            <p>Address: 460 Aldersgate Dr, Nixa, MO 65714</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary">Buy Tickets</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutHamfest",
  data() {
    return {
      hamfest: {},
    };
  },
};
</script>

<style scoped>
.container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
