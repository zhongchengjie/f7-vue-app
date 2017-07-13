<template>
	  <div>
        <appNavbar :type="'1'" :title="'发布圈子'"></appNavbar>
	    <f7-pages>
            <pageView :page-name="'addBlog'">
                <div  slot="f7-page-content">
                    <f7-list form style="margin-top:0px">
                        <f7-list-item>
                            <f7-input type="textarea" placeholder="发表你此刻的想法..."></f7-input>
                        </f7-list-item>
                    </f7-list>
                    <f7-button round fill class="big-red-btn" @click="register" >发表</f7-button>
                </div>
            </pageView>

	    </f7-pages>
    </div>
      
</template>

<script>
import appNavbar from "../components/navbar.vue";
import pageView from "../components/page.vue";
export default {
	 name:"addBlog",
	 data:function(){
	 	  return{
	 	  	user:{mobile:"",name:"",password:""}
	 	  }
	 },
	 components:{
         appNavbar,
         pageView
	 },
     mounted:function () {

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