import Vue from 'vue';
import Element from 'element-ui';
import Components from '@/components';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@/icons';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(Components);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
