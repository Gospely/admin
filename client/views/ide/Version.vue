<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">IDE版本管理</h4>

          <p class="control">
            <button @click="newVersion" class="button is-primary">新增</button>
          </p>

          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

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
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.defaultVolume"  type="text" placeholder="默认数据卷">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">时间大小</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.timeLength"  type="text" placeholder="时间大小">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">父级</label>
          <p class="control">
            <span class="select">
              <select>
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
        columns: ['IDE名称', '价格', '人数限制', '默认数据卷', '时间大小', '父级'],


        fields: [{
          name: '7d8ed9o05f',
          price : '个人版',
          peopleLimit: '44 小时前',
          defaultVolume: '32',
          timeLength: '0.0 元/月',
          parent: '-'
        }],

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
      },

      save: function(modal) {

        if(this.state == 'NEW_VERSION') {
          var _self = this;
          console.log(this.dockerDetail);
          var options = {
            url: 'products',
            ctx: _self,
            param:{
               show: _self.dockerDetail,
            },
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
        }

        this.dockerDetailForm.close();
      },

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
                  body: '删除版本信息成功',
                  type: 'primary',
                },
                failed: {
                  title: '删除版本信息',
                  body: '删除版本信息失败',
                  type: 'warning',
                }
              },
              url: 'products',
              ctx: _self,
              reload: _self.init,
            }
            services.Common.delete(options);
          }
        });
      },


      newVersion: function() {
        this.state = 'NEW_VERSION';
        this.dockerDetail = {};
        this.formTitle = '新增版本';
        this.dockerDetailForm.open();
      },
      init: function(cur){
        var _self = this;
        var options = {
          param: {
            limit: 1,
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
