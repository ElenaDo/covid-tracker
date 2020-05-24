import {
    Bar,
    mixins
} from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default {
    plugins: [ChartDataLabels],
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 30,
                        bottom: 10
                    }
                },
                plugins: {
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                    }
                },

                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}