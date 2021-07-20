<template>
  <div class="call">
    <h3>call number: {{ number }}</h3>
    <table>
      <thead>
        <tr>
          <th>Phone number</th>
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in tableLogs" :key="index">
          <td>{{ log.agent }}</td>
          <td>{{ log.dateTime }}</td>
          <td>{{ log.resolution }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    number: { type: String },
  },
  computed: {
    ...mapState(["agents", "logs", "resolution"]),
  },
  data() {
    return {
      tableLogs: [],
    };
  },
  created() {
    if (this.logs?.length && this.resolution?.length && this.number) {
      this.logs.forEach((log) => {
        if (log.number === this.number) {
          const agent = this.agents.find(
            (agent) => log.agentIdentifier === agent.identifier
          );
          const resolutionResult = this.resolution.find(
            (res) => res.identifier === log.identifier
          ).resolution;

          this.tableLogs.push({
            ...log,
            agent: agent.firstName + " " + agent.lastName,
            resolution: resolutionResult,
          });
        }
      });
    } else {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
