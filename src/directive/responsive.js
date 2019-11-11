import ResizeObserver from 'resize-observer-polyfill';
import _ from 'lodash';

export const ResizeDirective = {
    observer: null,
    /**
     * 只调用一次，指令第一次绑定到元素时调用
     * @param el
     * @param binding
     * @param vnode
     */
    bind(el, binding, vnode) {
        const callback = binding.arg;
        if (!callback || typeof callback !== 'function') {
            return;
        }

        // 创建ResizeObserver实例
        this.observer = new ResizeObserver(
            _.throttle(entries => {
                callback(entries);
            })
        );
        this.observer.observe(el);
    },
    /**
     * 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
     * @param el
     * @param binding
     * @param vnode
     */
    // inserted(el, binding, vnode) {
    //     this.observer.observe(el);
    // },
    /**
     * 只调用一次，指令与元素解绑时调用
     * @param el
     * @param binding
     * @param vnode
     */
    unbind(el, binding, vnode) {
        this.unobserver.observe(el);
        this.observer = null;
    }
};
