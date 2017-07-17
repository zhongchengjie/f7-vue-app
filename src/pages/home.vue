<template>
	<f7-view id="view-1" tab active navbar-through toolbar-through>
        <app-navbar :type="'3'"></app-navbar>
        <f7-pages>
          <f7-page name="home" pull-to-refresh  ptr:pullmove="refresh">
              <div class="banner">
                <img src="../../static/assets/images/banner.jpg">
              </div>
              <f7-list media-list  class="share-list">
                  <f7-list-item v-for="item in list"
                                media="<img src='../../static/assets/images/user_photo.jpg'>"
                                :title="item.user_name"
                                :after="timeTransform(item.share_time)"
                                :text="item.share_content">
                      <div slot="root" class="share-photo" v-if="item.share_photo">
                          <img v-for="photo in item.share_photo_arr" :src="photo" ></img>
                      </div>
                      <div slot="root" class="share-icon">
                          <span @click="updateLikeNum(item.share_id)"><i class="icon iconfont icon-hengtianjinfuicon03">&nbsp;</i>{{item.like_num}}</span>&nbsp;
                          <span @click="favor(item.share_id)"><i class="icon iconfont icon-xihuan">&nbsp;</i>{{item.favor_num}}</span>
                      </div>
                  </f7-list-item>
              </f7-list>
          </f7-page>
        </f7-pages>
    </f7-view> <!--end of view1-->
</template>


<script>
import appNavbar from "../components/navbar.vue"
export default {
    name:"home",
    props:["shareList"],
    data:function () {
       return {

       }
    },
    components:{
        "app-navbar":appNavbar
    },
    mounted:function (){
        eventBus.$on("iconClick", this.addShare);         //新增
    },
    computed:{
        list:function(){
            return this.shareList;
        }
    },
    methods:{
        //刷新数据
        refresh:function(){
            alert(111);
            /*// 模拟2s的加载过程
            setTimeout(this.getNewShare, 2000);*/
        },
        //查询最新动态的数据
        getNewShare:function(){
            this.$http.get('/api/share/getAll').then((data) => {
                var shareList = data.body;
                for(var i=0;i<shareList.length;i++){
                    shareList[i].share_photo_arr =  shareList[i].share_photo.split(",");
                }
                this.shareList = shareList;
            });
            //window.f7.pullToRefreshDone();
        },
        //时间格式转换
        timeTransform:function(timeStr){
            var result = timeStr;
            var timeStr = timeStr.replace(/-/g,"/")
            var date_time =new Date(timeStr);
            var timeStamp1 = date_time.getTime();   //创建时间的时间戳1
            var timeStamp2 = new Date().getTime();  //当前时间的时间戳2
            var _time = parseInt((timeStamp2-timeStamp1)/60000);      //相差分钟数
            //console.log(_time);
            if(_time<3){
                result = "刚刚"
            }
            else if(_time<60){
                result = _time+"分钟前"
            }
            else if(_time<24*60){
                result = parseInt(_time/24)+"小时前"
            }
            else{
                result = timeStr.substr(11);
            }
            return result;
        },
        //发表新主题
        addShare:function(){
            window.f7.views[0].loadPage('/addShare/')
        },

        //收藏
        favor:function(share_id){
            var _this = this;
            console.log(share_id);
            var user_id = localStorage.getItem("userId")
            this.$http.post('/api/favor/add',{user_id:user_id,share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    this.updateFavorNum(share_id);
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新收藏数量
        updateFavorNum:function(share_id){
            console.log(share_id);
            this.$http.post('/api/share/updateFavorNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    window.f7.alert("收藏成功");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        },
        //更新点赞数量
        updateLikeNum:function(share_id){

            console.log($$(event.target.parentNode).text());
            var event_dom = $$(event.target.parentNode);
            var num = parseInt(event_dom.text());
            this.$http.post('/api/share/updateLikeNum',{share_id:share_id},{}).then((response) => {
                var result = response.body;
                console.log(result);
                if(result){
                    event_dom.html("<i class='icon iconfont icon-hengtianjinfuicon03'>&nbsp;"+(num+1)+"</i>")
                    window.f7.alert("已赞");
                }
                else{
                    window.f7.alert("系统繁忙...");
                }
            })
        }

    }
}
</script>

<style>
  @import "../../static/assets/css/share.css"
</style>