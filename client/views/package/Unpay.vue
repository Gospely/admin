<template>
  <div>
<oders :title.sync="title" ></oders>

  </div>
</template>

<script>

  import oders from '../components/modal/Renewals.vue'

  export default {

    data: function() {
      return {

        title: "已取消套餐",


      }
    },



    components: {
      oders
    }

  }

</script>

<style lang="scss">


</style>
