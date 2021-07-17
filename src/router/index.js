import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Call from "../views/Call.vue";
import Agent from "../views/Agent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/call",
    name: "Call",
    component: Call,
    props: (route) => ({ number: route.query.number }),
  },
  {
    path: "/agent",
    name: "Agent",
    component: Agent,
    props: (route) => ({ ID: route.query.ID }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
