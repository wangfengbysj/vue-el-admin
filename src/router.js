import Vue from 'vue'
import Router from 'vue-router'

import routes from './common/config/router'

Vue.use(Router)

let router = new Router({routes})

router.beforeEach((to, from, next) => {
    console.log('to',to)
    console.log('from',from)

    let token = window.sessionStorage.getItem('token')
    if (token) {
        if (to.path === '/login') {
            Vue.prototype.$message.error('请不要重复登录');
            return next({name:from.name ? from.name : 'index'})
        }
        next()
    } else {
        if (to.path === '/login') {
            return next()
        }
        Vue.prototype.$message.error('请先登录')
        next({path: '/login'})
    }
})

export default router