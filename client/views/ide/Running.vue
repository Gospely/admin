<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">运行中IDE</h4>
          <view-table v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看docker详情" :visible.sync="false">
      
      <div slot="modal-body">
        <div class="block">
          <label class="label">所属用户</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="所属用户" disabled>
          </p>
          <label class="label">容器ID</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.containerId"  type="text" placeholder="容器ID" disabled>
            <i class="fa fa-check"></i>
          </p>
          <label class="label">创建时间</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="创建时间" disabled>
            <i class="fa fa-warning"></i>
          </p>
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
        columns: ['所属用户', '容器ID', '创建时间', '版本'],

        fields: [{
          creator: 'Android',
          containerId: '7d8ed9o05f',
          createdTime: '44 小时前',
          version: '个人版'
        },{
          creator: 'iOS',
          containerId: '7d8ed9o05f',
          createdTime: '54 小时前',
          version: '个人版'
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

        dockerDetailForm: null,
        dockerDetail: {}
      }
    },

    methods: {

      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },

      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
      },

      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
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

            openNotification({
              title: '停止Docker',
              message: '停止Docker成功',
              type: 'primary'
            })

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
