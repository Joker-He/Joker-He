
<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue';
import {ref , reactive  , computed , onMounted  } from 'vue'
import { useCommon } from '../hooks/common/useCommon';
import { useValidate } from '../hooks/date/useValidate';
import { FormState } from '../utils/types';
import CaptchaBtn from '../components/CaptchaBtn.vue';
import { Ajax } from '../api/api';
import { useRoute } from 'vue-router';
const route = useRoute()
const props = defineProps({
    flag:{
        type:Boolean,
        default:false   // false 表示 手机登录  true 表示 找回密码 
    }
})
const  formRef = ref<FormInstance>()
const formState = reactive<FormState>({})
const {onFinishFailed  , resetData , gotowhere} = useCommon()
const { phone , code ,  pwd } = useValidate()

const onFinish = async  (value:any)=>{
    if(props.flag){
        
        let res = await  Ajax.findUser({
            phone:value.phone  
        }) as any;
        if(res.code==200){
            let res1 = await Ajax.verifyCaptcha(value) as any;
            if(res1.code==200){
                // 修改密码 
                let res2 = await Ajax.changepassnologin({
                    phone:value.phone,
                    password:value.password 
                }) as any;
                if(res2.code==200){
                    gotowhere('/login')
                }
            }
        }
    }else{
        // let res = await Ajax.checkcaptcha(value) as any;
        // if(res.code==200){
        //     // 跳转 
        //     gotowhere('/pro')
        //     localStorage.setItem('pro_phone',value.phone)
        //     sessionStorage.setItem('pro_token',res.token)
        // }
        let res = await  Ajax.findUser({
            phone:value.phone  
        }) as any;
        if(res.code==200){
            let res1 = await Ajax.verifyCaptcha(value) as any;
            // 获取token 
            let res2 = await Ajax.getToken({
                phone:res.result.phone,
                username:res.result.username,
                password:res.result.password,
            }) as any; 

            if(res1.code==200){
                gotowhere('/pro')
                localStorage.setItem('pro_phone',value.phone)
                sessionStorage.setItem('pro_token',res2.token)
            }
        }
    }
}

onMounted(()=>{
    formState.phone = route.query.phone ? route.query.phone : localStorage.getItem('pro_phone')
})
</script>


<template>
    <div class="myform">
        <a-form
            ref="formRef"
            :model="formState"
            name="basic"
            :label-col="{ span: 6 }"
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
                        <CaptchaBtn :phone="formState.phone" />
                    </a-col>
                </a-row>
            </a-form-item>

            <a-form-item
                v-if="flag"
                label="新密码"
                name="password"
                :rules="[
                    { required: true, message: '请输入密码' },
                    {
                        pattern:pwd,
                        message:'请输入正确的登录密码(6-16的数字+字母)'
                    }
                ]"
            >
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item class="lastitem" :wrapper-col="{ offset: 6, span: 16 }">
                <div class="alinks">
                    <router-link to="/reg" class="litem ">立即注册</router-link>
                    <router-link to="/login" v-if="flag"  class="litem bg">登录</router-link>
                    <router-link to="/findpass" v-else    class="litem bg">找回密码</router-link>
                </div>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit" block>{{ flag?'确认找回':'验证登录' }}</a-button>
                <a-button danger class="mt10"  @click="resetData(formRef)" block>重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>


