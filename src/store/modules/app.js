// app模块状态
const state = {
    // 侧边栏状态
    sidebar: {
        // 是否收起
        isCollapse: false,
        // 是否开启动画
        isAnimation: false
    },
    // 浏览器尺寸
    size: {
        // 宽度
        width: 0,
        // 高度
        height: 0
    }
};

// app模块mutations
const mutations = {
    /**
     * 切换侧边栏展开状态
     */
    TOGGLE_SIDEBAR(state) {
        state.sidebar.isCollapse = !state.sidebar.isCollapse;
    },
    /**
     * 设置窗口尺寸
     */
    SET_SIZE(state, size) {
        state.size = size;
    }
};

// app模块actions
const actions = {
    /**
     * 切换侧边栏状态
     */
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    /**
     * 设置窗口尺寸
     */
    setSize({ commit }, size) {
        commit('SET_SIZE', size);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
