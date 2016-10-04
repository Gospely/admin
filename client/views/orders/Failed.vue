<template>
  <div>
<oders :title.sync="title" :status.sync = "status" ></oders>

  </div>
</template>

<script>

  import oders from '../components/Oders.vue'

  export default {

    data: function() {
      return {

        title: "已失败订单",
          status: 0,

      }
    },



    components: {
      oders
    }

  }

</script>

<style lang="scss">


</style>
