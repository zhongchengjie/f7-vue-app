<template>
	<f7-login-screen :opened="state" id="loginScreen">
	  <f7-view navbar-through toolbar-through :dynamic-navbar="true">
	  	<f7-navbar title="登录"></f7-navbar>
	    <f7-pages>
	      <f7-page login-screen name="login">
            <f7-list form style="margin-top:80px">
              <f7-list-item>
                <f7-label style="width:24%">手机号</f7-label>
                <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
              </f7-list-item>
              <f7-list-item>
                <f7-label style="width:24%;letter-spacing:18px">密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
            <div><app-btn btn-name="登录" bg="#ff2d55" type="login"></app-btn></div>
            <p style="float:right;margin-right:40px">
            	<f7-link href="/register/" style="color:#666;font-size:16px">注册</f7-link>
            </p>
	      </f7-page>
	    </f7-pages>
	  </f7-view>
	</f7-login-screen>
</template>

<script>
import appBtn from "../components/bigBtn.vue";
export default {
	name:"login",
	props:["state"],
    data:function () {
       return {
           user:{mobile:"",password:""}
       }
    },
    created:function(){
    	console.log(typeof(this.state));
    },
    components:{
    	"app-btn":appBtn
    },
    mounted:function(){
    	eventBus.$on("login", this.login);  //监听登录按钮的点击事件
    	eventBus.$on("setLogin",  (mobile,password) =>{
    		this.user.mobile = mobile
    		this.user.password = password
    	});
    },
    methods:{
        //登录
        login:function () {
            var _this =this;
            //登录校验
            if(_this.user.mobile.trim()==""){
            	eventBus.$emit("toast","手机号码不能为空")
            	//globalHelper.toast("111")
            	return;
            } 
            if(_this.user.password.trim()==""){
            	eventBus.$emit("toast","密码不能为空")
            	return;
            }
            //提交参数
			var params = {
				mobile:_this.user.mobile,
				password:_this.user.password
			};
			// 请求成功
			var success = function(res) {
				var result = res.result;
				if(result.length!=1){
					eventBus.$emit("toast","用户名或密码错误")
				}
				else{
					 localStorage.setItem("loginState",false); //标记为登录状态
                	 //保存登录用户的信息
                	 var user = result[0];
                	 localStorage.setItem("userId",user.user_id);
                	 localStorage.setItem("userPwd",user.user_pwd);
                	 localStorage.setItem("userName",user.user_name);
                	 localStorage.setItem("signature",user.user_signature);
                	 localStorage.setItem("userPhoto",user.user_photo)

                	 eventBus.$emit("initData");     //更新登录用户的信息

                     myApp.closeModal("#loginScreen"); //关闭登录屏
                     myApp.showTab("#view-1");        //默认显示第一个tab页
				}
			};
			// 请求失败
			var error = function(res) {
				eventBus.$emit("toast","登录失败，请稍后重试")
			};
			//开始请求
			globalHelper.sendPostRequest({
				"url":"/api/user/login",
				"params": params, // action对应的参数
				"success": success, // 请求成功后的回调方法
				"error": error,
				"async": true
			});
          
        },
    }
}
</script>