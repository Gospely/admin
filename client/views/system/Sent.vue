<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">已发送的消息</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看消息详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">

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
        columns: ['消息标题', '发送人', '发送时间'],

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
          title: '查看消息详情',
          event: 'open-monitor'
        },{
          icon: 'fa-remove',
          title: '删除该消息',
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


      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '删除该消息',
          // body: '确定要停止此Docker吗，一旦停止所有运行中的程序都将暂停',
          confirm: function(modal) {
            console.log('confirmed');
            modal.close();

            openNotification({
              title: '删除消息',
              message: '删除消息成功',
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
