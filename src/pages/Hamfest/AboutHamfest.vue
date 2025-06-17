<template>
  <div class="container text-white">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Nixa Amateur Radio Club Hamfest</h1>
        <h4 class="text-center font-italic">Brought to you by:</h4>
        <h5 class="text-center font-italic">
          <a href="https://www.retevis.com/" target="_blank"
            >RETEVIS. We Are Together. Retevis.com</a
          >
        </h5>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12 col-lg-4 mb-2">
        <div class="card w-75 m-auto">
          <div class="card-header">
            <h3>Hamfest 2025</h3>
          </div>
          <div class="card-body">
            <p>When: November 8, 2025</p>
            <p>Time: 8:00 AM - 1:00 PM</p>
            <p>Where: Victory Baptist Church</p>
            <p>Address: 252 N Nicholas Road, Nixa, MO 65714</p>
            <!--
            <button
              class="btn btn-primary m-auto"
              id="buyTicketsBtn"
              @click="buyTickets"
            >
              Buy Tickets
            </button>
            -->
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8 text-start">
        <p>
          The NARCfest 2025 committee is working around the clock to ensure an
          exceptional Hamfest experience that's second to none. Get ready for a
          thrilling lineup of vendors and speakers sure to blow you away! Top
          vendors like
          <a href="https://associatedradio.com/home.php" target="_blank"
            >Associated Radio</a
          >,
          <a href="https://www.dandlantenna.com/" target="_blank">D&L Antenna</a
          >, <a href="https://specfive.com/" target="_blank">Spec5</a>, and
          <a href="" target="_blank">Mike Hoffman Embroidery</a>
          will be there to cater to all your ham radio desires. Interested in
          selling your items? Hurry and reach out to us at hamfest@nixahams.net
          or purchase tickets online to reserve a table before they're all
          snapped up!
        </p>

        <p>
          Rob Huelga, W3LGA, and members from the Nixa ARC VE team will be
          holding a VE testing session.
        </p>

        <p>
          For those looking to grab breakfast, a morning treat, or lunch, WHAT
          IS THE FOOD will be conveniently available right on the premises!
        </p>

        <p>
          There is plenty of parking on site. To streamline entry, the entry
          cost is $10.00 and that gives you 2 chances at hamfest prizes. And, if
          you would like to purchase the Super Ticket for $20.00, that gives you
          20 chances to win!
        </p>

        <p>
          IS THIS STILL CORRECT???? Local Talk-in: 147.015+ PL 162.2 Hz<br />
          Regional Talk-in : Southwest Missouri Linked Repeater System
        </p>

        <p>
          All proceeds from the hamfest are allocated to support the Southwest
          Missouri Linked Repeater System (SMLRS). Last year, we announced our
          intention to enhance the network by adding several repeaters to
          improve coverage for potential regional ARES activations or to serve
          as a backup/supplemental communication channel for the regional
          SkyWarn network. Thanks to your contributions, we completed the move
          of the Branson 146.655- repeater to the top of Inspiration Tower. This
          move has greatly improved the range of this repeater, and we have had
          reports of people working this repeater from the Springfield area all
          the way down into Northern Arkansas. Should you wish to contribute
          beyond the purchase of your admission or "Super" ticket, donations are
          welcome at the hamfest or online at any time by sending them to
          paypal@nixahams.net or by clicking the "Donate" button at the top of
          the website.
        </p>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <h2 class="sponsor-title mb-4">2025 Sponsors</h2>

        <!-- Gold Sponsors -->
        <div class="sponsor-tier mb-5">
          <h3 class="tier-title gold">Gold Level</h3>
          <div class="row justify-content-center g-4">
            <!-- Retevis -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://www.retevis.com/"
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/retevis.jpg"
                    alt="Retevis"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">RETEVIS</h4>
                  <p class="sponsor-tagline">We Are Together</p>
                </a>
              </div>
            </div>

            <!-- Alpha Antenna -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://www.alphaantenna.com/"
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/alpha-antenna.jpg"
                    alt="Alpha Antenna"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">Alpha Antenna</h4>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Silver Sponsors (placeholder) -->
        <!-- <div class="sponsor-tier mb-5">
          <h3 class="tier-title silver">Silver Level</h3>
          <div class="row justify-content-center g-4">
             Add silver sponsors here 
          </div>
        </div> -->

        <!-- Bronze Sponsors (placeholder) -->
        <div class="sponsor-tier">
          <h3 class="tier-title bronze">Bronze Level</h3>
          <div class="row justify-content-center g-4">
            <!-- Radioddity -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://www.radioddity.com/?utm_medium=&utm_source=hamfest&utm_campaign=NARCfest&utm_content="
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/radioddity.png"
                    alt="Radioddity"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">Radioddity</h4>
                </a>
              </div>
            </div>

            <!-- Associated Radio -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://associatedradio.com/home.php"
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/blank.png"
                    alt="Associated Radio"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">Associated Radio</h4>
                </a>
              </div>
            </div>

            <!-- N3FJP -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://www.n3fjp.com/"
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/N3FJP.png"
                    alt="N3FJP"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">N3FJP</h4>
                </a>
              </div>
            </div>

            <!-- DXEngineering -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="sponsor-card">
                <a
                  href="https://www.dxengineering.com/"
                  target="_blank"
                  class="sponsor-link"
                >
                  <img
                    src="@/assets/hamfest-sponsors/dx-engineering.png"
                    alt="DX Engineering"
                    class="sponsor-logo"
                  />
                  <h4 class="sponsor-name">DX Engineering</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
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

/* Sponsor Section Styles */
.sponsor-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
}

.sponsor-tier {
  margin-bottom: 3rem;
}

.tier-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.tier-title.gold {
  color: #ffd700;
  border-color: #ffd700;
}

.tier-title.silver {
  color: #c0c0c0;
  border-color: #c0c0c0;
}

.tier-title.bronze {
  color: #cd7f32;
  border-color: #cd7f32;
}

.sponsor-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sponsor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sponsor-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.sponsor-logo {
  max-width: 200px;
  height: auto;
  margin-bottom: 1rem;
  transition: filter 0.3s ease;
}

.sponsor-name {
  font-size: 1.4rem;
  margin: 0.5rem 0;
  color: #fff;
}

.sponsor-tagline {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sponsor-title {
    font-size: 2rem;
  }

  .tier-title {
    font-size: 1.5rem;
  }

  .sponsor-card {
    padding: 1rem;
  }

  .sponsor-logo {
    max-width: 150px;
  }
}
</style>
