<template>
	<f7-view id="view-1" tab active navbar-through toolbar-through :dynamic-navbar="true">
        <app-navbar :type="'3'"></app-navbar>
        <f7-pages>
          <f7-page name="home" pull-to-refresh @ptr:refresh="refresh">
              <div class="banner">
                <img src="../../static/assets/images/banner.jpg">
              </div>
              <f7-list media-list  class="share-list">
                  <f7-list-item v-for="(item,index) in list"
                                media="<img src='../../static/assets/images/user_photo.jpg'>"
                                :title="item.user_name"
                                :after="timeTransform(item.share_time)"
                                :text="item.share_content">
                      <div slot="root" class="share-photo" v-if="item.share_photo">
                          <img v-for="photo in item.share_photo_arr" :src="photo" @click="openPhotoBrowser(item.share_id)"></img>                     
                      </div>
                      <f7-photo-browser  v-if="item.share_photo" :ref="'pb_'+item.share_id" :photos="item.share_photo_arr" theme="dark" ofText="/" backLinkText="关闭"></f7-photo-browser>
                      <div slot="root" class="share-icon">
                          <span @click="updateLikeNum(item.share_id)"><i class="icon iconfont icon-hengtianjinfuicon03">&nbsp;</i>{{item.like_num}}</span>&nbsp;
                          <span @click="ifFavor(item.share_id)"><i class="icon iconfont icon-xihuan">&nbsp;</i>{{item.favor_num}}</span>
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
    mounted:function (){
        eventBus.$on("iconClick", this.addShare);         //新增
    },
    computed:{
        list:function(){
            return this.shareList;
        }
    },
    methods:{
        //刷新数据
        refresh:function(){
            setTimeout(function () {
            	eventBus.$emit("refresh");
                myApp.pullToRefreshDone();
            }, 2000);
        },
        //时间格式转换
        timeTransform:function(timeStr){
            var result = timeStr;
            var timeStr = timeStr.replace(/-/g,"/")
            var date_time =new Date(timeStr);
            var timeStamp1 = date_time.getTime();   //创建时间的时间戳1
            var timeStamp2 = new Date().getTime();  //当前时间的时间戳2
            var _time = parseInt((timeStamp2-timeStamp1)/60000);      //相差分钟数
            //console.log(_time);
            if(_time<3){
                result = "刚刚";
            }
            else if(_time<60){
                result = _time+"分钟前";
            }
            else if(_time<24*60){
                result = parseInt(_time/60)+"小时前";
            }
            else{
                result = timeStr.substr(5);
            }
            return result;
        },
        //发表新主题
        addShare:function(){
            window.f7.views[0].loadPage('/addShare/');
        },
        //判断是否已经收藏
        ifFavor:function(share_id){
        	var e = event;
            var _this = this;
            var user_id = localStorage.getItem("userId")
            this.$http.post('/api/favor/favored',{user_id:user_id,share_id:share_id},{}).then((response) => {
                var result = response.body;
                if(result.length==1){
                	 window.f7.alert("你已收藏该分享");
                }
                else{
                	this.favor(share_id,e)
                }
            })
        },
        //收藏
        favor:function(share_id,e){
            var _this = this;
            var user_id = localStorage.getItem("userId")
            this.$http.post('/api/favor/add',{user_id:user_id,share_id:share_id},{}).then((response) => {
                var result = response.body;
                if(result){
                    this.updateFavorNum(share_id,e);
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新收藏数量
        updateFavorNum:function(share_id,event){
        	console.log(event.target.tagName)
        	var tagName = event.target.tagName;
            var event_dom = tagName =="I"?$$(event.target.parentNode):$$(event.target);
            var num = parseInt(event_dom.text());
            this.$http.post('/api/share/updateFavorNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                	event_dom.html("<i class='icon iconfont icon-xihuan'>&nbsp;"+(num+1)+"</i>")
                    window.f7.alert("收藏成功");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新点赞数量
        updateLikeNum:function(share_id){
        	console.log(event.target.tagName)
        	var tagName = event.target.tagName;
            var event_dom = tagName =="I"?$$(event.target.parentNode):$$(event.target);
            var num = parseInt(event_dom.text());
            this.$http.post('/api/share/updateLikeNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                if(result){
                    event_dom.html("<i class='icon iconfont icon-hengtianjinfuicon03'>&nbsp;"+(num+1)+"</i>")
                    window.f7.alert("已赞");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        openPhotoBrowser:function(share_id){
        	 //console.log(index);
        	 console.log(this.$refs);
        	 //console.log(this.$refs.pb[0]);
        	 console.log(this.$refs['pb_'+share_id][0]);
        	 this.$refs['pb_'+share_id][0].open();
        }
       

    }
}
</script>

<style>
  @import "../../static/assets/css/share.css"
</style>