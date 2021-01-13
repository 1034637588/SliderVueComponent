<template>
<div class="warpper" :style="{height:`${lumpHeight}px`}"  @touchstart="handleTouch">
  <div class="slider-box" :style="{backgroundColor: rightColor,height:`${height}px`}" ref="sliderBox">
    <div
      class="progress-left"
      :style="{ width: `${!lumpLeftX ? lumpLeftX : totalWidth*plScale + 2}px`,backgroundColor:leftColor, height:`${height}px`, transition:isClick ? transition : ''}"
    ></div>
    <div
      class="lump-left"
      :style="{ transform: `translate(${lumpLeftX}px,-50%)`, width:`${widthLump}px`, height:`${heightLump}px`,backgroundColor:lumpColor,transition:isClick ? transition : ''}"
      @touchstart.stop="handleLeftStart"
      @touchmove="handleLeftMove"
      @touchend="handleLeftend"
      ref="lumpLeft"
    >
      <slot name="lumpLeft"></slot>
    </div>
  </div>
</div>

</template>
<script>
export default {
  props:{
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
      lumpColor:{
        type: String,
        default: "#000"
      },
      transitionTime: {
        type: Number,
        default: 0.2
      }
  },
  data() {
    return {
      plScale: this.leftx, //进度条距离
      prScale: 1 - this.rightx,
      lumpLeftX: 0,
      lumpWidth: 0,
      lumpHeight:0,
      totalWidth: 0,
      lumpLeftMax: 0, // 最大右边界 单位px
      boxClientX: 0,
      transition:`all ${this.transitionTime}s`,
      isClick:false
      };
  },
  watch: {
    lumpLeftX(newVale) {
      this.$emit("onChange", newVale / this.totalWidth)
    },
    leftx(newVale){ // 监听参数左边滑块位置 用来参数控制滑块位置
        this.isClick = true
        this.lumpLeftX = this.lumpLeft.endX = Math.min(newVale * this.totalWidth,Math.min(this.leftMax * this.totalWidth,this.totalWidth + this.lumpRightX))
        this.plScale = this.lumpLeftX / this.totalWidth
    }
  },
  created() {
    this.lumpLeft = {
      startX: 0,
      endX: 0,
    }
  },
  mounted() {
    this.lumpWidth = this.$refs.lumpLeft.clientWidth
    this.lumpHeight = this.$refs.lumpLeft.clientHeight
    this.totalWidth = this.$refs.sliderBox.clientWidth - this.lumpWidth
    this.lumpLeftMax = this.totalWidth * this.leftMax //初始最大边界为 box总长减去 滑块的宽度
    //初始化起始滑块位置
    this.lumpLeftX = this.lumpLeft.endX = this.leftx * this.totalWidth
    this.boxClientX = this.$refs.sliderBox.getBoundingClientRect().left
  },
  methods: {
    handleTouch(e){ // 处理点击移动
        this.isClick = true
        let X = e.changedTouches[0].clientX - this.boxClientX - this.lumpWidth//当前点击的位置
        this.lumpLeftX = this.lumpLeft.endX =Math.min( this.leftMax * this.totalWidth, Math.max(0,X + this.lumpWidth * 0.5) )
        this.plScale = this.lumpLeftX / this.totalWidth
    },
    // 左滑块滑动的范围从左边界算起 右滑块从右边界算起
    handleLeftStart(e) {
      this.lumpLeft.startX = e.changedTouches[0].clientX
      this.isClick = false
    },
    handleLeftMove(e) {
      let { clientX } = e.changedTouches[0]
      let { startX, endX } = this.lumpLeft
      if (
        this.lumpLeftX - this.lumpRightX >= this.totalWidth &&
        clientX - startX > 0
      ) {
        this.lumpLeftX = this.totalWidth + this.lumpRightX
        return
      } //如果碰到右边滑块 就停下
      this.lumpLeftX = Math.min(
        Math.max(clientX - startX + endX, 0),
        this.lumpLeftMax
      ) // 实时改变滑块位置
      this.plScale = this.lumpLeftX / this.totalWidth
    },
    handleLeftend(e) {
      this.lumpLeft.endX = this.lumpLeftX
      this.$emit('leftMoveEnd',this.lumpLeftX / this.totalWidth)
    }
  },
}
</script>

<style scoped lang="less">
.warpper{
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}
.slider-box {
  width: 100%;
  height: 4px;
  background-color: rgba(6,47,109);
  position: relative;
  border-radius: 1000px;
  .progress-left {
    position: absolute;
    left: -1px;
    top: 0;
    width: 100%;
    background-color: rgb(245, 245, 245);
    transform-origin: left;
    height: 100%;
    border-radius: 1000px;
  }
  .lump-left {
    transform: translateY(-50%);
    position: absolute;
    left: 0;
    top: 50%;
    width: 30px;
    height: 30px;
    background-color: black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>