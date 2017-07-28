<template>
	<div>
	    <app-navbar type="1" title="我的分享" ></app-navbar>
	    <f7-pages>
	        <f7-page name="myShare" @page:init="hideToolBar" @page:back="showToolBar">
       	        <f7-list media-list  class="share-list with-border">
	                <f7-list-item v-for="item in list"
	                            :title="item.share_content"
	                            :after="timeTransform(item.share_time)">
	                    <div slot="root" class="share-photo" v-if="item.share_photo" style="padding-left:20px">
	                       <img v-for="photo in item.share_photo_arr" :src="photo" ></img>
	                    </div>
	                    <div slot="root" class="share-icon">
	                        <span @click="updateLikeNum(item.share_id)"><i class="icon iconfont icon-hengtianjinfuicon03">&nbsp;</i>{{item.like_num}}</span>&nbsp;
	                        <span @click="ifFavor(item.share_id)"><i class="icon iconfont icon-xihuan">&nbsp;</i>{{item.favor_num}}</span>
	                    </div>
	                </f7-list-item>
	            </f7-list>
		    </f7-page>
	    </f7-pages>
    </div>
</template>



<script>
import appNavbar from "../components/navbar.vue"
export default {
    name:"home",
    data:function () {
       return {
          list:[]
       }
    },
    components:{
        "app-navbar":appNavbar
    },
    mounted:function(){
    	this.getMyShare();
    },
    methods:{
    	//我的分享
    	getMyShare:function(){
    		var user_id = localStorage.getItem("userId")
    		this.$http.post('/api/share/getMy',{user_id:user_id}).then((data) => {
                var shareList = data.body;
                console.log(shareList);
                for(var i=0;i<shareList.length;i++){
                	
                    shareList[i].share_photo_arr =  shareList[i].share_photo==""?[]:shareList[i].share_photo.split(",");
                }
                this.list = shareList;
            })
    	},
        //时间格式转换
        timeTransform:function(timeStr){
            return globalHelper.timeTransform(timeStr);
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
        
         hideToolBar:function () {
              window.Dom7(".toolbar").hide();
          },
          showToolBar:function () {
              window.Dom7(".toolbar").show();
          }

    }
}
</script>

<style>
  @import "../../static/assets/css/share.css"
</style>