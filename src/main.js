import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

Vue.filter('time', timestamp => {
    return new Date(timestamp).toLocaleTimeString()
});

const app = new Vue({
    store,
    render: h => h(App)
});


app.$mount('#app');
