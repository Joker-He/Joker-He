
<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue';
import { ref , reactive , computed , watch  , onMounted   } from 'vue';
import { useCommon } from '../../hooks/common/useCommon';
import { useValidate } from '../../hooks/date/useValidate';
import { FormState } from '../../utils/types';
import {useIntervalFn} from '@vueuse/core'
import {Ajax} from '../../api/api'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const {onFinishFailed , gotowhere } = useCommon()
const formRef = ref<FormInstance>()
const formState = reactive<FormState>({})
const {code ,phone } = useValidate()
const disabled = computed(() => {
    return phone.test(formState.phone || '');
}); 

const flag = ref<boolean>(false)
watch(formState,(v:any)=>{
    console.log(v) 
    flag.value = phone.test(v.phone) 
})
const toggle = ref<boolean>(true)
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

// 校验验证码 
const onFinish = async  (value:FormState)=>{
    let res = await Ajax.checkcaptcha(value) as any;
    if(res.code==200){
        // 跳转 
        gotowhere('/pro')
        localStorage.setItem('pro_phone', value.phone || '')
        sessionStorage.setItem('pro_token',res.token)
    }
}
const resetData = ()=>{
    formRef.value?.resetFields()
}

// 点击发送验证码
const todosentCaptcha = async ()=>{
    let res = await Ajax.sentCaptchaMore({
        phone:formState.phone 
    }) as any
    
    if(res.code==200){
        toggle.value = false;
        resume()  // 调起计时器 
    }
}

onMounted(()=>{
    formState.phone = typeof route.query.phone === 'string' 
        ? route.query.phone 
        : localStorage.getItem('pro_phone') || undefined;
})


</script>


<template>
    <div class="myform">
        <a-form
            ref="formRef"
            :model="formState"
            name="basic"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed('提交数据信息有误!')"
        >
            <a-form-item
                label="手机号"
                name="phone"
                :rules="[
                    { required: true, message: '请输入手机号!' },
                    {
                        pattern:phone,
                        message:'请输入正确格式的手机号码'
                    }
                ]"
            >
                <a-input v-model:value="formState.phone" />
            </a-form-item>

            <a-form-item
                label="验证码"
                name="captcha"
                :rules="[
                    { required: true, message: '请输入验证码' },
                    {
                        pattern:code,
                        message:'请输入正确的验证码(4位数字)'
                    }
                ]"
            >
                <a-row>
                    <a-col :span="12">
                        <a-input v-model:value="formState.captcha" />
                    </a-col>
                    <a-col :span="11" :offset="1">
                        <a-button v-if="toggle" type="primary" :disabled="!flag"  @click="todosentCaptcha"  block>发送验证码</a-button>
                        <a-button v-else danger :disabled="true"    block> 剩余 {{ counter }} S </a-button>
                    </a-col>
                </a-row>
            </a-form-item>

            <a-form-item class="lastitem" :wrapper-col="{ offset: 4, span: 16 }">
                <div class="alinks">
                    <router-link to="/reg" class="litem ">立即注册</router-link>
                    <router-link to="/findpass"  class="litem bg">找回密码</router-link>
                </div>
            </a-form-item>
            
            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                <a-button type="primary" html-type="submit" block>验证登录</a-button>
                <a-button danger class="mt10"  @click="resetData" block>重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>