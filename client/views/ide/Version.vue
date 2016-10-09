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
            <input class="input" v-model="dockerDetail.name" type="text" placeholder="IDE名称">
          </p>
          <label class="label">价格</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.price"  type="text" placeholder="价格">
            <i class="fa fa-check"></i>
          </p>
          <label class="label">人数限制</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.peopleLimit"  type="text" placeholder="人数限制">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">默认数据卷</label>
          <p class="control">
            <span class="select">
              <select v-model="dockerDetail.defaultVolume" >
                <option>IDE专用存储卷</option>
                <option>分布式存储</option>
              </select>
            </span>
          </p>
          <label class="label">时间大小</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.timeLength"  type="text" placeholder="时间大小">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">父级</label>
          <p class="control">
            <span class="select">
              <select v-model="dockerDetail.parent" >
                <option>教育版</option>
                <option>个人版</option>
                <option>企业版</option>
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
        all: 1,
        cur:1,
        // columns: ['IDE名称', '价格', '人数限制', '默认数据卷', '时间大小', '父级'],
        columns: [{
          column: 'name',
          label: 'IDE名称'
        },{
          column: 'price',
          label: '价格'
        },{
          column: 'parent',
          label: '父级'
        },{
          column: 'peopleLimit',
          label: '人数限制'
        },{
          column: 'defaultVolume',
          label: '默认数据卷'
        },{
          column: 'timeLength',
          label: '时间大小'
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
        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION
        formTitle : '查看版本详情',
        id: '',
        oldImages: [],  //将从数据库中查到的数据存储在这个数组中
      }
    },
    methods: {
      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },
      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
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
      save: function(id) {
        // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
        if(this.dockerDetail.name==null & this.dockerDetail.price==null & this.dockerDetail.peopleLimit==null & this.dockerDetail.defaultVolume ==null& this.dockerDetail.timeLength & this.dockerDetail.parent ==null){
          this.dockerDetailForm.close();
          return;
        }else {
        if(this.name!=null){
        var _self = this;
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
            param: this.dockerDetail,
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
            ctx: self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param: {
              id: _self.id,
              price: _self.dockerDetail.price,
              peopleLimit: _self.dockerDetail.peopleLimit,
              defaultVolume: _self.dockerDetail.defaultVolume,
              timeLength: _self.dockerDetail.timeLength,
              parent: _self.dockerDetail.parent
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
            ctx: self,
            reload: _self.init,
          };
          services.Common.update(options);
        }}
      },
// 删除IDE版本
      stopDocker: function(data) {
        var _self = this;
        var Modal = openAlertModal({
          title: '删除版本信息',
          body: '确定要停止此版本吗，一旦删除所有子元素也将被删除',
          confirm: function(modal) {
            console.log('confirmed');
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
        var _self = this;
        var options = {
          param: {
            limit: 4,
            cur: cur,
            show: 'id_name_price_parent_peopleLimit_defaultVolume_unit',
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
