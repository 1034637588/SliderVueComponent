import DoubleSlider from './DoubleSlider'
const install = function (Vue) {
    // 将组件进行挂载
    Vue.component('DoubleSlider',DoubleSlider)
} 
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}
export default {
    install
}