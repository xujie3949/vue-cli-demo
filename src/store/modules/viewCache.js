// 缓存模块状态
const state = {
    views: []
};

// 缓存模块mutations
const mutations = {
    /**
     * 添加视图
     */
    ADD_VIEW(state, view) {
        if (state.views.some(v => v.path === view.path)) {
            return;
        }
        state.views.push(
            Object.assign({}, view, {
                title: view.name || 'no-name'
            })
        );
    },
    /**
     * 删除缓存视图
     */
    DEL_VIEW(state, view) {
        const index = state.views.indexOf(view.name);
        if (index > -1) {
            state.views.splice(index, 1);
        }
    },
    /**
     * 删除其他视图
     */
    DEL_OTHERS_VIEWS(state, view) {
        const index = state.views.indexOf(view.name);
        if (index > -1) {
            state.views = state.views.slice(index, index + 1);
        } else {
            // 删除所有视图
            state.views = [];
        }
    },
    /**
     * 删除所有视图
     */
    DEL_ALL_VIEWS(state) {
        state.views = [];
    }
};

// 缓存模块actions
const actions = {
    /**
     * 添加视图
     */
    addView({ commit }, view) {
        commit('ADD_VIEW', view);
    },
    /**
     * 删除视图
     */
    delView({ commit }, view) {
        commit('ADD_VIEW', view);
    },
    /**
     * 删除其他视图
     */
    delOthersViews({ commit }, view) {
        commit('DEL_OTHERS_VIEWS', view);
    },
    /**
     * 删除所有视图
     */
    delAllViews({ commit }, view) {
        commit('DEL_ALL_VIEWS', view);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
