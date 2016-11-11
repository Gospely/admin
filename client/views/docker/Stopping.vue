<template>
  <div>
<runAndStop :showLine.sync="showLine" :title.sync="title" :status.sync="status"></runAndStop>

  </div>
</template>

<script>

  import runAndStop from '../components/modal/DockerRun.vue'

  export default {

    data: function() {
      return {
        title: "停止的docker",
        status: -1,
        showLine: false,
      }
    },



    components: {
      runAndStop
    }

  }

</script>

<style lang="scss">


</style>
