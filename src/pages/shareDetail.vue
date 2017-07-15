<template>
	<div>
        <app-navbar :type="'1'" :title="'分享详情'"></app-navbar>
	    <f7-pages>
            
	    </f7-pages>
    </div>
      
</template>
   
<script>
import appNavbar from "../components/navbar.vue";
//import pageView from "../components/page.vue";

export default {
	 name:"shareDetail",
	 data:function(){
	 	  return{
	 	  }
	 },
	 components:{
         "app-navbar":appNavbar
         //"page-view":pageView
	 }
}
</script>
