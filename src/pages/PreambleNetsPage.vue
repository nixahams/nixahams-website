<template>
  <div id="preamble">
    <div id="nets_title">N.A.R.C. Net Preamble</div>
    <div id="preamble_text">
      <span class="preamble_intro">
        The Nixa ARC Linked repeater system will link all repeaters together
        automatically at 7:00 p.m and will return all repeaters to normal
        operation at 9:00pm.
      </span>
      <span class="preamble_intro preamble_line">
        For people that check into the net for the first time, or are new hams,
        please make sure to welcome them & invite them to the next club meeting
        and give them the date and time of the next meeting.
      </span>
      <span>
        <span class="preamble_bold">**Announce at 7:27 p.m.**</span> All
        stations on frequency stand by for the N.A.R.C. Net due to begin in 3
        minutes. If there are any stations on frequency with emergency traffic
        please call now. If during the net an emergency arises, please key up
        and say “break break” and the frequency will be relinquished for your
        emergency traffic.
      </span>
      <span>
        <span class="preamble_bold">**Begin preamble at 7:30 p.m.**</span> Good
        evening and welcome to the Nixa Amateur Radio Club's Thursday Night net.
        The net meets every Thursday at 7:30 p.m. on the club's multi-band suite
        of repeaters covering the Springfield metro area.
      </span>
      <span
        >The purpose of the net is to pass along announcements and information
        for both club and regional amateur radio activities, improve camaraderie
        amongst area amateurs, find equipment and parts for your station or
        project, and take advantage of the multi-band facet of this net to
        utilize other bands besides 2-meters and 70-centimeters to check into
        nets and communicate with other amateurs. Utilizing 10m, 6m, 1.25m,
        33cm, and the 23cm bands will help you learn your station's capabilities
        on those bands, the repeater's capabilities and find others with similar
        interests in those bands.</span
      >
      <span>
        You may check into this net via the 29.680, 53.270, 145.270, 147.015,
        224.280, 442.425, 927.0125 and 1285.050 repeaters - all with a PL of
        162.2 Hz except the 10m repeater which uses a PL of 123.0 Hz. For VoIP
        check-ins, you can use All Star node 565503 or EchoLink node K0NXA-L.
      </span>
      <span>
        Please key your microphone for one second before speaking to allow all
        the links to rise and then give your callsign first phonetically, then
        the regular way, followed by your location and what repeater you are
        using to check into the net.
      </span>
      <span>
        First, is there any news or announcements for this week's net?
      </span>
      <span>
        Following is a condensed list of club related announcements. For
        up-to-the-minute announcements, subscribe to the NixaHams Groups.io
        email reflector and follow the K0NXA Facebook page.
      </span>
      <span
        >[Insert condensed announcements received in email day of net, along
        with seasonal announcements for hamfests, etc]</span
      >

      <span
        >[Insert quick roundup of other nets of interest received in email day
        of net]</span
      >
      <span>
        We'll take check-ins in three groups. We will start with any portable,
        mobile or short time stations followed by any VoIP check-ins and lastly
        we'll take any regular check-ins for the net. When checking into the
        net, please check in with your name, callsign, what repeater you are
        talking into, and if you have any equipment or parts you may be looking
        for to complete a project.
      </span>
      <span>
        Any portable, mobile or short time stations please call in now.
      </span>
      <span>Any EchoLink or All Star stations, please call in now </span>
      <span>Any regular check-ins, please call in now </span>
      <span>[Ask for any late check-ins]</span>
      <span
        >This concludes the Nixa ARC Thursday evening net. Repeaters will remain
        linked together until 9 p.m. to allow you to communicate cross-band with
        other amateurs on different bands and try out your equipment. 73!</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PreambleNetsPage",
  props: {},
  mounted() {
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Montserrat";
}
.preamble_bold {
  font-weight: bold;
}
#preamble_text > span {
  position: relative;
  color: white;
}
.preamble_line {
  padding-bottom: 2em;
}
.preamble_line::after {
  content: "";
  position: absolute;
  bottom: 0.5em;
  left: 10%;
  width: 80%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}
.preamble_intro {
  font-size: 0.9em;
  font-weight: 200;
  font-weight: bold;
  color: #db7b32 !important;
}
#preamble {
  background-color: rgb(17, 17, 17);
  height: fit-content;
  width: 100%;
  padding-left: 90px;
  padding-right: 90px;
  padding-top: 120px;
}
#nets_title {
  width: 100%;
  height: fit-content;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: rgb(247, 247, 247);
  padding: 2% 10% 0% 10%;
  font-size: 4em;
}
#preamble_text {
  padding: 0 10% 10em 10%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #nets_title {
    font-size: 3em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #nets_title {
    color: rgb(247, 247, 247);
    padding: 2% 5% 5% 5%;
    font-size: 2em;
  }
  #preamble {
    background-color: #15181c;
    height: fit-content;
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 120px;
  }
  #preamble_text {
    padding: 0 5% 10em 5%;
    font-size: 0.8em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #preamble_text {
    padding: 0 5% 10em 5%;
    font-size: 0.7em;
  }
}
</style>
