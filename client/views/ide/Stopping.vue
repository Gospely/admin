<template>
  <div>
<runAndStop :title.sync="title"></runAndStop>

  </div>
</template>

<script>

  import runAndStop from '../components/runAndStop.vue'

  export default {

    data: function() {
      return {

        title: "停止的IDE"

      }
    },



    components: {
      runAndStop
    }

  }

</script>

<style lang="scss">


</style>
