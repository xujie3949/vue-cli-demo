<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
import 'echarts/theme/macarons';
import resize from './mixins/resize';

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
     * 组件销毁前执行
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
         * 初始化图表
         */
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');

            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                },
                series: [
                    {
                        name: 'WEEKLY WRITE ARTICLES',
                        type: 'pie',
                        roseType: 'radius',
                        radius: [15, 95],
                        center: ['50%', '38%'],
                        data: [
                            { value: 320, name: 'Industries' },
                            { value: 240, name: 'Technology' },
                            { value: 149, name: 'Forex' },
                            { value: 100, name: 'Gold' },
                            { value: 59, name: 'Forecasts' }
                        ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            });
        }
    }
};
</script>
