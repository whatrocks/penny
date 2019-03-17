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
import quantile from "@/utils/quantile.js";

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
        return moment(ping.request_time)
          .startOf("minute")
          .format("DD/MM/YYYY HH:mm");
      });
      const count = [];
      _.forEach(groups, function(value, key) {
        count.push({
          x: new Date(moment(key).valueOf()).getTime(),
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
        // return moment(ping.request_time);
      });
      const average = [];
      const p90 = [];
      const p75 = [];
      const p50 = [];
      const min = [];
      const max = [];
      _.forEach(groups, function(value, key) {
        const date = new Date(moment(key).valueOf()).getTime();
        average.push({
          x: date,
          y: _.mean(value.map(p => parseFloat(p.latency_in_seconds)))
        });
        const sorted = value.sort((a, b) => {
          if (a.latency_in_seconds === b.latency_in_seconds) return 0;
          if (a.latency_in_seconds < b.latency_in_seconds) return -1;
          return 1;
        });
        p90.push({
          x: date,
          y: quantile(sorted, 0.9)
        });
        p75.push({
          x: date,
          y: quantile(sorted, 0.75)
        });
        p50.push({
          x: date,
          y: quantile(sorted, 0.5)
        });
        min.push({
          x: date,
          y: parseFloat(sorted[0].latency_in_seconds)
        });
        max.push({
          x: date,
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
            name: "p50",
            data: p50
          },
          {
            name: "p75",
            data: p75
          },
          {
            name: "p90",
            data: p90
          },
          {
            name: "Max",
            data: max
          }
        ]
      };
    }
  }
};
</script>