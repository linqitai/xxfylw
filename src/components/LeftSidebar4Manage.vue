<style lang="scss" scoped>
@import "../common/scss/common.scss";
@import "../common/scss/mixin.scss";
.sliderbar,.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $sidebarWidth;
  height: 100%;
  background-color: $mainColor !important;
}
.el-menu-item:hover{
  color: #409EFF !important;
  i{
    color: #409EFF !important;
  }
}
.el-menu-item i {
    color: #ffffff;
}
.el-menu-item{
  &.is-active{
    i{
      color: #409EFF !important;
    }
  }
}
// .sliderbar{
//   background-color: $mainColor;
// }
</style>
<template>
  <div class="sliderbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      text-color="#fff"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <i class="iconfont icon-visitor"></i>
        <span slot="title">访客库</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="iconfont icon-black"></i>
        <span slot="title">黑名单库</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont icon-lawyer"></i>
        <span slot="title">律师库</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="iconfont icon-lawyer"></i>
        <span slot="title">法院库</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { getCourtListUrl, ERR_OK, ajax } from "@/api/index";
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: localStorage.getItem("activeIndex")||'1'
    };
  },
  computed: {
    
  },
  created() {
    this.getCourtList();
  },
  mounted() {
    var that = this;
    switch(that.activeIndex){
      case "1": that.$router.push('/visitorList');break;
      case "2": that.$router.push('/blackList');break;
      case "3": that.$router.push('/lawyerList');break;
      // case "4": that.$router.push('/courtList');break;
      default:that.$router.push('/visitorList');
    }
  },
  methods: {
    getCourtList() {
      let that = this;
      // var url = getVisitorListUrl;
      var url = getCourtListUrl;
      var method = "GET";
      console.log("intoAjax");
      ajax(url, method, null, function(res) {
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.courtList = result.data;
          console.log("courtList",that.courtList)
          console.log("courtList.len",that.courtList.length)
          for(var i=0;i<that.courtList.length;i++){
            that.courtList[i].value = that.courtList[i].CNumber;
            that.courtList[i].label = that.courtList[i].CName;
          }
          localStorage.setItem('courtList', JSON.stringify(that.courtList));
          var item = {value:"",label:"全部"};
          that.courtList.unshift(item);
          localStorage.setItem('courtOptions4search', JSON.stringify(that.courtList));
          // that.total = result.count;
          // that.loading = false;
        }
      });
    },
    handleSelect(key, keyPath) {
        console.log("key:",key)
        var that = this;
        that.activeIndex = (key).toString();
        localStorage.setItem("activeIndex",that.activeIndex);
        switch(that.activeIndex){
          case "1": that.$router.push('/visitorList');break;
          case "2": that.$router.push('/blackList');break;
          case "3": that.$router.push('/lawyerList');break;
          // case "4": that.$router.push('/courtList');break;
          default:that.$router.push('/visitorList');
        }
      }
  }
};
</script>