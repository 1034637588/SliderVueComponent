<template>
  <div class="home">
    <div class="input">
      <input v-model="inputValue" @blur="handleBlur(inputValue)" type="number"/>
      <h1>{{(150*value[1]).toFixed(0)}}</h1>
    </div>
    <div class="box">
        <double-slider @leftMoveEnd="leftMoveEnd" @onChange="onChange" :interval="1/150" :leftx="leftx" :rightx="rightx"/>
    </div>
    <div class="input">
      <h1>{{(150*value2).toFixed(0)}}</h1>
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

<style lang="less" scoped>
 .home{
   background-color: darkgray;
   width: 100%;
   height: 100%;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: center;
 }
 .box,.input{
   width: 60vw;
 }
 .input{
   display: flex;
   justify-content: space-between;
 }
</style>

