const home = {
    // 主页
    path: 'dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/dashboard')
};

export default home;
