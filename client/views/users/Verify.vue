<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">企业列表</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" v-on:pass-deny="passDeny" v-on:pass="pass" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
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
            <input class="input is-danger" v-model="dockerDetail.creator"  type="text" placeholder="提交用户(审核成功的管理员)" disabled>
            <i class="fa fa-warning"></i>
          </p>
          <label class="label">营业执照</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.status"  type="text" placeholder="营业执照" disabled>
            <i class="fa fa-warning"></i>
          </p>
        </div>
    </card-modal>


<!-- 审核的不通过ｍｏｄｅｌ -->
<card-modal :html.sync="true" v-on:mounted="reviewMounted" v-on:confirm="deny" transition="zoom" title="审核" :visible.sync="false">
  <div slot="modal-body">
    <div class="block">
      <lable>请输入拒绝的理由</lable>
<p　data-v-43 class="control">
  <textarea data-v-43 placeholder="请输入拒绝的理由"　class="textarea"></textarea>
</p>
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
        columns: ['公司名称', '公司法人', '法人身份证', '提交用户(审核成功的管理员)'],
        fields: [{
          companysName: 'longmao',
          companysOwner: 'yang',
          ownerIdentify: '1234567890',
          creator: 'xie',
          },{
          companysName: 'long',
          companysOwner: '7d8ed9o05f',
          ownerIdentify: '111111111',
          creator: 'xie',
          }],

        operations: [{
          icon: 'fa-search-plus',
          title: '企业列表详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-chevron-down',
          title: '审核通过',
          event: 'pass'
        }, {
          icon: 'fa-remove',
          title: '不通过该认证',
          event: 'pass-deny'
        }],

        dockerDetailForm: null,
        dockerDetail: {},

        passForm: null

      }
    },

    methods: {


// 拒绝审核通过
      reviewMounted: function(modal) {
        this.passForm = modal;
      },
      passDeny: function() {
        this.passForm.open();
      },
      deny: function(modal) {
        this.passForm.close();
        openNotification({
               title: '拒绝认证',
            message: '拒绝认证成功',
               type: 'primary'
               })
      },


// 查看企业列表详情
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

// 审核通过
pass: function(data) {
  openNotification({
    title: '审核通过',
    message: '审核通过成功',
    type: 'primary'
  })
},

    },

    components: {
      ViewTable,
      CardModal
    }

  }

</script>

<style lang="scss">


</style>
