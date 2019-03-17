<template>
  <div>
    <div class="row">
      <div class="col">
        <h5>Queries per Minute</h5>
        <highcharts :options="qpmChartOptions"></highcharts>
      </div>
      <div class="col">
        <h5>Latency</h5>
        <highcharts :options="latencyChartOptions"></highcharts>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>Service Names</h5>
        <!-- <ul class="list-group">
          <li class="list-group-item" v-for="ping in filteredPings" :key="ping.id">{{ping}}</li>
        </ul>-->
      </div>
      <div class="col">
        <h5>Consumer IDs</h5>
      </div>
    </div>
  </div>
</template>
<script>
import data from "@/data/sliced.json";
import { Chart } from "highcharts-vue";
import moment from "moment";
import _ from "lodash";
import multiFilter from "@/utils/multiFilter.js";

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
    qpmChartOptions: function() {
      const filteredData = multiFilter(this.filters, data);
      const groups = _.groupBy(filteredData, function(ping) {
        return moment(ping.request_time).format("DD/MM/YYYY HH:mm");
      });
      const count = [];
      _.forEach(groups, function(value, key) {
        count.push({
          x: new Date(key).getTime() / 1000,
          y: value.length
        });
      });
      return {
        chart: {
          type: "area"
        },
        title: {
          text: ""
        },
        yAxis: {
          title: {
            text: "QPM"
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%e %b - %H:%M",
            second: "%e %b - %H:%M",
            minute: "%e %b - %H:%M",
            hour: "%e %b - %H:%M",
            day: "%e %b - %H:%M"
          },
          title: {
            text: ""
          }
        },
        series: [
          {
            name: "QPM",
            data: count
          }
        ]
      };
    },
    latencyChartOptions: function() {
      const filteredData = multiFilter(this.filters, data);
      const groups = _.groupBy(filteredData, function(ping) {
        return moment(ping.request_time).format("DD/MM/YYYY HH:mm");
      });
      const average = [];
      const p90 = [];
      const min = [];
      const max = [];
      _.forEach(groups, function(value, key) {
        average.push({
          x: new Date(key).getTime() / 1000,
          y: _.mean(value.map(p => parseFloat(p.latency_in_seconds)))
        });
        const sorted = value.sort((a, b) => {
          if (a.latency_in_seconds === b.latency_in_seconds) return 0;
          if (a.latency_in_seconds < b.latency_in_seconds) return -1;
          return 1;
        });
        p90.push({
          x: new Date(key).getTime() / 1000,
          y: Math.floor(sorted.length * 0.9) - 1
        });
        min.push({
          x: new Date(key).getTime() / 1000,
          y: parseFloat(sorted[0].latency_in_seconds)
        });
        max.push({
          x: new Date(key).getTime() / 1000,
          y: parseFloat(sorted[sorted.length - 1].latency_in_seconds)
        });
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
            text: "QPM"
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%e %b - %H:%M",
            second: "%e %b - %H:%M",
            minute: "%e %b - %H:%M",
            hour: "%e %b - %H:%M",
            day: "%e %b - %H:%M"
          },
          title: {
            text: ""
          }
        },
        series: [
          {
            name: "Min",
            data: min
          },
          {
            name: "Mean",
            data: average
          },
          {
            name: "Max",
            data: max
          }
          // {
          //   name: "p90",
          //   data: p90
          // }
        ]
      };
    }
  }
};
</script>