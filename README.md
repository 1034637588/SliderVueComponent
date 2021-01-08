### 1.介绍与演示
滑块组件，支持滑动，点击
演示地址 https://blog.csdn.net/qq_44812835/article/details/111817625
### 2.安装 
npm install z-slider-vue -S
###  3.引入
```javascript
import Slider from 'z-slider-vue'
import '../node_modules/z-slider-vue/dist/z-slider-vue.css'
Vue.use(Slider)
```
### 4.使用
```javascript
      <double-slider 
      :leftx="0" //左边滑块起始位置
      :rightx="1" //右边滑块起始位置
      :leftMax="0.5" //左边滑块的右边界
      :rightMin="0" //右边滑块的左边界
      @onChange="handlerChange" //监听更新的数据
      />
      <single-slider/>

      <double-slider>
      <!-- 自定义左滑块 -->
      <template v-slot:lumpLeft>
      </template>
      <!-- 自定义右滑块 -->
      <template v-slot:lumpRight>
      </template>
     </double-slider>
```
### 5.双滑快配置参数
参数中与位置相关的均为百分比 值为0-1 0为最左边 1为最右边
```javascript
     leftx:{ // 左滑块所在百分比
        type: Number,
        default: 0
      },
      rightx:{ // 右滑块所在百分比
        type: Number,
        default: 1
      },
      leftMax:{ // 左滑块的右边界
        type: Number,
        default: 1
      },
      rightMin:{ // 右滑块的左边界
        type: Number,
        default: 0
      },
      leftColor:{ // 左边颜色
        type: String,
        default: "rgb(245, 245, 245)"
      },
      rightColor:{  // 右边颜色
        type: String,
        default: "rgb(245, 245, 245)"
      },
      centerColor:{ // 中间颜色
        type: String,
        default: "rgb(6,47,109)"
      },
      height:{ // 进度条高度
        type: Number,
        default: 4
      },
      widthLump:{ // 滑块宽度
        type: Number,
        default: 30
      },
      heightLump:{ //滑块高度
        type: Number,
        default: 30
      }，
      lumpColor:{
        type: String,
        default: "#000"
      },
      interval:{ // 最小间隔距离
        type: Number,
        default: 0
      },
      transitionTime: {
        type: Number,
        default: 0.2
      }
```
### 6.单滑块配置参数

```javascript
	  leftx:{ // 左滑块所在百分比
        type: Number,
        default: 0
      },
      leftMax:{ // 左滑块的右边界
        type: Number,
        default: 1
      },
      leftColor:{ // 左边颜色
        type: String,
        default:  "rgb(6,47,109)"
      },
      rightColor:{ // 中间颜色
        type: String,
        default: "rgb(245, 245, 245)"
      },
      lumpColor:{
        type: String,
        default: "#000"
      },
      height:{ // 高度
        type: Number,
        default: 4
      },
      widthLump:{ // 滑块宽度
        type: Number,
        default: 30
      },
      heightLump:{ //滑块高度
        type: Number,
        default: 30
      },
      transitionTime: {
        type: Number,
        default: 0.2
      }
```
### 7.事件
监听均使用onChange事件：

双滑块返回 Array[Number,Number] ,
Array[0] 左边位置 （0-1）即为当前滑动百分比
Array[1] 右边位置 （0-1）即为当前滑动百分比

单滑块只返回一个Number 也是当前百分比

左滑块滑动结束事件 leftMoveEnd,参数为当前滑动百分比
右滑块滑动结束事件 rightMoveEnd,参数为当前滑动百分比



### 组件二次封装代码实现：

```javascript
<template>
  <div class="calculate-slider">
      <div class="slider-title">
        <p class="title">{{ title1 }}</p>
        <p class="title">{{ title2 }}</p>
      </div>
      <div class="input-box">
        <input 
          class="slider-input" 
          v-model="inputValueLeft" 
          type="text"
          @blur="handleBlurLeft(inputValueLeft)" />
        <input 
          class="slider-input"
          v-model="inputValueRight"
          type="text"
          @blur="handleBlurRight(inputValueRight)"  />
      </div>
    <double-slider 
      lumpColor="#fff"
      :leftMax="leftMax"
      :rightMin="rightMin"
      :interval="interval"
      :leftx="leftx"
      :rightx="rightx"
      @onChange="sliderChange"
      @leftMoveEnd="leftMoveEnd"
      @rightMoveEnd="rightMoveEnd"
      >
        <template v-slot:lumpLeft>
          <img class="image" src="@/assets/Controller_handle@2x.png" />
        </template>
        <template v-slot:lumpRight>
          <img class="image" src="@/assets/Controller_handle@2x.png" />
        </template>
    </double-slider>
  </div>
</template>
<script>
export default {
    data () {
      return {
        leftMax: this.dotOptions[0].max / this.sliderMaxValue,
        rightMin: this.dotOptions[1].min / this.sliderMaxValue,
        interval: this.minRange / this.sliderMaxValue,
        leftx:this.value[0] / this.sliderMaxValue,
        rightx:this.value[1] / this.sliderMaxValue,
        inputValueLeft: this.value[0], // 输入框双向数据绑定
        inputValueRight: this.value[1],
      }
    },
    props: {
        value: { // 数据绑定返回值
        type: Array,
        default: () => [0, 100]
        },
        title1: {
        type: String,
        default: 'title1'
        },
        title2: {
        type: String,
        default: 'title2'
        },
        sliderMaxValue: {
        type: Number,
        default: 100
        },
        sliderMinValue: {
        type: Number,
        default: 0
        },
        minRange: { // 最小步长
        type: Number,
        default: 1
        },
        dotOptions: { // 用来限制左边滑块最大值 和 右边滑块最小值
        type: [Array, String],
        default: () => [{
            min: 0,
            max: 100
        }, {
            min: 0,
            max: 100
        }]
        }
    },
    watch:{
    },
    methods: {
        sliderChange (value) { // 处理滑块移动
           if(value[0] < 0) value[0] = 0
           this.inputValueLeft = (value[0] * this.sliderMaxValue).toFixed(0)
           this.inputValueRight = (value[1] * this.sliderMaxValue).toFixed(0)
           this.$emit('onChange', [this.inputValueLeft,this.inputValueRight])
        },
        handleBlurLeft (value) { //  处理input输入
            value = parseInt(value) ? parseInt(value) : 0
            this.inputValueLeft = Math.min(Math.max(value,this.sliderMinValue),this.inputValueRight - this.minRange)
            this.leftx = this.inputValueLeft / this.sliderMaxValue
            this.$emit('onChange', [this.inputValueLeft,this.inputValueRight])
        },
        handleBlurRight (value) {
            value = parseInt(value) ? parseInt(value) : parseInt(this.inputValueLeft) + this.minRange
            this.inputValueRight = Math.max(Math.min(value,this.sliderMaxValue),parseInt(this.inputValueLeft) + this.minRange)
            this.rightx = this.inputValueRight / this.sliderMaxValue
            this.$emit('onChange', [this.inputValueLeft,this.inputValueRight])
        },
        leftMoveEnd (value) {
            this.leftx = value
        },
        rightMoveEnd (value) {
            this.rightx = value
        }
    }
};
</script>
```
### 组件使用：

```javascript
<template>
  <div class="home">
      <div class="left">
        <double-calculate-slider 
        :value="value" 
        @onChange="onChange"
        :title1="title1"
        :title2="title2"
        :sliderMaxValue="sliderMaxValue"
        :sliderMinValue="sliderMinValue"
        :minRange="minRange"
        :dotOptions="dotOptions">
        </double-calculate-slider>
      </div>
  </div>
</template>

<script>
import DoubleCalculateSlider from '../../components/doubleCalculateSlider.vue'
export default {
  name: 'Page1Home',
  components:{
    DoubleCalculateSlider
  },
  data(){
    return{
     value:[0,18],
     title1:"子女年龄",
     title2:"预计进入大学年龄",
     sliderMaxValue:25,
     sliderMinValue:0,
     minRange:1,
     dotOptions: [{ 
        min: 0,
        max: 17
      }, {
        min: 0,
        max: 25
      }]
    }
  },
  methods:{
    onChange(e){
      console.log(e)
    }
  }
}
</script>
```
