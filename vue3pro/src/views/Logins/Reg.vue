<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons-vue';
import { FormState } from '@/utils/types'
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useValidate } from '../../hooks/date/useValidate'
import { ShowFail } from '../../utils/message';
import { Ajax } from '../../api/api';
import { LocationQueryRaw, useRouter } from 'vue-router';
import videoFile from '@/assets/images/loginbg.mp4'


const router = useRouter()
const labelCol = {

}
const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}
const wrapperCol = {
    span: 18,
    offset: 6,
}
const { phone, pwd } = useValidate()
const form = reactive<FormState>({
    username: '',
    password: '',
    dbpass: '',
    phone: ''
});
const checkpasscommon = async (_rule: Rule, value: string) => {   // dbpass 
    if (pwd.test(value) && pwd.test(form.password || '')) {
        if (value !== form.password) {
            return Promise.reject("两次密码不匹配");
        } else {
            return Promise.resolve();
        }
    }
}

// password 触发正则 
const checkpassword = async (_rule: Rule, value: string) => {
    if (pwd.test(value) && pwd.test(form.dbpass || '')) {
        formRef.value?.validateFields('dbpass');  // 调起某个字段的正则语法  
    }
}


const rules: Record<string, Rule[]> = reactive({
    username: [
        {
            required: true, message: '请输入用户名称!'
        }
    ],
    phone: [
        {
            required: true, message: '请输入手机号码!'
        },
        {
            pattern: phone,
            message: '请输入正确的手机号码'
        }
    ],
    password: [
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern: pwd,
            message: '请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator: checkpassword
        }
    ],
    dbpass: [
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern: pwd,
            message: '请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator: checkpasscommon
        }
    ]
})

const formRef = ref<FormInstance>()
const onFinish = async (value: FormState) => {
    console.log(value)
    const query: LocationQueryRaw = {
        username: value.username,
        password: value.password,
        dbpass: value.dbpass,
        phone: value.phone
    };
    // AJAX 
    let res: any = await Ajax.todoRegister(value)
    if (res.code == 200) {
        router.push({ name: 'login', query })
    }
}
const onFinishFailed = () => {
    ShowFail('表单数据校验失败')
}

const resetData = () => {
    console.log(formRef.value)
    formRef.value?.resetFields()
}

onMounted(() => {
    console.log(formRef.value)

    Ajax.getTestMsg()
        .then(res => {
            console.log(res)
        })
})
</script>


<template>
    <div class='reg-box lgbox'>
        <video loop muted autoplay :src="videoFile" class="myvideo"></video>

        <div class="login-box">
            <h2 class="title">欢迎注册(学员)</h2>
            <div class="box">
                <!-- :label-col="labelCol" -->
                <a-form :rules="rules" ref="formRef" :model="form" name="normal_login" class="login-form"
                    @finish="onFinish" @finishFailed="onFinishFailed" v-bind="layout">
                    <a-form-item label="用户名称" name="username" has-feedback>
                        <a-input autocomplete="off" v-model:value="form.username">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="手机号码" name="phone" has-feedback>
                        <a-input v-model:value="form.phone">
                            <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="登录密码" name="password" has-feedback>
                        <a-input-password v-model:value="form.password">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item label="确认密码" name="dbpass" has-feedback>
                        <a-input-password v-model:value="form.dbpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item :wrapper-col="wrapperCol">
                        <a-button type="primary" block html-type="submit" class="login-form-button">
                            注册
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="wrapperCol">
                        <a-button danger block html-type="reset" class="login-form-button">
                            重置
                        </a-button>
                        <!-- <a-button @click="resetData" danger  block   class="login-form-button">
                            重置
                        </a-button> -->
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.lgbox {
    ::v-deep .ant-form-item-required {
        color: #fff;
    }
}
</style>