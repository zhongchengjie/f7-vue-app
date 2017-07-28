<template>
	<f7-page :name="pageName" @page:init="hideToolBar" @page:back="showToolBar">
		<slot name="app-page-content"></slot>
	</f7-page>
</template>

<script>
export default {
	  name:"page",
	  props:["pageName"],
	  methods:{
          hideToolBar:function () {
              $$(".views .toolbar").hide();
          },
          showToolBar:function () {
              $$(".views .toolbar").show();
          }
	  }
}
</script>