<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">数据卷配置</h4>

          <p class="control">
            <button @click="newConfig" class="button is-primary">新增</button>
          </p>

          <view-table :all.sync="all" :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
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
          <label class="label">数据卷单价</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="configDetail.price"  type="text" placeholder="数据卷单价">
            <i class="fa fa-check"></i>
          </p>
          <label class="label">单位</label>
          <p class="control">
            <span class="select">
              <select v-model="configDetail.unit" >
                <option>GB/月</option>
                <option>GB/年</option>
              </select>
            </span>
          </p>
          <label class="label">最大</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.max"  type="text" placeholder="最大">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">最小</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.min"  type="text" placeholder="最小">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">免费额度</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.freeSize"  type="text" placeholder="免费额度">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">打折方式</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.discount"  type="text" placeholder="打折方式">
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
        all2: 1,
        all: 1,
        cur: 1,
        columns:[{
          column: 'name',
          label: '名称'
        },{
          column: 'price',
          label: '单价'
        },{
          column: 'max',
          label: '最大额度'
        },{
          column: 'min',
          label: '最小额度'
        },{
          column: 'freeSize',
          label: '免费额度'
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

        configDetailForm: null,
        configDetail: {},

        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION

        formTitle: '查看配置详情',
        oldImages: [],
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
        this.init(currentPage.currentPage);
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
        var _self = this;
        if(_self.dockerDetail=={}){
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
          if(_self.oldImages[key].name = _self.name) {
              _self.state = 'DELI_VERSION';
              _self.id = this.oldImages[key].id;
              }
            }
        }
        　_self.configDetailForm.close();
        if(_self.state == 'NEW_VERSION') {
          //增加
          _self.configDetail.type ="volume";
          var options = {
            param: _self.configDetail,
            msg: {
                success:{
                  title: '新增数据卷配置',
                  message: '新增数据卷配置成功',
                  type: 'primary'
                },
                failed: {
                  title: '新增数据卷配置',
                  message: '新增数据卷配置失败',
                  type: 'warning'
                }
            },
            url: 'volumes',
            ctx: _self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param:{
              id: _self.id,
              name: _self.configDetail.name,
              price: _self.configDetail.price,
              unit: _self.configDetail.unit,
              max: _self.configDetail.max,
              min: _self.configDetail.min,
              discount: _self.configDetail.discount,
            },
            msg: {
                success:{
                  title: '修改数据卷配置',
                  message: '修改数据卷配置成功',
                  type: 'primary'
                },
                failed: {
                  title: '修改数据卷配置',
                  message: '修改数据卷配置失败',
                  type: 'warning'
                }
            },
            url: 'products',
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
          title: '删除该数据卷',
          body: '确定要删除该数据卷吗，一旦删除将清除所有数据',
          confirm: function(modal) {
            modal.close();
            var options = {
              param: {
                id: data.id,
              },
              msg: {
                  success:{
                    title: '删除数据卷',
                    message: '删除数据卷成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '删除数据卷',
                    message: '删除数据卷失败',
                    type: 'warning'
                  }
              },
              url: 'products',
              ctx: _self,
              reload: _self.init
            }
            services.Common.delete(options);
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
                limit: 4,
                show: 'id_name_price_unit_max_min_freeSize_discount'
            },
            url: "products",
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
