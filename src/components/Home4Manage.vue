<style lang="scss" scoped>
@import '../common/scss/common.scss';
.home {
  font-size: 13px;
  background-color: #efeff4;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  // min-width: 1200px;
  //@include extend();
  display: flex;
  flex-direction: column;
  .headerWrapper{
    flex: 0 0 $headerHeight;
    height: $headerHeight;
    box-shadow:0px 1px 2px #000d26;
    z-index: 100;
  }
  .contentWrapper{
    flex: 1;
    display: flex;
    .leftWrapper{
      flex: 0 0 $sidebarWidth;
      background-color: $mainColor;
    }
    .rightWrapper{
      flex: 1;
      min-width: 1160px;
    }
  }
}
</style>
<template>
  <div class="home">
    <!-- <v-head></v-head> -->
    <div class="headerWrapper">
      <v-head></v-head>
    </div>
    <div class="contentWrapper">
      <div class="leftWrapper">
        <l-sidebar></l-sidebar>
      </div>
      <div class="rightWrapper">
          <router-view></router-view>
      </div>
      <!-- <l-sidebar></l-sidebar> -->
      <!-- <div class="content" ref="content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </div> -->
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import lSidebar from './LeftSidebar4Manage.vue'
import { getFullDateTime } from '@/common/js/utils'
export default {
  data() {
    return {
    }
  },
  created() {
    // console.log('time:',new Date().getTime())
    // console.log('date:',getFullDateTime(new Date().getTime()))
  },
  methods: {
  },
  components: {
    vHead, lSidebar
  }
}
</script>
