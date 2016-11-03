<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">{{title}}</h4>
          <view-table :all.sync="all" :total="10" :show-operations="false" v-on:page-changed="pageChanged"   :fields="fields" :columns="columns"></view-table>
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
        all:1,
        cur:1,
        columns: [{
          column: 'products',
          label: '产品'
        },{
          column: 'unitPrice',
          label: '单价'
        },{
          column: 'size',
          label: '大小'
        },{
          column: 'price',
          label: '总价'
        },{
          column: 'creator',
          label: '下单者'
        }],

        fields: [],
      }
    },

    methods: {
      pageChanged: function(currentPage) {
        console.log(currentPage);
        this.init(currentPage.currentPage);
      },

      init: function(cur) {
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 1,
                status: this.status,
                show: 'id_products_size_unit_unitPrice_creator_price'
            },
            url: "orders",
            ctx: _self,
        };
        services.Common.list(options);
      }

     },

  props: {
       title: {
         type: String,
         default(){
           return  "已完成订单";
       }},

       status: {
         type: Number,
         default(){
           return 1 ;
         }
       },
     },

    components: {
      ViewTable,
    },
    mounted() {
        var self = this;
        self.init(1);
    }

  }

</script>

<style lang="scss">


</style>
