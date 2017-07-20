<template>
	<f7-page name="myFavor">
	  <f7-photo-browser ref="pb" :photos="photos" @open="onOpen"></f7-photo-browser>
	  <f7-link @click="openPhotoBrowser">Photos</f7-link>
    </f7-page>
</template>


<script>
  export default {
    data: function () {
      return {
        photos: [
          {
            url: 'path/to/picture-1.jpg',
            caption: 'Picture 1'
          },
          {
            url: 'path/to/picture-2.jpg',
            caption: 'Picture 2'
          }
        ]
      }
    },
    methods: {
      openPhotoBrowser: function () {
      	  console.log(this.$refs.pb);
          this.$refs.pb.open();
      },
      onOpen: function () {
          console.log('Photo Browser is opened')
      }
    }
  }
</script>