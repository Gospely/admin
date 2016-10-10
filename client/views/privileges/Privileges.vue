<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">权限列表</h4>

                    <p class="control">
                      <button @click="newVersion" class="button is-primary">新增</button>
                    </p>


          <view-table  :all.sync="all" :showOperations='true' :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
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
                  <input class="input" v-model="name" type="text" placeholder="名称">
                </p>
                <label class="label">路由</label>
                <p class="control">
                  <input class="input" v-model="file" type="text" placeholder="路由">
                </p>

                  <label class="label">请求方法</label>
                  <p class="control">
                    <input class="input" v-model="lable" type="text" placeholder="请求方法">
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
        state: 'NEW_VERSION',
        formTitle: '',



      }
    },

    methods: {
      //新增权限
              newMounted: function(modal) {
                this.dockerDetailsForm = modal;
              },
              newVersion: function() {
                this.state = 'NEW_VERSION';
                this.dockerDetails = {};
                this.formTitle = '新增权限';
                this.dockerDetailsForm.open();
              },


              change: function(id) {
                // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
                if(this.name==null & this.file==null & this.lable==null){
                  this.dockerDetailsForm.close();
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
                    url: "privileges",
                    ctx: _self,
                    target:  'oldImages',
                };
                services.Common.list(options);

                for(var key in  this.oldImages){
                  if(this.oldImages[key].name = this.name) {
                      _self.state = 'DELI_VERSION';
                      _self.id = this.oldImages[key].id;
                      }
                    }
                };
                var _self = this;
                　this.dockerDetailsForm.close();
                if(this.state == 'NEW_VERSION') {
                  //增加
                  var options = {
                    param: {
                      contain: this.newImages,
                    },
                    msg: {
                        success:{
                          title: '新增权限',
                          message: '新增权限成功',
                          type: 'primary'
                        },
                        failed: {
                          title: '新增权限',
                          message: '新增权限失败',
                          type: 'warning'
                        }
                    },
                    url: 'privileges',
                    ctx: self,
                    reload: _self.init,
                  };
                  services.Common.create(options);
                }else {
                  //修改
                  var options = {
                    param: {
                      id: _self.id,
                      router: _self.file,
                      method: _self.lable,
                    },
                    msg: {
                        success:{
                          title: '修改权限',
                          message: '修改权限成功',
                          type: 'primary'
                        },
                        failed: {
                          title: '修改权限',
                          message: '修改权限失败',
                          type: 'warning'
                        }
                    },
                    url: 'privileges',
                    ctx: self,
                    reload: _self.init,
                  };
                  services.Common.update(options);

                }}},

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
                cur: cur, //当前页码
                limit: 1,   //限制条数
                show: 'id_name_router_method_groups' //要查询的列
            },
            url: "privileges", //操作的表 实体（根据这个生产请求url）
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
