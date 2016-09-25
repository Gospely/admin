<template>
  <card-modal v-on:confirm="confirmed" :visible.sync="true" :title="title" transition="zoom">
    <div slot="modal-body" class="content">
    {{body}}
    </div>
  </card-modal>
</template>

<script>
import { CardModal } from '../modal/index.js'

export default {
  components: {
    CardModal
  },

  props: {
    title: String,
    body: String,
    confirm: Function
  },

  data () {
    return {

    }
  },

  methods: {
    confirmed: function(modal) {
      this.confirm(modal);
    }
  }
}
</script>
