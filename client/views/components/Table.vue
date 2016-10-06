<template>
  <div>
    <div class="table-responsive">
      <table class="table is-bordered is-striped is-narrow">
        <thead>
          <tr>
            <th></th>
            <th v-for="(val, key) in columns">{{val}}</th>
            <th v-show="showOperations" v-bind:colspan="colspan">操作</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(val, key) in fields">
            <span style="display:none">{{fieldPt=0}}</span>
            <td v-show="fieldPt <= columns.length" v-for="(v, k) in val">{{v}}<span style="display:none">{{fieldPt++}}</span></td>
            <td v-show="showOperations" class="is-icon" v-for="(operation, key) in operations">
              <a @click="dispatchEvent(operation.event, val)" v-bind:title="operation.title">
                <i class="fa" v-bind:class="operation.icon"></i>
              </a>
            </td>
            <td  v-show="showcheck" > <input type="checkbox" id="privilegesName" value="privilegesName" v-model="privileges"></td>
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
        page: [],
        cur: 1,
        privileges: {},
        fieldPt: 0
      }
  },

  methods: {
    dispatchEvent: function(event, data) {
      this.$emit(event, data);
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
    showcheck: {
      type: Boolean,
      default(){
        return  false;
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
