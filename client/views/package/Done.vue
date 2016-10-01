<template>
  <div>
<oders :title.sync="title" ></oders>

  </div>
</template>

<script>

  import oders from '../components/Oders.vue'

  export default {

    data: function() {
      return {

        title: "已完成套餐",


      }
    },



    components: {
      oders
    }

  }

</script>

<style lang="scss">


</style>
