<template>
  <!-- App -->
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views tabs>
      <f7-view id="view-1" tab active navbar-through toolbar-through>
        <f7-navbar title="发现"></f7-navbar>
        <f7-pages>
          <f7-page name="home">
              <div class="banner">
                <img src="../static/assets/images/banner.jpg">
              </div>
          </f7-page>
        </f7-pages>
      </f7-view> <!--end of view1-->
      <f7-view id="view-2" tab  navbar-through toolbar-through>
        <f7-navbar title="个人"></f7-navbar>
        <f7-pages>
          <f7-page name="myself">
              <f7-list form>
                  <f7-list-item>
                    <f7-label>手机号</f7-label>
                    <f7-input type="text" placeholder="请输入手机号码" v-model="user.mobile"/>
                  </f7-list-item>
                  <f7-list-item>
                    <f7-label>密码</f7-label>
                    <f7-input type="password" placeholder="请输入密码" v-model="user.password"/>
                  </f7-list-item>
              </f7-list>
              <f7-button round fill class="login-btn" @click="login">登录</f7-button>
          </f7-page>
        </f7-pages>
      </f7-view> <!--end of view2-->
      <f7-toolbar tabbar labels :class="toolbarState" >
        <f7-link icon="iconfont icon-faxian" text="发现" tab-link="#view-1" active></f7-link>
        <f7-link icon="iconfont icon-yonghu" text="个人" tab-link="#view-2"></f7-link>
      </f7-toolbar>
    </f7-views>
  </div>
</template>

<script>
export default {
    name:"app",
    data:function () {
       return {
           user:{mobile:"",password:""}
       }
    },
    created:function () {
       this.getUser();
    },
    methods:{
        login:function () {
            var _this =this;
            this.$http.post('/api/user/login',{mobile:_this.user.mobile,password:_this.user.password},{}).then((response) => {
                console.log(response);
            })
        },
        getUser:function () {
            this.$http.get('/api/user/getUser',{}).then((response) => {
                console.log(response);
            })
        }
    }
}
</script>

<style scoped>
  .banner{width:100%;height:26%}
  .banner img{width:100%;height:100%}

  .login-btn{background:#ff2d55;letter-spacing: 2px}
</style>