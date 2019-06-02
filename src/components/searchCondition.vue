<style lang="scss">
  @import '../common/scss/common.scss';
  .searchCondition {
    position: relative;
    width: 100%; 
    min-width: $minWidth;
    padding-left: 10px;
    margin-bottom: 12px; 
    overflow: hidden;
    display: flex;
    .text{
      flex:auto;
    }
    .btnBox{
      flex:0 0 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 9px;
      padding-right: 12px;
      overflow: hidden;
      .btn{
        flex: 1;
        // .btn_width{
        //   width: 80px;
        // }
      }
      .icon{
        flex: 0 0 36px;
        .moreIcon {
          // @include extend_click();
          transition: all 0.5s ease;
          color: $mainColor;
          font-size: 20px;
        }
        .iconTransform {
          transition: all 0.5s ease;
          transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
        }
      }
    }
    .element {
      float: left;
      margin-right: 15px;
      margin-top: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
    .element_r {
      float: right;
      margin-left: 15px;
      margin-right: 15px;
      margin-top: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
  } 
</style>
<template>
  <div class="searchCondition" id="searchCondition">
    <div class="text">
      <slot></slot>
    </div>
    <div class="btnBox">
      <div class="btn">
        <el-button class="right btn_width" icon="el-icon-search" type="primary" size="medium" @click="searchData">搜  索</el-button>
      </div>
      <div class="icon" @click="moreBtn" v-if="isShowMoreBtn">
        <i class="el-icon-arrow-right moreIcon right" :class="{iconTransform:isTwoLiine==true}"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowMoreBtn: true,
      isTwoLiine: false
    }
  },
  created() {
    setTimeout(() => {
      let height = document.getElementById('searchCondition').offsetHeight
      // console.log('height:' + height)
      if (height < 53) {
        this.isShowMoreBtn = false
      } else {
        this.isShowMoreBtn = true
        document.getElementById('searchCondition').style.height = '50px'
      }
      document.getElementById('searchCondition').style.overflow = 'hidden'
    }, 20)
  },
  methods: {
    searchData() {
      this.$emit('clickSearchData')
    },
    moreBtn() {
      this.isTwoLiine = !this.isTwoLiine
      if (this.isTwoLiine) {
        document.getElementById('searchCondition').style.height = 'auto'
      } else {
        document.getElementById('searchCondition').style.height = '50px'
      }
    }
  }
}
</script>