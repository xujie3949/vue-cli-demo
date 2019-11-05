import Service from '@/api/Service';

/**
 * 用户模块接口
 */
class UserService extends Service {
    /**
     * 重写构造函数
     */
    constructor() {
        super();

        // 覆盖baseUrl
        this.axios.baseURL = process.env.VUE_APP_SERVER_URL;
    }

    /**
     * 用户登录
     * @param data
     */
    login(data) {
        return this.axios.post('/user/login', data);
    }

    /**
     * 获取用户信息
     */
    getInfo() {
        return this.axios.get('/user/info');
    }

    /**
     * 用户登出
     */
    logout() {
        return this.axios.get('/user/logout');
    }
}

const userService = new UserService();
export default userService;
