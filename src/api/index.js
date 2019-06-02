import $ from 'jquery'
// import http from './public'
export const host = 'https://test.dtc233.com'
// const host = '/jz'
// export const host_test = 'http://localhost:14262';//本地调试
// export const host_test = 'http://192.168.1.128:8083';//公司
export const host_test = 'http://192.168.1.103:8082';//家里

export const ERR_OK = 1;

// 访客表
export const getVisitorListUrl = host_test + '/api/visitorAccessInf/getList';
export const addVisitorInfUrl = host_test + '/api/visitorAccessInf/addInf';
export const editVisitorInfUrl = host_test + '/api/visitorAccessInf/editInf';
export const deleteInfByIdUrl = host_test + '/api/visitorAccessInf/deleteInfById';
export const getListByMoreUrl = host_test + '/api/visitorAccessInf/getListByMore';

// 黑名单表
export const deleteBlacklistInfByIdUrl = host_test + '/api/blacklistInf/deleteInfById';
export const getBlackListByMoreUrl = host_test + '/api/blacklistInf/getListByMore';
export const addBlacklist4WebUrl = host_test + '/api/blacklistInf/addInf4Web';
export const editBlacklist4WebUrl = host_test + '/api/blacklistInf/editInf';
export const haveThisModelUrl = host_test + '/api/blacklistInf/haveThisModel';
export const haveThisModel4EditUrl = host_test + '/api/blacklistInf/haveThisModel4Edit';
export const getBlacklistAllUrl = host_test + '/api/blacklistInf/getListAll';

// 律师表
export const deleteLawyerInfByIdUrl = host_test + '/api/lawyerInf/deleteInfById';
export const getLawyerByMoreUrl = host_test + '/api/lawyerInf/getListByMore';
export const addLawyer4WebUrl = host_test + '/api/lawyerInf/addInf4Web';
export const editLawyer4WebUrl = host_test + '/api/lawyerInf/editInf';
export const haveLawyerModelUrl = host_test + '/api/lawyerInf/haveThisModel';
export const haveLawyerModel4EditUrl = host_test + '/api/lawyerInf/haveThisModel4Edit';
export const getLawyerAllUrl = host_test + '/api/lawyerInf/getListAll';

// 法院表
export const deleteCourtInfByIdUrl = host_test + '/api/courtInf/deleteInfById';
export const getCourtListByMoreUrl = host_test + '/api/courtInf/getListByMore';
export const addCourt4WebUrl = host_test + '/api/courtInf/addInf4Web';
export const getCourtListUrl = host_test + '/api/courtInf/getList';

// 登录
export const loginUrl = host_test + '/api/userInf/login';


export function ajax(url,method,params,successed) {
  var that = this;
  $.ajax({ 
    url : url, 
    type : method, 
    data : params, 
    beforeSend: function (XMLHttpRequest) {
      // XMLHttpRequest.setRequestHeader("token", localStorage.getItem('token'));
      // that.progressDialog = true;
    },
    complete: function( xhr,data ){
      // this.authorization = xhr.getResponseHeader('authorization')
      // console.log(xhr.getResponseHeader('authorization'),'authorization')
      // console.log(data,'data')
    },
    success : function(res) { 
      successed(res);
    },
    error : function(responseStr) { 
     console.log(responseStr,"responseStr")
    } 
  });
}




