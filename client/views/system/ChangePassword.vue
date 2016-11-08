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
            <input class="input passinput" type="text" placeholder="请输入的新密码" v-model="newpwdOne">
          </p>
          <label class="label">确认新密码</label>
          <p class="control has-icon has-icon-right p-icon">
            <input class="input   passinput " v-bind:class="{'is-danger': idDanger, danger: idDanger}" type="text" placeholder="请确认您的新密码" value="" v-model="newpTwo">
            <i v-show="waring" class="fa fa-warning"></i>
            <span v-show="waring"class="help is-danger">两次输入不相符</span>
          </p>

          <p class="control">
            <button class="button is-primary" v-on:click="changePass">确定</button>
            <button class="button is-link">取消</button>
          </p>
        </div>
      </div>
    </div>

</div>
</template>
<script>
      export　default{
        data: function() {
          return{
            idDanger: false,
            waring: false,
            oldpassworld: null,
            newpwdOne: null,
            newpTwo: null
          }
        },

        methods: {
          changePass: function(){
            console.log(localStorage.id);
            var self =  this;
            if(self.newpwdOne !== self.newpTwo){
              self.waring = true;
              self.idDanger = true;
            };
            var options = {
              params: {
                id: localStorage.id,
                password: self.newpwdOne,
              },
              msg: {
                  success:{
                    title: '修改密码',
                    message: '修改密码成功',
                    type: 'primary'
                  },
                  failed: {
                    title: '修改密码',
                    message: '修改密码失败',
                    type: 'warning'
                  }
              },
              ctx: self,
              url: "users",
              cb: function(res){
                window.location.href= window.baseUrl + "settings/passsword";
              },
            };
            services.Common.update(options);

            console.log(this.oldpassworld);
            console.log(this.newpwdOne);
          },
        }

        }
</script>

<style lang="scss">
.passinput{
  width: 300px;
}

.p-icon{
  width: 300px;
}
</style>
