<template>
  <div>
    <div class="table-responsive">
      <table class="table is-bordered is-striped is-narrow">
        <thead>
          <tr>
            <th></th>
            <th v-for="(val, key) in columns">{{val.label}}</th>
            <th v-show="showOperations" v-bind:colspan="colspan">操作</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(value, key) in fields" v-on: >
            <td>{{key+1}}</td>
            <td 　v-show="showInTable(k)" v-for="(v, k) in value">{{v}}</td>
            <td v-show="showOperations" class="is-icon" v-for="(operation, key) in operations">
              <a @click="dispatchEvent(operation.event, value)" v-bind:title="operation.title">
                <i class="fa" v-bind:class="operation.icon"></i>
              </a>
            </td>
            <td  v-show="showcheck" > <input type="checkbox" id="privilegesName"  v-model="privileges[length]"></td>
            <td  v-show="showradio" > <input type="radio" value="value.id" name="groups" v-on:get-child-checked="getChecked" v-bind:checked="ok" v-model="radio"></td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="page-box">
      <p class="control">
        <span style="line-height: 2.2;">当前第</span>
        <span class="select">
          <select v-model="cur" v-on:change="pageChanged(cur)">
            <option v-for="val in page">{{val}}</option>
          </select>
        </span>
        <span>页，共 {{all}} 页</span>
      </p>
    </div>
  </div>
</template>

<script>

export default {

  data: function() {
      return {
        ok: false,
        id: 1,
        groupsDataill: {},
        a : 1,
        page: [],
        cur: 1,
        // privileges: [],
        fieldPt: 0,

        length: 0
      }
  },

  methods: {
    getChecked: function(checkobject){
    // 默认选中的按钮和绑定的数据
     alert("fcdxs");
      console.log("checkedok??",msg);
      console.log("checkedID",id);
      this.ok = checkobject.ok;
      this.radio = checkobject.id;
    },
    dispatchEvent: function(event, data) {
      this.$emit(event, data);
    },
    showInTable: function(name){
      var _self = this;
      var flag;
      for( var key in _self.columns){
          if(  name == _self.columns[key].column){
            flag = true;
            break;
          }else {
            flag = false;
          }
        }
          return flag;
        },

    pageChanged: function(cur) {

      if(cur !== undefined){
        console.log("pageChanged" + cur);
        this.$emit('page-changed', {
          currentPage: cur
        })
      }
    }
  },

  mounted: function() {

    var page = [];

    for (var i = 1; i <= this.all; i++) {
      page[i - 1] = i;
    };

    this.page = page;
  },

  props: {
    // ok:{
    //   type: Boolean,
    //   default(){
    //     return  false;
    //   }
    // },
    showcheck: {
      type: Boolean,
      default(){
        return  false;
      }
    },
    showradio: {
      type: Boolean,
      default(){
        return  false;
      }
    },
    privileges: {
      type: Array,
      default(){
        return [];
      }
    },
    radio: {
      type: Number,
      default(){
        return 1;
      }
    },
    groupsDatail: {
      type: Object,
      default(){
        return {};
      }
    },
    all: {
        type: Number,
        default () {
          return 1;
        }
    },

    colspan: {
      type: Number,
      default () {
        return 3;
      }
    },

    columns: {
      type: Array,
      required: true
    },

    showOperations: {
      type: Boolean,
      default () {
        return true;
      }
    },

    fields: {
      type: Array,
      default () {
        return [];
      }
    },

    operations: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  watch: {
    'all': function(newVal) {
      var page = [];

      for (var i = 1; i <= newVal; i++) {
        page[i - 1] = i;
      };

      this.page = page;
    }
  }

}

</script>

<style lang="scss">
  .table-responsive {
    display: block;
    width: 100%;
    min-height: .01%;
    overflow-x: auto;
  }
</style>
