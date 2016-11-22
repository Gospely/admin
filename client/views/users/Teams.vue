<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">组织管理</h4>
          <view-table :all.sync="all" :total="10" v-on:page-changed="pageChanged"  v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看组织详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block" >
          <label class="label">小组名称</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.name" type="text" placeholder="小组名称" disabled>
          </p>
          <label class="label">团队成员</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.members" type="text" placeholder="团队成员" disabled>
          </p>
          <label class="label">团队应用</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.applications" type="text" placeholder="团队应用" disabled>
          </p>
          <label class="label">过期时间</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.expiredat" type="text" placeholder="过期时间" disabled>
          </p>
          <label class="label">创建者</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="创建者" disabled>
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
        all:1,
        cur:1,
        columns:[{
          column:'name',
          label:'小组名称'
        },{
          column:'members',
          label:'团队成员'
        },{
          column:'applications',
          label:'团队应用'
        },{
          column:'expireat',
          label:'过期时间'
        },{
          column:'creator',
          label:'创建者'
        },],

        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '组织详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-remove',
          title: '删除该小组',
          event: 'stop-docker'
        }],

        dockerDetailForm: null,
        dockerDetail: {}
      }
    },

    methods: {

      mounted: function(modal) {
        this.dockerDetailForm = modal;
        var self = this;
        self.init(1);
      },

      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
      },
      pageChanged: function(currentPage) {
        var self = this;
        self.init(currentPage.currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },

      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除该组织',
          body: '确定要删除该组织吗？　一旦删除数据将不可恢复',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
                cur:1,
              },
              msg: {
                  success:{
                    title: '删除组织',
                    message: '删除组织成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '删除用户',
                    message: '删除该组织失败',
                    type: 'warning'
                  }
              },
              url: 'teams',
              ctx: _self,
              reload: _self.init
            }
            services.Common.delete(options);
          }
        });
      },
      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 1,
                show: 'id_name_members_applications_expireat_creator'
            },
            url: "teams",
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
