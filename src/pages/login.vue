<template>
	<f7-login-screen  v-if="loginState=='1'" class="loginPage">
	  <f7-view navbar-through toolbar-through :dynamic-navbar="true">
	  	<f7-navbar title="登录"></f7-navbar>
	    <f7-pages>
	      <f7-page login-screen name="login">
            <f7-list form style="margin-top:80px">
              <f7-list-item>
                <f7-label>手机号</f7-label>
                <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
              </f7-list-item>
              <f7-list-item>
                <f7-label style="letter-spacing:18px">密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
             <div><bigBtn :btn-name="'登录'" :bg="'#ff2d55'" :type="'login'"></bigBtn></div>
            <p style="float:right;margin-right:40px"><f7-link href="/register/" style="color:#666;font-size:16px">注册</f7-link></p>
	      </f7-page>
	    </f7-pages>
	  </f7-view>
	</f7-login-screen>
    <f7-login-screen opened v-else class="loginPage">
	  <f7-view navbar-through toolbar-through :dynamic-navbar="true">
	  	<f7-navbar title="登录"></f7-navbar>
	    <f7-pages>
	      <f7-page login-screen name="login">
            <f7-list form style="margin-top:80px">
              <f7-list-item>
                <f7-label>手机号</f7-label>
                <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
              </f7-list-item>
              <f7-list-item>
                <f7-label style="letter-spacing:18px">密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
            <div><bigBtn :btn-name="'登录'" :bg="'#ff2d55'" :type="'login'"></bigBtn></div>
            <p style="float:right;margin-right:40px"><f7-link href="/register/" style="color:#666;font-size:16px">注册</f7-link></p>
	      </f7-page>
	    </f7-pages>
	  </f7-view>
	</f7-login-screen>
</template>

<script>
import bigBtn from "../components/bigbtn.vue";
export default {
	name:"login",
	props:["loginState"],
    data:function () {
       return {
           user:{mobile:"",password:""}
       }
    },
    components:{
    	bigBtn
    },
    updated:function(){
    	 
    },
    create:function(){
    },
    mounted:function(){
    	eventBus.$on("login", this.login);
    	eventBus.$on("setLogin",  (mobile,password) =>{
    		this.user.mobile = mobile
    		this.user.password = password
    	});
    },
    methods:{
        //登录验证
        login:function () {
            var _this =this;
            if(_this.user.mobile.trim()==""){
            	window.f7.alert("手机号码不能为空")
            	return;
            } 
            if(_this.user.password.trim()==""){
            	window.f7.alert("密码不能为空")
            	return;
            	
            }
            this.$http.post('/api/user/login',{mobile:_this.user.mobile,password:_this.user.password},{}).then((response) => {
                var result = response.body;
                if(result.length!="1"){
                	 window.f7.alert("用户名或密码错误");
                }
                else{
                	 localStorage.setItem("loginState",'1'); //标记为登录状态
                	 //保存登录用户的信息
                	 var user = result[0];
                	 localStorage.setItem("userId",user.user_id);
                	 localStorage.setItem("userPwd",user.user_pwd);
                	 localStorage.setItem("userName",user.user_name);
                	 localStorage.setItem("signature",user.user_signature);
                	 localStorage.setItem("userPhoto",user.user_photo)

                	 eventBus.$emit("loginAfter");     //更新登录用户的信息

                     window.f7.closeModal(".login-screen"); //关闭登录屏
                     window.f7.showTab("#view-1");        //默认显示第一个tab页


                }
            },(response) =>{
                console.log(JSON.stringify(response));
            });
        },
    }
}
</script>


<style>
	.loginPage .list-block .item-title.label{width:24%}
</style>