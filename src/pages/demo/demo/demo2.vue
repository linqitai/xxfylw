
<style scoped>

</style>
<template>
  <div>
    <el-button type="primary" @click="getVisitorRecord">获取访客记录</el-button>
    <el-button type="primary" @click="addVisitorRecord">添加访客记录</el-button>
    <el-button type="primary" @click="addBlacklist4Web">addBlacklist4Web</el-button>
    <el-button type="primary" @click="editVisitorRecord">编辑访客记录</el-button>
    <el-button type="primary" @click="deleteInfById">删除访客记录</el-button>
  </div>
</template>
<script>
  //import {getVisitorRecord} from '@/api/index.js';
  import { ERR_OK, getVisitorListUrl,addVisitorInfUrl,editVisitorInfUrl,deleteInfByIdUrl,addBlacklist4WebUrl } from '@/api/index'
  import { ajax } from '@/api/ajax'
  import { RSAEncrypt,AESEncrypt,AESDecrypt,_md5 } from '@/common/js/utils'
  export default {
    data() {
      return {

      }
    },
    created() {
      var data = "123";
      console.log("AES加密：",AESEncrypt(data));
      console.log("AES解密：",AESDecrypt(data));
    },
    methods: {
      getVisitorRecord(){
        console.log('ERR_OK:' + ERR_OK);
        var method = 'GET';
        var params = null;
        console.log("intoAjax");
        ajax(getVisitorListUrl,method,params,function(res){
          console.log(res);
        });
        console.log("outAjax");
      },
      addVisitorRecord(){
        console.log('ERR_OK:' + ERR_OK);
        var method = 'POST';
        var params = {
          VName:RSAEncrypt("刘备"), 
          VSex:"1", 
          VNation:"汉族", 
          VBirthDate:"2019-01-12", 
          VAddress:RSAEncrypt("浙江省温州市龙港镇凤凰乡"), 
          VIssuingAuthority:"公安", 
          VExpiryDate:"2019-01-12", 
          VCertificatePhoto:"", 
          VLocalePhoto:"", 
          VCertificateType:"身份证",  
          VCertificateNumber:RSAEncrypt("2202020202020202020"),  
          VType:"V", 
          VFromCourtId:"1", 
          VInTime:"2019-01-12", 
          VOutTime:"2019-01-12", 
          VInPost:"", 
          VOutPost:"", 
          VInDoorkeeper:"1",  
          VOutDoorkeeper:"1", 
          VVisitingReason:"1", 
          VIntervieweeDept:"1", 
          VInterviewee:"1", 
          VOffice:"1", 
          VOfficePhone:"", 
          VExtensionPhone:("13958776325"), 
          VMobilePhone:("13958776325"), 
          VRemark:"1"
        };
        console.log("params",params);
        ajax(addVisitorInfUrl,method,params,function(res){
          console.log(res);
        });
        console.log("outAjax");
      },
      addBlacklist4Web(){
        var method = 'POST';
        var params = {
          BName:AESEncrypt("李逵"), 
          BSex:"1", 
          BNation:"汉族", 
          BBirthDate:"2019-01-12", 
          BAddress:AESEncrypt("浙江省温州市龙港镇凤凰乡"), 
          BIssuingAuthority:"公安", 
          BExpiryDate:"2019-01-12", 
          BCertificatePhoto:"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACgAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4 Tl5ufo6erx8vP09fb3 Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3 Pn6/9oADAMBAAIRAxEAPwDNooor7k ECiiigAoopkkscMZklkWNB/E5wKNhpXH0VlyeI9Hjbab In/ZyR gqRNc0qRwi6hblj0BfH86y9tTenMvvNHQqrXlf3M0KKRSGXcpDD1ByKWtTIKKKKACiiigAooooAKKKKACiiuJ8U ITM7afZyYiXiaRf4j6D2rDEYiNCHNI6MNh54ifJEuaz4wS2drfTlWWQcNM3KqfYd/5Vx15fXN9MZLqZ5X/wBo8D6DoKgxnp VBUD3PrXzVfF1Kz956dj6fD4SlQXurXv1EJz1oJzTTRmue502LVpfXVk  2nkiP8Ast1/Cuu0jxkkpWHUlEbHgTqPl/Edvwrh80ua3oYqrRd4vTt0OavhKVdWmte/U9jVldQysGVhkEHIIpa8 8M6 2nzraXDk2khwM/8sz6j29a9Br6TC4mOIhzLfqfNYrCyw8 V7dGFFFFdJyhRRRQAUUUUAYnifVDp2mFIziefKKR2Hc150qk/U810Hiu5 1a28fVLdQg vU1kRxjYzEYOa YzCs6tZrotD6nL6KpUF3epDtG046Dqe5NNZT1P/wCqrWwZAFMePJxXAd5SI5xRjirXkEjOKUQHpjqKBlUDNLt61aS33Gl zkrn04NAimK9A8I6sbyzNnK2ZYB8pJ5ZP/rVw5ixJj1q7oly n6xBIDhd21voeDXVgq7o1U j3OTG0FWotdVsen0UUV9YfJBRRRQAUZA5PQcmimTZ8iXHXY38qTdkNK7seZXUoluZZevmOWP4kmoMksAO3ajnI74q3ZWM19dxwQKWd vtk18ZKXVn20Y7JDYoGkdEUcmtBNCvp3HlReY2MkLz3r1fRfDXhvSNPjbVRA88cW6QyHO0dzj0rbtE8P3TFtLa1kMeCfJxlf8K5ZVuqOyOHWzZ4xN4P16CGOQ6bNtYZ 77VWbw1rUa720y52hN2fLNfSFr88YBO4U27L7CNxx7Go9u0rl/V4nzU9jdQuqvbOjMcHcuKhvbO606ULLGVVh8rdjXvGoXfhzR5Fk1Uwq75K703E460 6/wCEf1WAQeTCVljDrG8e0lT0IBFHt3vYn6unpfU ek2vKGf1LfpTVwzAj Gun8b FzoN1HPagmyuCQmf4G9K5YfumXJ 9XRCSkro5pwcXZnpumTG40y2lb7zRjP1HFWqztCGNDtD6pn8ya0a 1otunFvsj4mskqkku7CiiitDIKQgMCp6EYpaKAPLZojBPJG3BRip/A16R8MtGkPnanIq XIvlx5HOc81x/iey yam8q/cnHmD2Pcf59a9Y HoUeE7DbjG1s/Xca JxlN05OD7n3WAmqqU12Ojh0S1IfdEG3jD5/iHpUNvoljpZ/0K0jt4w27bENoJ9/Wt6HlAAKSaIJEzyEBVGc159tLHq6lKxkZOW9aszMJMEc81QtWa4YsqkL2zSzySWsgYqSvfFQ3oFrjLjR7K8lLXVrFOu7diVd2D7Z6VLNpNsUGIlwOnFaUQWWJZIyCrDOae4GzkU7XQ1c4XxxpyXfhO7iZfmhXzUPoV/ tmvA5G QeqnH619JeJii6LeF8bRC fyNfPmmWYvtcggwdpk3t/ujk11YOLm RdTgxslBc76HoOnQm30y1hIwUiUEe Ks0UV97FcqSR8BKXM231CiiimSFFFFAGL4l043uneagzJBlseq9/8AGt74YagZNGmsyfmt5cj/AHWGf5g0QwSTyqkaFifbiq/h6xm8N NHtZlCwX0Z8sjpuHzAflmvnM5hT5uaL16o nyOpUS5ZLToz1q0cbVpdTHnWxjU89arWsg8setVL/UFgkCyuEU9zXzsmfTp3HRz30VyCnk SF/1ZXBB/wB7PP5U2Wa uJo5dyiLBBhCg7vqT0/Cqf8Aa1tglZCR3bBx dMGsWyBR5pI/E1lJs2VOW9jotNHk2yxkjdyT NSXDjFYllqiS3CrE28H2Nak7EjFNPQjVPU4r4g35tvDF1g4MmIx Jrz3wppoigk1CQfvJiRH7J/wDXNdP8SmlvG07S7dS0s0pfaPbgfqabb6bc2lnFCbdh5SBTtGRkDmvcyONP2jlN7bHzufTnyKEFvuJRRRX1p8gFFFFAEtvbyXU4hiGXP6V02meFQzK1ywY91/hrotO0a2sIQsUa57t3NayQgAYGK XxmazqNxp6L8T6nB5TCmlKpq/wMZ9Ijt4wI0XAOAAOg74rNvLGGZn86IExlXRj1Vh0xXWbBkfLxWdfwF4pCEwScLXk899z1uS2xn28u6JW5ANPmjWZSGAOaS8tjbW9iAMZypIHcjP NRCQxjDjj1rmqLWx105O1yOO1a3VvLiBVutO yNOoVotoHtV6G4iZRkgj61K1xHtOCAKh3sdCqPuV7eBLdMBRxTpZS3AGWPAAqtNc7n2x/MT6dqjiLrqFopb5pJNoHvg/wCFQnrYiV7XKsWlQz3r6hNErzEBEY87V9BWnBp5JZWBXPQ9RWjDbCK5nhPHzZA9jV5IkRcfrXXDRHFJczuznbjw/b3SbZYVI6BhwfzrktX8P3OlkyAGS37MOo v NenFCAxXHXimTwrPEUdc5HQjrXoYXH1cO9Hddjz8Vl9KutVZ9zx2iuj1/w6bMPd2o/cD70YH3ff6UV9Vh8TCvDngfK4jDToT5Jo9FWNQMmnjPYUPnHFPTlcY4r4NvU 9SHooKnK/jUcqLsIAGakCtjuB7VDMdsbHPNFxlfWLIz6bKkKgyRqJEx6jkfn0/GsWDy7m3SVeVcZFdXuEgjcf3ABjoTXHuP7L1mWyYFYJj50BPTn7y/gf50VVsyqT3RJ9hibkoDSGxiXogq7HhuRTmUZ56Vk0bJlWK3VATiqUkfn IdJiVsbZzKceiqa05GwuBWfoQ 1 L5JRyLaEhfcnj/GpjH3kEnozbnBbWWKnjyxke TVxFOOtRlNt5K2RkngE56cVZUHGe/vXS9DlQioFPOKcyKenFJgkYNHPQGlcdipLbK6MrJlTRV3ZxzRVxm0tDOVNN6jH 7UluQVPrTJF4xSR5U8Vh1NywRxjp NQOvJyBU2R1JppwT1 tUhMjh2gmL FfnA9PpVHX9KOoWwCf8fEZ3wv0w3p9DV2X91NG6Y5ODVtlDRAAn8a0teNmZp8sro4ywuTKm1wVkXhlPrWgdxHFVtZtmsb9bpMFJeWI/vd/z61JFdpJHncMiubZ8rOxNNXRBev5Nu5JwxHFXPCOn/ZLGa9lDCSc/KcchfWq1vaf2re/PnyE5wf4v/rV0d6/kQx2seAWI6dh15ranG2phVn0RGq7mD8jJ/CpRzgHtUStgU NgWzjinJkRJlUYGRQ4AYEU/coFRlhWdy7CsSUPqKKiMuDgjiirTIZMVDDNNEfOe1IJMY5prTAEYNPkDnHlcU3gGlaVQMk81WnuUQct9cdaFBic0ST4wp7gg1bikUqVXkkdhnispZi6oxYOeuRwCKlllkhTZGSs2dzEHIUY6VolYhsdqPlzabdfa4isac5POFH8XH4mubt/DggmWU6lIyZyFdAUcfUV0MUbyWpillZ8nc2TnJqOS0VUYAt5RXO3sp/pVezW7Eqsloi1YzRSRnyx5cqfKVxgj3qFnZ7ou4BzggkdB6VHBavblZ1OZeA249R6U2SZBctIgIVuCp5207diVLuXVTccDvUvklelR2reYM4OKtEjGefrXPNHRFkBGTzSheakIB/GkVQMtiosVcimT5feipGxtINFWiGf/9k=", 
          BLocalePhoto:"", 
          BCertificateType:"身份证",  
          BCertificateNumber:AESEncrypt("2202020202020202020"),  
          BCreateTime:"2019-01-12 08:12:12", 
          BFromCourtId:"1", 
          BLevel:"1",
          BRemark:"1"
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
      editVisitorRecord(){
        var method = 'POST';
        var params = {
          VId:15,
          VName:"777", 
          VSex:1, 
          VNation:"汉族", 
          VBirthDate:"2019-01-12", 
          VAddress:"address", 
          VIssuingAuthority:"公安", 
          VExpiryDate:"2019.1.1-2029-1-1", 
          VCertificatePhoto:"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", 
          VLocalePhoto:"", 
          VCertificateType:"身份证",  
          VCertificateNumber:"2202020202020202020",  
          VType:"V", 
          VFromCourtId:"1", 
          VInTime:"2019-01-12", 
          VOutTime:"2019-01-12", 
          VInPost:"1", 
          VOutPost:"1", 
          VInDoorkeeper:"1",  
          VOutDoorkeeper:"1", 
          VVisitingReason:"1", 
          VIntervieweeDept:"研发部", 
          VInterviewee:"1", 
          VOffice:"研发部1002", 
          VOfficePhone:"1", 
          VExtensionPhone:"1", 
          VMobilePhone:"", 
          VRemark:"1",
        };
        console.log("intoAjax");
        ajax(editVisitorInfUrl,method,params,function(res){
          console.log(res);
        });
        console.log("outAjax");
      },
      deleteInfById(){
        var method = 'POST';
        var params = {
          VId:17
        };
        console.log("intoAjax");
        ajax(deleteInfByIdUrl,method,params,function(res){
          console.log(res);
        });
        console.log("outAjax");
      }
    }
  }
</script>