<template>
	  <div>
      <app-navbar :type="'1'" :title="'我的信息'"></app-navbar>
	    <f7-pages>
	      	 <page-view :page-name="'personInfo'">
                <f7-list slot="f7-page-content" class="person-info"> 
								  <f7-list-item link="//" title="头像" :after="'<img src='+photo+'>'"></f7-list-item>
								  <f7-list-item link="//" title="昵称" :after="name"></f7-list-item>
								  <f7-list-item link="//" title="签名" after="哈哈哈哈哈"></f7-list-item>
								</f7-list>
	          </page-view >    
	    </f7-pages>
    </div>
      
</template>

<script>
import appNavbar from "../components/navbar.vue";
import bigBtn from "../components/bigbtn.vue";
import pageView from "../components/page.vue";
export default {
	 name:"register",
	 data:function(){
	 	  return{
	 	  	 photo:"../static/assets/images/user_photo.jpg",
	 	  	 name:"",
	 	  	 signature:"哈哈哈哈哈"
	 	  }
	 },
	 components:{
	 	  "app-navbar":appNavbar,
	 	  "big-btn":bigBtn,
	 	  "page-view":pageView
	 },
	 mounted:function(){
    	 this.name = localStorage.getItem("userName");
   },
	 methods:{
	 	
	 }
}
</script>

<style>
	.person-info{margin-top:0px}
	.person-info .item-after img{border-radius: 50%;height:32px;width:32px}
</style>