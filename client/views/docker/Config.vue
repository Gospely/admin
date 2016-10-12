<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">容器配置列表</h4>

          <p class="control">
            <button @click="newConfig" class="button is-primary">新增</button>
          </p>

          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" :title.sync="formTitle" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">名称</label>
          <p class="control">
            <input class="input" v-model="configDetail.name" type="text" placeholder="名称">
          </p>
          <label class="label">内存</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="configDetail.memory"  type="text" placeholder="内存">
            <i class="fa fa-check"></i>
          </p>
          <label class="label">CPU</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.cup"  type="text" placeholder="CPU">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">CPU类型</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.cpuType"  type="text" placeholder="CPU类型">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">是否免费</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.free"  type="text" placeholder="是否免费">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">价格</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.price"  type="text" placeholder="价格">
            <i class="fa fa-warning"></i>
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
        columns: [{
          column: 'name',
          label: 'docker名称'
        },{
          column: 'config',
          label: 'docker配置'
        },{
          column: 'decription',
          label: '描述'
        },{
          column: 'creator',
          label: '创建人'
        },{
          column: 'sshPort',
          label: 'ssh访问端口'
        },{
          column: 'port',
          label: 'docker对外暴露端口'
        },],

        fields: [],
        operations: [{
          icon: 'fa-search-plus',
          title: '监控详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-remove',
          title: '删除此版本',
          event: 'stop-docker'
        }],

        configDetailForm: null,
        configDetail: {},

        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION
        id: '',
        oldImages: [],
        formTitle: '查看配置详情',
        content: false,
      }
    },

    methods: {

      mounted: function(modal) {
        this.configDetailForm = modal;
      },

      openMonitor: function(data) {
        this.configDetailForm.open();
        this.configDetail = data;
        this.state = 'EDIT_VERSION';
        this.formTitle = '查看配置详情'
      },

      pageChanged: function(currentPage) {
        console.log(currentPage);
      },
      judgeNull: function(){
        var _self = this;
        console.log("_self.configDetail",_self.configDetail);
        for(var val in _self.configDetail){
          if(val != null){
            _self.content = true;
            break;
          }
        }
      },

      save: function(modal) {
        this.judgeNull();
        console.log(this.content);
        var _self = this;
        if(_self.content==false){
          _self.configDetailForm.close();
          return;
        }else {
        if(_self.name!=null){
        var options = {
            param: {
                cur: 1,
                limit: 1,  //limit应该是全部的值．
                show: 'id_name'
            },
            url: "dockers",
            ctx: _self,
            target:  'oldImages',
        };
        services.Common.list(options);
        for(var key in  _self.oldImages){
          if(_self.oldImages[key].name = _self.name) {
              _self.state = 'DELI_VERSION';
              _self.id = this.oldImages[key].id;
              }
            }
        }
        　_self.configDetailForm.close();
        if(_self.state == 'NEW_VERSION') {
          //增加
          // _self.dockerDetail.type = 'docker';
          var options = {
            param: _self.configDetail,
            msg: {
                success:{
                  title: '新增docker配置',
                  message: '新增docker配置成功',
                  type: 'primary'
                },
                failed: {
                  title: '新增docker配置',
                  message: '新增docker配置失败',
                  type: 'warning'
                }
            },
            url: 'dockers',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param: {
              cur:1,
              id: _self.id,
              config: _self.configDetail.config,
              image: _self.configDetail.image,
              description: _self.configDetail.description,
              creator: _self.configDetail.creator,
              sshPort: _self.configDetail.sshPort,
              port: _self.configDetail.port,
              username: _self.configDetail.username,
              password: _self.configDetail.password,
              volume: _self.configDetail.volume,
              expireat: _self.configDetail.expireat,
            },
            msg: {
                success:{
                  title: '修改docker配置',
                  message: '修改docker配置成功',
                  type: 'primary'
                },
                failed: {
                  title: '修改docker配置',
                  message: '修改docker配置失败',
                  type: 'warning'
                }
            },
            url: 'dockers',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.update(options);
        }};
          this.content = false;
      },

      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除配置信息',
          body: '确定要删除此配置吗，一旦删除所有子元素也将被删除',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
              },
              msg: {
                success: {
                  title: '删除配置信息',
                  message: '删除配置信息成功',
                  type: 'primary',
                },
                failed: {
                  title: '删除配置信息',
                  message: '删除配置信息失败',
                  type: 'warning',
                }
              },
              url: 'dockers',
              ctx: _self,
              reload: _self.init,
            }
             services.Common.delete(options)
          }
        });
      },

      newConfig: function() {
        this.state = 'NEW_VERSION';
        this.configDetail = {};
        this.formTitle = '新增配置';
        this.configDetailForm.open();
      },
      init: function(cur) {
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 1,
                show: 'id_name_sshPort_config_image_description_creator_port_username_password_volume_expireat'
            },
            url: "dockers",
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
