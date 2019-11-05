import menuService from '@/api/menuService';

// 菜单模块状态
const state = {
    /**
     * 菜单项数组,元素结构如下
     * {
     *     name: '首页',
     *     icon: 'home',
     *     path: '/',
     *     children: []
     * }
     */
    items: [
        {
            name: '首页',
            icon: 'home',
            path: '/'
        },
        {
            name: '系统',
            icon: 'system',
            path: '/system',
            children: [
                {
                    name: '用户',
                    icon: 'user',
                    path: '/user'
                },
                {
                    name: '角色',
                    icon: 'role',
                    path: '/role'
                }
            ]
        }
    ]
};

// 菜单模块mutations
const mutations = {
    /**
     * 设置菜单项
     */
    SET_ITEMS(state, items) {
        state.items = items;
    }
};

// 菜单模块actions
const actions = {
    /**
     * 获取菜单项
     */
    getMenuItems({ commit }, userId) {
        return menuService.getMenuItems(userId).then(res => {
            commit('SET_ITEMS', res.data);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
