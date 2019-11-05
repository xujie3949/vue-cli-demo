// 标签栏模块状态
const state = {
    tags: []
};

// 标签栏模块mutations
const mutations = {
    /**
     * 添加标签
     */
    ADD_TAG(state, tag) {
        if (state.tags.some(v => v.path === tag.path)) {
            return;
        }
        state.tags.push(tag);
    },
    /**
     * 删除标签
     */
    DEL_TAG(state, tag) {
        const index = state.tags.indexOf(tag.name);
        if (index > -1) {
            state.tags.splice(index, 1);
        }
    },
    /**
     * 添加其他标签
     */
    DEL_OTHERS_TAGS(state, tag) {
        state.tags = state.tags.filter(v => {
            return v.meta.affix || v.path === tag.path;
        });
    },
    /**
     * 删除所有标签
     */
    DEL_ALL_TAGS(state) {
        state.tags = [];
    },
    /**
     * 更新标签
     */
    UPDATE_TAG(state, tag) {
        for (let v of state.tags) {
            if (v.path === tag.path) {
                v = Object.assign(v, tag);
                break;
            }
        }
    }
};

// 标签栏模块actions
const actions = {
    /**
     * 添加标签
     */
    addTag({ commit }, tag) {
        commit('ADD_TAG', tag);
    },
    /**
     * 删除标签
     */
    delView({ commit }, tag) {
        commit('DEL_TAG', tag);
    },
    /**
     * 删除其他标签
     */
    delOthersTags({ commit }, tag) {
        commit('DEL_OTHERS_TAGS', tag);
    },
    /**
     * 删除所有标签
     */
    delAllTags({ commit }, tag) {
        commit('DEL_ALL_TAGS', tag);
    },
    /**
     * 更新标签
     */
    updateTag({ commit }, tag) {
        commit('UPDATE_TAG', tag);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
