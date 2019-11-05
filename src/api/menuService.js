import Service from '@/api/Service';

/**
 * 菜单模块接口
 */
class MenuService extends Service {
    /**
     * 重写构造函数
     */
    constructor() {
        super();

        // 覆盖baseUrl
        this.axios.baseURL = process.env.VUE_APP_SERVER_URL;
    }

    /**
     * 获取用户菜单
     * @param userId
     * @return {*}
     */
    getMenuItems(userId) {
        return this.axios.get('/menu/menuItems', {
            params: {
                userId
            }
        });
    }
}

const menuService = new MenuService();
export default menuService;
