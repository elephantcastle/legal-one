<template>
  <div class="home">
    <h3>Logs list</h3>
    <table>
      <thead>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in tableLogs" :key="index">
          <td>
            <router-link :to="{ path: 'call', query: { number: log.number } }"
              >{{ log.number }}
            </router-link>
          </td>

          <td>{{ log.callsNumber }} Calls</td>

          <td>
            <router-link
              :to="{ path: 'agent', query: { ID: log.lastCall.identifier } }"
            >
              {{ log.lastCall.agentName }}
            </router-link>
            / {{ log.lastCall.time }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { groupBy } from "./../utils/utils";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      tableLogs: [],
    };
  },
  async created() {
    await this.$store.dispatch("callAPI");
    const groupedNumbers = groupBy(this.logs, "number");
    // After grouping the logs by phone number, create an array of objects with phone number, number of calls and linked agent
    let groupedLogs = [];
    for (let j in groupedNumbers) {
      const temporaryObject = {};
      // find the agent who made the last call
      const lastCall = groupedNumbers[j].reduce((a, b) => {
        return new Date(a.dateTime) > new Date(b.dateTime) ? a : b;
      });
      const agent = this.agents.find(
        (agente) => agente.identifier === lastCall.agentIdentifier
      );

      temporaryObject["number"] = j;
      temporaryObject["callsNumber"] = groupedNumbers[j].length;
      temporaryObject["lastCall"] = {
        time: lastCall.dateTime,
        agentName: agent.firstName,
        identifier: agent.identifier,
      };
      groupedLogs.push(temporaryObject);
    }

    this.tableLogs = groupedLogs;
  },
  computed: {
    ...mapState(["agents", "logs"]),
  },
};
</script>

