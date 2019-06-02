<style lang="scss" scoped>
.inputFileBox{
  position: relative;
  .inputFile{
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 160px;
    opacity: 0;
  }
}
</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <span>律师库</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="searchEvent">
        <div class="element">
          <el-button icon="el-icon-circle-plus" type="primary" size="medium" @click="handleClick({},'add')">添  加</el-button>
        </div>
        <div class="element">
          <p class="inline">来自：</p>
          <div class="inline">
            <el-select
              class="width200"
              size="medium"
              v-model="form.courtId"
              @change="courtChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in courtOptions4search"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="element_r">
          <p class="inline">身份证号：</p>
          <div class="inline width160">
            <el-input
              v-model="form.LIdentityNumber"
              size="medium"
              placeholder="请输入搜索内容"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="element_r">
          <p class="inline">姓名：</p>
          <div class="inline width160">
            <el-input v-model="form.name" size="medium" placeholder="请输入搜索内容" clearable></el-input>
          </div>
        </div>
      </search-condition>
      <el-table :data="tableData" border stripe style="width: 100%;" v-loading="loading">
        <el-table-column prop="LId" label="编号" width="80" fixed></el-table-column>
        <el-table-column prop="LName" label="姓名" fixed min-width="100"></el-table-column>
        <el-table-column prop="LSex" label="性别" min-width="60">
          <template slot-scope="scope">{{scope.row.LPhoto | filterSex}}</template>
        </el-table-column>
        <el-table-column prop="LIdentityNumber" label="身份证号" min-width="180"></el-table-column>
        <el-table-column prop="LActuator" label="执业机构" min-width="180"></el-table-column>
        <el-table-column prop="LQualifityNumber" label="律师资格证号" min-width="180"></el-table-column>
        <el-table-column prop="LInTime" label="登记时间" min-width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleClick(scope.row,'detail')" icon="el-icon-view" :underline="false">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="handleClick(scope.row,'edit')" icon="el-icon-edit" :underline="false">编辑</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="handleClick(scope.row,'delete')" icon="el-icon-delete" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableBottom">
        <el-pagination
          class="pagination left"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          :page-sizes="this.$pagesizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <div class="right inputFileBox margL20">
          <el-button icon="el-icon-download" type="primary" size="medium" @click="exportToExcel">导出到Excel</el-button>
        </div>
        <div class="right inputFileBox">
          <!-- <input type="file" ref="upload" accept=".xls,.xlsx" class="inputFile"> -->
          <!-- <input id="upload" type="file" @change="importfxx(this)"  accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"/> -->
          <el-button icon="el-icon-circle-plus" type="primary" size="medium">从Excel导入数据</el-button>
        </div>
      </div>

      <el-dialog title="详情" width="1000px" :visible.sync="dialogDetailFormVisible">
        <div class="dialog_body">
          <el-row>
            <el-col :span="21">
              <el-row class="intervals">
                <el-col :span="8"><div class="">编号：{{thisRow.LId}}</div></el-col>
                <el-col :span="8"><div class="">姓名：{{thisRow.LName}}</div></el-col>
                <el-col :span="8"><div class="">性别：{{thisRow.LSex|filterSex}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">身份证号：{{thisRow.LIdentityNumber}}</div></el-col>
                <el-col :span="8"><div class="">执业机构：{{thisRow.LActuator}}</div></el-col>
                <el-col :span="8"><div class="">执业证类别：{{thisRow.LPCType}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">执业证号：{{thisRow.LPCNumber}}</div></el-col>
                <el-col :span="8"><div class="">律师资格证号：{{thisRow.LQualifityNumber}}</div></el-col>
                <el-col :span="8"><div class="">发证机关：{{thisRow.LIssuingAuthority}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">发证日期：{{thisRow.LIssuingDate}}</div></el-col>
                <el-col :span="8"><div class="">登记时间：{{thisRow.LInTime}}</div></el-col>
                <el-col :span="8"><div class="">数据来自：{{thisRow.CName}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="24"><div class="">备注：{{thisRow.LRemark}}</div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3" v-show="thisRow.LPhoto">
              <el-image
                style="width: 100px; height: 100px"
                :src="'data:image/*;base64,' + thisRow.LPhoto"
                fit="scale-down"></el-image>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :title="title" width="1200px" :visible.sync="dialogOperateFormVisible">
        <div class="dialog_body">
          <el-row>
            <el-col :span="21">
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class=""><i class="el-icon-star-on star_red"></i>姓名：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LName" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8">
                  <div class="">性别：
                    <el-select class="dialog_input_width" size="medium" v-model="thisRow.LSex" placeholder="请选择">
                      <el-option
                        v-for="item in bSexOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class=""><i class="el-icon-star-on star_red"></i>身份证号：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LIdentityNumber" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class="">执业机构：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LActuator" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class="">执业证类别：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LPCType" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class="">执业证号：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LPCNumber" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class="">律师资格证号：<el-input style="width:210px;" size="medium" v-model="thisRow.LQualifityNumber" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class="">发证机关：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LIssuingAuthority" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class="">发证日期：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LIssuingDate" placeholder="请输入内容" clearable></el-input></div></el-col>
                
                <el-col :span="8">
                  <div class="">数据来自：
                    <!-- <el-input class="dialog_input_width" size="medium" v-model="thisRow.CName" placeholder="请输入内容" clearable></el-input> -->
                    <el-select style="width:160px;" size="medium" v-model="thisRow.LFromCourtId" placeholder="请选择">
                      <el-option
                        v-for="item in courtOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="24"><div class="">备注：<el-input class="dialog_input_width" size="medium" v-model="thisRow.LRemark" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3" v-show="thisRow.LPhoto">
              <el-image
                style="width: 100px; height: 100px"
                :src="thisRow.LPhoto?'data:image/*;base64,'+thisRow.LPhoto:''"
                fit="scale-down"></el-image>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogOperateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitHandleClick(title)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogDeleteFormVisible"
        width="400px">
        <span>你确定要删除编号为{{thisRow.LId}}的这条数据吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitHandleClick('delete')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogExportFormVisible"
        width="400px">
        <span>此操作将导出excel文件, 是否继续?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogExportFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitHandleClick('export')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import XLSX from 'xlsx'
// import { ERR_OK } from '@/api/index'
import { AESEncrypt,getFullDateTime,getFullDate,_md5,isNUll } from '@/common/js/utils'
import { getLawyerAllUrl,haveLawyerModelUrl,haveLawyerModel4EditUrl,getLawyerByMoreUrl,addLawyer4WebUrl, getVisitorListUrl, editLawyer4WebUrl, deleteLawyerInfByIdUrl, ERR_OK, ajax } from "@/api/index";
// import { ajax } from "@/api/ajax"
import searchCondition from "@/components/searchCondition.vue";
export default {
  data() {
    return {
      title:"编辑",
      loading:true,
      pageIndex: 1,
      pageSize: 8,
      total: 10,
      showPageTag: true,
      tableData: [],
      form: {
        courtId: "",
        name: "",
        LIdentityNumber: ""
      },
      courtOptions4search: [],
      courtOptions: [],
      vTypeOptions: [
        { value: "V", label: "访客" },
        { value: "L", label: "律师" },
        { value: "B", label: "黑名单" }
      ],
      bSexOptions:[
        { value: "1", label: "男" },
        { value: "0", label: "女" }
      ],
      dialogDetailFormVisible: false,
      dialogOperateFormVisible: false,
      dialogDeleteFormVisible: false,
      dialogExportFormVisible:false,
      thisRow:{LFromCourtId:"10000"}
    };
  },
  created() {
    this.getList();
    this.courtOptions = JSON.parse(localStorage.getItem('courtList'));
    this.courtOptions4search = JSON.parse(localStorage.getItem('courtOptions4search'));
    this.thisRow.LFromCourtId = "10000";
  },
  computed: {},
  filters: {
    filterSex(t) {
      return t == 1 ? "男" : "女";
    },
    filterVType(t) {
      return t == "V" ? "访客" : t == "B" ? "黑名单" : "律师";
    }
  },
  components: {
    searchCondition
  },
  methods: {
    getAllList() {
      let that = this;
      var params = {};
      // var url = getVisitorListUrl;
      var url = getLawyerAllUrl;
      console.log(params, "params");
      var method = "GET";
      console.log("intoAjax");
      ajax(url, method, params, function(res) {
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.excelData = result.data;
          that.export2Excel()
        }
      });
    },
    // 导出数据到Excel
    exportToExcel() {
      this.getAllList();
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
          const { export_json_to_excel } = require('../../excel/Export2Excel'); //这里必须使用绝对路径
          const tHeader = ['编号','姓名', '性别', '身份证号','执业机构','执业证类别','执业证号','律师资格证号','发证机关','发证日期','登记时间','数据来自']; // 导出的表头名
          const filterVal = ['LId','LName', 'Sex', 'LIdentityNumber','LActuator','LPCType','LPCNumber','LQualifityNumber','LIssuingAuthority','LInTime','LIssuingDate','CName']; // 导出的表头字段名
          const list = that.excelData;
          const data = that.formatJson(filterVal, list);
          let time = getFullDate(new Date().getTime());
          console.log('time',time);
          export_json_to_excel(tHeader, data, `律师库excel ${time}`);// 导出的表格名称，根据需要自己命名
      })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getColor(type) {
      return type == "B" ? "warn_text" : type == "L" ? "green_text" : "";
    },
    courtChange(value) {
      this.form.courtId = value;
      console.log("this.form.courtId:", this.form.courtId);
      this.getList();
    },
    haveThisModel(type){
      var that = this;
      //判断非空
      if(isNUll(that.thisRow.LName)){
        that.$message.error("姓名不能为空！");
      }else if(isNUll(that.thisRow.LIdentityNumber)){
        that.$message.error("身份证号不能为空！");
      }else{
        var method = 'GET';
        var params = {
          LIdentityNumber: that.thisRow.LIdentityNumber,
          LId:that.thisRow.LId
        }
        console.log('params',params);
        ajax(type=="添加"?haveLawyerModelUrl:haveLawyerModel4EditUrl,method,params,function(res){
          var result = JSON.parse(res);
          console.log(result);
          console.log("code:" + result.code);
          if (result.code == ERR_OK) {
            if(result.count>=1){
              that.$message.error("数据库中已经存在此身份证号！");
            }else{
              if(type=="编辑"){
                that.editModel();
              }else if(type=="添加"){
                that.addModel();
              }
            }
          }
        });
      }
    },
    editModel(){
      var that = this;
      var method = 'POST';
      var params = {
        LName:AESEncrypt(that.thisRow.LName)||'', 
        LSex:that.thisRow.LSex||'', 
        LPhoto:that.thisRow.LPhoto||"", 
        LIdentityNumber:AESEncrypt(that.thisRow.LIdentityNumber)||'', 
        LActuator:that.thisRow.LActuator||'', 
        LPCType:that.thisRow.LPCType||'', 
        LPCNumber:that.thisRow.LPCNumber||'', 
        LQualifityNumber:that.thisRow.LQualifityNumber||'', 
        LIssuingAuthority:that.thisRow.LIssuingAuthority||'', 
        LIssuingDate:that.thisRow.LIssuingDate||'', 
        LInTime:getFullDateTime(new Date().getTime()),
        LFromCourtId:that.thisRow.LFromCourtId||'', 
        LRemark:that.thisRow.LRemark||'',
        LId:that.thisRow.LId
      };
      var p = "";
      p += "LName=" + params.LName;
      p += "&LSex=" + params.LSex;
      p += "&LPhoto=" + params.LPhoto;
      p += "&LIdentityNumber=" + params.LIdentityNumber;
      p += "&LActuator=" + params.LActuator;
      p += "&LPCType=" + params.LPCType;
      p += "&LPCNumber=" + params.LPCNumber;
      p += "&LQualifityNumber=" + params.LQualifityNumber;
      p += "&LIssuingAuthority=" + params.LIssuingAuthority;
      p += "&LIssuingDate=" + params.LIssuingDate;
      p += "&LInTime=" + params.LInTime;
      p += "&LFromCourtId=" + params.LFromCourtId;
      p += "&LRemark=" + params.LRemark;
      console.log("p",p);
      params.LMD5Ciphertext = _md5(p);
      console.log("params",params);
      ajax(editLawyer4WebUrl,method,params,function(res){
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.$message({
            message: '恭喜你，操作成功！',
            type: 'success'
          });
          that.dialogOperateFormVisible = false;
          that.getList();
        } else {
          that.$message.error('操作失败！');
        }
      });
      console.log("outAjax");
    },
    addModel(){
      var that = this;
      var method = 'POST';
      var params = {
        LName:AESEncrypt(that.thisRow.LName)||'', 
        LSex:that.thisRow.LSex||'', 
        LPhoto:that.thisRow.LPhoto||"", 
        LIdentityNumber:AESEncrypt(that.thisRow.LIdentityNumber)||'', 
        LActuator:that.thisRow.LActuator||'', 
        LPCType:that.thisRow.LPCType||'', 
        LPCNumber:that.thisRow.LPCNumber||'', 
        LQualifityNumber:that.thisRow.LQualifityNumber||'', 
        LIssuingAuthority:that.thisRow.LIssuingAuthority||'', 
        LIssuingDate:that.thisRow.LIssuingDate||'', 
        LInTime:getFullDateTime(new Date().getTime()),
        LFromCourtId:that.thisRow.LFromCourtId||'', 
        LRemark:that.thisRow.LRemark||''
      };
      var p = "";
      p += "LName=" + params.LName;
      p += "&LSex=" + params.LSex;
      p += "&LPhoto=" + params.LPhoto;
      p += "&LIdentityNumber=" + params.LIdentityNumber;
      p += "&LActuator=" + params.LActuator;
      p += "&LPCType=" + params.LPCType;
      p += "&LPCNumber=" + params.LPCNumber;
      p += "&LQualifityNumber=" + params.LQualifityNumber;
      p += "&LIssuingAuthority=" + params.LIssuingAuthority;
      p += "&LIssuingDate=" + params.LIssuingDate;
      p += "&LInTime=" + params.LInTime;
      p += "&LFromCourtId=" + params.LFromCourtId;
      p += "&LRemark=" + params.LRemark;
      console.log("p",p);
      params.LMD5Ciphertext = _md5(p);
      console.log("params",params);
      ajax(addLawyer4WebUrl,method,params,function(res){
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.$message({
            message: '恭喜你，操作成功！',
            type: 'success'
          });
          that.dialogOperateFormVisible = false;
          that.getList();
        } else {
          that.$message.error('操作失败！');
        }
      });
      console.log("add");
    },
    deleteModel(){
      var that = this;
      var method = 'POST';
      var params = {
        LId: that.thisRow.LId
      };
      console.log("intoAjax");
      ajax(deleteLawyerInfByIdUrl,method,params,function(res){
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.dialogDeleteFormVisible = false;
          that.$message({
            message: '操作成功！',
            type: 'success'
          });
          that.getList();
        }else{
          that.$message.error('操作失败！');
        }
      });
    },
    submitHandleClick(type){
      var that = this;
      if(type=="编辑"){
        that.haveThisModel(type);
      }else if(type=="添加"){
        that.haveThisModel(type);
      }else if(type=='delete'){
        that.deleteModel();
      }
    },
    handleClick(row,type) {
      var that = this;
      switch(type){
        case 'detail': that.dialogDetailFormVisible = true;break;
        case 'edit': that.dialogOperateFormVisible = true;that.title="编辑";break;
        case 'add': that.dialogOperateFormVisible = true;that.title="添加"; break;
        case 'delete': that.dialogDeleteFormVisible = true;break;
        default: null;
      }
      this.thisRow = row;
      console.log("thisRow:", this.thisRow);
    },
    searchEvent(){
      this.pageIndex = 1;
      this.getList();
    },
    getList() {
      let that = this;
      var params = {
        LName: that.form.name,
        LIdentityNumber: that.form.LIdentityNumber,
        LFromCourtId: that.form.courtId,
        pageSize: that.pageSize,
        pageIndex: that.pageIndex
      };
      // var url = getVisitorListUrl;
      var url = getLawyerByMoreUrl;
      console.log(params, "params");
      var method = "GET";
      console.log("intoAjax");
      ajax(url, method, params, function(res) {
        var result = JSON.parse(res);
        console.log(result);
        console.log("code:" + result.code);
        if (result.code == ERR_OK) {
          that.tableData = result.data;
          that.total = result.count;
          that.loading = false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      console.log(val);
      this.getList();
    }
  }
};
</script>