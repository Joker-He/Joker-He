
<script lang="ts" setup>
import IMG from '@/assets/images/404.png'
import { ref  , onMounted , computed , watch , watchEffect , reactive , toRefs  , onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

var timer:any = null; 
const router = useRouter()
type nameTypes = string | number | boolean;
type numTypes = string | number | undefined

interface spanTypes{
    left:string,
    top:string,
    transform:string,
    animationDelay:string,
    background:string
}

const lgname:nameTypes = 'test-2301'
const count = ref<number>(5)  // ref value 

const newCount = computed(()=> count.value * 10 + 8888)

// 响应式的对象代理数据 
const obj = reactive({
    uname:'zkl',
    uage:19,
    utel:"19012341234"
})

watch(count,(v)=>{
    console.log(v)
})

// 深度监听 
watchEffect(()=>{

})
// ref
// reactive
// toRefs
// computed 
// watch
// watchEffect 

const gotowhere = ()=>{
    router.push("/login")
}

const countDown = ()=>{
    timer = setInterval(()=>{
        if(count.value>0){
            count.value--
        }else{
            clearInterval(timer)
            timer = null;
            gotowhere()
        }
    },1000)
}
const bgstar = ref<HTMLDivElement>() 
const spanList = ref<Array<spanTypes>>([])
const spanList2 = ref<spanTypes[]>([])

const spanListInit = ()=>{
    const width:any  = document.getElementById('bgstar')?.clientWidth;
    const height:any = bgstar.value?.clientHeight
    console.log(width,height)

    for(var i = 0;i< 520; i++){
        var left:numTypes = Math.random() * width;
        var top:numTypes = Math.random() * height;

        var scaler = Math.random()  * 1.5;
        var rate = Math.random() * 2.5 
        var opacity = Math.random() * 1;

        spanList.value.push({
            left:left+'px',
            top:top+'px',
            transform:`scale(${scaler})`,
            animationDelay:rate+'s',
            background:`rgba(255,255,255,${opacity})`
        })
    }
}
const {uname} = toRefs(obj) 

onMounted(()=>{
    // obj.uname = 'zuozuozmu'
    spanListInit()
    countDown()
})

// 组件销毁 
onUnmounted(()=>{
    clearInterval(timer)
    timer = null;
})


</script>


<template>
    <div class="errorpage" id="bgstar" ref="bgstar">
        <div class="down" @click="gotowhere"> {{ count }} S 跳转</div>
        <img :src="IMG"  class="myimg" alt="">  
        <span v-for="(l,i) in spanList" :key="i" :style="l" class="spandot"></span>
    </div>
</template>


<style lang="scss" scoped>
.errorpage{
  width:100%;
  height:100%;
  background: #000;
  position: relative;
  padding:0 !important;
  overflow: hidden;
  .down{
    position:absolute;
    left:20px;
    top:20px;
    border:1px solid #fff;
    color:#fff;
    width:70px;
    height:30px;
    border-radius:10px;
    text-align:center;
    line-height:30px;
    font-size: 12px;
  }
  .dao{
    position: absolute;
    top:20px;
    right:20px;
    ::v-deep .van-circle__text{
        color:#fff !important;
    }
  }
  .myimg{
    width:270px;
    height:270px;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    z-index:10;
  }
  .spandot{
    position: absolute;
    z-index: 100;
    width: 4px;
    height:4px;
    border-radius: 50%;
    animation: flash 3s infinite alternate;
  }
   @keyframes flash {
        from{
            opacity: 0;
        }
        to{
            opacity: 0.5;
        }
    }
}
</style>