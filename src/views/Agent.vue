<template>
  <div class="agent">
    <h3>Logs for agent: {{ ID }}</h3>
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
          <td>{{ log.number }}</td>
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
    ID: { type: String },
  },
  data() {
    return {
      tableLogs: [],
    };
  },
  created() {
    this.logs.forEach((log) => {
      if (log.agentIdentifier === this.ID) {
        const resolutionResult = this.resolution.find(
          (res) => res.identifier === log.identifier
        ).resolution;

        this.tableLogs.push({
          ...log,
          resolution: resolutionResult,
        });
      }
    });
  },
  computed: {
    ...mapState(["logs", "resolution"]),
  },
};
</script>
