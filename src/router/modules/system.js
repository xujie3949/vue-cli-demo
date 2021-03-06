const system = {
    path: 'system',
    children: [
        {
            // 用户管理
            path: 'user',
            name: 'user',
            component: () => import(/* webpackChunkName: 'system-user' */ '@/views/User')
        },
        {
            // 角色管理
            path: 'role',
            name: 'role',
            component: () => import(/* webpackChunkName: 'system-role' */ '@/views/Role')
        }
    ]
};

export default system;
