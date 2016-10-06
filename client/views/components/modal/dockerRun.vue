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
          <label class="label">容器名称</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.name" type="text" :placeholder="容器名称" disabled>
          </p>
          <label class="label">容器配置</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.config" type="text" :placeholder="容器配置" disabled>
          </p>
          <label class="label">创建人</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.creator" type="text" :placeholder="创建人" disabled>
          </p>
          <label class="label">SSH访问端口</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.sshPort" type="text" :placeholder="SSH访问端口" disabled>
          </p>
          <label class="label">docker对外暴露端口</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.port" type="text" :placeholder="docker对外暴露端口" disabled>
          </p>
          <label class="label">ssh登录用户名</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.username" type="text" :placeholder="ssh登录用户名" disabled>
          </p>
          <label class="label">挂载数据卷</label>
          <p class="control">
            <input class="input" :v-model="dockerDetail.volume" type="text" :placeholder="挂载数据卷" disabled>
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
        columns: ['容器名称', '容器配置', '创建人', 'SSH访问端口','docker对外暴露端口'],
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
