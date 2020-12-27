 <template>
  <div id="app">
   <double-slider>
     <template v-slot:lumpLeft>
       <div class="slot"></div>
     </template>
     <template v-slot:lumpRight>
       <div class="slot"></div>
     </template>
   </double-slider>
   <single-slider></single-slider>
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
  methods:{
    handle (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app{ 
}
.slot{
  width: 10px;
  height: 10px;
  background-color: salmon;
}
</style>
