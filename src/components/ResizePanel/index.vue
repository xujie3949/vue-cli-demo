<template>
    <div ref="panel" :class="svgClass" v-on="$listeners">
        <slot></slot>
    </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import _ from 'lodash';

export default {
    name: 'ResizePanel',
    data() {
        return {
            observer: null
        };
    },
    /**
     * 组件渲染后监听panel尺寸变化
     */
    mounted() {
        // 创建ResizeObserver实例
        this.observer = new ResizeObserver(
            _.throttle(entries => {
                this.$emit('resize', entries);
            })
        );
        this.observer.observe(this.$refs.panel);
    },
    /**
     * 组件销毁前取消监听panel尺寸变化
     */
    beforeDestroy() {
        if (!this.observer) {
            return;
        }

        this.observer.unobserve(this.$refs.panel);
    }
};
</script>

<style lang="scss" scoped></style>
