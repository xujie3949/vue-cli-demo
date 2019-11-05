import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import logger from '@/utils/logger';

/**
 * 服务基类
 */
export default class Service {
    /**
     * 构造函数
     */
    constructor() {
        this.axios = axios.create({
            // url = base url + request url
            baseURL: '/',
            headers: {
                'Content-Type': 'application/json'
            },
            paramsSerializer: params => qs.stringify(params),
            validateStatus: status => status >= 200 && status < 300
        });
        this.setupInterceptors();
    }

    /**
     * 安装请求和响应拦截器
     */
    setupInterceptors() {
        // 请求拦截器
        this.axios.interceptors.request.use(
            config => {
                if (store.getters.token) {
                    // 给每次请求带上token
                    config.headers['token'] = store.getters.token;
                }
                return config;
            },
            error => {
                logger.error(error);
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.axios.interceptors.response.use(
            response => {
                const data = response.data;

                if (data.code === undefined && data.code === null) {
                    Promise.reject({
                        code: 20001,
                        message: '缺少错误码或错误码无效'
                    });
                }

                if (data.code !== 20000) {
                    // code不等于20000表示有错误
                    Promise.reject({
                        code: data.code,
                        message: data.message
                    });
                }

                return response;
            },
            error => {
                logger.error(error);
                Promise.reject(error);
            }
        );
    }
}
