<template>
  <div>
<runAndStop :title.sync="title" :status.sync="status" :isRunning.sync="isRunning"></runAndStop>
  </div>
</template>

<script>

  import runAndStop from '../components/modal/dockerRun.vue'
  export default {

    data: function() {
      return {
        isRunning: true,
        title: "运行中的docker",
        status: 1,
      }
    },

    components: {
      runAndStop
    }

  }
</script>
