import consola from 'consola';

/**
 * 创建日志记录器
 * 支持的方法及对应level
 * fatal, error: 0
 * warn: 1
 * log: 2
 * info, success: 3,
 * debug: 4
 * trance: 5
 * silent: Infinity
 */
const logger = consola.create({
    // 本地运行打印所有日志, 生产环境运行只打印level=0级别日志
    level: process.env.VUE_APP_LOCAL ? 0 : Infinity
});

export default logger;
