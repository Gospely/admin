<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">权限列表</h4>

                    <p class="control">
                      <button @click="newVersion" class="button is-primary">新增</button>
                    </p>


          <view-table  :all.sync="all" :showOperations='true' :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="deletePrivileges"  v-on:open-datail="openDatail"v-on:open-monitor="openMonitor" :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>
    <!-- 查看拥有权限的用户组 -->
    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看拥有该权限的用户组" :visible.sync="false">

      <div slot="modal-body">
            <view-table  :showOperations='false' :total="10"  :fields.sync="groupsFields" :columns.sync="groupscolumns"></view-table>
        </div>

    </card-modal>
      <!-- 新增权限的ｍｏｄａｌ -->
    <card-modal :html.sync="true" v-on:mounted="newMounted" v-on:confirm="change" transition="zoom" :title.sync="formTitle" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">权限名称</label>
          <p class="control">
            <input class="input" v-model="dockerDetails.name" type="text" placeholder="名称">
          </p>
          <label class="label">路由</label>
          <p class="control">
            <input class="input" v-model="dockerDetails.router" type="text" placeholder="路由">
          </p>

            <label class="label">请求方法</label>
            <p class="control">
              <input class="input" v-model="dockerDetails.method" type="text" placeholder="请求方法">
            </p>
            <label class="label">拥有该权限的用户组</label>
            <p class="control">
              <input class="input" v-model="dockerDetails.groups" type="text" placeholder="用户组">
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
      var self = this;
      return {
        all:1,
        cur:1,
        columns: [{
          column: 'name',
          label: '权限名称'
        },{
          column: 'router',
          label: '路由'
        },{
          column: 'method',
          label: '请求方法'
        },{
          column: 'groups',
          label: '拥有权限的用户组'
        },],
        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '查看权限列表详情',
          event: 'open-datail'
        },{
          icon: 'fa-user',
          title: '拥有该权限的用户组详情',
          event: 'open-monitor'
        },{
          icon: 'fa-remove',
          title: '删除该权限',
          event: 'stop-docker'
        }],

        // 拥有该权限的用户组的信息
        dockerDetailForm: null,
        dockerDetail: {},
        groupsFields:[],
        groupscolumns: [{
          column: 'name',
          label: '用户组名称'
        },{
          column: 'type',
          label: '用户组类型'
        },],

        //新增权限的数据
        dockerDetails: {},
        dockerDetailsForm:null,
        name: null,
        file: null,
        lable: null,　　//上面三个为用户输入数据
        oldImages: [],  //将从数据库中查到的数据存储在这个数组中
        id: "",
        state : 'DELI_VERSION',　　　
        formTitle: '',
        content: false,

      }
    },

    methods: {
      //新增和修改权限
              newMounted: function(modal) {
                this.dockerDetailsForm = modal;
              },
              newVersion: function() {
                this.state = 'NEW_VERSION';
                this.dockerDetails = {};
                this.formTitle = '新增权限';
                this.dockerDetailsForm.open();
              },
              openDatail: function(data){
                this.dockerDetails = data;
                this.formTitle = '查看权限详情';
                this.dockerDetailsForm.open();
              },
              judgeNull: function(){
                var _self = this;
                console.log("_self.configDetail",_self.dockerDetail);
                for(var val in _self.dockerDetails){
                  if(val != null){
                    _self.content = true;
                    break;
                  }
                }
              },
              change: function() {
                // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
                var _self = this;
                this.judgeNull();
                if(_self.content==false){
                  _self.dockerDetailsForm.close();
                  return;
                }else {
                if(_self.name!=null){
                var options = {
                    param: {
                        show: 'id_name'
                    },
                    url: "privileges",
                    ctx: _self,
                    target:  'oldImages',
                };
                services.Common.list(options);
                for(var key in  _self.oldImages){
                    // alert(_self.oldImages[key].name);
                  if(_self.oldImages[key].name = _self.name) {
                      // alert(_self.oldImages[key].name);
                      _self.state = 'DELI_VERSION';
                      _self.id = this.oldImages[key].id;
                      }
                    }
                }
                　this.dockerDetailsForm.close();
                if(_self.state == 'NEW_VERSION') {
                  //增加
                  var options = {

                    param: _self.dockerDetails,
                    msg: {
                        success:{
                          title: '新增IDE版本',
                          message: '新增IDE版本成功',
                          type: 'primary'
                        },
                        failed: {
                          title: '新增IDE版本',
                          message: '新增IDE版本失败',
                          type: 'warning'
                        }
                    },
                    url: 'privileges',
                    ctx: _self,
                    reload: _self.init,
                  };
                  services.Common.create(options);
                }else {
                  //修改
                  var options = {
                    param: {
                      id: _self.id,
                      name: _self.dockerDetails.name,
                      router: _self.dockerDetails.file,
                      method: _self.dockerDetails.lable,
                      groups: _self.dockerDetails.groups,
                    },
                    msg: {
                        success:{
                          title: '修改IDE版本',
                          message: '修改IDE版本成功',
                          type: 'primary'
                        },
                        failed: {
                          title: '修改IDE版本',
                          message: '修改IDE版本失败',
                          type: 'warning'
                        }
                    },
                    url: 'privileges',
                    ctx: _self,
                    reload: _self.init,
                  };
                  services.Common.update(options);
                }};
                _self.content = false;
              },
              // 查看拥有该权限的用户组
              mounted: function(modal) {
                this.dockerDetailForm = modal;
              },

              openMonitor: function(data) {
                this.dockerDetailForm.open();
                this.dockerDetail = this.groupsFields;
                var _self = this;
                var options = {
                    param: {
                      privileges: data.id,
                        show: 'name_type' //要查询的列
                    },
                    target: 'groupsFields',
                    url: "groups", //操作的表 实体（根据这个生产请求url）
                    ctx: _self,  //当前vue（this）
                };
                services.Common.list(options);
              },

              save: function(modal) {
                this.dockerDetailForm.close();
              },
              pageChanged: function(currentPage) {
                this.init(currentPage.currentPage);
              },
              deletePrivileges: function(data) {
                var _self = this;
                var Modal = openAlertModal({
                  title: '删除权限',
                  body: '确定要删除该权限吗，一旦删除将清除所有数据',
                  confirm: function(modal) {
                    modal.close();
                    var options = {
                      param: {
                        id: data.id,
                        cur: 1,
                      },
                      msg: {
                          success:{
                            title: '删除权限',
                            message: '删除权限成功',
                            type: 'primary'
                          },
                          failed: {
                            title: '删除权限',
                            message: '删除该权限失败',
                            type: 'warning'
                          }
                      },
                      url: 'privileges',
                      ctx: _self,
                      reload: _self.init
                    };
                    services.Common.delete(options);
                  }
                });
              },
              init: function(cur) {
                var _self = this;
                var options = {
                    param: {
                        cur: cur,
                        limit: 4,
                        show: 'id_name_router_method_groups'
                    },
                    url: "privileges",
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
