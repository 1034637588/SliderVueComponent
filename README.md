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
      }
```
监听均使用onChange事件：

双滑块返回 Array[Number,Number] ,
Array[0] 左边位置 （0-1）即为当前滑动百分比
Array[1] 右边位置 （0-1）即为当前滑动百分比

单滑块只返回一个Number 也是当前百分比

