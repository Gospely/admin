<template lang="html">
<div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h4 class="title">用户统计</h4>
        <div class="rectangle-label">
          <span class="rectangle app"></span> <span>用户</span>
          <span class="rectangle ide"></span> <span>企业</span>
          <span class="rectangle volume"></span> <span>组织</span>
        </div>
          <div class="block">
            <chartist class="lines-bars" :type="'Line'" :data="linesData" :options="linesOptions"></chartist>
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
      all: 1,
      fields: [],
      series: [],
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      linesOptions: {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      },

    }
  },
  computed: {
    linesData () {
      return {
        labels: this.labels,
        series: this.series
      }
    },
  },

  created () {
      var self = this;
      setInterval(() => {
            // https://vuejs.org/guide/list.html#Mutation-Methods
            this.series.unshift(this.series.pop());
            //用户统计
             services.Common.dashboard({
                      url: 'users/chart/userscount',
                      cb: function(res){
                              if(res.status == 200){
                                      var data = res.data;
                                      if(data.code == 1){
                                              self.series= data.fields;
                                      }
                              }
                      }
             });
      }, 1597);
      
  },

  methods: {
    init: function(cur) {
      var _self = this;
      var options = {
          param: {
              cur: cur,
              limit: 1,
              show: '*'
          },
          url: "orders",
          ctx: _self,
      };
      services.Common.list(options);
    }
  },
  mounted() {
    this.init(1);
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
