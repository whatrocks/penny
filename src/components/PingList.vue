<template>
  <div>
    <!-- <ul>
      <li v-for="ping in filteredPings" :key="ping.id">{{ping}}</li>
    </ul> -->
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>
<script>
import data from '@/data/sliced.json'
import { Chart } from "highcharts-vue";
import multiFilter from '@/utils/multiFilter.js';
// const data = [
//   {
//     id: 1,
//     request_time: "2017-01-01 00:00:03.850000",
//     service_name: "service_4777",
//     http_method: "post",
//     consumer_id: "consumer_566",
//     latency_in_seconds: "5.013062396901898",
//     response_code: "401"
//   },
//   {
//     id: 2,
//     request_time: "2017-01-01 00:00:03.850000",
//     service_name: "service_4724",
//     http_method: "post",
//     consumer_id: "consumer_72",
//     latency_in_seconds: "6",
//     response_code: "200"
//   },
//   {
//     id: 3,
//     request_time: "2017-01-01 00:00:07.900000",
//     service_name: "service_3828",
//     http_method: "get",
//     consumer_id: "consumer_1281",
//     latency_in_seconds: "0.9981994115938102",
//     response_code: "200"
//   },
//   {
//     id: 4,
//     request_time: "2017-01-01 00:00:09.500000",
//     service_name: "service_4010",
//     http_method: "post",
//     consumer_id: "consumer_1049",
//     latency_in_seconds: "6",
//     response_code: "500"
//   },
//   {
//     id: 5,
//     request_time: "2017-01-02 00:00:07.900000",
//     service_name: "service_3828",
//     http_method: "get",
//     consumer_id: "consumer_1281",
//     latency_in_seconds: "2",
//     response_code: "200"
//   },
//   {
//     id: 6,
//     request_time: "2017-01-02 00:00:07.900000",
//     service_name: "service_3828",
//     http_method: "post",
//     consumer_id: "consumer_1281",
//     latency_in_seconds: "2",
//     response_code: "200"
//   }
// ];

export default {
  name: "PingList",
  props: {
    filters: Object
  },
  components: {
    highcharts: Chart
  },
  data: function() {
    return {
      pings: data
    };
  },
  computed: {
    filteredPings: function() {
      return multiFilter(this.filters, data);
    },
    chartOptions: function() {
      const filteredData = multiFilter(this.filters, data);
      const get = filteredData
        .filter(p => p.http_method === "get")
        .map(p => {
          return {
            x: new Date(p.request_time).getTime() / 1000,
            y: parseFloat(p.latency_in_seconds)
          };
        });
      const post = filteredData
        .filter(p => p.http_method === "post")
        .map(p => {
          return {
            x: new Date(p.request_time).getTime() / 1000,
            y: parseFloat(p.latency_in_seconds)
          };
        });
      return {
        chart: {
          type: "line"
        },
        title: {
          text: ""
        },
        yAxis: {
          title: {
            text: "Latency"
          },
          type: 'logarithmic',
          // minorTickInterval: 0.1
          // min: 0
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%e %b - %H:%M:%S",
            second: "%e %b - %H:%M:%S",
            minute: "%e %b - %H:%M:%S",
            hour: "%e %b - %H:%M:%S",
            day: "%e %b - %H:%M:%S"
          },
          title: {
            text: "Date"
          }
        },
        series: [
          {
            name: "GET",
            data: get
          },
          {
            name: "POST",
            data: post
          }
        ]
      };
    }
  }
};
</script>