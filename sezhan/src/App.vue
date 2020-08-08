<template>
  <div id="app" class="mt-0">
      <router-view name="header"></router-view>
            <router-view name="banner"></router-view>
            <router-view name="videoList"></router-view>
            <router-view name="playvideo"></router-view>
            <router-view name="blog"></router-view>
            <router-view name="article"></router-view>
            <router-view name="live"></router-view>
            <router-view name="userIndex"></router-view>
      <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
html,body,#app{
height: 100%;
width: 100%;
}
</style>
