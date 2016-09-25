<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">运行中IDE</h4>
          <view-table v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:confirm="save" transition="zoom" title="查看docker详情" :visible.sync="showDockerDetailForm">
      
      <div slot="modal-body">
      {{showDockerDetailForm}}
      </div>

    </card-modal>

  </div>
</template>

<script>
  
  import ViewTable from '../components/Table.vue'
  import CardModal from '../components/modal/CardModal.vue'

  export default {

    data: function() {
      var self = this;
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
          title: '监控详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-refresh',
          title: '重新启动',
          event: 'refresh-docker'
        }, {
          icon: 'fa-remove',
          title: '停止当前容器',
          event: 'stop-docker'
        }],

        showDockerDetailForm: true
      }
    },

    methods: {

      openMonitor: function(data) {
        console.log('open-monitor', data.creator);
        this.showDockerDetailForm = true;
        console.log(this.showDockerDetailForm);
      },

      save: function(modal) {
        console.log('save');
        modal.close();
      },

      refreshDocker: function(data) {
        openNotification({
          title: '重启Docker',
          message: '重启Docker成功',
          type: 'primary'
        })
      },

      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '停止Docker',
          body: '确定要停止此Docker吗，一旦停止所有运行中的程序都将暂停',
          confirm: function(modal) {
            console.log('confirmed');
            modal.close();
          }
        });
      }

    },

    components: {
      ViewTable,
      CardModal
    }

  }

</script>

<style lang="scss">


</style>
