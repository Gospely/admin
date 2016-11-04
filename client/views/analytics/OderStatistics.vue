<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">订单统计</h4>
          <chart :type="'line'" :data="seriesData" :options="options_3"></chart>
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

    labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
    cpuData: [
      [65, 59, 90, 81, 56, 55, 40],
    ],
    cpuSeries: ['CPU使用率(%)'],
    cpuBackgroundColor: [
      'rgba(31, 200, 219, 1)',
    ],
    options_3: {
      tooltips: {
        mode: 'label'
      }
    },
  }
},

  created () {
    setInterval(() => {
      // https://vuejs.org/guide/list.html#Mutation-Methods
      this.data_3.unshift(this.data_3.pop())
    }, 377)
  },

  computed: {
    seriesData () {
      let data = {
        labels: this.labels_3
      }
      data.datasets = this.cpuSeries.map((e, i) => {
        return {
          data: this.cpuData[i],
          label: this.cpuSeries[i],
          borderColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)'),
          pointBackgroundColor: this.cpuBackgroundColor[i],
          backgroundColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)')
        }
      })
      return data
    },
  },

}

</script>

<style scoped>
.lines-bars {
  height: 240px;
}
</style>
