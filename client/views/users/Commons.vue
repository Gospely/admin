
<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">用户列表</h4>


          <view-table :all.sync="all" :colspan="4" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:attribute-groups="attributeGroups" v-on:open-monitor="openMonitor" v-on:see-application='seeApplication' :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>
<!-- 用户列表的ｍｏｄｅｌ -->
    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看用户列表详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">用户名（昵称）</label>
          <p class="control">
            <input class="input" v-model="dockerDetails.name" type="text" placeholder="用户名（昵称）" disabled>
          </p>
          <label class="label">手机</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetails.phone"  type="text" placeholder="手机" disabled>
            <i class="fa fa-check"></i>
          </p>
          <label class="label">密码</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.password"  type="text" placeholder="密码" disabled>
            <i class="fa fa-warning"></i>
          </p>
           <label class="label">身份证</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.identify"  type="text" placeholder="身份证" disabled>
            <i class="fa fa-warning"></i>
          </p>
           <label class="label">IDE版本</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="IDE版本" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">邮箱</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="邮箱" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">用户类型</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="用户类型" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">所属分组</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="所属分组" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">用户分组</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="用户分组" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">所属公司</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.ide"  type="text" placeholder="所属公司" disabled>
            <i class="fa fa-warning"></i>
          </p>
            <label class="label">qq号</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.qq"  type="text" placeholder="qq号" disabled>
            <i class="fa fa-warning"></i>
          </p>
            <label class="label">头像</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.photo"  type="text" placeholder="头像" disabled>
            <i class="fa fa-warning"></i>
          </p>
            <label class="label">openId（unionID）</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.openId"  type="text" placeholder="openId（unionID）" disabled>
            <i class="fa fa-warning"></i>
          </p>
            <label class="label">真实姓名</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.realname"  type="text" placeholder="真实姓名" disabled>
            <i class="fa fa-warning"></i>
          </p>
            <label class="label">微信昵称</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.wechat"  type="text" placeholder="微信昵称" disabled>
            <i class="fa fa-warning"></i>
          </p>

        </div>
      </div>

    </card-modal>


    <!-- 应用列表的ｍｏｄｅｌ -->
      <card-modal :html.sync="true" v-on:mounted="apMounted" v-on:confirm="saveApplication" transition="zoom" title="查看应用列表" :visible.sync="false">
        <div slot="modal-body">
          <div class="block">

            <view-table :all.sync="all2"  :fields.sync="appFields" :columns.sync="appColums" :operations.sync='usersOperations' ></view-table>

          </div>
        </div>
      </card-modal>


<!-- 用户组信息的ｍｏｄｅｌ -->
      <card-modal :html.sync="true" v-on:mounted="groupsAmmount" v-on:confirm="saveGroups" transition="zoom" title="分配用户组" :visible.sync="false">
        <div slot="modal-body">
          <div class="block">
            <view-table :total="10"  :fields.sync="groupsFields" :columns.sync="groupColums" :operations.sync='usersOperations' ></view-table>
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
      return {
        all2: 1,
        all: 1,
// 用户列表信息
        columns: ['用户名（昵称）', '手机', '密码', '身份证'],
        fields: [{
          name: 'gospel',
          phone: '14506078834',
          password: '1234567890',
          identify: '612429199923455764',
        },{
         name: 'kimi',
          phone: '15970457619',
          password: 'qwerty',
          identify: '61031140495',
        }],

// 应用列表信息
        appColums: ['应用名称','访问端口','资源存储地址','域名'],
        appFields: [{
            none: '',
          name: '',
          port: '14506078834',
          sshPort: '',
          source: '612429199923455764',
        }],
// 用户组信息
        groupColums: ['用户组','用户组类型','权限'],
        groupsFields: [{
          none: '',
          group: '用户组名称',
          type: '用户组类型',
          privileges: '权限'
        }],


        usersOperations: [{
          icon: 'fa-check-circle-o',
          title: '选中',
        }],
        operations: [{
          icon: 'fa-search-plus',
          title: '查看用户列表详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-street-view',
          title: '分配用户组',
          event: 'attribute-groups'
        },{
          icon: 'fa-square-o',
          title: '查看应用列表',
          event: 'see-application'
        },{
          icon: 'fa-remove',
          title: '删除当前用户',
          event: 'stop-docker'
        }],
        dockerDetailForm: null,
        dockerDetail: {},
        dockerDetails: {},
        applicationForm: null,
        applicationDatail:{},
        groupsForm: null,
        groupsDatail: {}
      }
    },
    methods: {
// 打开用户列表详情
      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },
      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetails = data;
        console.log(data);
      },
// 打开应用列表详情
      apMounted: function(modal){
        this.applicationForm = modal;
      },
      seeApplication: function(data){
        this.applicationForm.open();
        this.applicationDatail = data;
          console.log(data);
          var self = this;
          self.initApplication(data.id);
      },
// 分配用户分组
      groupsAmmount: function(modal){
        this.groupsForm = modal;
      },
      attributeGroups: function(data){
        this.groupsForm.open();
        this.groupsDatail  = data;
        var self = this;
        self.initGroups(data.id);
        console.log(data);
      },
      pageChanged: function(currentPage) {
        //请求
          console.log(currentPage.currentPage);
          this.init(currentPage.currentPage);
      },
      save: function(modal) {
        this.dockerDetailForm.close();
      },
      saveApplication: function(){
          this.applicationForm.close();
      },
      saveGroups: function(){
          this.groupsForm.close();
          openNotification({
            title: '分配用户组',
            message: '分配用户组成功',
            type: 'primary'
          })
      },
      // 删除用户
      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除用户',
          body: '确定要删除该用户吗，一旦删除将清除所有数据',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
              },
              msg: {
                  success:{
                    title: '删除用户',
                    message: '删除用户成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '删除用户',
                    message: '删除用户失败',
                    type: 'warning'
                  }
              },
              url: 'users',
              ctx: _self,
              reload: _self.init //冲刷页面，当删除和更新操作，完成后重刷页面，更新数据
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
                cur: cur, //当前页码
                limit: 1,   //限制条数
                type: 'common',  //过滤参数
                show: 'id_name_phone_password_identify_ide_email_teams_group_company_qq_photo_openId_realname_wechat' //要查询的列
            },
            url: "users", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
      },
      initGroups: function(id){
        // console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                limit: 1,
                id: id,

                show: 'id_name_type_privileges' //要查询的列
            },
            target: "groupsFields",
            url: "groups",
            ctx: _self,
        };
        services.Common.list(options);
        // console.log("groupsFields");
      },
      initApplication: function(id){
        // console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                limit: 1,
                id: id,
                show: 'name_port_source_domain_members_team_creator' //要查询的列
            },
            target: "appFields",
            url: "applications",
            ctx: _self,
        };
        services.Common.list(options);
        // console.log("groupsFields");
      }
    },
    components: {
      ViewTable,
      CardModal
    },
    //初始化页面数据
    mounted() {
        var self = this;
        self.init(1);
    }
  }
</script>

<style lang="scss">
</style>
