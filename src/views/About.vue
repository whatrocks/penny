<template>
  <div class="about">
    <h1>🕵️‍♀️ Penny</h1>
    <p>Penny is your friendly neighborhood HTTP traffic inspector app.</p>
    <h3>Features</h3>
    <FeatureList />
    <p>Created by
      <a href="https://www.charlieharrington.com">Charlie Harrington</a>.
    </p>
  </div>
</template>
<script>
import FeatureList from "@/components/FeatureList.vue"
export default {
  name: 'about',
  components: {
    FeatureList
  }
}
</script>
