<template lang="html">
<div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h4 class="title">已完成订单统计</h4>
        <div class="rectangle-label">
          <span class="rectangle app"></span> <span>应用</span>
          <span class="rectangle ide"></span> <span>集成开发环境</span>
          <span class="rectangle volume"></span> <span>数据卷</span>
        </div>
          <div class="block">
            <chartist class="lines-bars" :type="'Line'" :data="linesData" :options="linesOptions"></chartist>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">未支付订单统计</h4>
          <div class="rectangle-label">
            <span class="rectangle app"></span> <span>应用</span>
            <span class="rectangle ide"></span> <span>集成开发环境</span>
            <span class="rectangle volume"></span> <span>数据卷</span>
          </div>
            <div class="block">
              <chartist class="lines-bars" :type="'Line'" :data="unpayData" :options="linesOptions"></chartist>
            </div>
          </article>
        </div>
      </div>
</div>
</template>

<script>
import Chartist from 'vue-bulma-chartist'

export default {
  components: {
    Chartist
  },

  data () {
    return {
      series: [],
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "sartuday", "sunday"],
      linesOptions: {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      },
      unpaySeries: [],
    }
  },
  compiled(){
    console.log("compiled");
      
  },
  computed: {
    linesData () {
      var self = this;
      console.log("computed");
      return {
        labels: self.labels,
        series: self.series
      }
    },
    unpayData () {
      var self = this;
      return {
        labels: self.labels,
        series: self.unpaySeries
      }
    }
  },
  created () {
      var self = this;
      console.log("created");
      
       setInterval(() => {
          // https://vuejs.org/guide/list.html#Mutation-Methods
          this.series.unshift(this.series.pop());
          // 已支付和未支付图表统计
              
       }, 1597);
  },
  methods:{
    getData:function(){
      var self=this;
      services.Common.dashboard({
                  url: 'users/chart/orderscount',
                  cb: function(res){
                          if(res.status == 200){
                                  var data = res.data;
                                  if(data.code == 1){
                                      self.series=data.fields.pay;
                                      self.unpaySeries=data.fields.unpay; 
                                      console.log(data.fields.pay);
                                      console.log(data.fields)
                                  }
                          }
                  }
        });
    }
  },
  // methods: {
  //   init: function(cur){
  //     var _self = this;
  //       var options = {
  //         param: {
  //             // cur: cur,
  //             // limit: 4,
  //             show: 'products',
  //         },
  //         url: "orders",
  //         ctx: _self,
  //         cb: function(res){
  //             if(res.status == 200){
  //               var data = res.data;
  //               if(data.code == 1){
  //                   _self.appAll = data.all;
  //                   _self.appFields = data.fields;
  //                   var ide = 0;
  //                   var docker = 0;
  //                   var volume = 0;
  //                   for(var index in data.fields){
  //                     var status = data.fields[index].products;
  //                       if(status == "IDE"){
  //                         ide +=1;
  //                       }else if(status == "docker"){
  //                         docker +=1;
  //                       }else if (status == "volume" ) {
  //                         volume += 1;
  //                       }
  //                   };
  //                   _self.data[0] = data.fields.length;
  //                   _self.data[1] = runningDocker;
  //                   _self.data[2] = stopDocker;
  //               };
  //             };
  //         },
  //     };
  //     services.Common.list(options);
  //   },
  // },
  mounted() {
    // this.init(1);

        services.Common.count({
          url: 'orders',
          param: {
            status: 2,
          },
        cb: function(res){
              if(res.status == 200){
                  var data = res.data;
                  if(data.code == 1){
                      self.data[1] = data.fields;
                  }
              }
            }
          });
          
  }

}
</script>

<style lang="css">
.lines-bars {
  height: 240px;
}
.rectangle{
  display: inline-block;
  width: 30px;
  height: 10px;
}

.app{
    background-color: red;
}
.ide{
    background-color: orange;
}
.volume{
    background-color: pink;
}
.rectangle-label{
    margin: 0 auto;
  text-align: center;
}
</style>
