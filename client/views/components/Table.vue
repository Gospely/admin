<template>
  <div>
    <div class="table-responsive">
      <table class="table is-bordered is-striped is-narrow">
        <thead>
          <tr>
            <th></th>
            <th v-for="val in columns">{{val}}</th>
            <th v-show="showOperations" v-bind:colspan="colspan">操作</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(val, key) in fields">
            <td class="is-icon">
              {{key + 1}}
            </td>
            <td v-for="(v, k) in val">{{v, k}}</td>
            <td v-show="showOperations" class="is-icon" v-for="(operation, key) in operations">
              <a @click="dispatchEvent(operation.event, val)" v-bind:title="operation.title">
                <i class="fa" v-bind:class="operation.icon"></i>
              </a>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="page-box">
      <p class="control">
        <span style="line-height: 2.2;">当前第</span>
        <span class="select">
          <select v-model="current" v-on:change="dispatchEvent('pageChanged', current)">
            <option v-for="val in total">val</option>
          </select>
        </span>
        <span>页，共 {{total}} 页</span>
      </p>            
    </div>
  </div>
</template>

<script>
  
export default {

  data: function() {
      return {

      }
  },

  methods: {
    dispatchEvent: function(event, data) {
      this.$emit(event, data);
    }
  },

  props: {
    total: {
        type: Number,
        default () {
          return 1;
        }
    },

    current: {
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
