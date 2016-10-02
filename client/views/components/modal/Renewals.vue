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

  import ViewTable from '../Table.vue'

  export default {

    data: function() {
      var self = this;
      return {
        columns: ['IDE版本', '价格', '时间长短', '单位'],
        fields: [{
          none: '',
          product: '',
          price: '',
          time: '',
          unit: ''
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
                show: 'id_product_price_time_unit' //要查询的列
            },
            url: "renewals", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
      }

     },
     props: {
       title: String,
       default(){
         return  "已完成续费套餐";
       }
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
