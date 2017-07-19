export default [
    {
        path: '/register/',
        component: require('./pages/register.vue')
    },
    {
        path: '/addShare/',
        component: require('./pages/addShare.vue')
    },
    {
        path: '/modifyPwd/',
        component: require('./pages/modifyPwd.vue')
    },
    {
        path: '/myShare/',
        component: require('./pages/myShare.vue')
    },
/*    {
        path: '/myFavor/',
        component: require('./pages/myFavor.vue')
    },*/
    {
        path: '/personInfo/',
        component: require('./pages/personInfo.vue')
    },
    {
        path: '/update/type/:type/name/:name/value/:value',
        component: require('./pages/update.vue')
    }

]