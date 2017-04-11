<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">容器镜像列表</h4>

          <p class="control">
            <button @click="newConfig" class="button is-primary">新增</button>
          </p>

          <view-table :all.sync="all" :total="10" v-on:page-changed="pageChanged"v-on:open-monitor="openMonitor" v-on:stop-docker="stopDocker" :operations="operations" :fields="fields" :columns="columns">
          </view-table>
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
          <label for="devLang" class="label">开发语言</label>
          <p class="control">
            <select name="" id="devLang">
            <option v-for="item in items" :value=item.id >{{item.name}}</option>
          </select>
          <label class="label">父级</label>
          <p class="control">
            <span class="select">
              <select>
                  <option value="选择品牌">选择品牌</option>
                  <option value="选择品牌1">选择品牌1</option>
                  <option value="选择品牌2">选择品牌2</option>
              </select>
            </span>
          </p>
          <label class="label">描述</label>
          <p class="control">
            <textarea class="textarea"  v-model="configDetail.description"></textarea>
          </p>
            <label class="label">标签</label>
          <p>
            <input type="text" class="input"　 v-model="configDetail.lable" >
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
        columns:[{
          column: 'name',
          label: '镜像名称'
        },{
          column: 'description',
          label: '描述'
        },{
          column: 'label',
          label: '标签'
        },],
        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '镜像详情',
          event: 'open-monitor'
        },{
          icon: 'fa-remove',
          title: '删除此版本',
          event: 'stop-docker'
        }],
        configDetailForm: null,
        configDetail: {},
        //新增镜像的数据
        name: null,
        file: null,
        lable: null,
        oldImages: [],
        id: "",
        items: "",

        state: 'NEW_VERSION', //EDIT_VERSION || NEW_VERSION
        content: false,
        oldImages: [],
        formTitle: '查看配置详情'
      }
    },

    methods: {

      mounted: function(modal) {
        this.configDetailForm = modal;
      },
      pageChanged: function(currentPage) {
        console.log(currentPage);
        this.init(currentPage.currentPage);
      },
      openMonitor: function(data) {
        this.id = data.id;
        this.configDetailForm.open();
        this.configDetail = data;
        this.state = 'EDIT_VERSION';
        this.formTitle = "查看容器镜像详情"
      },
      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除容器镜像',
          body: '确定要删除此容器镜像吗，一旦删除数据也将被删除',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
              },
              msg: {
                success: {
                  title: '删除容器镜像',
                  message: '删除容器镜像成功',
                  type: 'primary',
                },
                failed: {
                  title: '删除容器镜像',
                  message: '删除容器镜像失败',
                  type: 'warning',
                }
              },
              url: 'images',
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
        this.formTitle = '新增容器镜像';
        this.configDetailForm.open();
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
      save: function(id) {
        // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
        var _self = this;
        this.judgeNull();
        if(_self.content==false){
          this.configDetailForm.close();
          return;
        }else {
        if(this.name!=null){
        var _self = this;
        var options = {
            param: {
                cur: 1, //当前页码
                limit: 10,   //限制条数
                show: 'id_name'
            },
            url: "images",
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
        this.configDetailForm.close();
        if(_self.state == 'NEW_VERSION') {
          //增加
          var options = {
            param:  this.configDetail,
            msg: {
                success:{
                  title: '新增容器镜像',
                  message: '新增容器镜像成功',
                  type: 'primary'
                },
                failed: {
                  title: '新增容器镜像',
                  message: '新增容器镜像失败',
                  type: 'warning'
                }
            },
            url: 'images',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param: {
              id: _self.id,
              name:  _self.configDetail.name,
              description: _self.configDetail.description,
              label: _self.configDetail.lable,
            },
            msg: {
                success:{
                  title: '修改容器镜像',
                  message: '修改容器镜像成功',
                  type: 'primary'
                },
                failed: {
                  title: '修改容器镜像',
                  message: '修改容器镜像失败',
                  type: 'warning'
                }
            },
            url: 'images',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.update(options);
        }};
        _self.content = false;
    },

    init: function(cur) {
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 10,
                show: 'id_name_description_label'
            },
            url: "images",
            ctx: _self,
        };
        services.Common.list(options);
      },

      initParents: function() {
        var _self = this;
        var options = {
            param: {
                show: 'id_name',
                parent:'0'
            },
            url: "images",
            target: 'items',
            ctx: _self,
        };
        services.Common.list(options);
      }
    },

    components: {
      ViewTable,
      CardModal
    },
    mounted: function(){
      var self = this;
        self.init(1);
        self.initParents();
    }
}

</script>

<style lang="scss">


</style>
