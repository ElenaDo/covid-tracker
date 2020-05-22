import { Doughnut, mixins } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default {
  plugins: [ChartDataLabels],
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "chartOptions"],
  data() {
           return {
                options:{
                  legend: {
                        display: true
                    }
                }
              }
              }, 
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};
