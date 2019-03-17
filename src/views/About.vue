<template>
  <div class="about">
    <p>🕵️‍♀️ Penny is your friendly neighborhood HTTP traffic inspector app.</p>
    <h3>Features</h3>
    <FeatureList/>
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