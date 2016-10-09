<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">{{title}}</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" :operations.sync="operations" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor"  :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看docker详情" :visible.sync="false">

      <div slot="modal-body">
        <div　class="block">
          <label class="label">所属用户</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="所属用户" disabled>
          </p>
          <label class="label">容器ID</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.containerId" type="text" placeholder="容器ID" disabled>
          </p>
          <label class="label">创建时间</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.createdTime" type="text" placeholder="创建时间" disabled>
          </p>
          <label class="label">版本</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.version" type="text" placeholder="版本" disabled>
          </p>
        </div>
      </div>

    </card-modal>

  </div>
</template>

<script>

  import ViewTable from '../Table.vue'
  import CardModal from './CardModal.vue'

  export default {

    data: function() {

      var self = this;
      return {
        columns:[{
          column: '',
          label: '所属用户'
        },{
          column: '',
          label: '容器ID'
        },{
          column: '',
          label: '创建时间'
        },{
          column: '',
          label: '版本'
        },],
        fields: [],

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

    props: {

      title: {
        type: String,
        default () {
          return '运行中的IDE';
        }
      },
      
    },

    methods: {

      mounted: function(modal) {
        this.dockerDetailForm = modal;
        var self = this;
        self.init(1);
      },
      init: function(cur){
  // 动态加载运行中，已停止的ＩＤＥ的API
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
