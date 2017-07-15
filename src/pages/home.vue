<template>
	<f7-view id="view-1" tab active navbar-through toolbar-through>
        <app-navbar :type="'3'"></app-navbar>
        <f7-pages>
          <f7-page name="home">
              <div class="banner">
                <img src="../../static/assets/images/banner.jpg">
              </div>
              <f7-block style="margin-top:20px;padding-left:0px;padding-right:0px">
                  <f7-buttons class="new-tab-btn">
                      <f7-button tab-link="#tab-1" active><span>最新动态</span></f7-button>
                      <f7-button tab-link="#tab-2"><span>热门话题</span></f7-button>
                  </f7-buttons>
                  <f7-tabs>
                      <f7-tab id="tab-1" active>
                         <new-share></new-share>
                      </f7-tab>
                      <f7-tab id="tab-2">

                      </f7-tab>
                  </f7-tabs>
              </f7-block>
          </f7-page>
        </f7-pages>
    </f7-view> <!--end of view1-->
</template>


<script>
import appNavbar from "../components/navbar.vue"
import newShare from "./newShare.vue";
export default {
    name:"home",
    data:function () {
       return {
       	 
       }
    },
    components:{
        "app-navbar":appNavbar,
        "new-share":newShare
    },
    created:function () {

    },
    mounted:function(){
        eventBus.$on("iconClick", this.addShare);
    },
    updated:function (){
    	  
    },
    methods:{
           //发表新主题
           addShare:function(){
               window.f7.views[0].loadPage('/addShare/')
           }
    }
}
</script>

<style> 
  .banner{width:100%;height:26%}
  .banner img{width:100%;height:100%}
</style>