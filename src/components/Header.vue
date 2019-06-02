<style lang="scss" scoped>
@import '../common/scss/common.scss';
.header {
  width: 100%;
  height: $headerHeight;
  line-height: $headerHeight;
  color: #ffffff;
  // background-color:#11132A;
  background-color: $mainColor !important;
  .logoIcon {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 24px;
  }
  .manageBox{
    font-size: 32px;
    margin-left: 20px;
    cursor: pointer;
    .iconstyle{
      font-size: 14px;
      padding-right: 3px;
    }
  }
  .btn-fullscreen{
      transform: rotate(45deg);
      margin-right: 5px;
      font-size: 24px;
  }
  .btn-bell, .btn-fullscreen{
      position: relative;
      width: 30px;
      height: 30px;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
  }
}
</style>
<template>
  <div class="header">
    <div class="left"><img class="logoIcon" src="../images/courtLogo.png"></div>
    <div class="left manageBox">
      上海市法院联网管理系统
    </div>
    <div class="right manage-box margR20" @click="logout">
      <i class="iconfont iconstyle icon-logout"></i>
    </div>
    <!-- <div class="right manage-box margR20 cursor" @click="setting">
      <i class="iconfont iconstyle icon-setting"></i>
    </div> -->
    <div class="right manage-box margR20 cursor" @click="handleFullScreen">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <i class="iconfont iconstyle icon-fullscreen"></i>
      </el-tooltip>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body="true" :fullscreen="false" width="400px">
      <div class="dialogBody">
        <div class="element">
          <label class="inline">旧密码：123123</label>
        </div>
        <div class="element margT20">
          <label class="inline">新密码：</label>
          <div class="inline">
             <el-input size="medium" placeholder="请输入金额"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="margL12" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ajax, ERR_OK } from '@/api/index'
export default {
  data() {
    return {
      role: '',
      username: 'admin',
      icon: 'icon-manage',
      fullscreen: false,
      dialogFormVisible: false
    }
  },
  props: {
      isShowHeaderMore: {
        type: Boolean,
        default: true
      }
    },
  created(){
    // this.getDeposit();
  },
  methods: {
    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          }
      } else {
          if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
          }
      }
      this.fullscreen = !this.fullscreen;
  },
    manage(){
      // localStorage.setItem('_lSidebar','manage');
      // this.$emit('childToParentEvent', 'manage')
      this.$router.push('/apply');
    },
    setting() {
      
    },
    logout() {
      /*window.localStorage.removeItem("authorization");
      console.log(localStorage.getItem('authorization'),'--authorization---')
      var url = logoutUrl;
      this.$axios.post(url,null).then((res)=>{
        var result = res.data;
        console.log(result.status_code,'--result.status_code--');
        if(result.status_code == ERR_OK){
          this.$router.push('/login');
        }
      });*/
      localStorage.clear();
      this.$router.push('/login');
    },
    toFirstPage() {
      // this.$router.push('./firstPage')
    },
    getUserInfo() {
      
    }
  },
  created() {
    // this.getUserInfo()
  }
}
</script>