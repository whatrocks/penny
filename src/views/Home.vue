<template>
  <div class="home">
    <div class="filters">
      <div class="filter">
        <h4>HTTP Method</h4>
        <select v-model="filters.http_method">
          <option>All</option>
          <option>post</option>
          <option>get</option>
        </select>
      </div>
      <div class="filter">
        <h4>Response Code</h4>
        <select v-model="filters.response_code">
          <option>All</option>
          <option>200</option>
          <option>401</option>
          <option>500</option>
        </select>
      </div>
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
        http_method: "All",
        service_name: "All",
        response_code: "All",
        consumer_id: "All"
      }
    };
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