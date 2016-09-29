<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">操作日志</h4>
          <view-table :total="10" :show-operations="false" v-on:page-changed="pageChanged"   :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>


  </div>
</template>

<script>

  import ViewTable from '../components/Table.vue'

  export default {

    data: function() {
      var self = this;
      return {
        columns: ['事件', '操作人', '时间'],

        fields: [{
          product: '',
          added: '',
          renewal: '',
        },{
          product: '',
          added: '',
          renewal: '',
        }],
      }
    },

    methods: {
      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

     },

    components: {
      ViewTable,
    }

  }

</script>

<style lang="scss">


</style>
