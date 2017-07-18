<template>
	  <div>
      <app-navbar :type="'4'" :title="'修改信息'"></app-navbar>
	    <f7-pages>
          <f7-page name="update">1111</f7-page>
	    </f7-pages>
    </div>     
</template>

<script>
import appNavbar from "../components/navbar.vue";
export default {
	 name:"addShare",
	 data:function(){
	 	  return{
	 	  }
	 },
	 components:{
        "app-navbar":appNavbar
	 },
   mounted:function () {
      
   },
	 methods: {
         
   }
}
</script>

