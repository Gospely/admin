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
        <div　v-for="(value,key) in fieldsDetails" class="block">
          <label class="label">{{key}}</label>
          <p class="control">
            <input class="input" :v-model="value" type="text" :placeholder="value" disabled>
          </p>
        </div>
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


        fieldsDetails: {
          所属用户: 'Android',
          容器ＩＤ: '7d8ed9o05f',
          创建时间: '44 小时前',
          版本: '个人版'
        },

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
