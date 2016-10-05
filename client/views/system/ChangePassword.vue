<template>


<div>

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">修改密码</h1>
        <div class="block">
          <label class="label">旧密码</label>
          <p class="control">
            <input class="input passinput" type="text" placeholder="请输入您以前的密码" v-model="oldpassworld">
          </p>
          <label class="label">新密码</label>
          <p class="control">
            <input class="input passinput" type="text" placeholder="请输入的新密码" v-model="newpwdone">
          </p>
          <label class="label">确认新密码</label>
          <p class="control has-icon has-icon-right">
            <input class="input is-danger passinput danger" type="text" placeholder="请确认您的新密码" value="" v-model="newptwo">
            <i class="fa fa-warning"></i>
            <span class="help is-danger">两次输入不相符</span>
          </p>

          <p class="control">
            <button class="button is-primary">确定</button>
            <button class="button is-link">取消</button>
          </p>
        </div>
      </div>
    </div>


</div>
</template>
<script>
// import ViewTable from '../components/Table.vue'
      export　default{
        data: function() {
          return{
            oldpassworld: null,
            newpwdone: null,
            newptwo: null
          }
        },

        }
</script>

<style lang="scss">
.passinput{
  width: 300px;
}
</style>
