<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">企业列表</h4>
          <view-table :all.sync="all" v-on:page-changed="pageChanged" v-on:pass-deny="passDeny"  v-on:open-monitor="openMonitor" :operations="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
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
        </div>
      </div>
    </card-modal>


<!-- 审核的不通过ｍｏｄｅｌ -->
    <card-modal :html.sync="true" v-on:mounted="reviewMounted"  transition="zoom" title="审核" :visible.sync="false">
      <div slot="modal-body">
        <div class="block">
          <lable>拒绝审核通过的理由</lable>
          <p　data-v-43 class="control">
            <textarea data-v-43 placeholder="拒绝审核通过的理由"　class="textarea"></textarea>
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
        columns: ['公司名称', '公司法人', '法人身份证', '提交用户(审核成功的管理员)','状态'],
        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '企业列表详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-remove',
          title: '查看审核不通过的理由',
          event: 'pass-deny'
        }],

        dockerDetailForm: null,
        dockerDetail: {},

        passForm: null

      }
    },

    methods: {


// 查看审核不通过的理由
      reviewMounted: function(modal) {
        this.passForm = modal;
      },
      passDeny: function() {
  //未写事件。因为没有数据
        this.passForm.open();
      },


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
                cur: cur, //当前页码
                limit: 1,   //限制条数
                show: 'id_name_owner_ownerIdentify_creator_licencePhoto_inviteLink_status' //要查询的列
            },
            url: "companys", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，update:更新）实现在CommonService.js中
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
