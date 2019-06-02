<style lang="scss" scoped>
.loginWrap {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #2196F3;
  .login_form{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #2B2B36;
    border-radius: 10px;
    box-shadow: 10px 10px 15px 1px #0D5187;
    .logo{
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
    }
    .title{
      color: white;
      padding:16px 0;
      text-align: center;
      font-size: 24px;
    }
    .inputWrapper{
      padding:0 20px;
      .inputBox{
        margin-top: 8px;
        border: none;
        border-bottom:1px solid #8F8F8F;
        padding-bottom: 12px;
        .iconStyle{
          color: #8F8F8F;
          font-size: 28px;
          vertical-align: middle;
        }
        .input{
          background-color: inherit;
          border: none;
          height: 34px;
          line-height:34px;
          outline:none;
          font-size: 16px;
          color: #c7c7c7;
          padding-left: 8px;
          width: 300px;
          vertical-align: middle;
        }
      }
    }
    .headButton{
      width: 100%;
      text-align: center;
      height: 60px;
      line-height: 60px;
      background-color: #23232E;
      color: white;
      font-size: 26px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .fotButton{
      width: 100%;
      margin-top:20px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      background-color: #2196F3;
      color: white;
      font-size: 20px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;
      &:hover{
        background-color:#0071CA;
      }
    }
    .statusBox{
      padding: 0 20px;
      padding-top: 20px;
      .el-checkbox{
        margin-left: 5px;
      }
      p{
        float: right;
        color: #2196F3;
        font-size: 14px;
        cursor: pointer;
        line-height: 20px;
      }
    }
  }
}
</style>
<template>
  <div class="loginWrap container" id="particles-js">
    <div class="login_form">
      <div class="headButton">上海市法院访客信息联网</div>
      <img class="logo" src="../../images/courtLogo.png" width="60" height="60">
      <div class="title">欢迎登录</div>
      <div class="inputWrapper">
        <div class="inputBox">
          <i class="iconfont icon-username iconStyle"></i><input class="input" type="text" name="UserName" v-model="UserName" @keyup.enter="tonext(1)" placeholder="用户名">
        </div>
        <div class="inputBox">
          <i class="iconfont icon-password iconStyle"></i><input class="input" type="password" name="UPassword" v-model="UPassword" @keyup.enter="loginBtn" placeholder="密码">
        </div>
      </div>
      <!-- <div class="statusBox">
        <el-checkbox v-model="statusChecked">记住登录状态</el-checkbox>
        <p>忘记密码</p>
      </div> -->
      <div class="fotButton" @click="loginBtn">登录</div>
    </div>
  </div>
</template>
<!-- scripts -->
<!-- <script src="js/particles.min.js"></script>
  <script src="js/app.js"></script> -->
<script>
$(function(){
  $('.fotButton').click(function(){
    console.log("click me")
  });
});

// import { loginUrl } from '@/api/index'
import { loginUrl,ajax,ERR_OK } from '@/api/index'
import { AESEncrypt } from '@/common/js/utils'
import axios from 'axios'
// import pJS from 'pJS'
export default {
  data: function() {
    return {
      UserName: '',
      UPassword: '',
      ishover: false,
      autofocus: true,
      loginStatus: "",
      statusChecked: true,
      authorization:''
    }
  },
  created() {
    var inputs = document.getElementsByTagName('input')
  },
  methods: {
    hover() {
      this.ishover = !this.ishover
    },
    tonext(index) {
      console.log("click")
      var inputs = document.getElementsByTagName('input')
      inputs[index].focus()
    },
    loginBtn() {
      var that = this;
      if(!that.UserName||!that.UPassword) {
        that.$message('用户名或密码不能为空！');
        return;
      }
      var method = 'GET';
      var params = {
        UserName: AESEncrypt(that.UserName),
        UPassword: AESEncrypt(that.UPassword)
        // remember: this.statusChecked?'1':'0'
      }
      console.log('params',params);
      ajax(loginUrl,method,params,function(res){
          var result = JSON.parse(res);
          console.log(result);
          console.log("code:" + result.code);
          if (result.code == ERR_OK) {
            if(result.count > 0){
              localStorage.setItem('_UserName',AESEncrypt(that.UserName));
              that.$message.success('登录成功！');
              that.$router.push('/visitorList')
            }else{
              that.$message.error('用户名或密码错误！');
            }
          } else {
            that.$message.error('用户名或密码错误！');
          }
        });
      /*this.$axios.post(url,params).then((res)=>{
        var result = res.data;
        console.log(ERR_OK,'--ERR_OK-')
        console.log(result.status_code,'--res.status_code--')
        if(result.status_code == ERR_OK){
           this.$router.push('./setting')
          // that.qrcode = result.data.url;
          // console.info(that.directUrl,'--that.directUrl--');
        }
      }).catch((err)=>{
        console.info(err);
      });*/
    }
  }
}
</script>

<style lang="scss">
</style>