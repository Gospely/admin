<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">企业列表</h4>
          <view-table :all.sync="all" v-on:page-changed="pageChanged" v-on:pass-deny="passDeny" v-on:pass="pass" v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>
<!-- 企业列表详细信息 -->
    <card-modal :html.sync="true" :all.sync="all"  v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看企业详情" :visible.sync="false" >

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
        </div>
      </div>
    </card-modal>


<!-- 审核的不通过ｍｏｄｅｌ -->
<card-modal :html.sync="true" v-on:mounted="reviewMounted" v-on:confirm="deny" transition="zoom" title="审核" :visible.sync="false">
  <div slot="modal-body">
    <div class="block">
      <lable class="label">请输入拒绝的理由</lable>
      <p　data-v-43 class="control">
          <textarea data-v-43 v-model="dockerDetail.reason"  placeholder="请输入拒绝的理由"　class="textarea"></textarea>
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
      passDeny: function(data) {
        this.passForm.open();
        this.dockerDetail = data;
      },
      deny: function(modal) {
        this.passForm.close();
         var _self = this;
         var options = {
           param: {
             id: _self.dockerDetail.id,
             status: -1,
             reason : _self.dockerDetail.reason,
           },
           msg: {
               success:{
                 title: '拒绝认证',
                 message: '拒绝认证成功',
                 type: 'primary'
               },
               failed: {
                 title: '拒绝认证',
                 message: '拒绝认证失败',
                 type: 'warning'
               }
           },
           url: 'companys',
           ctx: _self,
           reload: _self.init
         };
         services.Common.update(options);
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
          this.init(currentPage.currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },

// 审核通过
        pass: function(data) {
          var _self = this;
          var options = {
            param: {
              id: data.id,
              status: 1,
            },
            msg: {
                success:{
                  title: '审核通过',
                  message: '审核通过成功',
                  type: 'primary'
                },
                failed: {
                  title: '审核通过',
                  message: '审核通过失败',
                  type: 'warning'
                }
            },
            url: 'companys',
            ctx: _self,
            reload: _self.init
          };
          services.Common.update(options);
        },



        init: function(cur) {

          console.log("init " + cur);
          var _self = this;
          var options = {
              param: {
                status: 0,
                  cur: cur,
                  limit: 10,
                  show: 'id_name_owner_ownerIdentify_creator_licencePhoto_inviteLink_status_reason'
              },
              url: "companys",
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
