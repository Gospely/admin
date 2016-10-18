<template>
    <div class="container" style="min-height:800px">

      <!-- <bg></bg> -->

        <div class="signup-form ">
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model='phone' placeholder="登陆账号" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model='password' placeholder="请输入密码" autocapitalize="off" style="border: none;"></div>
                  </div>
                  <ul class="error-msg-list"></ul>
                  <button  class="signup-form__submit" @click="login">登录</button>
                  <div class="signup-form-nav">
                    <div class="left">
                    </div>
                    <div class="right">
                      <a v-link="{name:'signupa'}">注册新账户</a>&nbsp;&nbsp;<a @click="showForgotPwForm = true">忘记密码</a>
                    </div>
                  </div>
              </span>
            </div>
          </div>
        </div>
    </div>

</template>
<style>

    .container {
        overflow: visible;
    }

    .side-bar {
        display: none;
    }

    .app-main {
        margin-left: 0px;
    }

    .app-main-header {
        display: none;
    }

    .app-main-body {
        padding-left: 0px;
        padding: 0px;
        margin-top: 0px;
    }

</style>
<script>

    import Vue from 'vue'
    // import Modal from '../../ui/Modal/Modal.vue'
    // import Qrcanvas from 'jsqrgen-vue';
    // import bg from '../../ui/Bg.vue';

    export default{
        data: function() {
            return {
                showForgotPwForm: false,
                hasSent: false,
                phone: '',
                password: ''
            }
        },
        // components: {
        //     Modal,
        //     Qrcanvas,
        //     bg
        // },

        methods: {
            sendCode: function() {

            },

            confirmVerify: function() {

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
                      // notification.alert(res.data.message,'danger');
                  }else{
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
