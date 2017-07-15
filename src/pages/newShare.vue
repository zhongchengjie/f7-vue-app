<template>
	  <f7-list media-list  class="share-list">
	      <f7-list-item v-for="item in shareList"
	        :link="'/shareDetail/share/'+item.share_id"
	        media="<img src='../../static/assets/images/user_photo.jpg'>"
	        :title="item.user_name"
	        :subtitle="item.create_time">
		      <div slot="root" class="share-content">{{item.share_content}}</div>
		      <div slot="root" class="share-photo" v-if="item.share_photo">
		      	<img v-for="photo in item.share_photo_arr" :src="photo" ></img>
		      </div>
		      <div slot="root" class="share-icon">
		      	<span @click="updateLikeNum(item.share_id)"><i class="icon iconfont icon-hengtianjinfuicon03"></i>&nbsp;{{item.like_num}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
		      	<span @click="favor(item.share_id)"><i class="icon iconfont icon-xihuan"></i>&nbsp;{{item.favor_num}}</span>
		      </div>
	      </f7-list-item>
	  </f7-list>
      
</template>

<script>

export default {
	 name:"newShare",
	 data:function(){
	 	  return{
	 	  	shareList:[]
	 	  }
	 },
	 components:{
	 },
   mounted:function () {
   	   if(localStorage.getItem("loginState")=='1'){
   	   	  this.getNewShare();
   	   }
       
   },
	 methods:{
	     getNewShare:function(){
	     	  this.$http.get('/api/share/getAll').then((data) => {  
            // 由于请求成功返回的是Promise对象，我们要从data.body.data拿到books数组  
              this.shareList = data.body;
              console.log(this.shareList);
              var shareList = this.shareList;
              for(var i=0;i<shareList.length;i++){
              	  shareList[i].share_photo_arr =  shareList[i].share_photo.split(",");
              }
          })  
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
	@import "../../static/assets/css/share.css";
</style>


