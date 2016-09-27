<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">IDE版本管理</h4>

          <p class="control">
            <button @click="newVersion" class="button is-primary">新增</button>   
          </p>

          <view-table v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" :title.sync="formTitle" :visible.sync="false">
      
      <div slot="modal-body">
        <div class="block">
          <label class="label">版本ID</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="所属用户">
          </p>
          <label class="label">版本名称</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.containerId"  type="text" placeholder="容器ID">
            <i class="fa fa-check"></i>
          </p>
          <label class="label">创建时间</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="创建时间">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">使用人数</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="创建时间">
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">价格</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="创建时间">
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
        columns: ['版本ID', '版本名称', '创建时间', '使用人数', '价格', '父级'],

        fields: [{
          versionId: '7d8ed9o05f',
          versionName: '个人版',
          createdTime: '44 小时前',
          count: '32',
          price: '0.0 元/年',
          parent: '-'
        },{
          versionId: '7d8ed9o05f',
          versionName: '教育版',
          createdTime: '76 小时前',
          count: '87',
          price: '1800.0 元/年',
          parent: '-'
        },{
          versionId: '7d8ed9o05f',
          versionName: '企业版',
          createdTime: '76 小时前',
          count: '47',
          price: '2400.0 元/年',
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

        formTitle: '查看版本详情'
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
        this.formTitle = '查看版本详情'
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
          title: '删除版本信息',
          body: '确定要停止此版本吗，一旦删除所有子元素也将被删除',
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

      newVersion: function() {
        this.state = 'NEW_VERSION';
        this.dockerDetail = {};
        this.formTitle = '新增版本';
        this.dockerDetailForm.open();
      }
    },

    components: {
      ViewTable,
      CardModal
    }

  }

</script>

<style lang="scss">


</style>
