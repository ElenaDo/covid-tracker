<template>
              <chart :chart-data="datacollection"></chart>
    </template>
    <script>
    import Chart from "./../Chart.js";
    export default {
      components: {
        Chart
      },
      data() {
        return {
          datacollection: null
        };
      },
      props: ['data'],
      mounted() {
        this.fillData();

      },
      
      methods: {
        fillData() {
          this.datacollection = {
            labels: [
              "Total",
              "Recovered",
              "Active",
              "New",
              "Deaths",
              "New Deaths",
            ],
            datasets: [
              {
                label: "",
                backgroundColor: "#f87979",
                data: [this.data.cases.total, this.data.cases.recovered, this.data.cases.active, this.data.cases.new, this.data.deaths.total, this.data.deaths.new]
              }
            ]
          };
        },
      }
    };
    </script>
    <style>
    </style>