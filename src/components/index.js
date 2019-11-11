import SvgIcon from '@/components/SvgIcon';
import ResizePanel from '@/components/ResizePanel';

/**
 * 组件数组
 */
const components = [SvgIcon, ResizePanel];

/**
 * 实现install方法
 * @param vue Vue构造器
 */
components.install = function(vue) {
    // 遍历对所有组件进行全局注册
    components.forEach(component => {
        vue.component(component.name, component);
    });
};

export default components;
