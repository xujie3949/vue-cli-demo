import userService from '@/api/userService';

// 用户模块状态
const state = {
    // token
    token: '',
    // 用户名
    name: '',
    // 用户头像
    avatar: '',
    // 用户简介
    introduction: '',
    // 用户拥有的角色
    roles: [],
    // 用户可访问的菜单项
    menuItems: [],
    // 用户可访问的路由
    routes: [],
    // 用户可访问的功能
    features: []
};

// 用户模块mutations
const mutations = {
    /**
     * 设置token
     */
    SET_TOKEN(state, token) {
        state.token = token;
    },
    /**
     * 设置introduction
     */
    SET_INTRODUCTION(state, introduction) {
        state.introduction = introduction;
    },
    /**
     * 设置name
     */
    SET_NAME(state, name) {
        state.name = name;
    },
    /**
     * 设置avatar
     */
    SET_AVATAR(state, avatar) {
        state.avatar = avatar;
    },
    /**
     * 设置roles
     */
    SET_ROLES(state, roles) {
        state.roles = roles;
    },
    /**
     * 设置menuItems
     */
    SET_MENU_ITEMS(state, menuItems) {
        state.menuItems = menuItems;
    },
    /**
     * 设置routes
     */
    SET_ROUTES(state, routes) {
        state.routes = routes;
    },
    /**
     * 设置features
     */
    SET_FEATURES(state, features) {
        state.features = features;
    }
};

// 用户模块actions
const actions = {
    /**
     * 用户登录
     */
    async login({ commit }, userInfo) {
        const { data } = await userService.login(userInfo);
        commit('SET_TOKEN', data.token);
    },
    /**
     * 获取用户信息
     */
    async getInfo({ commit, state }) {
        const { data } = await userService.getInfo(state.token);

        if (!data) {
            throw new Error('获取用户信息失败,请重新登录!');
        }

        const { roles, name, avatar, introduction, menuItems, resources } = data;

        // 用户角色信息为空
        if (!roles || roles.length <= 0) {
            throw new Error('用户角色信息为空, 无法访问系统!');
        }

        // 用户可访问菜单为空
        if (!menuItems || menuItems.length <= 0) {
            throw new Error('用户菜单信息为空, 无法访问系统!');
        }

        // 用户可访问资源为空
        if (!resources || resources.length <= 0) {
            throw new Error('用户可访问资源为空, 无法访问系统!');
        }

        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_INTRODUCTION', introduction);
        commit('SET_ROLES', roles);
        commit('SET_MENU_ITEMS', menuItems);
        commit('SET_ROUTES', resources);
        commit('SET_FEATURES', resources);
        return data;
    },
    /**
     * 用户登出
     */
    async logout({ commit, state, dispatch }) {
        await userService.logout(state.token);

        // 重置用户信息
        dispatch('resetInfo');

        // 重置标签条
        dispatch('tagBar/resetTags');
    },

    /**
     * 重置用户信息
     */
    resetInfo({ commit }) {
        commit('SET_TOKEN', '');
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');
        commit('SET_INTRODUCTION', '');
        commit('SET_ROLES', []);
        commit('SET_MENU_ITEMS', []);
        commit('SET_ROUTES', []);
        commit('SET_FEATURES', []);
    },

    /**
     * 改变用户拥有的角色
     */
    async changeRoles({ commit, state, dispatch }, roles) {
        // 改变用户拥有的角色
        await userService.changeRoles(roles);

        // 重新获取用户信息
        await dispatch('getInfo');

        // 重置标签条
        dispatch('tagBar/resetTags');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
