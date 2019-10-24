'use strict';
const path = require('path');
// const defaultSettings = require('./src/settings.js');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    lintOnSave: 'error',
    productionSourceMap: true,
    css: {
        sourceMap: true
    },
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
        // proxy: {
        //     // change xxx-api/login => mock/login
        //     // detail: https://cli.vuejs.org/config/#devserver-proxy
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: `http://127.0.0.1:${port}/mock`,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             ['^' + process.env.VUE_APP_BASE_API]: ''
        //         }
        //     }
        // },
        // after: require('./mock/mock-server.js')
    },
    chainWebpack(config) {
        config.module
            .rule('eslint')
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap(opt => {
                opt.emitWarning = true;
                opt.emitError = true;
                opt.failOnWarning = true;
                opt.failOnError = true;
                return opt;
            });

        // 设置svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        // 生产环境打包优化
        config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    // 第三方初始依赖单独打包
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    // elementUI单独打包
                    element: {
                        name: 'chunk-element',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                    },
                    // 自定义组件单独打包
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 2,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk('single');
        });
    }
};
