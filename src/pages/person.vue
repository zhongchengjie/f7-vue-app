<template>
    <f7-view id="view-2" tab  navbar-through toolbar-through>
        <f7-navbar title="个人"></f7-navbar>
        <f7-pages>
          <f7-page name="person" class="person">
          	  <f7-list media-list>
                  <f7-list-item
                    link="/personInfo/"
                    media="<img src='../static/assets/images/user_photo.jpg'>"
                    :title="user.user_name"
                    subtitle="哈哈哈哈哈哈"
                  ></f7-list-item>
              </f7-list>
              <f7-list style="margin-top:10px">
                  <f7-list-item link="/item/" media="<i class='icon iconfont icon-pengyouquan'></i>" title="我的圈子"></f7-list-item>
                  <f7-list-item link="/item/" media="<i class='icon iconfont icon-shoucang'></i>" title="我的收藏"></f7-list-item>
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
    data:function () {
       return {
       	   user:{user_name:localStorage.getItem("userName")||"Not Login"},
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
    .person  .list-block.media-list {margin:0 auto}
    .person  .list-block.media-list .item-media img{width:60px;height:60px;border-radius:50%}
    .person  .list-block.media-list .item-subtitle{color:#666;font-size:14px;margin-top:10px}
  
    .person  .list-block .item-media .iconfont{font-size:20px}
</style>