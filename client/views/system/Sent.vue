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
        fields: [],

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
          var _self = this;
              var options = {
                param: {
                  id: data.id,
                },
                msg: {
                    success:{
                      title: '删除消息',
                      message: '删除消息成功',
                      type: 'primary'
                    },
                    failed: {
                      title: '删除消息',
                      message: '删除消息失败',
                      type: 'warning'
                    }
                },
                url: 'notices',
                ctx: _self,
                reload: _self.init
              }
              services.Common.delete(options);
        },

      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 1,
                sender: 1,
            },
            url: "notices",
            ctx: _self,
        };
        services.Common.list(options); 
      }

    },

    components: {
      ViewTable,
      CardModal
    },
    mounted() {
        var self = this;
        self.init(1);
    }

  }

</script>

<style lang="scss">


</style>
