
<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">用户列表</h4>
          <view-table v-on:see-application='seeApplication':radio.sync="radioo"  :showradio="false" :all.sync="all" :colspan="5" v-on:see-volumes= "seeVolumes" v-on:page-changed="pageChanged" v-on:  v-on:stop-docker="stopDocker" v-on:attribute-groups="attributeGroups" v-on:open-monitor="openMonitor" :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
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
            <input class="input is-danger" v-model="dockerDetails.ideName"  type="text" placeholder="IDE版本" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">邮箱</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.email"  type="text" placeholder="邮箱" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">用户类型</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.type"  type="text" placeholder="用户类型" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">所属分组</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.group"  type="text" placeholder="所属分组" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">用户分组</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.grop"  type="text" placeholder="用户分组" disabled>
            <i class="fa fa-warning"></i>
          </p>
             <label class="label">所属公司</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetails.company"  type="text" placeholder="所属公司" disabled>
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
            <label class="label">openId(unionID)</label>
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
          <view-table :total="10" :all.sync="appAll" 　:radio.sync="radioo"  :showradio="false" :showOperations="false" :fields.sync="appFields" :columns.sync="appColums" v-on:page-changed="appPageChanged" ></view-table>
        </div>
      </div>
    </card-modal>

<!-- 数据卷列表的ｍｏｄｅｌ -->
    <card-modal :html.sync="true" v-on:mounted="volumesMounted"   v-on:confirm="saveVolumes" transition="zoom" title="查看数据卷详情" :visible.sync="false">
      <div slot="modal-body">
        <div class="block">
          <view-table :all.sync="volumeAll" :radio.sync="radioo"  :showradio="false" :fields.sync="volumesFields"  :showOperations="false"  :columns.sync="volumesColums" ></view-table>
        </div>
      </div>
    </card-modal>


<!-- 分配用户组的ｍｏｄｅｌ -->
    <card-modal :html.sync="true" v-on:mounted="groupsAmmount" v-on:confirm="saveGroups" transition="zoom" title="分配用户组" :visible.sync="false">
      <div slot="modal-body">
        <div class="block">
          <view-table :all.sync ="groupAll" :renderRadio.sync="renderRadio"  v-on:radio-changed="watchRadio" :radio.sync="radioo"  :showradio="true"  :fields.sync="groupsFields" :columns.sync="groupColums"  ></view-table>
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
        renderRadio: false,
        radioo: "",// model, radio绑定的数据
        appAll: 1, //应用列表的分页
        groupAll:1, //分配用户组的分页
        all: 1,
        volumeAll:1,//数据卷列表的分页
        cur:1,
        currentUser: '',
        // 用户列表信息
        columns: [{
          column: 'name',
          label: '用户名（昵称）'
        },{
          column: 'ideName',
          label: 'IDE版本',
        },{
          column: 'type',
          label: '用户类型',
        },{
          column: 'teams',
          label: '所属小组',
        },{
          column: 'group',
          label: '用户分组',
        }],
        fields: [],
        // 应用列表信息
        appColums: [{
          column: 'name',
          label: '应用名称'
        },{
          column: 'port',
          label: '访问端口'
        },{
          column: 'source',
          label: '资源存储地址'
        },{
          column: 'domain',
          label: '域名'
        },{
          column: 'team',
          label: '所属团队'
        },{
          column: 'status',
          label: '状态'
        }],
        appFields: [],

        // 数据卷列表详情
          volumesColums: [{
            column: 'name',
            label: '数据卷名称',
          },{
            column: 'product',
            label: 'IDE版本',
          },{
            column: 'size',
            label: '大小',
          },{
            column: 'rest',
            label: '剩余容量',
          },{
            column: 'expireat',
            label: '到期时间',
          },{
            column: 'type',
            label: '存储类型',
          },{
            column: 'link',
            label: '访问地址',
          }],
          volumesFields: [],
          // 用户组信息
        groupColums: [{
          column: 'name',
          label: '用户组'
        },{
          column: 'type',
          label: '用户组类型'
        },{
          column: 'privileges',
          label: '权限'
        },],
        groupsFields: [],

        usersOperations: [{
          icon: 'fa-check-circle-o',
          title: '选中',
        }],
        operations: [{
          icon: 'fa-search-plus',
          title: '查看用户列表详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-square-o',
          title: '查看应用列表',
          event: 'see-application'
        },{
          icon: 'fa-street-view',
          title: '分配用户组',
          event: 'attribute-groups'
        },{
          icon: 'fa-database',
          title: '查看数据卷列表',
          event: 'see-volumes'
        },{
          icon: 'fa-remove',
          title: '删除当前用户',
          event: 'stop-docker'
        }],
        dockerDetailForm: null,
        dockerDetails: {},
        applicationForm: null,
        applicationDatail:{},
        volumesForm: null,
        volumesDatails: {},
        groupsForm: null,
        groupsDatail: {},
        activeRadio: "",
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
      },
      // 打开应用列表详情
      apMounted: function(modal){
        this.applicationForm = modal;
      },
      seeApplication: function(data){
        this.currentUser = data;
        this.initApplication(1);
        this.applicationForm.open();
      },
      initApplication: function(cur){
        var _self = this;
          var options = {
            param: {
                cur: cur,
                limit: 10,
                show: 'name_port_source_domain_members_team_creator_status',
                creator: _self.currentUser.id,
            },
            target:'appFields',
            all: "appAll",
            url: "applications",
            ctx: _self,
        };
        services.Common.list(options);
      },
      saveApplication: function(){
        this.applicationForm .close();
      },
      appPageChanged: function(currentPage) {
        //请求
          console.log(currentPage.currentPage);
          this.initApplication(currentPage.currentPage);
      },

      // 查看数据卷详情
      volumesMounted: function(modal){
        this.volumesForm = modal;
      },
      seeVolumes: function(data){
        this.volumesForm.open();
          this.currentUser = data;
          this.initVolumes(1);
      },
      saveVolumes: function(){
          this.volumesForm.close();
      },
      initVolumes: function(cur){
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 10,
                show: 'name_size_unit_rest_type_link_product_expireat', //要查询的列
                creator: _self.currentUser.id,
            },
            all: 'volumeAll',
            target: "volumesFields",
            url: "volumes",
            ctx: _self,
        };
        services.Common.list(options);
      },

      // 分配用户分组
      groupsAmmount: function(modal){
        this.groupsForm = modal;
      },
      defaultChcked: function(data){
          var self = this;
          console.log("self.groupsFields",self.groupsFields);
          for(var groupsDataill in self.groupsFields){
            if(self.groupsFields[groupsDataill].id == data.group){
              self.radioo = self.groupsFields[groupsDataill].id ;
            }};
      },
      attributeGroups: function(data){
        this.renderRadio = true;
        this.currentUser = data;
        this.initGroups(1,data);
        this.groupsForm.open();
      },
      initGroups: function(cur,target){
        var _self = this;
        var options = {
            param: {
                // cur: cur,
                // limit: ,
                show: 'id_name_type_privileges' //要查询的列

            },
            url: 'groups',
            // all: "groupAll",
            ctx: _self,
            target:"groupsFields",
            // cb: function(res){
            //     if(res.status == 200){
            //       var data = res.data;
            //       if(data.code == 1){
            //           _self.groupAll = data.all;
            //           _self.groupsFields = data.fields;
            //           _self.groupAll = data.groupAll;
            //           _self.defaultChcked(target);
            //       }
            //     }
            // },

        };
        services.Common.list(options);
      },
      watchRadio: function(radio){
        this.activeRadio = radio;
      },
      saveGroups: function(){
        var _self = this;
          this.groupsForm.close();
            var options = {
              param: {
                id: _self.currentUser.id,
                group:_self.activeRadio , //radioo为被选中的radio的Id.
              },
              msg: {
                  success:{
                    title: '分配用户组',
                    message: '分配用户组成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '分配用户组',
                    message: '分配用户组失败',
                    type: 'warning'
                  }
              },
              url: 'users',
              ctx: _self,
              reload: _self.init
            };
            services.Common.update(options);
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
                cur:1,
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
              reload: _self.init
            };
            services.Common.delete(options);
          }
        });
      },

      // 加载用户列表
      init: function(cur) {
        var _self = this;
        var options = {
            param: {
                cur: cur, //当前页码
                limit: 20,   //限制条数
                type: 'common',  //过滤参数
                show: 'id_name_phone_password_identify_ideName_email_type_teams_group_company_qq_photo_openId_realname_wechat' //要查询的列
            },
            url: "users", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
      },

      pageChanged: function(currentPage) {
        //请求
          console.log(currentPage.currentPage);
          this.init(currentPage.currentPage);
      },
      save: function(modal) {
        this.dockerDetailForm.close();
      },
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
