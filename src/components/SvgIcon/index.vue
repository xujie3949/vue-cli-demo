<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="href"></use>
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        /**
         * 图标名
         */
        icon: {
            type: String,
            required: true
        },
        /**
         * 图标类名
         */
        iconClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        /**
         * svgClass计算值
         * @return {string}
         */
        svgClass() {
            if (this.iconClass) {
                return `svg-icon ${this.iconClass}`;
            }
            return 'svg-icon';
        },
        /**
         * svg元素href计算值
         * @return {string}
         */
        href() {
            return `#${this.icon}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: bottom;
    fill: currentColor;
    overflow: hidden;
}
</style>
