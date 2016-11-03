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
          <p class="subtitle">{{companyFields.length}} 位</p>
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
          <p class="subtitle">{{appFields.length}} 个</p>
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
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">IDE 容器</h4>
          <div class="content">
            <chart :type="'pie'" :data="chartData"></chart>
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
        }]
      }
    }
  },

  mounted () {
    var self = this;
    self.initApplication();
    self.initCompanies();
    console.log(self.appFields);
    setInterval(() => {
      // https://github.com/vuejs/vue/issues/2873
      // Array.prototype.$set/$remove deprecated (use Vue.set or Array.prototype.splice instead)
      this.data.forEach((item, i) => {
        this.data.splice(i, 1, Math.ceil(Math.random() * 1000))
      })
    }, 1024)
  },
  methods: {
    initApplication: function(cur){
      var _self = this;
        var options = {
          param: {
              // cur: cur,
              // limit: 4,
              show: 'name',
          },
          target:'appFields',
          url: "applications",
          ctx: _self,
          cb: function(res){
              if(res.status == 200){
                var data = res.data;
                if(data.code == 1){
                    _self.appAll = data.all;
                    _self.appFields = data.fields;
                }
              }
          },
      };
      services.Common.list(options);
    },

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
