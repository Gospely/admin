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
      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur, //当前页码
                limit: 1,   //限制条数
                status: this.status,
                show: 'id_products_valueAdded_renewal_price' //要查询的列
            },
            url: "orders", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
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
