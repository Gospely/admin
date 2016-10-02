<template>
  <div>
<runAndStop :title.sync="title"></runAndStop>

  </div>
</template>

<script>

  import runAndStop from '../components/modal/dockerRun.vue'

  export default {

    data: function() {
      return {

        title: "停止的docker"

      }
    },



    components: {
      runAndStop
    }

  }

</script>

<style lang="scss">


</style>
