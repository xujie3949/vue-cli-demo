'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// 完整配置详见https://cli.vuejs.org/config/
module.exports = {
    lintOnSave: 'error',
    productionSourceMap: true,
    css: {
        sourceMap: true
    },
    devServer: {
        port: 9527,
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
        // 必须配置eslint-loader的option,否则lint错误可能不会导致编译失败
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
            .end();

        // 打包优化
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                // 第三方依赖单独打包
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                },
                // elementUI单独打包
                element: {
                    name: 'chunk-element',
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    priority: 20
                }
            }
        });
        config.optimization.runtimeChunk('single');
    }
};
