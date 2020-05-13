import Vue from 'vue'
import App from './App'
import router from './router'
import mixinRemoveTab from './router/mixinRemoveTab'
import store from "./store/index"
import "./components/main"
window.adminVue=new Vue();
Vue.config.productionTip = false;

//Vue.mixin(mixinRemoveTab);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
