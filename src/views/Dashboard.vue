<template>
  <div class="dashboard">
    <div class="filters form-row">
      <div class="form-group col">
        <label>HTTP Method</label>
        <select class="form-control" v-model="filters.http_method.value">
          <option>All</option>
          <option>post</option>
          <option>get</option>
        </select>
      </div>
      <div class="form-group col">
        <label>Response Code</label>
        <select class="form-control" v-model="filters.response_code.value">
          <option>All</option>
          <option>200</option>
          <option>401</option>
          <option>500</option>
        </select>
      </div>
      <div class="form-group col">
        <label>Consumer ID</label>
        <input class="form-control" v-model="filters.consumer_id.value" placeholder="All">
      </div>
      <div class="form-group col">
        <label>Service Name</label>
        <input class="form-control" v-model="filters.service_name.value" placeholder="All">
      </div>
      <div class="form-group col">
        <label>Latency Greater Than</label>
        <input
          class="form-control"
          v-model="filters.latency_in_seconds.value"
          placeholder="Seconds"
        >
      </div>
      <div class="col">
        <button class="btn green" v-on:click="reset">Reset Filters</button>
      </div>
    </div>
    <PingList v-on:selectservice="filterService" v-bind:filters="filters" v-bind:traffic="traffic"/>
  </div>
</template>

<script>
import multiFilter from "@/utils/multiFilter.js";
import PingList from "@/components/PingList.vue";
import rawTraffic from "@/data/traffic.json";
const slicedTraffic = rawTraffic.slice(0, 200);

export default {
  name: "dashboard",
  components: {
    PingList
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
    filterService: function(service) {
      this.filters.service_name.value = service;
    },
    reset: function() {
      this.filters.http_method.value = "All";
      this.filters.service_name.value = "";
      this.filters.response_code.value = "All";
      this.filters.consumer_id.value = "";
      this.filters.latency_in_seconds.value = "";
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
