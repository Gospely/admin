<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">今日新增用户</p>
          <p class="subtitle">100 位</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">昨日新增用户</p>
          <p class="subtitle">1000 位</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">企业用户</p>
          <p class="subtitle">{{companys}} 位</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">总用户</p>
          <p class="subtitle">200000 位</p>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">活跃用户数</p>
          <p class="subtitle">40000 个</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">付费用户数</p>
          <p class="subtitle">40000 个</p>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">今日收益</p>
          <p class="subtitle">30000 元</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">昨日收益</p>
          <p class="subtitle">40000 元</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">今日新增订单</p>
          <p class="subtitle">100 个</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">昨日新增订单</p>
          <p class="subtitle">1000 个</p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">应用数</p>
          <p class="subtitle">{{applicationsCount}} 个</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">域名数</p>
          <p class="subtitle">40000 个</p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Dodora 容器</h4>
          <div class="content">
            <chart :type="'doughnut'" :data="chartData"></chart>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

export default {
  components: {
    Chart
  },

  data () {
    return {
      companys: 1,
      applicationsCount: 1, //总的应用数
      timer: 1,
      appAll:1,
      appFields: [],
      companyFields: [],
      data: [300, 50, 100]
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          '总数量',
          '运行中',
          '已停止'
        ],
        datasets: [{
          data: this.data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }],
        application: {
          app: 0,
          stopedApp: 0 ,
          runningApp: 0,
        }
      }
    }
  },

  created () {
    var self = this;
    self.timer = setInterval(() => {
      // https://github.com/vuejs/vue/issues/2873
      // 总的应用数
      services.Common.count({
      url: 'applications',
      cb: function(res){
            if(res.status == 200){
                var data = res.data;
                if(data.code == 1){
                  self.applicationsCount = data.fields;
                  self.data[0] = data.fields;
                }
            }
          }
        });
        // 正在运行的应用
        services.Common.count({
        url: 'applications',
        param: {
          status: 1,
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
          // 已经停止的应用
          services.Common.count({
          url: 'applications',
          param: {
            status: -1,
          },
          cb: function(res){
                if(res.status == 200){
                    var data = res.data;
                    if(data.code == 1){
                        self.data[2] = data.fields;
                    }
                }
              }
            });
    }, 5024)

  },
  mounted () {

    var self = this;
    var dateObject = new Date();
    var date = dateObject.getUTCDate();
    // 总的应用数
    services.Common.count({
    url: 'applications',
    cb: function(res){
          if(res.status == 200){
              var data = res.data;
              if(data.code == 1){
                self.applicationsCount = data.fields;
                self.data[0] = data.fields;
              }
          }
        }
      });
      // 正在运行的应用
      services.Common.count({
      url: 'applications',
      param: {
        status: 1,
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
        // 已经停止的应用
        services.Common.count({
        url: 'applications',
        param: {
          status: -1,
        },
        cb: function(res){
              if(res.status == 200){
                  var data = res.data;
                  if(data.code == 1){
                      self.data[2] = data.fields;
                  }
              }
            }
          });
          //企业用户
          services.Common.count({
          url: 'companys',
          cb: function(res){
                if(res.status == 200){
                    var data = res.data;
                    if(data.code == 1){
                        self.companys = data.fields;
                    }
                }
              }
            });
  },
  beforeDestroy () {
    var self = this;
    if(self.timer){
      clearInterval(self.timer);
    }
  },

  methods: {
    // initApplication: function(cur){
    //   var _self = this;
    //     var options = {
    //       param: {
    //           // cur: cur,
    //           // limit: 4,
    //           show: 'name_status',
    //       },
    //       target:'appFields',
    //       url: "applications",
    //       ctx: _self,
    //       cb: function(res){
    //           if(res.status == 200){
    //             var data = res.data;
    //             if(data.code == 1){
    //                 _self.appAll = data.all;
    //                 _self.appFields = data.fields;
    //
    //                 var runningDocker = 0;
    //                 var stopDocker = 0;
    //                 for(var index in data.fields){
    //                   var status = data.fields[index].status;
    //                     if(status == 1){
    //                       runningDocker +=1;
    //                     }else if(status == -1){
    //                       stopDocker +=1;
    //                     }
    //                 };
    //                 _self.data[0] = data.fields.length;
    //                 _self.data[1] = runningDocker;
    //                 _self.data[2] = stopDocker;
    //             };
    //           };
    //       },
    //   };
    //   services.Common.list(options);
    // },

    initCompanies: function(cur) {
      var _self = this;
      var options = {
          param: {
              show: 'name'
          },
          url: "companys",
          ctx: _self,
          cb: function(res){
              if(res.status == 200){
                var data = res.data;
                if(data.code == 1){
                    _self.appAll = data.all;
                    _self.companyFields = data.fields;
                }
              }
          },
      };
      services.Common.list(options);
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
