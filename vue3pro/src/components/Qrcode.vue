


<script lang="ts" setup >
import QRCode from 'qrcodejs2-fix';//在需要使用的vue文件中导入即可
import { onMounted , nextTick ,ref } from 'vue';
const qrCodeBox = ref<any>()
const props:any = defineProps({
    text:{
        type:String,
        default:''
    }
})
onMounted(()=>{
    nextTick(()=>{
        qrCodeBox.value.innerHTML = ""; 
        new QRCode(qrCodeBox.value, {
            //需要编码的文字内容或者URL
            text: props.text,
            width: 100, //二维码宽
            height: 100,//二维码高
        });

    })
})
</script>


<template>
    <div id="qrCodeBox" ref="qrCodeBox"></div>
</template>