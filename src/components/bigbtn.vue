<template>
	<p class="big-btn">
		<f7-button round fill @click="btnClick" :style="{background:bg}">{{btnName}}</f7-button>
	</p>
</template>

<script>
export default {
	  name:"navbar",
	  props:["btnName","bg","type"],
	  data:function(){
	  	 return{
	  	 }
	  },
      destroyed:function(){
          if(this.type=="logout"){
              eventBus.$off("logout");     //退出登录
          }
          else if(this.type=="login"){
              eventBus.$off("login");     //用户登录
          }
          else if(this.type=="register"){
              eventBus.$off("register");     //用户注册
          }
          else if(this.type=="share"){
              eventBus.$off("share");     //发表
          }
          else if(this.type=="modifyPwd"){
              eventBus.$off("modifyPwd");     //修改密码
          }
      },
	  methods:{
	      btnClick:function () {
	      	  if(this.type=="logout"){
	      	  	  eventBus.$emit("logout");     //退出登录
	      	  }
	      	  else if(this.type=="login"){
	      	  	  eventBus.$emit("login");     //用户登录
	      	  }
	      	  else if(this.type=="register"){
	      	  	  eventBus.$emit("register");     //用户注册
	      	  }
	      	  else if(this.type=="share"){      
	      	  	  eventBus.$emit("share");     //发表
	      	  }
	      	  else if(this.type=="modifyPwd"){
	      	  	  eventBus.$emit("modifyPwd");     //修改密码
	      	  }
          }
	  }
	  
}
</script>