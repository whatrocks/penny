<template>
  <div class="dashboard">
    <div class="filters form-row">
      <div class="form-group col">
        <label>HTTP Method</label>
        <select class="form-control" v-model="filters.http_method.value" v-on:change="urlAdjust">
          <option>All</option>
          <option>post</option>
          <option>get</option>
        </select>
      </div>
      <div class="form-group col">
        <label>Response Code</label>
        <select class="form-control" v-model="filters.response_code.value" v-on:change="urlAdjust">
          <option>All</option>
          <option>200</option>
          <option>401</option>
          <option>500</option>
        </select>
      </div>
      <div class="form-group col">
        <label>Consumer ID</label>
        <input class="form-control" v-model="filters.consumer_id.value" placeholder="All" v-on:change="urlAdjust">
      </div>
      <div class="form-group col">
        <label>Service Name</label>
        <input class="form-control" v-model="filters.service_name.value" placeholder="All" v-on:change="urlAdjust">
      </div>
      <div class="form-group col">
        <label>Latency Greater Than</label>
        <input
          class="form-control"
          v-model="filters.latency_in_seconds.value"
          placeholder="Seconds"
          v-on:change="urlAdjust"
        >
      </div>
      <div class="col">
        <button class="btn green" v-on:click="reset">Reset Filters</button>
      </div>
    </div>
    <TrafficOverview
      v-on:adjusttime="filterTimeRange"
      v-on:selectservice="filterService"
      v-bind:filters="filters"
      v-bind:traffic="traffic"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import router from "@/router";
import multiFilter from "@/utils/multiFilter.js";
import TrafficOverview from "@/components/TrafficOverview.vue";
import rawTraffic from "@/data/traffic.json";
const slicedTraffic = rawTraffic.slice(0, 1470);
export default {
  name: "dashboard",
  components: {
    TrafficOverview
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      _.forEach(this.$route.query, (value, key) => {
        this.filters[key].value = value;
      })
    }
  },
  data: function() {
    return {
      filters: {
        http_method: {
          type: "select",
          value: "All"
        },
        service_name: {
          type: "text",
          value: ""
        },
        response_code: {
          type: "select",
          value: "All"
        },
        consumer_id: {
          type: "text",
          value: ""
        },
        latency_in_seconds: {
          type: "greater",
          value: ""
        },
        start_datetime: {
          type: "datetime",
          value: ""
        },
        end_datetime: {
          type: "datetime",
          value: ""
        }
      }
    };
  },
  computed: {
    traffic: function() {
      return multiFilter(this.filters, slicedTraffic);
    }
  },
  methods: {
    urlAdjust: function() {
      const activeFilters = _.pickBy(this.filters, f => f.value && f.value !== 'All')
      const query = _.mapValues(activeFilters, f => f.value)
      router.push({ query })
    },
    filterService: function(service) {
      this.filters.service_name.value = service;
      this.urlAdjust();
    },
    filterTimeRange: function({ startTime, endTime }) {
      this.filters.start_datetime.value = startTime;
      this.filters.end_datetime.value = endTime;
      this.urlAdjust();
    },
    reset: function() {
      this.filters.http_method.value = "All";
      this.filters.service_name.value = "";
      this.filters.response_code.value = "All";
      this.filters.consumer_id.value = "";
      this.filters.latency_in_seconds.value = "";
      this.filters.start_datetime.value = "";
      this.filters.end_datetime.value = "";
      this.urlAdjust();
    }
  }
};
</script>
<style scoped lang="scss">
.dashboard {
  margin: 1rem;
}
.filters {
  text-align: left;
  margin: 0 auto;
  max-width: 1060px;
}
.green {
  background-color: #42b983;
  border-color: #42b983;
  color: white;
  margin-top: 2rem;
  &:hover {
    background-color: darken(#42b983, 5%);
    border-color: darken(#42b983, 5%);
    color: white;
  }
}
</style>
