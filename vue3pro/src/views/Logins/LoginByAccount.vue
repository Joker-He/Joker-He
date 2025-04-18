
<script lang="ts" setup>
import { reactive , ref  , onMounted } from 'vue';
import { useValidate } from '../../hooks/date/useValidate';
import { FormState } from '../../utils/types';
import type { FormInstance } from 'ant-design-vue';
import { useRoute , useRouter } from 'vue-router';
import {Ajax} from '../../api/api'
import {useCommon } from '../../hooks/common/useCommon'
const route = useRoute()
const router = useRouter()
const { pwd } = useValidate()
const formRef = ref<FormInstance>() 
const {onFinishFailed} = useCommon()
const onFinish = async (value:FormState)=>{
    let res = await Ajax.todoLogin(value) as any;
    if(res.code==200){
        router.push({name:'pro'})
        localStorage.setItem('pro_account', value.account || '')
        sessionStorage.setItem('pro_token',res.token)
    }
}

const formState = reactive<FormState>({
    
})

const resetData = ()=>{
    formRef.value?.resetFields()
}

onMounted(()=>{
    console.log(route.query)
    formState.account = typeof route.query.username === 'string' 
        ? route.query.username 
        : localStorage.getItem('pro_account') || undefined;
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
            @finishFailed="onFinishFailed('登录数据信息有误!')"
        >
            <a-form-item
                label="账号"
                name="account"
                :rules="[{ required: true, message: '请输入账号!' }]"
            >
            <a-input v-model:value="formState.account" />
            </a-form-item>

            <a-form-item
                label="密码"
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

            <a-form-item class="lastitem" :wrapper-col="{ offset: 4, span: 16 }">
                <div class="alinks">
                    <router-link to="/reg" class="litem ">立即注册</router-link>
                    <router-link to="/findpass"  class="litem bg">找回密码</router-link>
                </div>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                <a-button type="primary" html-type="submit" block>登录</a-button>
                <a-button danger class="mt10"  @click="resetData" block>重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>