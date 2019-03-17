<template>
  <div class="home">
    <h1>🕵️‍♀️ Penny</h1>
    <div class="filters">
      <div class="filter">
        <h5>HTTP Method</h5>
        <select class="form-control" v-model="filters.http_method.value">
          <option>All</option>
          <option>post</option>
          <option>get</option>
        </select>
      </div>
      <div class="filter">
        <h5>Response Code</h5>
        <select class="form-control" v-model="filters.response_code.value">
          <option>All</option>
          <option>200</option>
          <option>401</option>
          <option>500</option>
        </select>
      </div>
      <div class="filter">
        <h5>Consumer ID</h5>
        <input class="form-control" v-model="filters.consumer_id.value" placeholder="All">
      </div>
      <div class="filter">
        <h5>Service Name</h5>
        <input class="form-control" v-model="filters.service_name.value" placeholder="All">
      </div>
      <button class="btn green" v-on:click="reset">
        Reset Filters
      </button>
    </div>
    <PingList v-bind:filters="filters"/>
  </div>
</template>

<script>
import PingList from "@/components/PingList.vue";

export default {
  name: "home",
  components: {
    PingList
  },
  data: function() {
    return {
      filters: {
        http_method: {
          type: 'select',
          value: "All"
        },
        service_name: {
          type: 'text',
          value: ''
        },
        response_code: {
          type: 'select',
          value: 'All'
        },
        consumer_id: {
          type: 'text',
          value: ''
        }
      }
    };
  },
  methods: {
    reset: function(event) {
      this.filters.http_method.value = 'All';
      this.filters.service_name.value = '';
      this.filters.response_code.value = 'All';
      this.filters.consumer_id.value = '';
    }
  }
};
</script>
<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.filter {
  margin: 1rem;
}
.green {
  background-color: #42b983;
  border-color: #42b983;
  color: white;
  &:hover {
    background-color: darken(#42b983, 5%);
    border-color: darken(#42b983, 5%);
    color: white;
  }
}
</style>