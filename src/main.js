// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// Import App Custom Styles
import iconfont from  '../static/assets/iconfont/iconfont.css'
import AppStyles from './css/app.css'


// Import Routes
import Routes from './routes.js'

// Import vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// Import App Component
import App from './app'

//vuex
import store from "./store"
window.store = store;

//eventBus
window.eventBus = new Vue();

//dom7对象
window.$$ = window.Dom7;

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init App
window.vm = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    modalTitle:" ",
    modalButtonOk:"确定",
    modalButtonCancel:"取消"
  },
  // Register App Component
  components: {
    app: App
  }
});

//定义myApp对象
window.myApp = window.f7;

//import
import globalHelper from "./js/globalHelper.js"
window.globalHelper = globalHelper;