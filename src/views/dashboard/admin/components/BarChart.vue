<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
import 'echarts/theme/macarons';
import resize from './mixins/resize';

const animationDuration = 6000;

export default {
    mixins: [resize],
    props: {
        /**
         * 类名
         */
        className: {
            type: String,
            default: 'chart'
        },
        /**
         * 宽度
         */
        width: {
            type: String,
            default: '100%'
        },
        /**
         * 高度
         */
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            chart: null
        };
    },
    /**
     * 组件渲染后执行
     */
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    /**
     * 组件销毁时执行
     */
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        /**
         * 初始化图标
         */
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');

            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效, 默认为直线，可选为：'line' | 'shadow'
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: 'pageA',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [79, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    },
                    {
                        name: 'pageB',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [80, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    },
                    {
                        name: 'pageC',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [30, 52, 200, 334, 390, 330, 220],
                        animationDuration
                    }
                ]
            });
        }
    }
};
</script>
