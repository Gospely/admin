<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">订单统计</h4>
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
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ],
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
    }
  },

  created () {
    setInterval(() => {
      this.series.unshift(this.series.pop())
    }, 1597)
  }
}
</script>

<style scoped>
.lines-bars {
  height: 240px;
}
</style>
