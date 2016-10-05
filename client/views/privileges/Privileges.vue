<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">权限列表</h4>

                    <p class="control">
                      <button @click="newVersion" class="button is-primary">新增</button>
                    </p>


          <view-table :showOperations='false' :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看权限详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">所属用户</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="所属用户" disabled>
          </p>
          <label class="label">容器ID</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.containerId"  type="text" placeholder="容器ID" disabled>
            <i class="fa fa-check"></i>
          </p>
          <label class="label">创建时间</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="创建时间" disabled>
            <i class="fa fa-warning"></i>
          </p>
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
        columns: ['权限名称', '路由', '请求方法', '拥有权限的用户组'],

        fields: [],

        operations: [{
          icon: 'fa-user',
          title: '查看拥有该权限的用户',
          event: 'open-monitor'
        },{
          icon: 'fa-remove',
          title: '删除该权限',
          event: 'stop-docker'
        }],

        dockerDetailForm: null,
        dockerDetail: {},
        //新增权限的数据
        dockerDetail: {},
        dockerDetailForm:null,
        name: null,
        file: "",
        lable: "",
        oldImages: [],
        id: "",
        state: 'NEW_VERSION',
        formTitle: ''

      }
    },

    methods: {
      //新增权限
              newMounted: function(modal) {
                this.dockerDetailForm = modal;
              },
              newVersion: function() {
                this.state = 'NEW_VERSION';
                this.dockerDetail = {};
                this.formTitle = '新增权限';
                this.dockerDetailForm.open();
              },


              change: function(id) {
                // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
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

                }},


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
