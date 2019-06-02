<style lang="scss" scoped>

</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <span>法院库</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
      <search-condition @clickSearchData="searchEvent">
        <div class="element_r">
          <p class="inline">法院名称：</p>
          <div class="inline width160">
            <el-input
              v-model="form.CName"
              size="medium"
              placeholder="请输入搜索内容"
              clearable
            ></el-input>
          </div>
        </div>
      </search-condition>
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="CNumber" label="法院编号"></el-table-column>
        <el-table-column prop="CName" label="法院名称" min-width="160"></el-table-column>
        <el-table-column prop="CLinkman" label="联系人" min-width="100"></el-table-column>
        <el-table-column prop="CWorkTelephone" label="单位电话" min-width="160"></el-table-column>
        <el-table-column prop="CAddress" label="地址" min-width="300"></el-table-column>
        <el-table-column prop="CLongitude" label="经度" min-width="140"></el-table-column>
        <el-table-column prop="CLatitude" label="纬度" min-width="140"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row,'detail')" type="text" size="small">详情</el-button>
            <el-divider direction="vertical"></el-divider> -->
            <el-button @click="handleClick(scope.row,'edit')" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="handleClick(scope.row,'delete')" type="text" size="small">删除</el-button>
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
          :page-sizes="[6,8,10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-dialog title="编辑" width="700px" :visible.sync="dialogEditFormVisible">
        <div>
          <!-- <el-divider content-position="left">访客信息</el-divider> -->
          <el-row class="intervals">
            <el-col :span="24"><div class="">法院编号：{{thisRow.CNumber}}</div></el-col>
          </el-row>
          <el-row class="intervals" :gutter="20">
            <el-col :span="12"><div class="">法院名称：<el-input v-model="thisRow.CName" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="12"><div class="">联系人：<el-input v-model="thisRow.CLinkman" placeholder="请输入内容"></el-input></div></el-col>
            
          </el-row>
          <el-row class="intervals" :gutter="20">
            <el-col :span="12"><div class="">单位电话：<el-input v-model="thisRow.CWorkTelephone" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="12"><div class="">地址：<el-input v-model="thisRow.CAddress" placeholder="请输入内容"></el-input></div></el-col>
          </el-row>
          <el-row class="intervals" :gutter="20">
            <el-col :span="12"><div class="">经度：<el-input v-model="thisRow.CLongitude" placeholder="请输入内容"></el-input></div></el-col>
            <el-col :span="12"><div class="">纬度：<el-input v-model="thisRow.CLatitude" placeholder="请输入内容"></el-input></div></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="margT20" @click="dialogEditFormVisible = false">取  消</el-button>
          <el-button class="margT20" type="primary" @click="submitHandleClick('edit')">提  交</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogDeleteFormVisible"
        width="400px">
        <span>你确定要删除编号为{{thisRow.CNumber}}的这条数据吗？</span>
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
import { getCourtListByMoreUrl, editVisitorInfUrl, deleteCourtInfByIdUrl,addCourt4WebUrl, ERR_OK, ajax } from "@/api/index";
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
        CName: ""
      },
      courtOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "法院1" },
        { value: "1", label: "法院2" }
      ],
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
          CNumber:that.thisRow.CNumber, 
          CName:that.thisRow.CName, 
          CLinkman:AESEncrypt(that.thisRow.CLinkman), 
          CWorkTelephone:AESEncrypt(that.thisRow.CWorkTelephone), 
          CAddress:that.thisRow.CAddress, 
          CLongitude:that.thisRow.CLongitude, 
          CLatitude:that.thisRow.CLatitude
        };
        var p = "";
        p += "CNumber=" + params.CNumber;
        p += "&CName=" + params.CName;
        p += "&CLinkman=" + params.CLinkman;
        p += "&CWorkTelephone=" + params.CWorkTelephone;
        p += "&CAddress=" + params.CAddress;
        p += "&CLongitude=" + params.CLongitude;
        p += "&CLatitude=" + params.CLatitude;
        params.CMD5Ciphertext = _md5(p);
        console.log("params",params);
        ajax(addCourt4WebUrl,method,params,function(res){
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
          CId: that.thisRow.CId
        };
        console.log("intoAjax");
        ajax(deleteCourtInfByIdUrl,method,params,function(res){
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
        CName: that.form.CName,
        pageSize: that.pageSize,
        pageIndex: that.pageIndex
      };
      // var url = getVisitorListUrl;
      var url = getCourtListByMoreUrl;
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


