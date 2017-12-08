<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import * as hub from './service/eventHub'
export default {
  name: 'app',
  data () {
    return {}
  },
  mounted () {
    hub.eventHub.$on('loading', flag => {
      if (flag === 'start') {
        this.$Progress.start()
      } else if (flag === 'finish') {
        this.$Progress.finish()
      } else {
        this.$Progress.fail()
      }
    })
  }
}
</script>

<style>
#app{
	height: 100%;
}
</style>
