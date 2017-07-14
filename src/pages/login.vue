<template>
	<f7-login-screen  v-if="loginState=='1'">
	  <f7-view navbar-through toolbar-through>
	  	<f7-navbar title="登录"></f7-navbar>
	    <f7-pages>
	      <f7-page login-screen name="login">
            <f7-list form>
              <f7-list-item>
                <f7-label>手机号</f7-label>
                <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
              </f7-list-item>
              <f7-list-item>
                <f7-label>密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
             <div><bigBtn :btn-name="'登录'" :bg="'#ff2d55'" :type="'login'"></bigBtn></div>
            <p style="float:right;margin-right:10px"><f7-link href="/register/" style="color:#666">注册</f7-link></p>
	      </f7-page>
	    </f7-pages>
	  </f7-view>
	</f7-login-screen>
  <f7-login-screen opened v-else>
	  <f7-view navbar-through toolbar-through>
	  	<f7-navbar title="登录"></f7-navbar>
	    <f7-pages>
	      <f7-page login-screen name="login">
            <f7-list form>
              <f7-list-item>
                <f7-label>手机号</f7-label>
                <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
              </f7-list-item>
              <f7-list-item>
                <f7-label>密码</f7-label>
                <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
              </f7-list-item>
            </f7-list>
            <div><bigBtn :btn-name="'登录'" :bg="'#ff2d55'" :type="'login'"></bigBtn></div>
            <p style="float:right;margin-right:20px"><f7-link href="/register/" style="color:#666">注册</f7-link></p>
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
    	// console.log("login"+this.loginState)
    },
    mounted:function(){
    	eventBus.$on("login", this.login);
    },
    methods:{
        //登录验证
        login:function () {
            var _this =this;
            this.$http.post('/api/user/login',{mobile:_this.user.mobile,password:_this.user.password},{}).then((response) => {
                var result = response.body;
                if(result.length!="1"){
                	 window.f7.alert("用户名或密码错误");
                }
                else{
                	 window.f7.closeModal(".login-screen"); //关闭登录屏
                	 localStorage.setItem("loginState",'1'); //标记为登录状态
                	 //保存登录信息
                	 var user = result[0];
                	 localStorage.setItem("userId",user.user_id);
                	 localStorage.setItem("userName",user.user_name);
                	 eventBus.$emit("setUserInfo");     //更新登录用户
                	 
                	 
                }
            })
        },
    }
}
</script>


<style scoped>
	.list-block .item-title.label{width:26%}
</style>