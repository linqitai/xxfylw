<style lang="scss" scoped>
</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <span>访客库</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="searchEvent">
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
        <el-table-column prop="VId" label="编号" width="80" fixed></el-table-column>
        <el-table-column prop="VName" label="姓名" fixed></el-table-column>
        <el-table-column prop="VType" label="访客类型" width="100">
          <template slot-scope="scope">
            <label :class="getColor(scope.row.VType)">{{scope.row.VType | filterVType}}</label>
          </template>
        </el-table-column>
        <el-table-column prop="VSex" label="性别" width="60">
          <template slot-scope="scope">{{scope.row.VSex | filterSex}}</template>
        </el-table-column>
        <el-table-column prop="VBirthDate" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="VAddress" label="身份证里的住址" min-width="300"></el-table-column>
        <el-table-column prop="VCertificateType" label="证件类型" width="100"></el-table-column>
        <el-table-column prop="VCertificateNumber" label="证件号" width="180"></el-table-column>
        <el-table-column prop="VInTime" label="登记时间" width="160"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row,'detail')" type="text" size="small">详情</el-button> -->
            <el-link type="primary" @click="handleClick(scope.row,'detail')" icon="el-icon-view" :underline="false">详情</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="handleClick(scope.row,'delete')" icon="el-icon-delete" :underline="false">删除</el-link>
            <!-- <el-button @click="handleClick(scope.row,'edit')" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider> -->
            <!-- <el-button @click="handleClick(scope.row,'delete')" type="text" size="small">删除</el-button> -->
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
          <el-divider content-position="left">访客信息</el-divider>
          <el-row>
            <el-col :span="21">
              <el-row class="intervals">
                <el-col :span="8"><div class="">编号：{{thisRow.VId}}</div></el-col>
                <el-col :span="8"><div class="">姓名：{{thisRow.VName}}</div></el-col>
                <el-col :span="8"><div class="">性别：{{thisRow.VSex|filterSex}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">民族：{{thisRow.VNation}}</div></el-col>
                <el-col :span="8"><div class="">出生日期：{{thisRow.VBirthDate}}</div></el-col>
                <el-col :span="8"><div class="">访客类型：{{thisRow.VType|filterVType}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">证件类型：{{thisRow.VCertificateType}}</div></el-col>
                <el-col :span="8"><div class="">证件号：{{thisRow.VCertificateNumber}}</div></el-col>
                <el-col :span="8"><div class="">证件有效期：{{thisRow.VExpiryDate}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">登记时间：{{thisRow.VInTime}}</div></el-col>
                <el-col :span="8"><div class="">签离时间：{{thisRow.VOutTime}}</div></el-col>
                <el-col :span="8"><div class="">签发机关：{{thisRow.VIssuingAuthority}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">登记门岗：{{thisRow.VInPost}}</div></el-col>
                <el-col :span="8"><div class="">签离门岗：{{thisRow.VOutPost}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">数据来自：{{thisRow.CName}}</div></el-col>
                <el-col :span="16"><div class="">住址：{{thisRow.VAddress}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="24"><div class="">来访事由：{{thisRow.VVisitingReason}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="24"><div class="">备注：{{thisRow.VRemark}}</div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3" v-show="thisRow.VCertificatePhoto">
              <el-image
                style="width: 100px; height: 100px"
                :src="'data:image/*;base64,' + thisRow.VCertificatePhoto"
                fit="scale-down">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
            </el-col>
          </el-row>
          <el-divider content-position="left">被访人信息</el-divider>
          <el-row>
            <el-col :span="21">
              <el-row class="intervals">
                <el-col :span="8"><div class="">被访人部门：{{thisRow.VIntervieweeDept}}</div></el-col>
                <el-col :span="8"><div class="">被访人：{{thisRow.VInterviewee}}</div></el-col>
                <el-col :span="8"><div class="">办公室：{{thisRow.VOffice}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">办公电话：{{thisRow.VOfficePhone}}</div></el-col>
                <el-col :span="8"><div class="">分机号：{{thisRow.VExtensionPhone}}</div></el-col>
                <el-col :span="8"><div class="">移动号：{{thisRow.VMobilePhone}}</div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3"></el-col>
          </el-row>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailFormVisible = false">关  闭</el-button>
        </div> -->
      </el-dialog>
      <el-dialog title="编辑" fullscreen :visible.sync="dialogEditFormVisible">
        <div>
          <el-divider content-position="left">访客信息</el-divider>
          <el-row>
            <el-col :span="21">
              <el-row class="intervals">
                <el-col :span="8"><div class="">编号：{{thisRow.VId}}</div></el-col>
                <el-col :span="8"><div class="">姓名：{{thisRow.VName}}</div></el-col>
                <el-col :span="8"><div class="">性别：{{thisRow.VSex|filterSex}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">民族：{{thisRow.VNation}}</div></el-col>
                <el-col :span="8"><div class="">出生日期：{{thisRow.VBirthDate}}</div></el-col>
                <el-col :span="8">
                  <div class="">
                    访客类型：
                    <el-select
                      class="width200"
                      size="medium"
                      v-model="thisRow.VType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in vTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">证件类型：{{thisRow.VCertificateType}}</div></el-col>
                <el-col :span="8"><div class="">证件号：{{thisRow.VCertificateNumber}}</div></el-col>
                <el-col :span="8"><div class="">证件有效期：{{thisRow.VExpiryDate}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">签发机关：{{thisRow.VIssuingAuthority}}</div></el-col>
                <el-col :span="8"><div class="">住址：{{thisRow.VAddress}}</div></el-col>
                <el-col :span="8"><div class="">数据来自：{{thisRow.CName}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">登记时间：{{thisRow.VInTime}}</div></el-col>
                <el-col :span="8"><div class="">签离时间：{{thisRow.VOutTime}}</div></el-col>
                <el-col :span="8"><div class="">登记门岗：{{thisRow.VInPost}}</div></el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="8"><div class="">签离门岗：{{thisRow.VOutPost}}</div></el-col>
                <el-col :span="15">
                  <div class="">来访事由：
                    <el-input style="width:600px;" type="input" placeholder="请输入内容" v-model="thisRow.VVisitingReason"></el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row class="intervals">
                <el-col :span="24">
                  <div class="">备注：
                    <el-input style="width:1010px;" type="input" placeholder="请输入内容" v-model="thisRow.VRemark"></el-input>
                </div></el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <el-image
                style="width: 100px; height: 100px"
                :src="'data:image/*;base64,' + thisRow.VCertificatePhoto"
                fit="scale-down"></el-image>
            </el-col>
          </el-row>
          <el-divider content-position="left">被访人信息</el-divider>
          <el-row class="intervals">
            <el-col :span="8"><div class="">被访人部门：<el-input style="width:200px;" v-model="thisRow.VIntervieweeDept" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="8"><div class="">被访人：<el-input style="width:200px;" v-model="thisRow.VInterviewee" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="8"><div class="">办公室：<el-input style="width:200px;" v-model="thisRow.VOffice" placeholder="请输入内容"></el-input></div></el-col>
          </el-row>
          <el-row class="intervals">
            <el-col :span="8"><div class="">办公电话：<el-input style="width:200px;" v-model="thisRow.VOfficePhone" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="8"><div class="">分机号：<el-input style="width:200px;" v-model="thisRow.VExtensionPhone" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="8"><div class="">移动号：<el-input style="width:200px;" v-model="thisRow.VMobilePhone" placeholder="请输入内容"></el-input></div></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取  消</el-button>
          <el-button type="primary" @click="submitHandleClick('edit')">提  交</el-button>
        </div>
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
import { getFullDateTime,AESEncrypt,_md5 } from '@/common/js/utils'
import { getListByMoreUrl, getVisitorListUrl, editVisitorInfUrl, deleteInfByIdUrl,addBlacklist4WebUrl, ERR_OK, ajax } from "@/api/index";
// import { ajax } from "@/api/ajax"
import searchCondition from "@/components/searchCondition.vue";
export default {
  data() {
    return {
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
      courtOptions4search:[],
      courtOptions: [],
      vTypeOptions: [
        { value: "V", label: "访客" },
        { value: "L", label: "律师" },
        { value: "B", label: "黑名单" }
      ],
      dialogDetailFormVisible: false,
      dialogEditFormVisible: false,
      dialogDeleteFormVisible: false,
      thisRow:{}
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
    addToBlacklist(){
      var method = 'POST';
      var that = this;
        var params = {
          BName:AESEncrypt(that.thisRow.VName), 
          BSex:that.thisRow.VSex, 
          BNation:that.thisRow.VNation, 
          BBirthDate:that.thisRow.VBirthDate, 
          BAddress:AESEncrypt(that.thisRow.VAddress), 
          BIssuingAuthority:that.thisRow.VIssuingAuthority, 
          BExpiryDate:that.thisRow.VExpiryDate, 
          BCertificatePhoto:that.thisRow.VCertificatePhoto, 
          BLocalePhoto:that.thisRow.VLocalePhoto, 
          BCertificateType:that.thisRow.VCertificateType,  
          BCertificateNumber:AESEncrypt(that.thisRow.VCertificateNumber),  
          BCreateTime:getFullDateTime(new Date().getTime()),
          BFromCourtId:that.thisRow.VFromCourtId,  
          BLevel:"1",//这里需要调整
          BReemark:that.thisRow.BReemark,  
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
        params.BMD5Ciphertext = _md5(p);
        console.log("params",params);
        ajax(addBlacklist4WebUrl,method,params,function(res){
          console.log('--------------ajax inner');
          console.log(res);
        });
        console.log("outAjax");
    },
    submitHandleClick(type){
      var that = this;
      if(type=="edit"){
        var method = 'POST';
        var params = that.thisRow;
        console.log("params:",params);
        ajax(editVisitorInfUrl,method,params,function(res){
          var result = JSON.parse(res);
          console.log(result);
          console.log("code:" + result.code);
          if (result.code == ERR_OK) {
            that.$message({
              message: '恭喜你，操作成功！',
              type: 'success'
            });
            that.dialogEditFormVisible = false;
            that.getList();
            if(that.thisRow.VType == 'B'){
              console.log("此处应该加入黑名单")
              that.addToBlacklist();
            }
          } else {
            that.$message.error('操作失败！');
          }
        });
        console.log("outAjax");
      }else if(type=='delete'){
        var method = 'POST';
        var params = {
          VId: that.thisRow.VId
        };
        console.log("intoAjax");
        ajax(deleteInfByIdUrl,method,params,function(res){
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
        case 'edit': that.dialogEditFormVisible = true;break;
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
        VName: that.form.name,
        VCertificateNumber: that.form.certificateNumber,
        VFromCourtId: that.form.courtId,
        pageSize: that.pageSize,
        pageIndex: that.pageIndex
      };
      // var url = getVisitorListUrl;
      var url = getListByMoreUrl;
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


