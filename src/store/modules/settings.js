// 设置模块状态
const state = {
    // 标签导航栏
    tagsBar: true,
    // 固定标题栏
    fixedHeader: false
};

// 设置模块mutations
const mutations = {
    /**
     * 切换标签导航栏显示状态
     */
    TOGGLE_TAG_BAR(state) {
        state.tagsBar = !state.tagsBar;
    },
    /**
     * 切换页头固定状态
     */
    TOGGLE_FIXED_HEADER(state) {
        state.fixedHeader = !state.fixedHeader;
    }
};

// 设置模块actions
const actions = {
    /**
     * 切换标签导航栏显示状态
     */
    toggleTagBar({ commit }) {
        commit('TOGGLE_TAG_BAR');
    },
    /**
     * 切换页头固定状态
     */
    toggleFixedHeader({ commit }) {
        commit('TOGGLE_FIXED_HEADER');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
