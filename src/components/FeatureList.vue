<template>
  <ul>
    <li v-for="feature in features" :key="feature.key">{{feature.text}}</li>
  </ul>
</template>

<script>
export default {
  name: "FeatureList",
  data: function() {
    return {
      features: [
          { key: 0, text: "Latency metrics" }, 
          { key: 1, text: "Multiple filters" },
          { key: 2, text: "Service-level statistics" }
        ]
    };
  },
};
</script>
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
