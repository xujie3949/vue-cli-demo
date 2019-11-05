// 错误日志模块状态
const state = {
    // 错误日志
    logs: []
};

// 错误日志模块mutations
const mutations = {
    /**
     * 添加错误日志
     */
    ADD_ERROR_LOG(state, log) {
        state.logs.push(log);
    },
    /**
     * 清空错误日志
     */
    CLEAR_ERROR_LOG(state) {
        state.logs.splice(0);
    }
};

// 错误日志模块actions
const actions = {
    /**
     * 添加错误日志
     */
    addErrorLog({ commit }, log) {
        commit('ADD_ERROR_LOG', log);
    },
    /**
     * 清空错误日志
     * @param commit
     */
    clearErrorLog({ commit }) {
        commit('CLEAR_ERROR_LOG');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
