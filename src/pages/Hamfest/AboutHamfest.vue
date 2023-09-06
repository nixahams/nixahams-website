<template>
  <div class="container text-white">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Nixa Amateur Radio Club Hamfest</h1>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12 col-lg-4 mb-2">
        <div class="card w-75 m-auto">
          <div class="card-header">
            <h3>Hamfest 2023</h3>
          </div>
          <div class="card-body">
            <p>When: November 11, 2023</p>
            <p>Time: 8:00 AM - 2:00 PM</p>
            <p>Where: Aldersgate Church</p>
            <p>Address: 460 Aldersgate Dr, Nixa, MO 65714</p>
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
          Doors open at 8:00 a.m. and we have some exciting events lined up for
          you already. Associated Radio, D&L Antenna and Ham Crazy will be on
          site for all your new equipment needs. If you're in the market for
          used gear, you're also in luck! We will have about 32 tables available
          for used equipment.
        </p>

        <p>
          At 8:30 a.m., Rob Huelga, W3LGA, and members from the Nixa ARC VE team
          will be holding a VE testing session.
        </p>

        <p>
          We will again have TWO great forums for this year's event! At 10 a.m.,
          James Adkins, KB0NHX, will be presenting information on the Queen City
          Digital Cluster, also known as the QCDC. This is a new addition to the
          region that has (5) UHF repeaters located on the same tower in NE
          Springfield in which all 5 repeaters share the same transmit antenna
          and also share a separate receive antenna. Besides the cool technical
          details, you'll also want to know how you can use it, what you'll
          normally hear on it, and how to get involved. The second forum at
          11:30 a.m. by Dave Burtrum, N0DF, will focus on building a Hex Beam HF
          antenna. Dave will not only give you ideas on how to build your own HF
          Hex Beam, but also talk about some of the considerations for space,
          how to install it, and the advantages of the Hex Beam vs other
          antennas.
        </p>

        <p>
          If you want to catch breakfast, a morning snack or lunch, there will
          be food available onsite!
        </p>

        <p>
          There is plenty of parking on site - you will be able to park in the
          East parking lot and there are handicap parking spots available on a
          first come, first serve basis. To streamline entry, the entry cost is
          $10.00 and that gives you 2 chances at hamfest prizes. And, if you
          would like to purchase the Super Ticket for $20.00, that gives you 20
          chances to win!!!! We have over $1500 in prizes to give away courtesy
          of DX Engineering, Alpha Antenna, N3FJP and the ARRL and prize radios
          and equipment purchased by the Nixa ARC.
        </p>

        <p>
          Remember: All funds from the hamfest go to support the Southwest
          Missouri Linked Repeater System (SMLRS). Last year we avertised that
          we were hoping to add a couple of repeaters to the network to fill in
          the coverage of the system should it be needed for a regional ARES
          activation or as a backup for / supplemental communications medium for
          the regional SkyWarn network. Thanks to your support we were able to
          add the 145.290-, PL 100.0 Hz Taum Sauk repeater to the link system in
          March 2022 to expand coverage to our East and we upgraded the 147.060+
          PL 162.2 Hz Bolivar repeater in August 2022 with a new 9 dBd gain
          antenna system and 7/8″ heliax with hopes of adding it to the SMLRS in
          the near future providing the SMLRS coverage between Springfield and
          Clinton and beyond! This year we have an opportunity to add a repeater
          to expand coverage to the West into Kansas and NE Oklahoma and hope to
          raise funds to support that repeater system. If you would like to make
          a donation above and beyond your admission ticket or “Super” ticket
          purchase, you can do so at the hamfest or anytime online by sending it
          to paypal@nixahams.net and with the donation leave a note stating
          “SMLRS westward expansion”
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
</style>
