<template>
	  <f7-navbar v-if="type=='1'">
			 <f7-nav-left sliding>
			  	<f7-link icon="iconfont icon-fanhui" back></f7-link>
			 </f7-nav-left>
			 <f7-nav-center>{{title}}</f7-nav-center>
	  </f7-navbar>

	  <f7-navbar v-else-if="type=='2'">
			 <f7-nav-center>{{title}}</f7-nav-center>
			 <f7-nav-right sliding>
				  <f7-link  icon="iconfont icon-plus" @click="iconClick"></f7-link>
			 </f7-nav-right>
	  </f7-navbar>
	 
	 	<f7-navbar v-else-if="type=='3'">
			 <f7-nav-center><input type="search" placeholder="搜索"></f7-nav-center>
			 <f7-nav-right sliding>
				  <f7-link  icon="iconfont icon-plus" @click="iconClick"></f7-link>
			 </f7-nav-right>
	  </f7-navbar>
	  
	  <f7-navbar v-else-if="type=='4'">
			  <f7-nav-left sliding>
		       <f7-link icon="iconfont icon-fanhui" back></f7-link>
			  </f7-nav-left>
			  <f7-nav-center>{{title}}</f7-nav-center>
			  <f7-nav-right sliding>
				   <f7-link  @click="iconClick">保存</f7-link>
			  </f7-nav-right>
	  </f7-navbar>
      
</template>

<script>
export default {
	  name:"navbar",
	  props:["type","title"],
	  data:function(){
	  	 return{
	  	 	  
	  	 }
	  },
	  methods:{
	      iconClick:function () {
            eventBus.$emit("iconClick");     //点击右边图标
        }
	  }
	  
}
</script>