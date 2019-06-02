<template>
<div class="footer">
  <img class="logo" src="../images/logo.png" width="60" height="60">
  <div class="item">
    <span>支持与服务</span>
    <span>帮助</span>
    <span>关于我们</span>
    <span>加入我们</span>
    <span>资源和社区</span>
    <span>网站地图</span>
    <span>法律声明</span>
    <span>廉政举报</span>
    <span><i class="iconfont icon-wx wx"></i></span>
  </div>
  <div class="copyright">Copyright © <a href="http://www.chinaxywl.com" target="_blank">http://www.chinaxywl.com</a>, All Rights Reserved.</div>
  <div class="text">初心在方寸，咫尺在匠心</div>
</div>
</template>
<style lang="scss" scoped>
	
  .footer{
    background-color:#464C5B;
    overflow: hidden;
    padding-bottom: 30px;
    margin-top: 20px;
    position: relative;
    .logo{
      position: absolute;
      left: 60px;
      top: 20px;
    }
    .item{ 
      margin-top: 50px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        padding:0 4px;
        cursor: pointer;
        .wx{
          font-size: 36px;
          &:hover{
            color: #c7c7c7;
          }
        }
      }
    }
    .copyright{
      margin-top: 60px;
      color: #c7c7c7;
      text-align: center;
      font-size: 14px;
      a{
        color: #c7c7c7;
      }
    }
    .text{
      text-align: center;
      color: #c7c7c7;
      margin-top: 10px;
      font-size: 14px;
    }
  }
</style>