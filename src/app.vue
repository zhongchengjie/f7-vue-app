<template>
  <!-- App -->
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views tabs>
      <home-view></home-view>
      <person-view></person-view>
    
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
           state:localStorage.getItem("loginState")||'0'
       }
    },
    components:{
    	  "home-view":homeView,
    	  "person-view":personView,
        "login-view":loginView
    },
    created:function () {

    },
    mounted:function(){
        eventBus.$on("setUserInfo", this.setUserInfo);
       
    },
    updated:function (){
    	  
    },
    methods:{
           setUserInfo:function(){
                //alert(localStorage.getItem("userName"));
                //console.log(window.f7)
                window.f7.showTab("#view-1");
                this.user.user_name = localStorage.getItem("userName");
           }
    }
}
</script>

<style scoped>
 
</style>