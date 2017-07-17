<template>
  <!-- App -->
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
    <login-view :login-state="state"></login-view>
  </div>
</template>

<script>
import homeView from "./pages/home.vue";
import personView from "./pages/person.vue";
import loginView from "./pages/login.vue";
export default {
    name:"app",
    data:function () {
       return {
           state:localStorage.getItem("loginState")||'0',
           shareList:[],
           user:{u_photo:"",u_name:"",u_signature:""}
       }
    },
    components:{
        "home-view":homeView,
        "person-view":personView,
        "login-view":loginView
    },
    mounted:function(){
        eventBus.$on("loginAfter", this.loginAfter);
        eventBus.$on("refresh", this.getNewShare);       //重新加载数据
    },
    updated:function (){
    	  
    },
    methods:{
        //查询最新动态的数据
        getNewShare:function(){
            this.$http.get('/api/share/getAll').then((data) => {
                var shareList = data.body;
                for(var i=0;i<shareList.length;i++){
                    shareList[i].share_photo_arr =  shareList[i].share_photo.split(",");
                }
                this.shareList = shareList;
            })
        },
        //回填登录用户的信息
        setUserInfo:function(){
             this.user.u_photo = localStorage.getItem("userPhoto")||"../../static/assets/images/user_photo.jpg";
             this.user.u_name = localStorage.getItem("userName")||"not login"
             this.user.u_signature = localStorage.getItem("signature")||"哈哈"
        },

        //登录后
        loginAfter:function(){
             this.getNewShare();
             this.setUserInfo();
        }
    }
}
</script>

<style scoped>
 
</style>