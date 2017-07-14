<template>
	  <div>
      <app-navbar :type="'1'" :title="'修改密码'"></app-navbar>
	    <f7-pages>
	      	 <page-view :page-name="'register'">
                <div  slot="f7-page-content">
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
				            <div><big-btn :btn-name="'提交'" :bg="'#ff2d55'" :type="'modifyPwd'"></big-btn></div>
	              </div>
	          </page-view >    
	    </f7-pages>
    </div>
      
</template>

<script>
import appNavbar from "../components/navbar.vue";
import bigBtn from "../components/bigbtn.vue";
import pageView from "../components/page.vue";
export default {
	 name:"register",
	 data:function(){
	 	  return{
	 	  	 oldPwd:"",
	 	  	 newPwd:"",
	 	  	 confirmPwd:""
	 	  }
	 },
	 components:{
	 	  "app-navbar":appNavbar,
	 	  "big-btn":bigBtn,
	 	  "page-view":pageView
	 },
	 mounted:function(){
    	eventBus.$on("modifyPwd", this.modifyPwd);
   },
	 methods:{
	 	  modifyPwd:function(){
	 	  	  var _this = this;
	 	  	  if(_this.oldPwd!=localStorage.getItem("userPwd")){
	 	  	  	 window.f7.alert("原密码输入错误");
	 	  	  	 _this.oldPwd="";
	 	  	  	 return;
	 	  	  }
	 	  	  if(_this.confirmPwd!=_this.newPwd){
	 	  	  	 window.f7.alert("两次输入的新密码不一样");
	 	  	  	 _this.confirmPwd="";
	 	  	  	 _this.newPwd="";
	 	  	  	 return;
	 	  	  }
          this.$http.post('/api/user/modifyPwd',{password:_this.newPwd,userId:localStorage.getItem("userId")},{}).then((response) => {
	            var result = response.body;
	            console.log(result);
	            if(result){
	            	 window.f7.alert("修改成功");
	            	 localStorage.setItem("userPwd",_this.newPwd);
	            	 _this.oldPwd="";
	            	 _this.confirmPwd="";
	 	  	  	     _this.newPwd="";
	            	 window.f7.views[1].back();  //返回登录
	            }
	            else{
	            	 window.f7.alert("修改出错");
	            }
          })
	 	  }
	 }
}
</script>