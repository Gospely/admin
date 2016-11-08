<template lang="html">
  <div>


<div class="tile is-parent">
  <article class="tile is-child box">
    <h4 class="title">用户已申请邮箱</h4>
    <p class="control">
      <button @click="annonce" class="button is-primary">通知他们</button>
    </p>

    <Viewtable :showOperations="false" :all.sync="all" :total="10" v-on:page-changed="pageChanged"  :fields.sync="fields" :columns.sync="columns" operations.sync="operations" > </Viewtable>

  </article>

</div>
  </div>
</template>

<script>
 import Viewtable from "../components/Table.vue";
export default {
  data () {
    return {
      cur:1,
      all: 1,
      fields: [],
      columns: [{
        label: "邮箱",
        column: "email"
      },{
        label: "申请时间",
        column: "createat",
      }],
      // operations:[{
      //   event: {},
      //   value: ,
      //   tittle: "",
      //   icon: "fa-search-plus"
      // }],


    }
  },
  // computed: {},
  // ready () {},
  // attached () {},
  methods: {
    annonce: function(){
      console.log("fds");
    },
    init: function(cur){
      var self = this;
      var options = {
        param: {
          cur: cur,
          limit: 10,
          show: "email_createat"
        },
        url: "emails",
        ctx: self,
      };
      services.Common.list(options)
    },
    pageChanged: function(currentPage){
      var self = this;
      self.init(currentPage.currentPage)
    }

  },
  components: {
    Viewtable,
  },
  mounted(){
    var self = this;
    self.init(1);
  }
}
</script>

<style lang="css">
</style>
