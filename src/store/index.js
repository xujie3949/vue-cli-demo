import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

// 导入modules文件夹下面所有文件
const modulesFiles = require.context('@/store/modules', true, /\.js$/);

// 将每一个文件作为模块导入
const modules = {};
modulesFiles.keys().forEach(modulePath => {
    // 根据路径生成模块名 './app.js' => 'app'
    const moduleName = modulePath.replace(/^@\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
});

// 创建VuexPersistence实例,用于持久化vuex状态
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

// 创建store实例
const store = new Vuex.Store({
    modules,
    plugins: [vuexLocal.plugin]
});

export default store;
