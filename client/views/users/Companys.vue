<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">企业列表</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:review="review" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

<!-- 企业列表详情的ｍｏｄｅｌ -->
    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看企业详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">公司名称</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.companysName" type="text" placeholder="公司名称" disabled>
          </p>
          <label class="label">公司法人</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.containerId"  type="text" placeholder="公司法人" disabled>
            <i class="fa fa-check"></i>
          </p>
          <label class="label">法人身份证</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="法人身份证" disabled>
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">提交用户(审核成功的管理员)</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="提交用户(审核成功的管理员)" disabled>
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">营业执照</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="营业执照" disabled>
            <i class="fa fa-warning"></i>
          </p>
        </div>
    </card-modal>


<!-- 审核的ｍｏｄｅｌ -->
<card-modal :html.sync="true" v-on:mounted="reviewMounted" v-on:confirm="save" transition="zoom" title="审核" :visible.sync="false">
  <div slot="modal-body">
    <div class="block">


    </div>
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

  // 企业列表信息
        columns: ['公司名称', '公司法人', '法人身份证', '提交用户(审核成功的管理员)','营业执照'],
        fields: [{
          companysName: 'longmao',
          companysOwner: 'yang',
          ownerIdentify: '1234567890',
          creator: 'xie',
          licence: 'xxxx',
          },{
          companysName: 'long',
          companysOwner: '7d8ed9o05f',
          ownerIdentify: '111111111',
          creator: 'xie',
          licence: 'xxxx',
          }],

        operations: [{
          icon: 'fa-search-plus',
          title: '企业列表详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-chevron-down',
          title: '审核',
          event: 'review'
        }, {
          icon: 'fa-remove',
          title: '删除该企业',
          event: 'stop-docker'
        }],

        dockerDetailForm: null,
        dockerDetail: {},

        reviewForm: null,
        reviewOption: {}

      }
    },

    methods: {


// 打开企业列表详情的ｍｏｄｅｌ操作
      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },
      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
      },



      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },

// 打开审核的ｍｏｄｅｌ
      reviewMounted: function(modal) {
        this.reviewForm = modal;
      },
      review: function(data){
        this.reviewForm.open();
        this.reviewOption = data;
      },

// 删除该企业
      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '删除该企业',
          body: '确定要停止此Docker吗，一旦停止所有运行中的程序都将暂停',
          confirm: function(modal) {
            console.log('confirmed');
            modal.close();

            openNotification({
              title: '停止企业',
              message: '删除企业成功',
              type: 'primary'
            })

          }
        });
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
