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
          { key: 0, text: "I love you" }, 
          { key: 1, text: "so Much!" },
          { key: 2, text: "This is such a great feature iwhat do tyou !" }
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
