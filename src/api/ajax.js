import $ from 'jquery'
// import http from './public'
import qs from 'qs'
import router from '../router/index'
// import axios from 'axios'
// import http from './service'

export function ajax(url,method,params,doSuccess) {
	  var that = this;
	  $.ajax({ 
	    url: url, 
	    type: method,
	    processData: false,
	    // data : JSON.stringify(params), 
	    data: method=='POST'?qs.stringify(params):params, 
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
	      // console.log(res.data.indexOf('登录'),"res.data.indexOf('登录')")
	      if(res.code == 401 && res.data.indexOf('登录')>-1){
	        // that.$router.push('/login')
	        router.replace({
	          path: '/login'
	        })
	      }
	      if (typeof doSuccess == "function") {
	        doSuccess(res);
	      }
	    },
	    error : function(responseStr) { 
	     console.log(responseStr,"responseStr")
	    } 
	  });
	}