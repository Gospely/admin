<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">用户组列表</h4>


          <p class="control">
            <button @click="newVersion" class="button is-primary">新增</button>
          </p>

          <view-table :all.sync="all" :total="10" :colspan="4"  v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:attribute-groups="attributeGroups"   :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>


<!-- 分配权限ｍｏｄｅｌ -->
      <card-modal :html.sync="true"   v-on:mounted="groupsAmmount" v-on:confirm="savePrivileges" transition="zoom" title="分配权限" :visible.sync="false">
        <div slot="modal-body">
          <div class="block">
            <view-table :total="10"  :all.sync="all1" :privileges.sync="privilegesData" :showcheck="true" :showOperations="false"  :fields.sync="privilegesFields" :columns.sync="privilegesColums"  ></view-table>
          </div>
        </div>
      </card-modal>

<!-- 新增用户组的ｍｏｄａｌ -->
      <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" :title.sync="formTitle" :visible.sync="false">

        <div slot="modal-body">
          <div class="block">
            <label class="label">用户组名称</label>
            <p class="control">
              <input class="input" v-model="name" type="text" placeholder="名称">
            </p>
            <label class="label">用户组类型</label>
            <p class="control">
              <textarea class="textarea"  v-model="file"></textarea>
            </p>

              <label class="label">权限</label>
              <p class="control">
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
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
      return {
        // ischeck: true,
        all:1,
        cur:1,
        all1:1,
        // length: this.all1,s
// 用户组信息
        columns: [{
          column: 'name',
          label: '用户组名称'
        },{
          column: 'type',
          label: '用户组类型'
        },{
          column: 'privileges',
          label: '权限'
        }],

          fields: [],

        // 权限列表信息
        privilegesColums: [{
          column: 'name',
          label: '权限名称'
        },{
          column: 'router',
          label: '路由'
        },{
          column: 'method',
          label: '请求方法'
        },{
          column: '',
          label: '操作'
        },],
        privilegesFields: [],
        privilegesData:[],  //选中的权限
        oldPrivilegesData:'',　//从数据库中取得的权限数据


        operations: [{
          icon: 'fa-street-view',
          title: '分配权限',
          event: 'attribute-groups'
        },{
          icon: 'fa-remove',
          title: '删除当前用户组',
          event: 'stop-docker'
        }],


        applicationForm: null,
        applicationDatail:{},

        groupsForm: null,
        groupsDatail: {},


        //新增用户组的数据
        dockerDetail: {},
        dockerDetailForm:null,
        name: null,
        file: null,
        lable: null,
        oldImages: [],
        id: "",
        state: 'NEW_VERSION',
        formTitle: ''

      }
    },


    methods: {
//新增用户组
        mounted: function(modal) {
          this.dockerDetailForm = modal;
        },
        newVersion: function() {
          this.state = 'NEW_VERSION';
          this.dockerDetail = {};
          this.formTitle = '新增用户组';
          this.dockerDetailForm.open();
        },


        save: function(id) {
          // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
          if(this.name==null & this.file==null & this.lable==null){
            this.dockerDetailForm.close();
            return;
          }else {

          if(this.name!=null){
          var _self = this;
          var options = {
              param: {
                  cur: 1, //当前页码
                  limit: 1,   //限制条数
                  show: 'id_name'
              },
              url: "images",
              ctx: _self,
              target:  'oldImages',
          };
          services.Common.list(options);

          for(var key in  this.oldImages){
              // alert(_self.oldImages[key].name);
            if(this.oldImages[key].name = this.name) {
                // alert(_self.oldImages[key].name);
                _self.state = 'DELI_VERSION';
                _self.id = this.oldImages[key].id;
                }
              }
          }
          var _self = this;
          　this.dockerDetailForm.close();
          if(this.state == 'NEW_VERSION') {
            //增加
            var options = {
              param: {
                contain: this.newImages,
              },
              msg: {
                  success:{
                    title: '新增用户组',
                    message: '新增用户组成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '新增用户组',
                    message: '新增用户组失败',
                    type: 'warning'
                  }
              },
              url: 'groups',
              ctx: self,
              reload: _self.init,
            };
            services.Common.create(options);
          }else {
            //修改
            var options = {
              param: {
                id: _self.id,
                type: _self.file,
                privileges: _self.lable,
              },
              msg: {
                  success:{
                    title: '修改用户组',
                    message: '修改用户组成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '修改用户组',
                    message: '修改用户组失败',
                    type: 'warning'
                  }
              },
              url: 'groups',
              ctx: self,
              reload: _self.init,
            };
            services.Common.update(options);

          }}},


// 分配权限
      groupsAmmount: function(modal){
        this.groupsForm = modal;
      },
      attributeGroups: function(data){
        // this.initcheckbox(data);
        var self = this;
        this.groupsForm.open();
        this.groupsDatail  = this.groupsFields;
        self.groupInit(data.id);
        this.initcheckbox();
      },
      groupInit: function(id){
        var _self = this;
        var options = {
          param: {
            limit:20,
            cur: 1,
            show: 'id_name_router_method',
          },
          url: 'privileges',
          ctx: _self,
          target: 'privilegesFields',
        };
        services.Common.list(options);
      },
      initcheckbox: function(){
        console.log("privilegesData",this.privilegesData);
        var _self = this;
       //  for(var in privilegesFields ){
       //     if(var.isCheck == true){
       //
       //     }
       //  }
       if(this.ischeck == true){
         this.privilegesData = _self.privilegesFields;
       }
     },
      savePrivileges: function(data){
          var _self = this;
          var options =　{
              param: {
                privileges:"th",
                id: data.id,
              },
              url: 'groups',
              ctx: _self,
              reload: _self.init,
          };
          services.Common.update(options);
      },


      pageChanged: function(currentPage) {
        console.log(currentPage);
        this.init(currentPage.currentPage);
      },


// 删除用户组
      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除用户组',
          body: '确定要删除该用户组吗，一旦删除将清除所有数据',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
                cur: 1,
              },
              msg: {
                  success:{
                    title: '删除用户组',
                    message: '删除用户组成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '删除用户组',
                    message: '删除用户组失败',
                    type: 'warning'
                  }
              },
              url: 'groups',
              ctx: _self,
              reload: _self.init //冲刷页面，当删除和更新操作，完成后重刷页面，更新数据
            };
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
                limit: 3,
                show: 'id_name_type_privileges'
            },
            url: "groups",
            ctx: _self,
        };
        services.Common.list(options);
      },

    },


    components: {
      ViewTable,
      CardModal
    },
    mounted() {
        var self = this;
        self.init(1);
    },

  }

</script>

<style lang="scss">


</style>
