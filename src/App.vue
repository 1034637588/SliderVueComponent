<template>
  <div class="home">
    <div class="input">
      <h1>{{(150*value[0]).toFixed(0)}}</h1>
      <h1>{{(150*value[1]).toFixed(0)}}</h1>
    </div>
    <div class="box">
        <double-slider @onChange="onChange"/>
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
      value:[0,1]
    }
  },
  methods:{
    onChange (e) {
      console.log(e)
      this.value = e
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

