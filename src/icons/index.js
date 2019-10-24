import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

// 自动导入icons文件夹下面所有svg图标
const request = require.context('./svg', false, /\.svg$/);
request.keys().forEach(request);
