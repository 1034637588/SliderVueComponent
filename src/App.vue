<template>
  <div class="home">
    <div class="input">
    </div>
    <div class="box">
        <double-slider 
        :transitionTime="0.5" 
        @leftMoveEnd="leftMoveEnd" 
        @onChange="onChange" 
        :interval="1/150" 
        :leftx="leftx" 
        :rightx="rightx">
        <template v-slot:lumpLeft>
        <img class="image" src="@/assets/Controller_handle@3x.png" />
        </template>
        <template v-slot:lumpRight>
          <img class="image" src="@/assets/Controller_handle@3x.png" />
        </template>
        </double-slider>
    </div>
    <div class="box">
        <single-slider @onChange="onChangeSingle"/>
    </div>
  </div>
</template>

<script>
import DoubleSlider from './components/DoubleSlider.vue'
import SingleSlider from './components/SingleSlider.vue'
export default {
  name: 'App',
  components: {
    SingleSlider,
    DoubleSlider
  },
 data(){
    return{
      value:[0,1],
      value2:0,
      leftx:0,
      rightx:1,
      inputValue:0
    }
  },
  watch:{
    
  },
  methods:{
    leftMoveEnd(e){
      this.leftx = e
      console.log(e)
    },
    onChange (e) {
      this.value = e
    },
    onChangeSingle (e) {
      this.value2 = e
    },
    handleBlur (va) {
      this.leftx = va / 150
    }

  }
}
</script>

<style lang="less">
.home{
  width: 500px;
  height: 500px;
  background-color: #cccccc;
  overflow: hidden;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.box{
  height: 50px;
  margin-top: 40px;
}
.image{
  width: 30px;
  height: 30px;
}
</style>

