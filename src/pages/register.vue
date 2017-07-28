<template>
	  <f7-page name="register">
	  	 <app-navbar type="1" title="注册"></app-navbar>
	     <f7-list form style="margin-top:0px;">
		      <f7-list-item>
		        <f7-label>手机号</f7-label>
		        <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
		      </f7-list-item>
		      <f7-list-item>
		        <f7-label>用户名</f7-label>
		        <f7-input type="text" placeholder="请输入用户名" v-model="user.name"/>
		      </f7-list-item>
		      <f7-list-item>
		        <f7-label style="letter-spacing:18px">密码</f7-label>
		        <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
		      </f7-list-item>
	    </f7-list>
	    <div><app-btn btn-name="注册" bg="#ff2d55" type="register"></app-btn></div>
	  </f7-page>
</template>

<script>
import appNavbar from "../components/navbar.vue";
import appBtn from "../components/bigBtn.vue";
export default {
	 name:"register",
	 data:function(){
	 	  return{
	 	  	user:{mobile:"",name:"",password:""}
	 	  }
	 },
	 components:{
	 	  "app-navbar":appNavbar,
	 	  "app-btn":appBtn
	 },
	 mounted:function(){
    	eventBus.$on("register", this.register);
   },
	 methods:{
	 	  register:function(){
	 	  	  var _this = this;
	 	  	  if(_this.user.mobile.trim()==""){
            	globalHelper.toast("手机号码不能为空")
            	return;
          } 
          if(_this.user.name.trim()==""){
              globalHelper.toast("用户名不能为空")
            	return;
          } 
          if(_this.user.password.trim()==""){
            	globalHelper.toast("密码不能为空")
            	return;
          } 
          
          
          //提交参数
					var params = {
						  id:new Date().getTime(),
						  name:_this.user.name,
						  mobile:_this.user.mobile,
						  password:_this.user.password
					};
					// 请求成功
					var success = function(res) {
						  var result = res.result;
		          if(result){
	            	 globalHelper.toast("注册成功");
	            	 var mobile = _this.user.mobile;
	            	 var password = _this.user.password;
	            	 _this.user = {mobile:"",name:"",password:""}; //清空输入
	            	 myApp.views[2].back();  //返回登录
	            	 
	            	 //将注册成功的账号和密码回填到登录信息中(带参数的事件通信)
	            	 eventBus.$emit("setLogin",mobile,password)
	            	 
	            }
	            else{
	            	 globalHelper.toast("注册失败");
	            }    
					};
					// 请求失败
					var error = function(res) {
						  globalHelper.toast("toast","系统繁忙，请稍后重试")
					};
					//开始请求
					globalHelper.ajax({
							"url":"/api/user/register",
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