<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">运行中IDE</h4>
          <view-table :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  
  import ViewTable from '../components/Table.vue'

  export default {

    data: function() {
        return {
          columns: ['所属用户', '容器ID', '创建时间'],

          fields: [{
            creator: 'Android',
            containerId: '7d8ed9o05f',
            createdTime: '44 小时前'
          },{
            creator: 'iOS',
            containerId: '7d8ed9o05f',
            createdTime: '54 小时前'
          }],

          operations: [{
            icon: 'fa-search-plus',
            title: '监控详情'
          }, {
            icon: 'fa-refresh',
            title: '重新启动'
          }, {
            icon: 'fa-remove',
            title: '停止当前容器'
          }]
        }
    },

    methods: {
    },

    components: {
      ViewTable
    }

  }

</script>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
