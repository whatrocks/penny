<template>
  <div class="home">
    <div class="filters">
      <div class="filter">
        <h4>HTTP Method</h4>
        <select v-model="filters.http_method.value">
          <option>All</option>
          <option>post</option>
          <option>get</option>
        </select>
      </div>
      <div class="filter">
        <h4>Response Code</h4>
        <select v-model="filters.response_code.value">
          <option>All</option>
          <option>200</option>
          <option>401</option>
          <option>500</option>
        </select>
      </div>
      <div class="filter">
        <h4>Consumer ID</h4>
        <input v-model="filters.consumer_id.value" placeholder="All">
      </div>
      <div class="filter">
        <h4>Service Name</h4>
        <input v-model="filters.service_name.value" placeholder="All">
      </div>
      <button v-on:click="reset">
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
      this.filters.http_method = 'All';
      this.filters.service_name = '';
      this.filters.response_code = 'All';
      this.filters.consumer_id = '';
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
</style>