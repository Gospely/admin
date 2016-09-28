<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">已完成订单</h4>
          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看订单详情" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">买的产品（IDE）</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="买的产品（IDE）" disabled>
          </p>
          <label class="label">增值服务</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-success" v-model="dockerDetail.containerId"  type="text" placeholder="增值服务" disabled>
            <i class="fa fa-check"></i>
          </p>
          <label class="label">续费服务</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger" v-model="dockerDetail.createdTime"  type="text" placeholder="续费服务" disabled>
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
        columns: ['订单表', '增值服务', '续费套餐', '总价'],

        fields: [{
          product: '',
          added: '',
          renewal: '',
          price: ''
        },{
          product: '',
          added: '',
          renewal: '',
          price: ''
        }],

        operations: [{
          icon: 'fa-search-plus',
          title: '订单表详情',
          event: 'open-monitor'
        }],

        dockerDetailForm: null,
        dockerDetail: {}
      }
    },

    methods: {

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


    },

    components: {
      ViewTable,
      CardModal
    }

  }

</script>

<style lang="scss">


</style>
