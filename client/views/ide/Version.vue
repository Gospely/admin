<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">IDE版本管理</h4>

          <p class="control">
            <button @click="newVersion" class="button is-primary">新增</button>
          </p>

          <view-table :all.sync="all" :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>


<!-- 查看详情和新增IDE公用一个ｍｏｄａｌ -->
    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" :title.sync='formTitle' :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">IDE名称</label>
          <p class="control">
            <input class="input"v-on:onblur="checkformat" v-bind:class="classObject" v-model="dockerDetail.name" type="text" placeholder="IDE名称">
            <i v-bind:class="{'fa fa-warning': fawarning }"></i>
          </p>
          <label class="label">团队数量限制</label>
          <p class="control has-icon has-icon-right">
            <input class="input" v-on:onblur="checkformat" v-bind:class="classObject" v-model="dockerDetail.teamLimit"  type="text" placeholder="团队数量限制">
            <i v-bind:class="{'fa fa-warning': fawarning }"></i>
          </p>
          <label class="label">人数限制</label>
          <p class="control has-icon has-icon-right">
            <input class="input"v-on:onblur="checkformat" v-bind:class="classObject" v-model="dockerDetail.peopleLimit"  type="text" placeholder="人数限制">
            <i v-bind:class="{'fa fa-warning': fawarning }"></i>
          </p>
          <label class="label">应用数量限制</label>
          <p class="control has-icon has-icon-right">
            <input class="input" v-on:onblur="checkformat" v-bind:class="classObject" v-model="dockerDetail.appLimit"  type="text" placeholder="应用数量限制">
            <i v-bind:class="{'fa fa-warning': fawarning }"></i>
          </p>
          <label class="label">单价</label>
          <p class="control">
            <input class="input" v-on:onblur="checkformat" v-bind:class="classObject" v-model="dockerDetail.price"  type="text" placeholder="单价">
            <i v-bind:class="{'fa fa-warning': fawarning }"></i>
          </p>
          <label class="label">单位</label>
          <p class="control">
            <span class="select">
              <select v-model="dockerDetail.unit" >
                <option>月</option>
                <option>年</option>
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
      var self = this;
      return {
        classObject: {
          isSuccess: false,
          isDanger: false,
        },
        fawarning : false,

        all: 1,
        cur:1,
        columns: [{
          column: 'name',
          label: 'IDE名称'
        },{
          column: 'price',
          // column: 'unit',
          label: '单价(月)'
        },{
          column: 'appLimit',
          label: '应用数量限制'
        },{
          column: 'peopleLimit',
          label: '人数限制'
        },{
          column: 'teamLimit',
          label: '团队数量限制'
        }],

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
        dockerDetailForm: null,
        dockerDetail: {},
        dockerDetails : {}, //修改后的数据存放在这儿．
        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION
        formTitle : '查看版本详情',
        id: '',
        oldImages: [],  //将从数据库中查到的数据存储在这个数组中
        content: false,
      }
    },
    methods: {
      // 输入检错，当输入的格式有错误的时候显示提示
      checkformat: function(){
        var self = true;
        if(dockerDetail.name){
          if(dockerDetail.name.length > 100){
            self.classObject.warning  = true;
          }else{
            self.classObject.success = true;
          }
        };
        // if(){};
      },
      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },
      openMonitor: function(data) {
        var dockerDetails;
        this.id = data.id;
        this.dockerDetailForm.open();
        dockerDetails = data;
        this.dockerDetail = dockerDetails;
        this.state = 'EDIT_VERSION';
        this.formTitle = "查看IDE版本详细信息"
      },
      pageChanged: function(currentPage) {
        console.log(currentPage);
        var self = this;
        self.init(currentPage.currentPage)
      },
// 新增IDE版本
      newVersion: function() {
        this.state = 'NEW_VERSION';
        this.dockerDetail = {};
        this.formTitle = '新增IDE版本';
        this.dockerDetailForm.open();
      },
      pageChanged: function(currentPage) {
        console.log(currentPage);
        this.init(currentPage.currentPage);
      },
      judgeNull: function(){
        var _self = this;
        console.log("_self.configDetail",_self.dockerDetail);
        for(var val in _self.dockerDetail){
          if(val != null){
            _self.content = true;
            break;
          }
        }
      },
      save: function() {
        // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
        var _self = this;
        this.judgeNull();
        if(_self.content==false){
          _self.dockerDetailForm.close();
          return;
        }else {
        if(_self.name!=null){
        var options = {
            param: {
                cur: 1,
                limit: 1,
                show: 'id_name'
            },
            url: "products",
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
        　this.dockerDetailForm.close();
        if(_self.state == 'NEW_VERSION') {
          //增加
          _self.dockerDetail.type = 'ide';
          var options = {

            param: _self.dockerDetail,
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
            url: 'products',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param: {
              id: _self.id,
              name: _self.dockerDetail.name,
              price: _self.dockerDetail.price,
              unit: _self.dockerDetail.unit,
              peopleLimit: _self.dockerDetail.peopleLimit,
              appLimit: _self.dockerDetail.appLimit,
              teamppLimit: _self.dockerDetail.teamppLimit,
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
            url: 'products',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.update(options);
        }};
        _self.content = false;
      },
// 删除IDE版本
      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除版本信息',
          body: '确定要停止此版本吗，一旦删除所有子元素也将被删除',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
              },
              msg: {
                success: {
                  title: '删除版本信息',
                  message: '删除版本信息成功',
                  type: 'primary',
                },
                failed: {
                  title: '删除版本信息',
                  message: '删除版本信息失败',
                  type: 'warning',
                }
              },
              url: 'products',
              ctx: _self,
              reload: _self.init,
            }
             services.Common.delete(options)
          }
        });
      },
      init: function(cur){

        console.log("init or reload");
        var _self = this;
        var options = {
          param: {
            limit: 4,
            cur: cur,
            type: 'ide',
            show: 'id_name_price_peopleLimit_unit_appLimit_teamLimit',
          },
          url: 'products',
          ctx: _self,
        };
        services.Common.list(options);
      },
    },
    components: {
      ViewTable,
      CardModal
    },
    mounted: function(){
      var self = this;
      self.init(1)
    }
  }
</script>

<style lang="scss">
</style>
