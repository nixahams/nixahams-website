<template>
  <div class="" id="testing_page">
    <div class="container mb-3">
      <div class="row d-flex flex-row">
        <div class="col-md-5 m-auto">
          <h1>License Testing Information</h1>
          <p>What to bring:</p>
          <ul>
            <li>$35</li>
            <li>Pen/Pencil</li>
          </ul>

          <p>Study Resources:</p>
          <ul>
            <li>
              <a href="http://arrlexamreview.appspot.com/" target="_blank"
                >ARRL Exam Review</a
              >
            </li>
            <li>
              <a href="https://www.kb6nu.com/study-guides/" target="_blank"
                >KB6NU's No-Nonsense Study Guides</a
              >
            </li>
            <li>
              <a href="https://hamstudy.org/" target="_blank">Hamstudy.org</a>
            </li>
          </ul>
        </div>

        <div class="col-md-5 m-auto">
          <div class="card text-dark">
            <div
              class="card-header d-flex align-items-center justify-content-center"
            >
              <img
                src="../assets/League_diamond_color_high.jpg"
                class="arrl-img mx-2"
                alt="ARRL Logo"
              />
              <h2 class="align-center m-0">Next Test Session</h2>
            </div>
            <div class="card-body">
              <p>Test Date: {{ test.date }}</p>
              <p>Test Time: 4:30 PM (Walk-ins allowed)</p>
              <p>Location: Nixa Fire Station #1</p>
              <p>Address: 711 N Main St, Nixa, MO 65714</p>
              <p>Contact: Roberto A. Huelga</p>
              <p>Email: w3lga@arrl.net</p>
              <p class="pb-0 m-0">Notes:</p>
              <ul class="m-0">
                <li>Do NOT call the fire station</li>
                <li>FRNs required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axiosClient";

export default {
  name: "TestingPage",
  data() {
    return {
      tests: [],
      test: {
        date: "",
        isAvailable: false,
      },
    };
  },
  methods: {
    getTest() {
      axios({
        method: "GET",
        url: "/get-test-dates",
      }).then((res) => {
        let date = new Date();
        let today = date.toISOString().slice(0, 10);
        let test = res.data.filter((test) => test.date >= today);
        this.test = test[0];
        // Convert date to readable format
        let testDate = new Date(this.test.date);
        let testMonth = testDate.toLocaleString("default", { month: "long" });
        let testYear = testDate.getFullYear();
        this.test.date = `${testMonth} ${testDate.getDate() + 1}, ${testYear}`;
      });
    },
  },
  mounted() {
    this.getTest();
  },
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: #1c2023;
}

#testing_page {
  display: flex;
  flex-direction: column;
  background-color: black;
  padding-top: 120px;
  height: fit-content;
  margin-left: 5%;
  /* min-height: 100vh; */
}

.test_section {
  /* border: 1px solid greenyellow; */
  width: 100%;
  height: fit-content;
  padding: 100px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 1;
}

.arrl-img {
  width: auto;
  height: 75px;
}
</style>
