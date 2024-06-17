<template>
  <div class="container text-white">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Nixa Amateur Radio Club Hamfest</h1>
        <h4 class="text-center font-italic">In memory of Bob Heil K9EID</h4>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12 col-lg-4 mb-2">
        <div class="card w-75 m-auto">
          <div class="card-header">
            <h3>Hamfest 2024</h3>
          </div>
          <div class="card-body">
            <p>When: November 9, 2024</p>
            <p>Time: 8:00 AM - 1:00 PM</p>
            <p>Where: Victory Baptist Church</p>
            <p>Address: 252 N Nicholas Road, Nixa, MO 65714</p>
            <button
              class="btn btn-primary m-auto"
              id="buyTicketsBtn"
              @click="buyTickets"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8 text-start">
        <p>
          The NARCfest 2024 committee is working around the clock to ensure an
          exceptional Hamfest experience that's second to none. Get ready for a
          lineup of thrilling events designed for your entertainment. Top
          vendors like Associated Radio, D&L Antenna, and Mike Hoffman
          Embroidery will be there to cater to all your ham radio desires. And
          for those passionate about pre-loved equipment, we have exciting news!
          Approximately 40 tables will be exclusively reserved for used gear.
          Interested in selling your items? Hurry and reach out to us at
          hamfest@nixahams.net to reserve a table before they're all snapped up!
        </p>

        <p>
          Rob Huelga, W3LGA, and members from the Nixa ARC VE team will be
          holding a VE testing session.
        </p>

        <p>Forums information TBD.</p>

        <p>
          For those looking to grab breakfast, a morning treat, or lunch,
          Fatty's Food Concession will be conveniently available right on the
          premises!
        </p>

        <p>
          There is plenty of parking on site. To streamline entry, the entry
          cost is $10.00 and that gives you 2 chances at hamfest prizes. And, if
          you would like to purchase the Super Ticket for $20.00, that gives you
          20 chances to win!
        </p>

        <p>
          Local Talk-in: 147.015+ PL 162.2 Hz<br />
          Regional Talk-in : Southwest Missouri Linked Repeater System
        </p>

        <p>
          All proceeds from the hamfest are allocated to support the Southwest
          Missouri Linked Repeater System (SMLRS). Last year, we announced our
          intention to enhance the network by adding several repeaters to
          improve coverage for potential regional ARES activations or to serve
          as a backup/supplemental communication channel for the regional
          SkyWarn network. Thanks to your contributions, we integrated the
          145.290-, PL 100.0 Hz Taum Sauk repeater into the link system in March
          2022 to extend coverage eastward, and in August 2022, we upgraded the
          147.060+ PL 162.2 Hz Bolivar repeater with a new 9 dBd gain antenna
          system and 7/8″ heliax, anticipating its future inclusion in the SMLRS
          to provide coverage between Springfield and Clinton, and further. This
          year, we aim to further expand coverage westward into Kansas and NE
          Oklahoma and are seeking funds to support this new repeater system.
          Should you wish to contribute beyond the purchase of your admission or
          “Super” ticket, donations are welcome at the hamfest or online at any
          time by sending them to paypal@nixahams.net or by clicking the
          "Donate" button at the top of the website. Please include a note with
          your donation specifying “SMLRS westward expansion.”
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AboutHamfest",
  data() {
    return {
      hamfest: {},
    };
  },
  methods: {
    buyTickets() {
      router.push("/hamfest/tickets");
    },
  },
};
</script>

<style scoped>
#buyTicketsBtn {
  width: 100%;
}

.font-italic {
  font-style: italic;
  margin-bottom: 3rem;
  margin-top: 1rem;
  line-height: 0;
}
</style>
