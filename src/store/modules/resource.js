import resourceService from '@/api/resourceService';

// 资源模块状态
const state = {
    // 可访问的路由
    routes: {},
    // 可访问的功能,通常是指button
    features: {}
};

// 资源模块mutations
const mutations = {
    /**
     * 设置可访问的路由
     */
    SET_ROUTES(state, routes) {
        state.routes = routes;
    },
    /**
     * 设置可访问的功能
     */
    SET_FEATURES(state, features) {
        state.features = features;
    },
    /**
     * 重置可访问的资源
     */
    RESET_RESOURCE(state) {
        state.routes = [];
        state.features = [];
    }
};

// 标签栏模块actions
const actions = {
    /**
     * 设置可访问资源
     */
    async getResource({ commit }, name) {
        const resources = await resourceService.getResources(name);
        const routes = {};
        const features = {};
        resources.forEach(item => {
            if (item.type === 'route') {
                routes.push(item);
            }
            if (item.type === 'feature') {
                features.push(item);
            }
        });
        commit('SET_ROUTES');
        commit('SET_FEATURES');
    },
    /**
     * 重置可访问的资源
     */
    resetResource({ commit }) {
        commit('RESET_RESOURCE');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
