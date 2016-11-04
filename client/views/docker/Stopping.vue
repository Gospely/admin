<template>
  <div>
<runAndStop :title.sync="title" :status.sync="status"></runAndStop>

  </div>
</template>

<script>

  import runAndStop from '../components/modal/dockerRun.vue'

  export default {

    data: function() {
      return {
        title: "停止的docker",
        status: -1,
      }
    },



    components: {
      runAndStop
    }

  }

</script>

<style lang="scss">


</style>
