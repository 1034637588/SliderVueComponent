import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import DoubleSlider from './components/index'
Vue.use(DoubleSlider)
new Vue({
  render: h => h(App),
}).$mount('#app')
