<template>
    <f7-photo-browser :photos="photos" @open="onOpen"></f7-photo-browser>
</template>

<script>
export default {
	name:""
	method:{
		onOpen:function(){
			console.log("1111")
		}
	}
}
</script>

<style>
</style>