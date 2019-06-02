<template>
  <div class="inline">
    <label class="inline margL20">排课周期：</label>
    <div class="inline">
       <el-select class="width140" v-model="time1" @change="time1Change" placeholder="请选择" size="medium">
        <el-option
          v-for="item in time1Options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="inline">
       <el-select class="width200" v-model="time2" @change="time2Change" placeholder="请选择" size="medium">
        <el-option
          v-for="item in time2Options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { getFullDate,getTime,getDay,getDaysInYearMonth,getMonth } from '@/common/js/utils'
// 一天有多少毫秒
var oneDayTime = 24*60*60*1000
var oneDaySecond = 24*60*60
export default {
  data() {
    return {
      time1:"",
      time2:"",
      time1Options:[],
      time2Options:[],
      firstDay:''
    }
  },
  created() {
    // this.getFirst()
    this.getTime1Option();
  },
  methods: {
    getTime1Option() {
      var datatime = new Date()
      var year = datatime.getFullYear();
      var month = datatime.getMonth()
      var arr = []
      for(var i=month-1;i<12;i++){
        var item = {label:`${year}/${i+1}`,value: `${year}/${i+1}`}
        arr.push(item)
      }
      var year2 = parseInt(year) + 1
      for(var i=0;i<12;i++){
        var item = {label:`${year2}/${i+1}`,value: `${year2}/${i+1}`}
        arr.push(item)
      }
      // console.log(arr,"arr")
      this.time1Options = arr
    },
    time1Change(value) {
      var month = value.split('/')[1]
      console.log("月份：" + month)
      var firstDay = value.toString() + "/1"
      var arr = []
      var time  = getTime(firstDay)
      var days = getDaysInYearMonth(value.split('/')[0],month)
      console.log(days,"天数")
      for(var i=0;i<days;i++){
        var d = getDay(time)
        if(d==1){
          var lastRange = getFullDate(time)
          var m = getMonth(lastRange)
          console.log("month:" + month + ",m:" + m)
          if(month == m) {
            var range = getFullDate(time)+"~"+getFullDate(time+oneDayTime*6)
            var item = {label:range,value:range}
            arr.push(item)
          }
        }
        time = time + oneDayTime
      }
      this.time2Options = arr
    },
    time2Change(value) {
      this.firstDay = value.split('~')[0]
      var time1 = getTime(value.split('~')[0]).toString()
      var len1 = time1.length
      var time2 = getTime(value.split('~')[1]).toString()
      var len2 = time2.length
      var timebegin = time1.substring(0,len1-3);
      var timeend = parseInt(time2.substring(0,len2-3))+oneDaySecond;

      var w = []
      w.push(timebegin)
      w.push(timeend)
      this.weekth = w.join(',')
      console.log(this.weekth,"weekth")
      //还是通过设置缓存的方式来获取数据吧
      this.$cookie.set("_weekth",this.weekth)
      this.$cookie.set("_firstDay",this.firstDay)
      // this.getList()
      this.$emit('getTimeData')
    },
  }
}
</script>