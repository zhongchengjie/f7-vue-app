<template>
	  <f7-navbar v-if="type=='1'">
		  <f7-nav-left sliding>
		  	<f7-link icon="iconfont icon-fanhui" back></f7-link>
		  </f7-nav-left>
		  <f7-nav-center>{{title}}</f7-nav-center>
		</f7-navbar>
      
</template>

<script>
export default {
	  name:"navbar",
	  props:["type","title"],
	  data:function(){
	  	 return{
	  	 	  a:1
	  	 }
	  }
}
</script>