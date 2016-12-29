<template>
<div>

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">重置密码</h1>
        <div class="block">
          <label class="label">用户名</label>
          <p class="control">
            <input class="input passinput" type="text" placeholder="请输入您的的登录帐号" v-model="name">
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
            <button class="button is-link" @click="cancle">取消</button>
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
            name: null,
            newpwdOne: null,
            newpTwo: null
          }
        },

        methods: {
          cancle: function(){
            this.idDanger = false;
            this.waring = false;
            this.name = "";
            this.newpwdOne = "";
            this.newpTwo="";
          },
          checkForm: function(){
            var self =  this;
            if(self.newpwdOne != self.newpTwo){
              self.waring = true;
              self.idDanger = true;
            };
          },
            resetPass: function(){
              console.log(this.newpTwo);
              var user = {
                id: localStorage.id,
                password: this.newpTwo
              };
              services.UserService.updatePwd(user).then(function(res) {

                if(res.status === 200){
                  openNotification({
                    title: '修改密码',
                    message: '修改密码成功',
                    type: 'primary'
                  });
                  localStorage.removeItem("id");
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = window.baseUrl + "#/setting/login";
                }
              },function(err){
                openNotification({
                  title: "修改密码",
                  message: "修改密码失败",
                  type: "warning",
                })
              }
              );
          },
          changePass: function(){
            console.log(localStorage.id);
            var self =  this;
            self.checkForm();
            if(self.newpwdOne == self.newpTwo){
                //修改密码
                self.resetPass();
          }
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
