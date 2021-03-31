import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import VueDND from 'awe-dnd'

import $conf from './common/config/config'
import router from './router'

import store from './store'
import {Message} from 'element-ui';

let loading =  null
let requestCount = 0

function showLoading(){
    if (requestCount === 0){
        loading = Message({
            message:"加载中...",
            duration:0
        })
    }
    requestCount++
}

function hideLoading(){
    if (requestCount > 0){
        requestCount --
    }
    if (loading && requestCount === 0){
        loading.close()
    }
}

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    console.log(config)
    let token = window.sessionStorage.getItem('token')
    if (config.token === true) {
        config.headers['token'] = token
    }

    if (config.loading == true){
        showLoading()
    }
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    hideLoading()
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    console.log('响应拦截器 成功')

    hideLoading()
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 全局错误提示
    console.log(error)
    if (error.response && error.response.data && error.response.data.errorCode) {
        Message.error(error.response.data.msg)
    }
    hideLoading()
    // 对响应错误做点什么
    return Promise.reject(error);
});

Vue.use(VueDND)

Vue.prototype.$conf = $conf
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
