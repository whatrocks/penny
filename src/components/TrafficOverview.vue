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
    <br />
    <div class="row">
      <div class="col">
        <h5>Errors per Minute</h5>
        <highcharts :options="epmChartOptions"></highcharts>
      </div>
      <div class="col">
        <h5>Average Latency by Service (Top 10)</h5>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="service in filteredServices"
            @click="selectService(service)"
            :key="service.id"
          >
            <b>{{ service.name }}</b>
            : {{ service.avg.toFixed(4) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
import moment from "moment";
import _ from "lodash";
import quantile from "@/utils/quantile.js";
export default {
  name: "TrafficOverview",
  props: {
    traffic: Array,
    filters: Object
  },
  components: {
    highcharts: Chart
  },
  methods: {
    selectService: function(value) {
      this.$emit("selectservice", value.name);
    },
    adjustZoom: function(startTime, endTime) {
      this.$emit("adjusttime", { startTime, endTime });
    }
  },
  computed: {
    filteredServices: function() {
      let filteredServices = [];
      const services = _.groupBy(this.traffic, function(ping) {
        return ping.service_name;
      });
      _.forEach(services, (value, key) => {
        let avgLatency = _.mean(
          value.map(p => parseFloat(p.latency_in_seconds))
        );
        filteredServices.push({
          name: key,
          avg: avgLatency
        });
      });
      filteredServices = filteredServices.sort((a, b) => {
        if (a.avg === b.avg) return 0;
        if (a.avg < b.avg) return 1;
        return -1;
      });
      return filteredServices.slice(0, 10);
    },
    qpmChartOptions: function() {
      const groups = _.groupBy(this.traffic, function(ping) {
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
      const that = this;
      return {
        chart: {
          type: "area",
          zoomType: "x",
          events: {
            selection: function(event) {
              if (event.xAxis != null) {
                that.adjustZoom(event.xAxis[0].min, event.xAxis[0].max);
              } else {
                that.adjustZoom("", "");
              }
            }
          }
        },
        title: {
          text: ""
        },
        yAxis: {
          title: {
            text: ""
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
    epmChartOptions: function() {
      const groups = _.groupBy(this.traffic, function(ping) {
        return moment(ping.request_time)
          .startOf("minute")
          .format("DD/MM/YYYY HH:mm");
      });
      const fourxx = [];
      const fivexx = [];
      _.forEach(groups, function(value, key) {
        fourxx.push({
          x: new Date(moment(key).valueOf()).getTime(),
          y: _.countBy(value, p => p.response_code.startsWith("4")).true
        });
        fivexx.push({
          x: new Date(moment(key).valueOf()).getTime(),
          y: _.countBy(value, p => p.response_code.startsWith("5")).true
        });
      });
      const that = this;
      return {
        chart: {
          type: "area",
          zoomType: "x",
          events: {
            selection: function(event) {
              if (event.xAxis != null) {
                that.adjustZoom(event.xAxis[0].min, event.xAxis[0].max);
              } else {
                that.adjustZoom("", "");
              }
            }
          }
        },
        title: {
          text: ""
        },
        yAxis: {
          title: {
            text: ""
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
            name: "4XX",
            data: fourxx
          },
          {
            name: "5XX",
            data: fivexx
          }
        ]
      };
    },
    latencyChartOptions: function() {
      const groups = _.groupBy(this.traffic, function(ping) {
        return moment(ping.request_time).format("DD/MM/YYYY HH:mm");
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
      const that = this;
      return {
        chart: {
          type: "line",
          zoomType: "x",
          events: {
            selection: function(event) {
              if (event.xAxis != null) {
                that.adjustZoom(event.xAxis[0].min, event.xAxis[0].max);
              } else {
                that.adjustZoom("", "");
              }
            }
          }
        },
        title: {
          text: ""
        },
        yAxis: {
          title: {
            text: ""
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
