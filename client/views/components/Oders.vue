<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">{{title}}</h4>
          <view-table :total="10" :show-operations="false" v-on:page-changed="pageChanged"   :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>


  </div>
</template>

<script>

  import ViewTable from '../components/Table.vue'

  export default {

    data: function() {
      var self = this;
      return {
        columns: ['订单表', '增值服务', '续费套餐', '总价'],

        fields: [{
          product: '',
          added: '',
          renewal: '',
          price: ''
        },{
          product: '',
          added: '',
          renewal: '',
          price: ''
        }],
      }
    },

    methods: {
      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

     },
     props: {
       title: String,
       default(){
         return  "已完成订单";
       }
     },

    components: {
      ViewTable,
    }

  }

</script>

<style lang="scss">


</style>
