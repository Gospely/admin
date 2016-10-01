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
          <label class="label">图标</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="configDetail.icon"  type="text" placeholder="图标">
            <i class="fa fa-check"></i>
          </p>
          <label class="label">最小容量</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.min"  type="text" placeholder="最小容量">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">最大容量</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.max"  type="text" placeholder="最大容量">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">免费额度</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="configDetail.free"  type="text" placeholder="免费额度">
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
        all2: 1,
        all: 1,
        columns: ['名称', '图标', '最小容量', '最大容量', '免费额度', '价格'],

        fields: [{
            name: 'IDE专用存储卷',
            icon: 'fa-database',
            min: '10 GB',
            max: '100 GB',
            free: '20 GB',
            price: '0.0 元/GB'
        }, {
            name: '分布式存储',
            icon: 'fa-database',
            min: '10 GB',
            max: '100 GB',
            free: '0 GB',
            price: '0.0 元/GB'
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

        configDetailForm: null,
        configDetail: {},

        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION

        formTitle: '查看配置详情'
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

      save: function(modal) {

        if(this.state == 'NEW_VERSION') {
          //增加
        }else {
          //修改
        }

        this.configDetailForm.close();
      },

      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '删除配置信息',
          body: '确定要删除此配置吗，一旦删除所有子元素也将被删除',
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

      newConfig: function() {
        this.state = 'NEW_VERSION';
        this.configDetail = {};
        this.formTitle = '新增配置';
        this.configDetailForm.open();
      },
      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur, //当前页码
                limit: 1,   //限制条数
                show: 'id_name_icon_max_min_freeSize_unit_price' //要查询的列
            },
            url: "volumes_configs", //操作的表 实体（根据这个生产请求url）
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
