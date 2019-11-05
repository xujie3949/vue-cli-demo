import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

// 配置NProgress
NProgress.configure({ showSpinner: false });

// 不需要身份认证的路由
const whiteList = ['/login', '/auth-redirect'];

// 使用全局路由守卫进行身份认证
router.beforeEach(async (to, from, next) => {
    // 开始进度条
    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
        // 白名单中的地址无需进行身份认证
        next();
    } else {
        notInWhileList(next);
    }
});

router.afterEach(() => {
    // 路由跳转完成后关闭进度条
    NProgress.done();
});

/**
 * 处理不在白名单中的路由
 * @param to
 * @param from
 * @param next
 */
function notInWhileList(to, from, next) {
    // 获取token
    const token = store.user.token;
    if (token) {
        hasToken(next);
    } else {
        // 无token时跳转到登录页,并把将要跳转的url传过去
        next(`/login?redirect=${to.path}`);
    }
}

/**
 * 处理token存在的情况
 * @param to
 * @param from
 * @param next
 */
function hasToken(to, from, next) {
    if (to.path === '/login') {
        // 如果已经登陆过,访问登录页时直接跳转到主页
        next({ path: '/' });
    } else {
        // 验证是否有路由权限
        const routes = store.user.routes;
        if (routes.some(route => route === to.fullPath)) {
            // 如果有路由权限,跳转到对应页面
            next();
        } else {
            // 如果没有路由权限,跳转到404页面
            next('/not-found');
        }
    }
}
