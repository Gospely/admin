<template>
    <div>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h1 class="title">管理员登录</h1>
            <div class="block">
              <label class="label">登录帐号</label>
              <p class="control">
                <input class="input passinput" type="text" v-model='phone' autocomplete="on"  placeholder="请输入您的登录帐号">
              </p>
              <label class="label">密码</label>
              <p class="control">
                <input class="input passinput" type="text"   v-model='password' autocomplete="on"  placeholder="请输入您的登录密码">
              </p>
              <p class="control">
                <button class="button is-primary" @click="login" >登录</button>
                <button class="button is-link" @click="changePass" >忘记密码</button>
              </p>
            </div>
          </div>
        </div>

    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'

    export default{
        data: function() {
            return {
                hasSent: false,
                phone: '',
                password: ''
            }
        },

        methods: {
          changePass: function(){
            this.$router.push("/settings/passsword");
            // window.location.href = window.baseUrl + "/#/settings/passsword";
          },
            login: function() {
              var user = {
                  phone: this.phone,
                  password: this.password
              }
              services.UserService.login(user).then(function(res) {
                console.log(res);
                if(res.status === 200){
                  if(res.data.code != 1){

                    openNotification({
                      title: res.data.message,
                      message: '登录失败，请确定您是管理员',
                      type: 'warning'
                    });
                  }else{
                    localStorage.setItem("id",res.data.fields.id);
                    localStorage.setItem("user",res.data.fields);
                    localStorage.setItem("token",res.data.fields.token);
                    openNotification({
      								title: '登录成功',
      								message: '登录成功',
      								type: 'primary'
      							});
                    window.location.href = window.baseUrl;
                  }
                }
              },function(err){
                  notification.alert('服务器异常','danger');
                  this.phone = '';
                  this.password = '';
              }
              );
            }
        }
    }
</script>
