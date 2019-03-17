<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
    <ul class="list-group">
      <li class="list-group-item" v-for="ping in filteredPings" :key="ping.id">{{ping}}</li>
    </ul>
  </div>
</template>
<script>
import data from '@/data/sliced.json'
import { Chart } from "highcharts-vue";
import multiFilter from '@/utils/multiFilter.js';

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