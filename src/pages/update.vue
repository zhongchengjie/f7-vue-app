<template>
      <f7-page name="update">
          <app-navbar type="4" :title="修改信息"></app-navbar>
          <f7-list form style="margin:0px auto" >
              <f7-list-item v-if="$route.params.type=='1'">
                  <f7-input  type="text" :placeholder="$route.params.name"   v-model="value"></f7-input>
              </f7-list-item>
              <f7-list-item v-else>
                  <f7-input class="item-textarea" type="textarea" :placeholder="$route.params.name"   v-model="value"></f7-input>
              </f7-list-item>
          </f7-list>
      </f7-page>
</template>

<script>
import appNavbar from "../components/navbar.vue";
export default {
	 name:"update",
   props:["type"],
	 data:function(){
	 	  return{
	 	     value:""
	 	  }
	 },
	 components:{
        "app-navbar":appNavbar
	 },
   mounted:function () {
         eventBus.$on("iconClick", this.updateInfo);
   },
	 methods: {
         updateInfo:function(){
             var _this = this;
             if(_this.type==1){
                 this.updateName();
             }
             else{
                 this.updateSign();
             }

         },
         //修改昵称
         updateName:function(){
         	    var _this = this;
			 	  	  //提交参数
						  var params = {
							    name: _this.value,
		              userId: localStorage.getItem("userId")
						  };
						  // 请求成功
						  var success = function(res) {
						  	  var result = res.result;
							    console.log(result);
		              if (result) {
		                 globalHelper.toast("修改成功");
		                 localStorage.setItem("userName",_this.value)
		                 _this.value = "";
		                 myApp.views[1].back();  //返回上一页
		              }
		              else {
		                 globalHelper.toast("修改出错");
		              }
			             
						  };
						  // 请求失败
						  var error = function(res) {
							    globalHelper.toast("toast","系统繁忙，请稍后重试")
						  };
						  //开始请求
						  globalHelper.ajax({
									"url":"/api/user/updateName",
									"method":"post",
									"params": params, // action对应的参数
									"success": success, // 请求成功后的回调方法
									"error": error,
									"async": true
						  });
         },
         //修改签名
         updateSign:function(){
         	    var _this = this;
			 	  	  //提交参数
						  var params = {
							    signature: _this.value,
                  userId: localStorage.getItem("userId")
						  };
						  // 请求成功
						  var success = function(res) {
						  	  var result = res.result;
							    console.log(result);
		              if (result) {
		                 globalHelper.toast("修改成功");
		                 localStorage.setItem("signature",_this.value)
		                 _this.value = "";
		                 myApp.views[1].back();  //返回上一页
		              }
		              else {
		                 globalHelper.toast("修改出错");
		              }
			             
						  };
						  // 请求失败
						  var error = function(res) {
							    globalHelper.toast("toast","系统繁忙，请稍后重试")
						  };
						  //开始请求
						  globalHelper.ajax({
									"url":"/api/user/updateName",
									"method":"post",
									"params": params, // action对应的参数
									"success": success, // 请求成功后的回调方法
									"error": error,
									"async": true
						  });
         }
     }
}
</script>

