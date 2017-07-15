<template>
	  <div>
      <app-navbar :type="'1'" :title="'注册'"></app-navbar>
	    <f7-pages>
	      <f7-page name="register">
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
                <f7-label>密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
            <div><big-btn :btn-name="'注册'" :bg="'#ff2d55'" :type="'register'"></big-btn></div>
	      </f7-page>
	    </f7-pages>
    </div>
      
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
	 	  	  var id = new Date().getTime();  //取当前时间戳作为user_id
          this.$http.post('/api/user/register',{id:id,name:_this.user.name,mobile:_this.user.mobile,password:_this.user.password},{}).then((response) => {
	            var result = response.body;
	            console.log(result);
	            if(result){
	            	 window.f7.alert("注册成功");
	            	 _this.user = {mobile:"",name:"",password:""}; //清空输入
	            	 window.f7.views[2].back();  //返回登录
	            	 
	            	 //
	            }
	            else{
	            	 window.f7.alert("注册出错");
	            }
          })
	 	  }
	 }
}
</script>