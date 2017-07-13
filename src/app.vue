<template>
  <!-- App -->
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views tabs>
      <f7-view id="view-1" tab active navbar-through toolbar-through>
        <f7-navbar title="发现"></f7-navbar>
        <f7-pages>
          <f7-page name="home">
              <div class="banner">
                <img src="../static/assets/images/banner.jpg">
              </div>
							<f7-buttons>
							  <f7-button tab-link="#tab-1" active>最新动态</f7-button>
							  <f7-button tab-link="#tab-2">热门话题</f7-button>
							</f7-buttons>
              <f7-tabs>
							  <f7-tab id="tab-1" active>Tab 1 content...</f7-tab>
							  <f7-tab id="tab-2">Tab 2 content...</f7-tab>
							</f7-tabs>
          </f7-page>
        </f7-pages>
      </f7-view> <!--end of view1-->
      <f7-view id="view-2" tab  navbar-through toolbar-through>
        <f7-navbar title="个人"></f7-navbar>
        <f7-pages>
          <f7-page name="myself">
          	  <f7-list media-list>
							  <f7-list-item
							    link="/item/"
							    media="<img src='../static/assets/images/user_photo.jpg'>"
							    :title="user.user_name"
							    subtitle="哈哈哈哈哈哈"
							  ></f7-list-item>
							</f7-list>
							<f7-list style="margin-top:10px">
							  <f7-list-item link="/item/" media="<i class='icon iconfont icon-xiaoxi'></i>" title="我的圈子"></f7-list-item>
							  <f7-list-item link="/item/" media="<i class='icon iconfont icon-xiaoxi'></i>" title="我的收藏"></f7-list-item>
							  <f7-list-item link="/item/" media="<i class='icon iconfont icon-xiaoxi'></i>" title="修改密码"></f7-list-item>
							</f7-list>
              <p><f7-button round fill class="big-red-btn" @click="logout">退出登录</f7-button></p>                            
          </f7-page>
        </f7-pages>
      </f7-view> <!--end of view2-->
      <f7-toolbar tabbar labels>
        <f7-link icon="iconfont icon-faxian" text="发现" tab-link="#view-1" active></f7-link>
        <f7-link icon="iconfont icon-yonghu" text="个人" tab-link="#view-2"></f7-link>
      </f7-toolbar>
    </f7-views>
    <loginView :login-state="state"></loginView>
  </div>
</template>

<script>
import loginView from "./pages/login.vue";
export default {
    name:"app",
    data:function () {
       return {
       	   user:{user_name:localStorage.getItem("userName")||"Not Login"},
           state:localStorage.getItem("loginState")||'0'
       }
    },
    components:{
    	 loginView
    },
    created:function () {
    	 
    },
    mounted:function(){
    	
    	 eventBus.$on("setUserInfo", this.setUserInfo);
    },
    updated:function (){
    	  
    },
    methods:{
    	 //退出登录
       logout:function(){
       	   //store.commit("setLoginState",false);
       	   //console.log(store.getters.getLoginState);
       	   window.f7.loginScreen(); //打开登录屏
       	   localStorage.setItem("loginState",'0');  //标记为未登录状态
       	   localStorage.setItem("userName","");
       },
       setUserInfo:function(){
            //alert(localStorage.getItem("userName"));
            //console.log(window.f7)
            window.f7.showTab("#view-1");
       	    this.user.user_name = localStorage.getItem("userName");
       }
    }
}
</script>

<style>
	.list-block.media-list {margin:0 auto}
  .list-block.media-list .item-media img{width:60px;height:60px;border-radius:50%}
  .list-block.media-list .item-subtitle{color:#666;font-size:14px;margin-top:10px}
  
   .list-block .item-media .iconfont{font-size:20px}
</style>
<style scoped>
  .banner{width:100%;height:26%}
  .banner img{width:100%;height:100%}
  
 
</style>