<template>
  <div class="home">
    <h3 class="p-3 text-center">Logs list</h3>
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
          <td>{{ log.number }}</td>
          <td>{{ log.callsNumber }} Calls</td>
          <td>{{ log.lastCall.agentName }} / {{ log.lastCall.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { groupBy } from "./../utils/utils";

export default {
  name: "Home",
  data() {
    return {
      tableLogs: [],
    };
  },
  async created() {
    const API =
      process.env.NODE_ENV === "production"
        ? "https://legaloneapi.herokuapp.com"
        : "http://localhost:4000";

    try {
      const agentsResponse = await axios.get(`${API}/agents`);
      const agents = agentsResponse.data;
      const logsResponse = await axios.get(`${API}/logs`);
      const logs = logsResponse.data;
      console.log(logs);
      const groupedNumbers = groupBy(logs, "number");
      // After grouping the logs by phone number, create an array of objects with phone number, number of calls and linked agent
      let groupedLogs = [];
      for (let j in groupedNumbers) {
        const temporaryObject = {};
        const lastCall = groupedNumbers[j].reduce((a, b) => {
          return new Date(a.dateTime) > new Date(b.dateTime) ? a : b;
        });

        const agent = agents.find(
          (agente) => agente.identifier === lastCall.agentIdentifier
        );
        temporaryObject["number"] = j;
        temporaryObject["callsNumber"] = groupedNumbers[j].length;
        temporaryObject["lastCall"] = {
          time: lastCall.dateTime,
          agentName: agent.firstName,
        };
        groupedLogs.push(temporaryObject);
      }

      this.tableLogs = groupedLogs;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

th,
tr {
  width: 30%;
}
</style>
