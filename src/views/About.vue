<template>
  <div class="about">
    <h5>🕵️‍♀️ Penny is your friendly neighborhood HTTP traffic inspector app.</h5>
    <br />
    <h4>Features</h4>
    <FeatureList />
    <br />
    <p>⚡⚡⚡</p>
    <br />
    <p>
      Penny is a
      <a href="https://www.charlieharrington.com">Charlie Harrington</a>
      creation.
    </p>
  </div>
</template>
<script>
import FeatureList from "@/components/FeatureList.vue";
export default {
  name: "about",
  components: {
    FeatureList
  }
};
</script>
<style scoped lang="scss">
.about {
  margin-top: 2rem;
}
</style>
