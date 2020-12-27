import DoubleSlider from './DoubleSlider'
import SingleSlider from './SingleSlider'
const install = function (Vue) {
    // 将组件进行挂载
    Vue.component('DoubleSlider',DoubleSlider)
    Vue.component('SingleSlider',singleSlider)
}
if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(DoubleSlider);
    window.Vue.use(SingleSlider);
}
export default {
    install
}