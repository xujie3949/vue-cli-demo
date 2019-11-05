import ResizeObserver from 'resize-observer-polyfill';

// 创建ResizeObserver实例
this.observer = new ResizeObserver(this.handelResize);
// 监听wrap尺寸变化,外部容器尺寸发生变化,view尺寸不变
this.observer.observe(this.$refs.wrap);

export const ResponsiveDirective = {
    observer: null,
    /**
     * 只调用一次，指令第一次绑定到元素时调用
     * @param el
     * @param binding
     * @param vnode
     */
    bind(el, binding, vnode) {
        // 创建ResizeObserver实例
        this.observer = new ResizeObserver(this.handelResize);
    },
    /**
     * 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
     * @param el
     * @param conds
     */
    inserted(el, conds) {
        if (typeof process === 'undefined' || !process.server) {
            const handleResize = throttle(entries => {
                const cr = entries[0].contentRect;
                for (const breakpoint in conds.value) {
                    if (conds.value[breakpoint](cr)) {
                        el.classList.add(breakpoint);
                    } else {
                        el.classList.remove(breakpoint);
                    }
                }
            }, 200);

            const observer = new ResizeObserver(handleResize);
            observer.observe(el);
        }
    },
    inserted(el, binding, vnode) {
        doResize(el, binding, vnode);
    },
    unbind(el) {
        removeResizeListener(window.document.body, el.resizeListener);
    }
};
