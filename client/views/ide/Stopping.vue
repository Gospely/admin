<template>
  <div>
<runAndStop :title.sync="title"></runAndStop>

  </div>
</template>

<script>

    import runAndStop from '../components/modal/runAndStop.vue'

  export default {

    data: function() {
      return {
        title: "停止的IDE"
      }
    },

    methods: {

      mounted: function(modal) {
        var self = this;
      },
    },

    components: {
      runAndStop
    },
  }

</script>

<style lang="scss">


</style>
