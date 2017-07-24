<template>
	  <f7-page name="register">
	  	 <app-navbar :type="'1'" :title="'注册'"></app-navbar>
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
	    <div><big-btn :btn-name="'注册'" :bg="'#ff2d55'" :type="'register'"></big-btn></div>
	  </f7-page>
</template>

<script>
import appNavbar from "../components/navbar.vue";
import bigBtn from "../components/bigbtn.vue";
export default {
	 name:"register",
	 data:function(){
	 	  return{
	 	  	user:{mobile:"",name:"",password:""}
	 	  }
	 },
	 components:{
	 	  "app-navbar":appNavbar,
	 	  "big-btn":bigBtn
	 },
	 mounted:function(){
    	eventBus.$on("register", this.register);
   },
	 methods:{
	 	  register:function(){
	 	  	  var _this = this;
	 	  	  if(_this.user.mobile.trim()==""){
            	window.f7.alert("手机号码不能为空")
            	return;
          } 
          if(_this.user.name.trim()==""){
            	window.f7.alert("用户名不能为空")
            	return;
          } 
          if(_this.user.password.trim()==""){
            	window.f7.alert("密码不能为空")
            	return;
          } 
	 	  	  var id = new Date().getTime();  //取当前时间戳作为user_id
          this.$http.post('/api/user/register',{id:id,name:_this.user.name,mobile:_this.user.mobile,password:_this.user.password},{}).then((response) => {
	            var result = response.body;
	            console.log(result);
	            if(result){
	            	 window.f7.alert("注册成功");
	            	 var mobile = _this.user.mobile;
	            	 var password = _this.user.password;
	            	 _this.user = {mobile:"",name:"",password:""}; //清空输入
	            	 window.f7.views[2].back();  //返回登录
	            	 
	            	 //将注册成功的账号和密码回填到登录信息中(带参数的事件通信)
	            	 eventBus.$emit("setLogin",mobile,password)
	            	 
	            }
	            else{
	            	 window.f7.alert("注册出错");
	            }
          })
	 	  }
	 }
}
</script>