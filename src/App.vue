<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col cols="12" md="8" class="pl-3 pr-0 mx-0">
          <v-container class="pt-2 mx-0 main">
            <v-autocomplete
              v-model="selected"
              :items="countryList"
              return-object
              item-text="country"
              label="Select a country"
              hint="Countries"
            ></v-autocomplete>
            <v-container>
              <p v-if="!selected" align="center" class="headline">
                Please select country from the list above
              </p>
              <div align="center" v-if="selected">
                <p class="headline">
                  Coronavirus cases in
                  {{ selected.country }}
                </p>
                <h3>Total: {{ selected.cases.total }}</h3>
                <p class="overline blue--text">
                  (New {{ selected.cases.new }})
                </p>
                <h3>Death: {{ selected.deaths.total }}</h3>
                <p class="overline red--text">
                  (New {{ selected.deaths.new }})
                </p>
                <h3 class="pb-3 green--text">Recovered: {{ selected.cases.recovered }}</h3>
              </div>
              <div v-show="selected">
              <v-row class="mx-auto">
                <v-col cols="12" md="6" class="px-0 d-flex flex-column">
                  <v-card class="px-3 pt-3 pb-0 mr-1 d-flex flex-column" height="100%">
                    <Chart v-if="loaded" :chart-data="barChart"></Chart>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="px-0">
                  <v-card class="pt-4 pb-1 ml-1" height="100%">
                    <PieChart v-if="loaded" :chart-data="pieChart" :chart-option="chartOptions"></PieChart>
                  </v-card>
                </v-col>
              </v-row>
              </div>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Chart from "./components/Chart.js";
import PieChart from "./components/PieChart.js";
export default {
  name: "App",
  components: {
    PieChart,
    Chart
  },
  data: () => ({
    selected: null,
    countryList: [],
    loaded: false,
    chartOptions: {
      responsive: true
    }
  }),
  computed: {
    barChart() {
      if (!this.selected) {
        return null;
      }
      const labels = ["Active", "New", "Deaths", "New Deaths"];
      const datasets = [
        {
          label: "",
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)"
          ],
          data: [
            this.selected.cases.active,
            this.selected.cases.new,
            this.selected.deaths.total,
            this.selected.deaths.new
          ]
        }
      ];
      return { labels, datasets };
    },
    pieChart() {
      if (!this.selected) {
        return null;
      }
      let recovered = this.selected.cases.recovered;
      let deaths = this.selected.deaths.total;
      let active = this.selected.cases.active;
      const background = { hoverBackgroundColor: "red" };
      const hover = { hoverBorderWidth: 10 };
      const labels = ["Recovered", "Deaths", "Active"];
      const datasets = [
        {
          label: "Data One",
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)"
          ],
          data: [recovered, deaths, active]
        }
      ];
      return { background, hover, labels, datasets };
    }
  },
  methods: {
    async getCountry() {
      const { VUE_APP_HOST } = process.env;
      const result = await axios.get(VUE_APP_HOST);
      this.loaded = true;
      const list = result.data.response
      .sort((a, b) => {
        return a.country.localeCompare(b.country);
      });
      // find index of 'All' option
      const indexOfAll = list.findIndex(item => item.country === 'All');
      list.unshift({divider: true});
      // extract 'All' and put it at the beggining of the list 
      list.unshift(...list.splice(indexOfAll + 1, 1));
      this.countryList = list;
    }
  },
  mounted() {
    this.getCountry();
  }
};
</script>
