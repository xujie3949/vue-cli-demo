import Service from '@/api/Service';

/**
 * 资源模块接口
 */
class ResourceService extends Service {
    /**
     * 重写构造函数
     */
    constructor() {
        super();

        // 覆盖baseUrl
        this.axios.baseURL = process.env.VUE_APP_SERVER_URL;
    }

    /**
     * 获取用户可访问的资源
     * @param name
     * @return {*}
     */
    async getResources(name) {
        await this.axios.get('/menu/menuItems', {
            params: {
                name
            }
        });
    }
}

const resourceService = new ResourceService();
export default resourceService;
