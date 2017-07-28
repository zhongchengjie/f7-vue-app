<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views tabs>
      <home-view :share-list="shareList"></home-view>
      <person-view :user="user"></person-view>
      <f7-toolbar tabbar labels>
        <f7-link icon="iconfont icon-faxian" text="发现" tab-link="#view-1" active></f7-link>
        <f7-link icon="iconfont icon-yonghu" text="个人" tab-link="#view-2"></f7-link>
      </f7-toolbar>
    </f7-views>
    <login-view :state="loginState"></login-view>
    <app-toast :text="modalText" :status="status"></app-toast>
  </div>
</template>

<script>
import homeView from "./pages/home.vue";
import personView from "./pages/person.vue";
import loginView from "./pages/login.vue";
import appToast from "./components/toast.vue";

import globalHelper from "./js/globalHelper.js"
window.globalHelper = globalHelper;

export default {
    name:"app",
    data:function () {
       return {
           loginState:localStorage.getItem("loginState")||0,  //登录状态，0：未登录；1：已登录。默认未登录
           shareList:[],
           user:{u_photo:"",u_name:"",u_signature:""},
           modalText:"",
           status:false
       }
    },
    components:{
        "home-view":homeView,
        "person-view":personView,
        "login-view":loginView,
        "app-toast":appToast
    },
    mounted:function(){
        eventBus.$on("initData", this.initData);    //登录后查询数据
        eventBus.$on("refresh", this.getNewShare);       //重新加载数据
        //监听toast事件
        eventBus.$on("toast",  (text) =>{
            this.openToast(text)
        });
        
        if(localStorage.getItem("loginState")==1){
        	  this.initData();
        }
    },
    methods:{
        //查询最新动态的数据
        getNewShare:function(){
        	  var _this = this;
		        // 请求成功
					  var success = function(res) {
					  	  var shareList = res.result;
					      for(var i=0;i<shareList.length;i++){
		                if(shareList[i].share_photo!=""&&shareList[i].share_photo!=null){
		                	  shareList[i].share_photo_arr =  shareList[i].share_photo.split(",");
		                }
		            }
		            _this.shareList = shareList;
					  };
					  // 请求失败
					  var error = function(res) {
						    eventBus.$emit("toast","出错了，请稍后重试")
					  };
					  //开始请求
					  globalHelper.ajax({
								"url":"/api/share/getAll",
								"method":"get",
								"success": success, // 请求成功后的回调方法
								"params":{},
								"error": error,
								"async": true
					  });
        },
        //回填登录用户的信息
        setUserInfo:function(){
             this.user.u_photo = localStorage.getItem("userPhoto")||"../../static/assets/images/user_photo.jpg";
             this.user.u_name = localStorage.getItem("userName")||"not login";
             this.user.u_signature = localStorage.getItem("signature")||"哈哈";
        },

        //登录后查询数据
        initData:function(){
            this.getNewShare();
            this.setUserInfo();
        },
        openToast:function(text){
			 		 this.modalText=text;
			 		 this.status=true;
			 		 setTimeout(this.closeToast,2000)
        },
        closeToast:function(){
            this.modalText="";
            this.status=false;
        }
    }
}
</script>
