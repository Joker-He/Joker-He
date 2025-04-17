
<script lang="ts" setup>

import PhoneCode from '../../components/PhoneCode.vue'

// 校验验证码 
// const onFinish = async  (value:FormState)=>{
//     let res = await Ajax.checkcaptcha(value) as any;
//     if(res.code==200){
//         // 跳转 
//         gotowhere('/pro')
//         localStorage.setItem('pro_phone',value.phone)
//         sessionStorage.setItem('pro_token',res.token)
//     }
// }



</script>


<template>
    <PhoneCode/>
</template>