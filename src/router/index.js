import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';
import home from '@/router/modules/home';
import system from '@/router/modules/system';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'root',
        component: Layout,
        children: [home, system]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */ '@/views/login')
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: () => import(/* webpackChunkName: 'not-found' */ '@/views/not-found')
    }
];

const router = new VueRouter({
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            // 当从浏览器的前进和后退按钮触发时才会有savedPosition参数
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;
