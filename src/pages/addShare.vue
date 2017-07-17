<template>
	  <div>
      <app-navbar :type="'1'" :title="'发布圈子'"></app-navbar>
	    <f7-pages>
            <page-view :page-name="'addShare'">
                <div  slot="f7-page-content">
                    <f7-list form style="margin:0px auto" enctype="multipart/form-data" id="shareForm">
                        <f7-list-item>
                            <f7-input class="item-textarea" type="textarea" placeholder="发表你此刻的想法..."  v-model="share_content"></f7-input>
                        </f7-list-item>
                        <div class="img-box">
                        	 <div class="img-item" v-for="item in imgList" v-if="state"><img :src="item"></div>
                        	 <div class="img-item">
                        	 	   <i class="icon iconfont icon-plus"></i>
                        	 	   <input type="file" name="fulAvatar" style="" @change="uploadImg">
                        	 </div> 
                        </div>
                    </f7-list>
                    <div><big-btn :btn-name="'发表'" :bg="'#ff2d55'" :type="'share'"></big-btn></div>
                </div>
            </page-view>
	    </f7-pages>
    </div>     
</template>

<script>
import appNavbar from "../components/navbar.vue";
import pageView from "../components/page.vue";
import bigBtn from "../components/bigbtn.vue";
export default {
	 name:"addShare",
	 data:function(){
	 	  return{
	 	  	share_content:"",
	 	  	state:false,
	 	  	imgList:[]
	 	  }
	 },
	 components:{
         "app-navbar":appNavbar,
         "page-view":pageView,
         "big-btn":bigBtn
	 },
     mounted:function () {
         eventBus.$on("share", this.shareMoments);
     },
     destroyed:function(){
         eventBus.$off("refresh");
     },
	 methods: {
         shareMoments: function () {
             var _this = this;
             var user_id = localStorage.getItem("userId")
             this.$http.post('/api/share/add', {
                 content: _this.share_content,
                 photo: _this.imgList.join(','),
                 user_id: user_id
             }, {}).then((response) => {
                 var result = response.body;
                 console.log(result);
                 if (result) {
                     window.f7.alert("发布成功");
                     _this.share_content = "";
                     window.f7.views[0].back();  //返回上一页

                     //刷新首页的动态
                     eventBus.$emit("refresh");
                 }
                 else {
                     window.f7.alert("发布出错");
                 }
             })
         },
         uploadImg: function () {
             var _this = this;
             //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
             var formData = new FormData($$("#shareForm")[0]);
             $$.ajax({
                 url: "/img/uploadImg",
                 method: 'POST',
                 data: formData,
                 processData: false,     //必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
                 contentType: false,     //必须false才会自动加上正确的Content-Type
                 success: function (responseStr) {
                     //console.log(responseStr);
                     var imgPath = JSON.parse(responseStr).newPath;
                     console.log(imgPath);
                     _this.state = true;
                     _this.imgList.push(imgPath);
                 },
                 error: function (responseStr) {
                     window.f7.alert("上传出错");
                 }
             });
         }
     }
}
</script>

<style scoped>
	 .img-box{display:flex;padding:10px}
	 .img-box .img-item{width:60px;height:60px;border:1px solid #ccc;text-align:center;line-height:60px;position:relative;margin-right:6px}
	 .img-box .img-item i{color:#ff2d55;font-size:46px;}
	 .img-box .img-item .icon-plus:before{margin-left:-9px;margin-top:4px;}
	 .img-box .img-item input{width:60px;height:60px;opacity: 0;position:absolute;left:0;right:0}
	 .img-box .img-item img{width:100%;height:100%;}
</style>