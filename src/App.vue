<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
      <router-link to="/">
        <h4 class="logo">🕵️‍♀️ Penny</h4>
      </router-link>
      <router-link to="/about" class="nav-page">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
  padding: 0;
  margin: 0;
}
#nav {
  padding: 20px;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  h4 {
    color: #2c3e50 !important;
  }
  .nav-page {
    margin-left: 1rem;
    margin-top: 0.1rem;
  }
}
</style>
