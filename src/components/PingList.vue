<template>
  <ul>
    <li v-for="ping in filteredPings" :key="ping.id">{{ping}}</li>
  </ul>
</template>
<script>
const data = [
  {
    id: 1,
    request_time: "2017-01-01 00:00:03.850000",
    service_name: "service_4777",
    http_method: "post",
    consumer_id: "consumer_566",
    latency_in_seconds: "5.013062396901898",
    response_code: "401"
  },
  {
    id: 2,
    request_time: "2017-01-01 00:00:03.850000",
    service_name: "service_4724",
    http_method: "post",
    consumer_id: "consumer_72",
    latency_in_seconds: "6",
    response_code: "200"
  },
  {
    id: 3,
    request_time: "2017-01-01 00:00:07.900000",
    service_name: "service_3828",
    http_method: "get",
    consumer_id: "consumer_1281",
    latency_in_seconds: "0.9981994115938102",
    response_code: "200"
  },
  {
    id: 4,
    request_time: "2017-01-01 00:00:09.500000",
    service_name: "service_4010",
    http_method: "post",
    consumer_id: "consumer_1049",
    latency_in_seconds: "6",
    response_code: "500"
  }
];

export default {
  name: "PingList",
  props: {
    filters: Object
  },
  data: function() {
    return {
      pings: data
    };
  },
  computed: {
    filteredPings: function() {
      const activeFilters = Object.keys(this.filters).filter(f => {
        const currentFilter = this.filters[f];
        return (
          (currentFilter.type === "select" && currentFilter.value !== "All") ||
          (currentFilter.type === "text" && currentFilter.value.length)
        );
      });
      if (!activeFilters.length) {
        return this.pings;
      }
      let filteredData = data;
      activeFilters.forEach(filter => {
        filteredData = filteredData.filter(ping => {
          if (this.filters[filter].type === "select") {
            return ping[filter] === this.filters[filter].value;
          } else {
            // text filter
            return ping[filter].includes(this.filters[filter].value);
          }
        });
      });
      return filteredData;
    }
  }
};
</script>