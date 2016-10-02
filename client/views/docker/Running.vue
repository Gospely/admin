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

        title: "运行中的docker"

      }
    },



    components: {
      runAndStop
    }

  }

</script>

<style lang="scss">


</style>
