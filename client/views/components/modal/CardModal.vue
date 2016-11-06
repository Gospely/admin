<template  v-on:keyup.esc="cancel">
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
    v-on:keyup.esc="close"
  >
    <div :class="['modal', 'animated', show ? 'is-active' : '']" v-if="show" v-on:keyup.esc="cancel">
      <div class="modal-background" @click="close"  v-on:keyup.esc="cancel"></div>
      <div class="modal-card"  v-on:keyup.esc="close">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button class="delete" @click="close" v-on:keyup.esc="close"></button>
        </header>
        <section class="modal-card-body">
          <slot name="modal-body"></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="card-footer">
            <a class="button is-primary" @click="ok">{{ okText }}</a>
            <a class="button" @click="cancel"  v-on:keyup.esc="cancel">{{ cancelText }}</a>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseModal from './BaseModal'

export default {
  mixins: [BaseModal],

  props: {
    title: {
      type: String
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmClicked: {
      type: Object
    }
  },

  methods: {
    test () {
      alert("gfcdxs");
    },
    ok () {
      this.$emit('confirm', this);
    },

    cancel () {
      this.deactive();
    },
    hotkeys (event) {
      alert("gferdws");
      this.hotkey(event, this, false, false, false, 27);
     //  var event = new KeyboardEvent("keobord",{"bubbles":false,});
      // event.initKeyboardEvent();
     //  if(event.keyCode == 27){
        alert(event.keycode);
     //  }

   },
   hotkey (event, targetObj, ctrlKey, shiftKey, altKey, keycode) {
     if (
        event.ctrlKey == ctrlKey
        && event.shiftKey == shiftKey
        && event.altKey == altKey
        && event.keyCode == keycode
        )
        targetObj.close();
   }
  },
 ready: function (){
   alert("document");
   document.addEventListener("keyup",hotkeys,true);
 }

}
</script>
