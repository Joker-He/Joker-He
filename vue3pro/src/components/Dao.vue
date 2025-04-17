
<script lang="ts" setup>
import { ref } from 'vue';
import {useIntervalFn} from '@vueuse/core'
import { useRouter } from 'vue-router';
const props = defineProps({   // defineProps 定义接收来自父组件的参数 props 
    url:{
        type:String,
        default:'/login'
    },
    interval:{   // 间隔 
        type:Number,
        default:50  // 总时长  interval * 0.1 
    },
    style:{
        type:Object,
        default:{
            top:'20px',
            right:'20px'
        }
    }
})
const router = useRouter()
const gotowhere = ()=>{
    router.push(props.url)
}
const { pause, resume, isActive } = useIntervalFn(() => {
    if(percent.value<100){
        percent.value++;
    }else{
        pause()
        gotowhere()
    }
}, props.interval) 
const percent = ref<number>(0)
</script>


<template>
     <div class="dao" @click="gotowhere" :style="style">
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
</template>


<style lang="scss" scoped>
.dao{
    position: absolute;
    z-index:1000;
    ::v-deep .ant-progress-text{
        color:#fff;
        font-size:12px;
    }
  }
</style>