<template>
  <app-page page-name="modifyPwd">
  	  <div slot="app-page-content">
  	  	  <app-navbar type="1" title="修改密码"></app-navbar>
  	  	  <f7-list form style="margin-top:0px;">
	              <f7-list-item>
	                <f7-label>旧密码</f7-label>
	                <f7-input type="password" placeholder="请输入旧密码" v-model="oldPwd"/>
	              </f7-list-item>
	              <f7-list-item>
	                <f7-label>新密码</f7-label>
	                <f7-input type="password" placeholder="请输入新密码" v-model="newPwd"/>
	              </f7-list-item>
	              <f7-list-item>
	                <f7-label>确认新密码</f7-label>
	                <f7-input type="password" placeholder="请再次输入新密码" v-model="confirmPwd"/>
	              </f7-list-item>
          </f7-list>
          <div><app-btn btn-name="提交" bg="#ff2d55" type="modifyPwd"></app-btn></div>
  	  </div>
  </app-page>    
</template>

<script>
import appNavbar from "../components/navbar.vue";
import appBtn from "../components/bigBtn.vue";
import appPage from "../components/page.vue";
export default {
	 name:"modifyPwd",
	 data:function(){
	 	  return{
	 	  	 oldPwd:"",
	 	  	 newPwd:"",
	 	  	 confirmPwd:""
	 	  }
	 },
	 components:{
	 	  "app-navbar":appNavbar,
	 	  "app-btn":appBtn,
	 	  "app-page":appPage
	 },
	 mounted:function(){
    	eventBus.$on("modifyPwd", this.modifyPwd);
   },
	 methods:{
	 	  modifyPwd:function(){
	 	  	  var _this = this;
	 	  	  if(_this.oldPwd!=localStorage.getItem("userPwd")){
	 	  	  	 globalHelper.toast("原密码输入错误");
	 	  	  	 _this.oldPwd="";
	 	  	  	 return;
	 	  	  }
	 	  	  if(_this.newPwd==""){
	 	  	  	 globalHelper.toast("新密码不能为空");
	 	  	  	 _this.newPwd="";
	 	  	  	 return;
	 	  	  }
	 	  	  if(_this.confirmPwd!=_this.newPwd){
	 	  	  	 globalHelper.toast("两次输入的新密码不一样");
	 	  	  	 _this.confirmPwd="";
	 	  	  	 _this.newPwd="";
	 	  	  	 return;
	 	  	  }
	 	  	  
	 	  	  //提交参数
				  var params = {
					    password:_this.newPwd,
					    userId:localStorage.getItem("userId")
				  };
				  // 请求成功
				  var success = function(res) {
				  	  var result = res.result;
					    console.log(result);
	            if(result){
	            	 globalHelper.toast("修改成功");
	            	 localStorage.setItem("userPwd",_this.newPwd);
	            	 _this.oldPwd="";
	            	 _this.confirmPwd="";
	 	  	  	     _this.newPwd="";
	            	 myApp.views[1].back();  //返回登录
	            }
	            else{
	            	 globalHelper.toast("修改出错");
	            }
	             
				  };
				  // 请求失败
				  var error = function(res) {
					    globalHelper.toast("toast","系统繁忙，请稍后重试")
				  };
				  //开始请求
				  globalHelper.ajax({
							"url":"/api/user/modifyPwd",
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