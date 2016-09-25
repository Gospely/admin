
export default {

  props: {
    card: Boolean,
    visible: Boolean,
    closable: Boolean,
    transition: {
      type: String,
      default: 'fade'
    },
    html: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      show: this.visible
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.body.appendChild(this.$el)
    })
  },

  destroyed () {
    if(!this.html) {
      this.$el.remove()      
    }
  },

  methods: {
    afterLeave () {
      if(!this.html) {
        this.$destroy()
      }
    },

    active () {
      this.show = true
    },

    deactive () {
      this.show = false
    },

    close () {
      this.deactive()
    },

    open () {
      this.active()
    }
  },

  computed: {
    enterClass () {
      return `${this.transition}In`
    },

    leaveClass () {
      return `${this.transition}Out`
    }
  }

}
