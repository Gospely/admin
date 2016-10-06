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
        columns: ['名称', '内存', 'CPU', 'CPU类型', '是否免费', '价格'],

        fields: [{
            name: '1x',
            memory: '256 MB',
            cpu: '1',
            cpuType: '(共享)',
            free: true,
            price: '0.0 元/月'
        }, {
            name: '2x',
            memory: '512 MB',
            cpu: '1',
            cpuType: '(共享)',
            free: true,
            price: '0.0 元/月'
        }, {
            name: '4x',
            memory: '1 GB',
            cpu: '1',
            cpuType: '(共享)',
            free: true,
            price: '0.0 元/月'
        }, {
            name: '8x',
            memory: '2 GB',
            cpu: '1',
            cpuType: '',
            free: false,
            price: '150.0 元/月'
        }, {
            name: '16x',
            memory: '4 GB',
            cpu: '1',
            cpuType: '',
            free: false,
            price: '200.0 元/月'
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
                show: 'id_name_memory_cup_cpuType_free' //要查询的列
            },
            url: "dockers_configs", //操作的表 实体（根据这个生产请求url）
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
