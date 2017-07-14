<template>
	  <f7-list media-list  class="share-list">
	      <f7-list-item v-for="item in shareList"
	        link="/item/"
	        media="<img src='../../static/assets/images/user_photo.jpg'>"
	        :title="item.user_name"
	        :subtitle="item.create_time">
	      <div slot="root" class="share-content">{{item.blog_content}}</div>
	      <div slot="root" style="padding-left:10px;margin-top:6px">
	      	<img src="../../static/assets/images/blog_img.jpg" width="100px" height="100px"></img>
	      </div>
	      </f7-list-item>
	  </f7-list>
      
</template>

<script>

export default {
	 name:"newShare",
	 data:function(){
	 	  return{
	 	  	shareList:{}
	 	  }
	 },
	 components:{
	 },
   mounted:function () {
       this.getNewShare();
   },
	 methods:{
	     getNewShare:function(){
	     	  this.$http.get('/api/share/getAll').then((data) => {  
            // 由于请求成功返回的是Promise对象，我们要从data.body.data拿到books数组  
              this.shareList = data.body;
              console.log(this.shareList);
              
          })  
	     }
	 }
}
</script>
<style>
	@import "../../static/assets/css/share.css";
</style>