<template>
	<p class="big-btn">
		<f7-button round fill @click="btnClick" :style="{background:bg}">{{btnName}}</f7-button>
	</p>
</template>

<script>
export default {
	  name:"navbar",
	  props:["btnName","bg"],
	  data:function(){
	  	 return{
	  	 }
	  },
	  methods:{
	      btnClick:function () {
              //eventBus.$emit("iconClick");     //点击右边图标
          }
	  }
	  
}
</script>