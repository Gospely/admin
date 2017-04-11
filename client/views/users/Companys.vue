<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">企业列表</h4>
          <view-table :all.sync="all" v-on:page-changed="pageChanged"   v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>
<!-- 企业列表详细信息 -->
    <card-modal :html.sync="true" :all.sync="all"  v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看企业详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">公司名称</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.name" type="text" placeholder="公司名称" disabled>
          </p>
          <label class="label">公司法人</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.owner" type="text" placeholder="公司法人" disabled>
          </p>
          <label class="label">法人身份证</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.ownerIdentify" type="text" placeholder="法人身份证" disabled>
          </p>
          <label class="label">提交用户（审核成功的用户）</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="审核成功的用户" disabled>
          </p>
          <label class="label">营业执照</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.licencePhoto" type="text" placeholder="营业执照" disabled>
          </p>
          <label class="label">邀请链接</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.inviteLink" type="text" placeholder="邀请链接" disabled>
          </p>
          <label class="label">审核状态</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.status" type="text" placeholder="审核状态" disabled>
          </p>
          <lable class="label">拒绝审核通过的理由</lable>
          <p class="control">
            <textarea data-v-43 placeholder="拒绝审核通过的理由"　 v-model="dockerDetail.reason"  class="textarea"></textarea>
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
        all: 1,
        cur: 1,
        columns:[{
          column: 'name',
          label: '公司名称'
        },{
          column: 'owner',
          label: '公司法人'
        },{
          column: 'ownerIdentify',
          label: '法人身份证'
        },{
          column: 'creator',
          label: '提交用户(审核成功的管理员)'
        },{
          column: 'status',
          label: '状态'
        },],
        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '企业列表详情',
          event: 'open-monitor'
        }],

        dockerDetailForm: null,
        dockerDetail: {},

        passForm: null

      }
    },

    methods: {

// 查看企业列表详情
      mounted: function(modal) {
        this.dockerDetailForm = modal;
      },
      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
      },



// 初始化企业列表
      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 10,
                show: 'id_name_owner_ownerIdentify_creator_licencePhoto_inviteLink_status_reason'
            },
            url: "companys",
            ctx: _self,
        };
        services.Common.list(options);
      },

      pageChanged: function(currentPage) {
        console.log(currentPage);
          this.init(currentPage.currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },

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
