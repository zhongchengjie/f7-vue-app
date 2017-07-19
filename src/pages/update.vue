<template>
      <f7-page name="update">
          <app-navbar :type="'4'" :title="'修改信息'"></app-navbar>
          <f7-list form style="margin:0px auto" >
              <f7-list-item v-if="$route.params.type=='1'">
                  <f7-input  type="text" :placeholder="$route.params.name"   v-model="value"></f7-input>
              </f7-list-item>
              <f7-list-item v-else>
                  <f7-input class="item-textarea" type="textarea" :placeholder="$route.params.name"   v-model="value"></f7-input>
              </f7-list-item>
          </f7-list>
      </f7-page>
</template>

<script>
import appNavbar from "../components/navbar.vue";
export default {
	 name:"update",
     props:["type","value"],
	 data:function(){
	 	  return{
	 	  }
	 },
	 components:{
        "app-navbar":appNavbar
	 },
     mounted:function () {
         eventBus.$on("iconClick", this.updateInfo);
     },
	 methods: {
         updateInfo:function(){
             var _this = this;
             if(_this.type==1){
                 this.$http.post('/api/user/updateName', {
                     name: _this.value,
                     userId: localStorage.getItem("userId")
                 }, {}).then((response) => {
                     var result = response.body;
                     console.log(result);
                     if (result) {
                         window.f7.alert("修改成功");
                         localStorage.setItem("userName",_this.value)
                         _this.value = "";
                         window.f7.views[1].back();  //返回上一页
                     }
                     else {
                         window.f7.alert("系统繁忙...");
                     }
                 })
             }
             else{
                 this.$http.post('/api/user/updateSign', {
                     signature: _this.value,
                     userId: localStorage.getItem("userId")
                 }, {}).then((response) => {
                     var result = response.body;
                     console.log(result);
                     if (result) {
                         window.f7.alert("修改成功");
                         localStorage.setItem("signature",_this.value)
                         _this.value = "";
                         window.f7.views[1].back();  //返回上一页
                     }
                     else {
                         window.f7.alert("系统繁忙...");
                     }
                 })
             }

         }
     }
}
</script>

