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
            <td 　v-show="showInTable(k)" v-for="(v, k) in value">{{v}} <img  v-bind:v-if = "activeDescription" vibind:src="value.description" alt="" ></td>
            <td v-show="showOperations"  class="is-icon" v-for="(operation, key) in operations" @keyup.enter="test">
              <a @click="dispatchEvent(operation.event, value)" v-bind:title="operation.title">
                <i class="fa" v-bind:class="operation.icon"></i>
              </a>
            </td>
            <td  v-show="showcheck" > <input type="checkbox" v-bind:id="value.id" :checked="value.open" v-bind:value="value.id"></td>
            <td  v-show="showradio" v-if="renderRadio" > <input type="radio" name="groups"  v-bind:value="value.id" v-model="radio" v-change="dispatchEvent('radio-changed', radio)"></td>
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
        activeDescription: false,

        id: 1,
        groupsDataill: {},
        a : 1,
        page: [],
        cur: 1,
        fieldPt: 0,

        length: 0
      }
  },

  methods: {
    test: function(){
      alert("enter");
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

    var self = this;
  for(var value in self.fields){
    var field = self.fields[value];
    for(var val in field){
      console.log(val);
    if (val == "description"){
      self.activeDescription = true;
    }
  }
  };
  // alert(this.activeDescription);
  },

  props: {
    renderRadio: {
      type: Boolean,
      default(){
        return false;
      }
    },
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
      type: String,
      default(){
        return "";
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
