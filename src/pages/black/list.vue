<style lang="scss" scoped>
</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <span>黑名单库</span>
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
          <p class="inline">证件号：</p>
          <div class="inline width160">
            <el-input
              v-model="form.certificateNumber"
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
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="BId" label="编号" width="80" fixed></el-table-column>
        <el-table-column prop="BName" label="姓名" fixed width="100"></el-table-column>
        <el-table-column prop="BSex" label="性别" width="60">
          <template slot-scope="scope">{{scope.row.BSex | filterSex}}</template>
        </el-table-column>
        <el-table-column prop="BBirthDate" label="出生日期" width="100"></el-table-column>
        <el-table-column label="身份证里的住址" min-width="300">
          <template slot-scope="scope">
              <el-tooltip :content="scope.row.BAddress" placement="right" effect="light">
                <span type="text" size="small" class="ellipsis">{{scope.row.BAddress}}</span>
              </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="BCertificateType" label="证件类型" width="100"></el-table-column>
        <el-table-column prop="BCertificateNumber" label="证件号" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleClick(scope.row,'detail')" icon="el-icon-view" :underline="false">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="handleClick(scope.row,'edit')" icon="el-icon-edit" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="handleClick(scope.row,'delete')" icon="el-icon-delete" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableBottom">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          :page-sizes="this.$pagesizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-dialog title="详情" width="1000px" :visible.sync="dialogDetailFormVisible">
        <div class="dialog_body">
          <el-row>
            <el-col :span="21">
              <el-row class="intervals">
                <el-col :span="8"><div class="">编号：{{thisRow.BId}}</div></el-col>
                <el-col :span="8"><div class="">姓名：{{thisRow.BName}}</div></el-col>
                <el-col :span="8"><div class="">性别：{{thisRow.BSex|filterSex}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">民族：{{thisRow.BNation}}</div></el-col>
                <el-col :span="8"><div class="">出生日期：{{thisRow.BBirthDate}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">证件类型：{{thisRow.BCertificateType}}</div></el-col>
                <el-col :span="8"><div class="">证件号：{{thisRow.BCertificateNumber}}</div></el-col>
                <el-col :span="8"><div class="">证件有效期：{{thisRow.BExpiryDate}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">签发机关：{{thisRow.BIssuingAuthority}}</div></el-col>
                <el-col :span="8"><div class="">数据来自：{{thisRow.CName}}</div></el-col>
                <el-col :span="8"><div class="">黑名单级别：{{thisRow.BLevel}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">创建时间：{{thisRow.BCreateTime}}</div></el-col>
                <el-col :span="16"><div class="">住址：{{thisRow.BAddress}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="24"><div class="">备注：{{thisRow.BRemark}}</div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3" v-show="thisRow.BCertificatePhoto">
              <el-image
                style="width: 100px; height: 100px"
                :src="'data:image/*;base64,' + thisRow.BCertificatePhoto"
                fit="scale-down"></el-image>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :title="title" width="1000px" :visible.sync="dialogOperateFormVisible">
        <div class="dialog_body">
          <el-row>
            <el-col :span="21">
              <el-row class="intervals4opetate">
                <!-- <el-col :span="8"><div class="">编号：{{thisRow.BId}}</div></el-col> -->
                <el-col :span="8"><div class=""><i class="el-icon-star-on star_red"></i> 姓名：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BName" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8">
                  <div class="">性别：
                    <el-select class="dialog_input_width" size="medium" v-model="thisRow.BSex" placeholder="请选择">
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
                <el-col :span="8"><div class="">民族：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BNation" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="16">
                  <div class="">出生日期：
                    <el-date-picker
                      v-model="thisRow.BBirthDate"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- <el-input class="dialog_input_width" size="medium" v-model="thisRow.BBirthDate" placeholder="请输入内容" clearable></el-input> -->
                  </div></el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class="">证件类型：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BCertificateType" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class=""><i class="el-icon-star-on star_red"></i>证件号：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BCertificateNumber" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8"><div class="">证件有效期：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BExpiryDate" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="8"><div class="">签发机关：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BIssuingAuthority" placeholder="请输入内容" clearable></el-input></div></el-col>
                <el-col :span="8">
                  <div class="">数据来自：
                    <el-select style="width:160px;" size="medium" v-model="thisRow.BFromCourtId" placeholder="请选择">
                      <el-option
                        v-for="item in courtOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="">黑名单级别：
                    <el-select style="width:160px;" size="medium" v-model="thisRow.BLevel" placeholder="请选择">
                      <el-option
                        v-for="item in bLevelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="24"><div class=""><i class="el-icon-star-on star_red"></i>住址：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BAddress" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
              <el-row class="intervals4opetate">
                <el-col :span="24"><div class="">备注：<el-input class="dialog_input_width" size="medium" v-model="thisRow.BRemark" placeholder="请输入内容" clearable></el-input></div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3" v-show="thisRow.BCertificatePhoto">
              <el-image
                style="width: 100px; height: 100px"
                :src="thisRow.BCertificatePhoto?'data:image/*;base64,'+thisRow.BCertificatePhoto:''"
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
        <span>你确定要删除编号为{{thisRow.VId}}的这条数据吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitHandleClick('delete')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
import { AESEncrypt,getFullDateTime,_md5,isNUll } from '@/common/js/utils'
import { haveThisModelUrl,haveThisModel4EditUrl,getBlackListByMoreUrl,addBlacklist4WebUrl, getVisitorListUrl, editBlacklist4WebUrl, deleteBlacklistInfByIdUrl, ERR_OK, ajax } from "@/api/index";
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
        certificateNumber: ""
      },
      courtOptions: [],
      vTypeOptions: [
        { value: "V", label: "访客" },
        { value: "L", label: "律师" },
        { value: "B", label: "黑名单" }
      ],
      bLevelOptions:[
        { value: "1", label: "一级" },
        { value: "2", label: "二级" },
        { value: "3", label: "三级" }
      ],
      bSexOptions:[
        { value: "1", label: "男" },
        { value: "0", label: "女" }
      ],
      dialogDetailFormVisible: false,
      dialogOperateFormVisible: false,
      dialogDeleteFormVisible: false,
      thisRow:{},
      isHaveModel:1
    };
  },
  created() {
    this.getList();
    this.courtOptions = JSON.parse(localStorage.getItem('courtList'));
    this.courtOptions4search = JSON.parse(localStorage.getItem('courtOptions4search'));
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
      if(isNUll(that.thisRow.BName)){
        that.$message.error("姓名不能为空！");
      }else if(isNUll(that.thisRow.BAddress)){
        that.$message.error("地址不能为空！");
      }else if(isNUll(that.thisRow.BCertificateNumber)){
        that.$message.error("证件号不能为空！");
      }else{
        var method = 'GET';
        var params = {
          BCertificateNumber: that.thisRow.BCertificateNumber,
          BId:that.thisRow.BId
        }
        console.log('params',params);
        ajax(type=="添加"?haveThisModelUrl:haveThisModel4EditUrl,method,params,function(res){
          var result = JSON.parse(res);
          console.log(result);
          console.log("code:" + result.code);
          if (result.code == ERR_OK) {
            if(result.count>=1){
              that.$message.error("数据库中已经存在此证件号！");
            }else{
              if(type=="编辑"){
                that.eidtModel();
              }else if(type=="添加"){
                that.addModel();
              }
            }
          }
        });
      }
    },
    eidtModel(){
      var that = this;
      var method = 'POST';
      var params = {
        BName:AESEncrypt(that.thisRow.BName)||'', 
        BSex:that.thisRow.BSex||'', 
        BNation:that.thisRow.BNation||'', 
        BBirthDate:that.thisRow.BBirthDate||'', 
        BAddress:AESEncrypt(that.thisRow.BAddress)||'', 
        BIssuingAuthority:that.thisRow.BIssuingAuthority||'', 
        BExpiryDate:that.thisRow.BExpiryDate||'', 
        BCertificatePhoto:that.thisRow.BCertificatePhoto||'', 
        BLocalePhoto:that.thisRow.BLocalePhoto||'', 
        BCertificateType:that.thisRow.BCertificateType||'', 
        BCertificateNumber:AESEncrypt(that.thisRow.BCertificateNumber)||'', 
        BCreateTime:getFullDateTime(new Date().getTime())||'', 
        BFromCourtId:that.thisRow.BFromCourtId||'', 
        BLevel:that.thisRow.BLevel||'', 
        BRemark:that.thisRow.BRemark||'', 
        BId:that.thisRow.BId
      };
      var p = "";
      p += "BName=" + params.BName||'';
      p += "&BSex=" + params.BSex||'';
      p += "&BNation=" + params.BNation||'';
      p += "&BBirthDate=" + params.BBirthDate||'';
      p += "&BAddress=" + params.BAddress||'';
      p += "&BIssuingAuthority=" + params.BIssuingAuthority||'';
      p += "&BExpiryDate=" + params.BExpiryDate||'';
      p += "&BCertificatePhoto=" + params.BCertificatePhoto||'';
      p += "&BLocalePhoto=" + params.BLocalePhoto||'';
      p += "&BCertificateType=" + params.BCertificateType||'';
      p += "&BCertificateNumber=" + params.BCertificateNumber||'';
      p += "&BCreateTime=" + params.BCreateTime||'';
      p += "&BFromCourtId=" + params.BFromCourtId||'';
      p += "&BLevel=" + params.BLevel||'';
      p += "&BRemark=" + params.BRemark||'';
      console.log("p",p);
      params.BMD5Ciphertext = _md5(p);
      console.log("params",params);
      ajax(editBlacklist4WebUrl,method,params,function(res){
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
          that.$message.error(result.msg);
          that.dialogOperateFormVisible = false;
        }
      });
      console.log("outAjax");
    },
    addModel(){
      var that = this;
      var method = 'POST';
      var params = {
        BName:AESEncrypt(that.thisRow.BName)||'', 
        BSex:that.thisRow.BSex||'', 
        BNation:that.thisRow.BNation||'', 
        BBirthDate:that.thisRow.BBirthDate||'', 
        BAddress:AESEncrypt(that.thisRow.BAddress)||'', 
        BIssuingAuthority:that.thisRow.BIssuingAuthority||'', 
        BExpiryDate:that.thisRow.BExpiryDate||'', 
        BCertificatePhoto:that.thisRow.BCertificatePhoto||'', 
        BLocalePhoto:that.thisRow.BLocalePhoto||'', 
        BCertificateType:that.thisRow.BCertificateType||'', 
        BCertificateNumber:AESEncrypt(that.thisRow.BCertificateNumber)||'', 
        BCreateTime:getFullDateTime(new Date().getTime())||'', 
        BFromCourtId:that.thisRow.BFromCourtId||'', 
        BLevel:that.thisRow.BLevel||'', 
        BRemark:that.thisRow.BRemark||'', 
      };
      var p = "";
      p += "BName=" + params.BName;
      p += "&BSex=" + params.BSex;
      p += "&BNation=" + params.BNation;
      p += "&BBirthDate=" + params.BBirthDate;
      p += "&BAddress=" + params.BAddress;
      p += "&BIssuingAuthority=" + params.BIssuingAuthority;
      p += "&BExpiryDate=" + params.BExpiryDate;
      p += "&BCertificatePhoto=" + params.BCertificatePhoto;
      p += "&BLocalePhoto=" + params.BLocalePhoto;
      p += "&BCertificateType=" + params.BCertificateType;
      p += "&BCertificateNumber=" + params.BCertificateNumber;
      p += "&BCreateTime=" + params.BCreateTime;
      p += "&BFromCourtId=" + params.BFromCourtId;
      p += "&BLevel=" + params.BLevel;
      p += "&BRemark=" + params.BRemark;
      console.log("p",p);
      params.BMD5Ciphertext = _md5(p);
      console.log("params",params);
      ajax(addBlacklist4WebUrl,method,params,function(res){
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
    submitHandleClick(type){
      var that = this;
      if(type=="编辑"){
        this.haveThisModel(type);
      }else if(type=="添加"){
        this.haveThisModel(type);
      }else if(type=='delete'){
        var method = 'POST';
        var params = {
          BId: that.thisRow.BId
        };
        console.log("intoAjax");
        ajax(deleteBlacklistInfByIdUrl,method,params,function(res){
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
      }
    },
    handleClick(row,type) {
      var that = this;
      switch(type){
        case 'detail': that.dialogDetailFormVisible = true;break;
        case 'edit': that.dialogOperateFormVisible = true;that.title="编辑"; break;
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
        BName: that.form.name,
        BCertificateNumber: that.form.certificateNumber,
        BFromCourtId: that.form.courtId,
        pageSize: that.pageSize,
        pageIndex: that.pageIndex
      };
      // var url = getVisitorListUrl;
      var url = getBlackListByMoreUrl;
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