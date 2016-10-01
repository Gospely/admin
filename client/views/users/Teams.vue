<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">组织管理</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看组织详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block" v-for="(val , key) in teamsDatils">
          <label class="label">{{key}}</label>
          <p class="control">
            <input class="input" v-model="val" type="text" placeholder="val" disabled>
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
        columns: ['小组名称', '团队成员', '团队应用', '过期时间','创建者'],

        fields: [{
          teamsName: 'Android',
          teamsNumber: '7d8ed9o05f',
          teamsApplication: '44 小时前',
          teamsExpiredat: '个人版',
          teamsCreator:'xxx'
        },{
          teamsName: 'Android',
          teamsNumber: '7d8ed9o05f',
          teamsApplication: '44 小时前',
          teamsExpiredat: '个人版',
          teamsCreator:'xxx'
        },
      {
        teamsName: 'Android',
        teamsNumber: '7d8ed9o05f',
        teamsApplication: '44 小时前',
        teamsExpiredat: '个人版',
        teamsCreator:'xxx'
      }],
// 组织管理详情
      teamsDatils: {
        小组名称: 'Android',
        团队成员: '7d8ed9o05f',
        团队应用: '44 小时前',
        过期时间: '个人版',
        创建者:'xxx'
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
          title: '删除该小组',
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
      },

      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur, //当前页码
                limit: 1,   //限制条数
                show: 'id_name_members_applications_expiredat_creator' //要查询的列
            },
            url: "teams", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
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
