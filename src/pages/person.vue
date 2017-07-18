<template>
    <f7-view id="view-2" tab  navbar-through toolbar-through>
        <f7-navbar title="个人"></f7-navbar>
        <f7-pages>
          <f7-page name="person" class="person">
          	  <f7-list media-list>
                  <f7-list-item
                    link="/personInfo/"
                    :media="'<img src='+userInfo.u_photo+'>'"
                    :title="userInfo.u_name"
                    :subtitle="userInfo.u_signature"
                  ></f7-list-item>
              </f7-list>
              <f7-list style="margin-top:10px">
                  <f7-list-item link="/myShare/" media="<i class='icon iconfont icon-pengyouquan'></i>" title="我的分享"></f7-list-item>
                  <f7-list-item link="/myFavor/" media="<i class='icon iconfont icon-shoucang'></i>" title="我的收藏"></f7-list-item>
                  <f7-list-item link="/modifyPwd/" media="<i class='icon iconfont icon-shezhi'></i>" title="修改密码"></f7-list-item>
              </f7-list>
              <div><big-btn :btn-name="'退出登录'" :bg="'#ff2d55'" :type="'logout'"></big-btn></div>
          </f7-page>

        </f7-pages>
    </f7-view> <!--end of view2-->
</template>


<script>
import bigBtn from "../components/bigbtn.vue";
export default {
    name:"home",
    props:["user"],
    data:function () {
       return {

       }
    },
    components:{
        "big-btn":bigBtn
    },
    created:function () {

    },
    mounted:function(){
        eventBus.$on("logout", this.logout);
    },
    updated:function (){
    	  
    },
    computed:{
        userInfo:function(){
            return this.user;
        }
    },
    methods:{
          //退出登录
           logout:function(){
               //store.commit("setLoginState",false);
               //console.log(store.getters.getLoginState);
               window.f7.loginScreen(); //打开登录屏
               localStorage.setItem("loginState",'0');  //标记为未登录状态
               //清除登录用户的信息
               localStorage.setItem("userName","");
               localStorage.setItem("userPwd","");
               localStorage.setItem("userId","");
               localStorage.setItem("signature","");
               localStorage.setItem("userPhoto","")
           }
    }
}
</script>

<style>
    .person  .list-block.media-list {margin-top:10px;margin-bottom:0px}
    .person  .list-block.media-list .item-media img{width:60px;height:60px;border-radius:50%}
    .person  .list-block.media-list .item-subtitle{color:#666;font-size:14px;margin-top:10px}
    .person  .list-block .item-media i.iconfont{font-size:20px}
</style>