<template>
  <div>
<runAndStop :showLine.sync="showLine":title.sync="title" :status.sync="status" :isRunning.sync="isRunning"></runAndStop>
  </div>
</template>

<script>

  import runAndStop from '../components/modal/dockerRun.vue'
  export default {

    data: function() {
      return {
        title: "运行中的docker",
        status: 1,
        showLine: true,
      }
    },

    components: {
      runAndStop
    }

  }
</script>
