// import Vue from 'vue'
import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import md5 from 'js-md5';
/*  说明：
 *  插件文件：utils.js
 *  作者：林祺泰  QQ：514917919
 * */
const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsacYWi3Eh1SPv8wjW6jaR8NvBrSxD1wZs1dzlaZq+uZoPinsTkpjey9AvuSZ3dIE8SWlbKdDATsLRpixwB3cxPlRR1zRnRZQPAf89PfZ+pUceVF0ktGuV8A9lUJJ2ZkBdeXpNlk8NaiByfBguJwYibhDtICWAk4hkFBN48uUEw9AFM9bImYfYP5WX3Ep97Gnx81x1pwan/VVboEkIrjfwcg2pbq0xQ69giNOCiNMjDRdTbzyO4lnMfLJr6lRv7PTbO0ITpC3snpcrpz19I3mdUt8EOUd8am7elvHPJkdL9pZNe33Mwi4xg4wJAXfAxmC1+ejfC2dsxKLyy3h6iQPjwIDAQAB";
//加密
export function RSAEncrypt(word){ 
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let data = encrypt.encrypt(word);
  return data;
}
const keyStr = 'abc`efga.cdef`12';
//加密
export function AESEncrypt(word){ 
  var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}
//解密
export function AESDecrypt(word){
  var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
export function _md5(word){
  return md5(word);
}
// 管理员状态( 0:禁用 1:启用),点击禁用,0,点击启用,1
export function getLimiteText(value) {
  let len = 24
  if (value.length > len) {
    return value.substr(0, len) + '···'
  } else {
    return value
  }
}
export function getDaysInYearMonth(year, month){
  var date = new Date(year, month, 0);
  return date.getDate();
}
export function getTime(value) {
  var time = new Date(value).getTime()
  return time
}
//得到当天是周几
export function getDay(date) {
  var day = new Date(date).getDay()
  return day;
}
export function getMonth(date) {
  var month = new Date(date).getMonth()
  return month+1;
}
export function getFullDate(t){
  var value=''
  if(t.toString().length==10){
    value = parseInt(t)*1000
  }else{
    value = parseInt(t)
  }
  var time = new Date(value)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '/' + (m < 10 ? '0' + m : m) + '/' + (d < 10 ? '0' + d : d)
}
export function getFullDateTime(t){
  var value=''
  if(t.toString().length==10){
    value = parseInt(t)*1000
  }else{
    value = parseInt(t)
  }
  var time = new Date(value)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' +
    (mm < 10 ? '0' + mm : mm) + ':' +
    (s < 10 ? '0' + s : s)
}
export function getFullTime(t){
  var value=''
  if(t.toString().length==10){
    value = parseInt(t)*1000
  }else{
    value = parseInt(t)
  }
  var time = new Date(value)
  var hour = time.getHours()
  return `${hour}:00~${hour+1}:00`
}
export function getSex(t){
  return t==1?"男":"女"
}
export function isNUll(value){
  if(value==""||value==null||value=='undefined'||typeof(value)==undefined){
    return true;
  }else{
    return false;
  }
}
