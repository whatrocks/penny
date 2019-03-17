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
          { key: 0, text: "Zoomable metrics to help triage irregularities" }, 
          { key: 1, text: "Comprehensive dashboard with multiple filters" },
          { key: 2, text: "Sharable URLs to get your team on the same page" },
          { key: 3, text: "Service-level statistics to find bottlenecks" }
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
