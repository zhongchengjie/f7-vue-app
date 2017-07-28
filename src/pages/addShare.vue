<template>
        <app-page page-name="addShare">
            <div slot="app-page-content">
                <app-navbar type="1" title="发布圈子"></app-navbar>
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
                <div><app-btn btn-name="发表" bg="#ff2d55" type="share"></app-btn></div>
            </div>
        </app-page>
</template>

<script>
import appNavbar from "../components/navbar.vue";
import appPage from "../components/page.vue";
import appBtn from "../components/bigBtn.vue";
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
        "app-page":appPage,
        "app-btn":appBtn
	 },
     mounted:function () {
        eventBus.$on("share", this.shareMoments);
     },
     destroyed:function(){
        //eventBus.$off("refresh");   //不能销毁该事件，否则第二次进入此页面新增后，无法刷新首页的数据
     },
	 methods: {
         shareMoments: function () {
         	 var _this = this;
         	 //提交参数
			 var params = {
				 content: _this.share_content,
                 photo: _this.imgList.join(','),
                 user_id: localStorage.getItem("userId")
			 };
			 // 请求成功
			 var success = function(res) {
				 var result = res.result;
                 console.log(result);
                 if (result) {
                     globalHelper.toast("发布成功");
                     _this.share_content = "";
                     myApp.views[0].back();  //返回上一页

                     //刷新首页的动态
                     eventBus.$emit("refresh");
                 }
                 else {
                     globalHelper.toast("发布出错,请稍后重试");
                 }
			 };
			 // 请求失败
			 var error = function(res) {
				globalHelper.toast("toast","系统繁忙，请稍后重试")
			 };
			 //开始请求
			 globalHelper.ajax({
				"url":"/api/share/add",
				"method":"post",
				"params": params, // action对应的参数
				"success": success, // 请求成功后的回调方法
				"error": error,
				"async": true
			 });
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
                     globalHelper.toast("上传出错");
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