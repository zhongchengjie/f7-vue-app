<template>
	<f7-page :name="pageName" @page:init="hideToolBar" @page:back="showToolBar">
		<slot name="app-page-content"></slot>
	</f7-page>
</template>

<script>
export default {
	  name:"page",
	  props:["pageName"],
	  data:function(){
	  	 return{

	  	 }
	  },
	  methods:{
          hideToolBar:function () {
              window.Dom7(".toolbar").hide();
          },
          showToolBar:function () {
              window.Dom7(".toolbar").show();
          }
	  }
}
</script>