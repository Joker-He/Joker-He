
<!-- <script lang="ts">
export default {
    setup() {
        
    },
}
</script> -->
<!-- setup  -->
<script lang="ts">
import { defineComponent , ref  , onMounted , reactive } from 'vue'
import { useRouter } from 'vue-router'
import {spanTypes , numTypes} from '../../utils/types'
import IMG from '@/assets/images/503.png'
import { useIntervalFn } from '@vueuse/core' 

export default defineComponent({
    setup(props,context) {
        const count = ref<number>(5)
        const router = useRouter()
        const bgstar = ref<HTMLDivElement>()
        const spanList = reactive<Array<spanTypes>>([])
        const percent = ref<number>(0)
        const gotowhere = ()=>{
            router.push('/login')
        }
        const counter = ref<number>(15)
       
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

                spanList.push({
                    left:left+'px',
                    top:top+'px',
                    transform:`scale(${scaler})`,
                    animationDelay:rate+'s',
                    background:`rgba(255,255,255,${opacity})`
                })
            }
        }
        const { pause, resume, isActive } = useIntervalFn(() => {
            // if(counter.value>0){
            //     counter.value--;
            // }else{
            //     pause()
            //     gotowhere()
            // }
            if(percent.value<100){
                percent.value++;
            }else{
                pause()
                gotowhere()
            }
        }, 100)
        const timeDown = ()=>{
            var timer:any = setInterval(()=>{
                if(count.value>0){
                    count.value--;
                }else{
                    clearInterval(timer)
                    timer = null; 
                    gotowhere()
                }
            },1000)
        }
        onMounted(()=>{
            timeDown()
            spanListInit()
        })

        // 手动 return 
        return {
            count,
            gotowhere,
            IMG,
            spanList,
            bgstar,
            counter,
            percent
        }
    },
})
</script>

<template>
    <div class="errorpage" id="bgstar" ref="bgstar">
        <div class="down" @click="gotowhere" v-if="false"> {{ counter }} S </div>
        <div class="dao" @click="gotowhere">
            <a-progress
                type="circle"
                :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }"
                :percent="percent"
                :width="60"
            />
        </div>
        <img :src="IMG" alt="" class="myimg">
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
    ::v-deep .ant-progress-text{
        color:#fff;
        font-size:12px;
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