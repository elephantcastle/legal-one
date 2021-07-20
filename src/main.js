import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueApexCharts,
  render: (h) => h(App),
}).$mount("#app");
