import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueDND from 'awe-dnd'

import $conf from './common/config/config'
import router from './router'

import store from './store'

Vue.use(VueDND)

Vue.prototype.$conf = $conf
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
