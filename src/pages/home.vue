<template>
	<f7-view id="view-1" tab active navbar-through toolbar-through>
        <app-navbar :type="'3'"></app-navbar>
        <f7-pages>
          <f7-page name="home" pull-to-refresh  ptr:pullmove="refresh">
              <div class="banner">
                <img src="../../static/assets/images/banner.jpg">
              </div>
              <f7-list media-list  class="share-list">
                  <f7-list-item v-for="item in shareList"
                                media="<img src='../../static/assets/images/user_photo.jpg'>"
                                :title="item.user_name"
                                :subtitle="item.create_time">
                      <div slot="root" class="share-content">{{item.share_content}}</div>
                      <div slot="root" class="share-photo" v-if="item.share_photo">
                          <img v-for="photo in item.share_photo_arr" :src="photo" ></img>
                      </div>
                      <div slot="root" class="share-icon">
                          <span @click="updateLikeNum(item.share_id)"><i class="icon iconfont icon-hengtianjinfuicon03">&nbsp;</i>{{item.like_num}}</span>&nbsp;
                          <span @click="favor(item.share_id)"><i class="icon iconfont icon-xihuan">&nbsp;</i>{{item.favor_num}}</span>
                      </div>
                  </f7-list-item>
              </f7-list>
          </f7-page>
        </f7-pages>
    </f7-view> <!--end of view1-->
</template>


<script>
import appNavbar from "../components/navbar.vue"
export default {
    name:"home",
    props:["shareList"],
    data:function () {
       return {
       }
    },
    components:{
        "app-navbar":appNavbar
    },
    created:function () {

    },
    mounted:function(){
        eventBus.$on("iconClick", this.addShare);
        if(localStorage.getItem("loginState")=='1'){
            this.getNewShare();
        }
    },
    updated:function (){
    	  
    },
    methods:{
        //刷新数据
        refresh:function(){
            alert(111);
            /*// 模拟2s的加载过程
            setTimeout(this.getNewShare, 2000);*/
        },
        //查询最新动态的数据
        getNewShare:function(){
            this.$http.get('/api/share/getAll').then((data) => {
                this.shareList = data.body;
                console.log(this.shareList);
                var shareList = this.shareList;
                for(var i=0;i<shareList.length;i++){
                    shareList[i].share_photo_arr =  shareList[i].share_photo.split(",");
                }
            });
            //window.f7.pullToRefreshDone();
        },
        //发表新主题
        addShare:function(){
            window.f7.views[0].loadPage('/addShare/')
        },

        //收藏
        favor:function(share_id){
            var _this = this;
            console.log(share_id);
            var user_id = localStorage.getItem("userId")
            this.$http.post('/api/favor/add',{user_id:user_id,share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    this.updateFavorNum(share_id);
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新收藏数量
        updateFavorNum:function(share_id){
            console.log(share_id);
            this.$http.post('/api/share/updateFavorNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    window.f7.alert("收藏成功");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新点赞数量
        updateLikeNum:function(share_id){
            console.log(share_id);
            this.$http.post('/api/share/updateLikeNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    window.f7.alert("已赞");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        }

    }
}
</script>

<style>
  @import "../../static/assets/css/share.css"
</style>