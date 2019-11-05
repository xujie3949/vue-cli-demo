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
            default: '350px'
        },
        /**
         * 自动调整大小
         */
        autoResize: {
            type: Boolean,
            default: true
        },
        /**
         * 图标数据
         */
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        /**
         * 监控chartData, 深度监控
         */
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val);
            }
        }
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
         * 初始化图标
         */
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');
            this.setOptions(this.chartData);
        },
        /**
         * 设置图表参数
         * @param expectedData
         * @param actualData
         */
        setOptions({ expectedData, actualData } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 30,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                yAxis: {
                    axisTick: {
                        show: false
                    }
                },
                legend: {
                    data: ['expected', 'actual']
                },
                series: [
                    {
                        name: 'expected',
                        itemStyle: {
                            normal: {
                                color: '#FF005A',
                                lineStyle: {
                                    color: '#FF005A',
                                    width: 2
                                }
                            }
                        },
                        smooth: true,
                        type: 'line',
                        data: expectedData,
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut'
                    },
                    {
                        name: 'actual',
                        smooth: true,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#3888fa',
                                lineStyle: {
                                    color: '#3888fa',
                                    width: 2
                                },
                                areaStyle: {
                                    color: '#f3f8ff'
                                }
                            }
                        },
                        data: actualData,
                        animationDuration: 2800,
                        animationEasing: 'quadraticOut'
                    }
                ]
            });
        }
    }
};
</script>
