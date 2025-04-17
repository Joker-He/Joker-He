
<script lang="ts" setup>
import { ref , computed } from 'vue'
import { Ajax } from '../api/api';
import { useValidate } from '../hooks/date/useValidate';
import {useIntervalFn} from '@vueuse/core'
const props:any = defineProps({
    phone:{
        type:String 
    }
})
const { phone } = useValidate()
const toggle = ref<boolean>(true)
const flag = computed(()=>{
    return phone.test(props.phone)
})
const counter = ref<number>(60)
const { pause, resume } =useIntervalFn(() => {
    if(counter.value>0){
        counter.value--
    }else{
        pause()
        counter.value = 60;
        toggle.value = true;
    }
}, 1000, { immediate: false })
const todosentCaptcha = async ()=>{
    let res = await  Ajax.findUser({
        phone:props.phone 
    }) as any;
    if(res.code==200){
        // 发送验证码 
        let res1 = await Ajax.sentCaptcha({
            phone:props.phone 
        }) as any;
        if(res1.code==200){
            resume()
            toggle.value = false;
        }
    }
}
</script>


<template>
    <a-button v-if="toggle" type="primary" :disabled="!flag"  @click="todosentCaptcha"  block>发送验证码</a-button>
    <a-button v-else danger :disabled="true"    block> 剩余 {{ counter }} S </a-button>
</template>