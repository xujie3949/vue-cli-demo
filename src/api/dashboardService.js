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
     * 获取交易列表
     * @param query
     */
    getTransactionList(query) {
        return this.axios.get('/dashboard/transactionList', {
            params: {
                query
            }
        });
    }
}

const menuService = new MenuService();
export default menuService;
