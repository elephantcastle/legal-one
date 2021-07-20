import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    agents: [],
    logs: [],
    resolution: [],
  },
  mutations: {
    SET_AGENTS(state, agents) {
      state.agents = agents;
    },
    SET_LOGS(state, logs) {
      state.logs = logs;
    },
    SET_RESOLUTION(state, resolution) {
      state.resolution = resolution;
    },
  },
  actions: {
    async callAPI({ commit }) {
      const API =
        process.env.NODE_ENV === "production"
          ? "https://legaloneapi.herokuapp.com"
          : "http://localhost:4000";

      try {
        const agentsResponse = await axios.get(`${API}/agents`);
        const agents = agentsResponse.data;
        commit("SET_AGENTS", agents);
        const logsResponse = await axios.get(`${API}/logs`);
        const logs = logsResponse.data;
        commit("SET_LOGS", logs);
        const resolutionResponse = await axios.get(`${API}/resolution`);
        const resolution = resolutionResponse.data;
        commit("SET_RESOLUTION", resolution);
      } catch (error) {
        console.error(error);
      }
    },
  },
  plugins: [createPersistedState()],
  modules: {},
});
