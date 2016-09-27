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

        dockerDetailForm: null,
        dockerDetail: {},

        state: 'EDIT_VERSION', //EDIT_VERSION || NEW_VERSION

        formTitle: '查看配置详情'
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

        this.dockerDetailForm.close();
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
        this.dockerDetail = {};
        this.formTitle = '新增配置';
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
