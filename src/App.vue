<template>
  <div id="app">
    <div class="header">
      i am header
    </div>
    <div class="tab">
      i am tab
    </div>
    <div class="footer">
      i am footer
    </div>

    <header1></header1>
  </div>
</template>

<script>
import header1 from './components/header/header'

export default {
  name: 'app',
  components: {
    header1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
