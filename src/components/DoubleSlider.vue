<template>
<div class="warpper" :style="{height:`${lumpHeight}px`}">
  <div class="slider-box" :style="{backgroundColor: centerColor,height:`${height}px`}" ref="sliderBox" @touchstart="handleTouch">
    <div
      class="progress-left"
      :style="{ width: `${!lumpLeftX ? lumpLeftX : totalWidth*plScale + 2}px`,backgroundColor:leftColor, height:`${height}px`,transition:isClick ? transition : ''}"
    ></div>
    <div
      class="progress-right"
      :style="{ width: `${!lumpRightX ? lumpRightX : totalWidth*prScale + 2}px`, backgroundColor:rightColor, height:`${height}px`,transition:isClick ? transition : ''}"
    ></div>
    <div
      class="lump-left"
      :style="{ transform: `translate(${lumpLeftX}px,-50%)`, width:`${widthLump}px`, height:`${heightLump}px`,transition:isClick ? transition : ''}"
      @touchstart.stop="handleLeftStart"
      @touchmove="handleLeftMove"
      @touchend="handleLeftend"
      ref="lumpLeft"
    >
      <slot name="lumpLeft"></slot>
    </div>
    <div
      class="lump-right"
      :style="{ transform: `translate(${lumpRightX}px,-50%)`, width:`${widthLump}px`, height:`${heightLump}px`,transition:isClick ? transition : ''}"
      @touchstart.stop="handleRightStart"
      @touchmove="handleRightMove"
      @touchend="handleRightend"
      ref="lumpRight"
    >
      <slot name="lumpRight"></slot>
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
      interval:{ // 最小间隔距离
        type: Number,
        default: 0
      }
  },
  data() {
    return {
      plScale: this.leftx, //进度条距离
      prScale: 1 - this.rightx,
      lumpLeftX: 0,
      lumpRightX: 0,
      lumpWidth: 0,
      lumpHeight:0,
      totalWidth: 0,
      lumpLeftMax: 0, // 最大右边界 单位px
      lumpRightMax: 0, // 最大左边界
      boxClientX: 0,
      transition:'all 0.2s',
      isClick:false
    };
  },
  watch: {
    lumpLeftX(newVale) {
      this.$emit("onChange", [newVale / this.totalWidth, 1 + this.lumpRightX / this.totalWidth])
    },
    lumpRightX(newVale) {
      this.$emit("onChange", [this.lumpLeftX / this.totalWidth, 1 + newVale / this.totalWidth])
    },
    leftx(newVale){ // 监听参数左边滑块位置 用来参数控制滑块位置
        this.lumpLeftX = this.lumpLeft.endX = Math.min(newVale * this.totalWidth,Math.min(this.leftMax * this.totalWidth,this.totalWidth + this.lumpRightX - this.interval * this.totalWidth))
        this.plScale = this.lumpLeftX / this.totalWidth
    },
    rightx(newValue){ // 监听参数右边边滑块位置 
        this.lumpRightX = this.lumpRight.endX =Math.max(newValue * this.totalWidth - this.totalWidth,Math.max( -(1 - this.rightMin) * this.totalWidth,this.lumpLeftX - this.totalWidth,this.lumpLeftX + this.interval * this.totalWidth - this.totalWidth))
        this.prScale =-(this.lumpRightX / this.totalWidth)
        console.log(this.lumpRightX / this.totalWidth)
    }
  },
  created() {
    this.lumpLeft = {
      startX: 0,
      endX: 0,
    };
    this.lumpRight = {
      startX: 0,
      endX: 0,
    };
  },
  mounted() {
    this.lumpWidth = this.$refs.lumpLeft.clientWidth
    this.lumpHeight = this.$refs.lumpLeft.clientHeight
    this.totalWidth = this.$refs.sliderBox.clientWidth - this.lumpWidth * 2
    this.lumpLeftMax = this.totalWidth * this.leftMax //初始最大边界为 box总长减去 滑块的宽度
    this.lumpRightMax = this.totalWidth * (1 - this.rightMin)
    //初始化起始滑块位置
    this.lumpLeftX = this.lumpLeft.endX = this.leftx * this.totalWidth
    this.lumpRightX = this.lumpRight.endX =  this.rightx * this.totalWidth - this.totalWidth
    this.boxClientX = this.$refs.sliderBox.getBoundingClientRect().left
  },
  methods: {
    handleTouch(e){ // 处理点击移动
        this.isClick = true
        let X = e.changedTouches[0].clientX - this.boxClientX - this.lumpWidth//当前点击的位置
        if (X < this.lumpLeftX) { // 点击的左滑块的左边
             this.lumpLeftX = this.lumpLeft.endX = Math.max(0,X + this.lumpWidth * 0.5)
        } else if (X > this.totalWidth + this.lumpRightX) { // 点击的右滑块的右边
             this.lumpRightX = this.lumpRight.endX = Math.min(X - this.totalWidth - this.lumpWidth * 0.5,0)
        } else {
            let toLeft = X - this.lumpLeftX
            let toRight = this.totalWidth - X + this.lumpRightX
            if ( toLeft < toRight) { // 左边移动
                if(X + this.interval * this.totalWidth >= this.lumpRightX + this.totalWidth - this.lumpWidth) { // 控制左边移动时不能超过间距
                  this.lumpLeftX = this.lumpLeft.endX = this.lumpRightX - this.interval * this.totalWidth + this.totalWidth
                  this.plScale = this.lumpLeftX / this.totalWidth
                  return
                }
                this.lumpLeftX =Math.min(this.leftMax * this.totalWidth, this.lumpLeftX + toLeft + this.lumpWidth * 0.5)
                this.lumpLeft.endX = this.lumpLeftX
            } else { // 右边移动
                if(X - this.interval * this.totalWidth <= this.lumpLeftX + this.lumpWidth) { // 控制右边移动时不能超过间距
                  this.lumpRightX = this.lumpRight.endX = -(this.totalWidth - this.lumpLeftX - this.interval * this.totalWidth)
                  this.prScale = -this.lumpRightX / this.totalWidth
                  return
                }
                this.lumpRightX =Math.max( -(1 - this.rightMin) * this.totalWidth,this.lumpRightX - (toRight + this.lumpWidth * 0.5))
                this.lumpRight.endX = this.lumpRightX 
            }
        }
        this.plScale = this.lumpLeftX / this.totalWidth
        this.prScale = -this.lumpRightX / this.totalWidth
    },
    // 左滑块滑动的范围从左边界算起 右滑块从右边界算起
    handleLeftStart(e) {
      this.isClick = false
      this.lumpLeft.startX = e.changedTouches[0].clientX;
    },
    handleLeftMove(e) {
      let { clientX } = e.changedTouches[0];
      let { startX, endX } = this.lumpLeft;
      if (
        this.lumpLeftX - this.lumpRightX >= this.totalWidth - this.interval * this.totalWidth &&
        clientX - startX > 0
      ) {
        this.lumpLeftX = this.totalWidth + this.lumpRightX  - this.interval * this.totalWidth;
        return;
      } //如果碰到右边滑块 就停下
      this.lumpLeftX = Math.min(
        Math.max(clientX - startX + endX, 0),
        this.lumpLeftMax
      ); // 实时改变滑块位置
      this.plScale = this.lumpLeftX / this.totalWidth;
    },
    handleLeftend(e) {
      this.lumpLeft.endX = this.lumpLeftX;
    },
    handleRightStart(e) {
      this.isClick = false
      this.lumpRight.startX = e.changedTouches[0].clientX;
    },
    handleRightMove(e) {
      let { clientX } = e.changedTouches[0];
      let { startX, endX } = this.lumpRight;
      if (
        this.lumpLeftX - this.lumpRightX >= this.totalWidth - this.interval * this.totalWidth &&
        clientX - startX < 0
      ) {
        this.lumpRightX = this.lumpLeftX - this.totalWidth + this.interval * this.totalWidth;
        return;
      } //如果碰到右边滑块 就停下
      this.lumpRightX = Math.min(
        0,
        Math.max(clientX - startX + endX, -this.lumpRightMax) // 如果超过了左边界 就不能动了
      );
      this.prScale = -(this.lumpRightX / this.totalWidth).toFixed(3);
    },
    handleRightend(e) {
      this.lumpRight.endX = this.lumpRightX; // 记录最后停止后滑动的距离
    },
  },
};
</script>
<style scoped lang="less">
.warpper{
  display: flex;
  align-items: center;
  padding: 0 5px;
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
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
  }
  .progress-right {
    position: absolute;
    right: -1px;
    top: 0;
    width: 100%;
    transform-origin: right;
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
    background-color: rgb(245, 245, 245);
    height: 100%;
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
  .lump-right {
    transform: translateY(50px);
    position: absolute;
    right: 0;
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