<template>
  <apexcharts
    class="main-chart"
    width="800"
    height="350"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexcharts>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "Chart",
  props: {
    data: { type: Array, default: () => [] },
  },
  components: {
    apexcharts: VueApexCharts,
  },
  computed: {
    series() {
      return [
        {
          name: "Number of calls",
          data: this.data.map((log) => log.callsNumber),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: this.data.map((log) => log.number),
        },
      };
    },
  },
};
</script>

<style>
.main-chart > div {
  margin: 50px auto;
}
</style>