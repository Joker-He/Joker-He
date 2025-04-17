
<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue';
import {ref , reactive  , computed } from 'vue'
import { useCommon } from '../../hooks/common/useCommon';
import { useValidate } from '../../hooks/date/useValidate';
import { FormState } from '../../utils/types';
import CaptchaBtn from '../../components/CaptchaBtn.vue';
import { Ajax } from '../../api/api';
import PhoneCode from '../../components/PhoneCode.vue'
const  videoSrc = ref('https://img-baofun.zhhainiao.com/market/semvideo/6ac24b3f50fda0b1a55f7ff25c6b62af_preview.mp4')
const  formRef = ref<FormInstance>()
const formState = reactive<FormState>({})
const {onFinishFailed  , resetData , gotowhere} = useCommon()
const { phone , code ,  pwd } = useValidate()

const onFinish = async  (value:any)=>{
    let res = await Ajax.findpass(value) as any;
    if(res.code==200){
        gotowhere('/login')
    }
}
</script>


<template>
    <div class="lgbox">
        <video 
            :src="videoSrc"
            class="myvideo"
            muted
            loop
            autoplay
        ></video>
        <div class="login-box">
            <h2 class="title">找回密码</h2>
            <div class="box">
                <PhoneCode :flag="true"/>
                <!-- <div class="myform">
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
                                <router-link to="/login"   class="litem bg">登录</router-link>
                            </div>
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                            <a-button type="primary" html-type="submit" block>确认找回</a-button>
                            <a-button danger class="mt10"  @click="resetData(formRef)" block>重置</a-button>
                        </a-form-item>
                    </a-form>
                </div> -->
            </div>
        </div>
    </div>
</template>