
<script lang="ts" setup>
import {ExportOutlined ,  CaretLeftOutlined , LockOutlined , CaretRightOutlined , DownOutlined , SearchOutlined   } from '@ant-design/icons-vue';
import { computed , ref ,reactive} from 'vue';
import { useStore } from '../../store/store';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import MyAvatar from './MyAvatar.vue'
import { FormInstance } from 'ant-design-vue/es/form';
import { useValidate } from '../../hooks/date/useValidate';
import type { Rule } from 'ant-design-vue/es/form';
import { ShowFail } from '../../utils/message';
import { Ajax } from '../../api/api';

const store = useStore()
const userInfo:any = computed(()=>store.userInfo)
const collapsed:any = computed(()=>store.collapsed)

const router = useRouter()
const visible = ref<boolean>(false)
const { pwd } = useValidate() 
const todoLogout = ()=>{
    Modal.confirm({
        title: '友情提示',
        cancelText:"取消",
        okText:"确定",
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('h2', { style: 'color:red;' }, '你真的要退出登录吗???'),
        onOk() {
            localStorage.removeItem("pro_account")
            localStorage.removeItem("pro_phone")
            sessionStorage.removeItem('pro_token')
            // store.changeroutes([])
            store.clearUserInfo()
            router.replace('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
    });
}
const layout = 'vertical'
const formRef = ref<FormInstance>()
const form = ref<any>({

})
const checkpasscommon = async  (_rule: Rule, value: string)=>{   // dbnewpass 
    if(pwd.test(value) && pwd.test(form.value.newpass)){
        if(value !== form.value.newpass){
            return Promise.reject("两次密码不匹配");
        }else{
            return Promise.resolve();
        }
    }
}

// newpass 触发正则 
const checkpassword  = async (_rule: Rule, value: string) => {
    if(pwd.test(value) && pwd.test(form.value.dbnewpass)){
        formRef.value?.validateFields('dbnewpass');  // 调起某个字段的正则语法  
    }
}

const rules = reactive({
    newpass:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator:checkpassword
        }
    ],
    dbnewpass:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator:checkpasscommon
        }
    ]
})

const ShowModal = ()=>{
    visible.value = true;
    form.value.oldpass = userInfo.value.password;
}
const changepass = ()=>{
    // 
    formRef.value?.validate()
    .then( async (value:any)=>{
        console.log(value)
        if(value.newpass==value.oldpass){
            ShowFail("修改的新密码不能和旧密码一致")
        }else{
            let res = await Ajax.changeuserinfo({
                password:value.newpass
            }) as any;
            if(res.code==200){
                router.replace('/login')
            }
        }
    })
    .catch(err=>{
        ShowFail('密码格式不对')
    })
}

</script>


<template>
    
    <a-layout-header class="a-head">
        <a-modal 
            v-model:visible="visible" 
            title="修改密码" 
            @ok="changepass"
            okText="确认修改"
            cancelText="取消"
            okType="danger"
            width="30%"
            >
            <a-form
                :rules="rules"
                ref="formRef"
                :model="form"
                name="normal_login"
                class="login-form"
                :layout="layout"
                >
                    <a-form-item
                        label="旧密码"
                        name="oldpass"
                        has-feedback
                        
                    >
                        <a-input v-model:value="form.oldpass" disabled >
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item
                        label="新密码"
                        name="newpass"
                        has-feedback
                    >
                        <a-input-password v-model:value="form.newpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item
                        label="确认新密码"
                        name="dbnewpass"
                        has-feedback
                        
                    >
                        <a-input-password v-model:value="form.dbnewpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                </a-form>
        </a-modal>
        <a-row style="height:100%">
            <a-col :span="8" class="a-item">

                
                <span @click="store.changecollapsed(!collapsed)" style="margin-top:8px;">
                    <CaretRightOutlined v-if="collapsed" class="color size" />
                    <CaretLeftOutlined  v-else class="color size" />
                </span>
                <a-typography-title class="color" :level="3">学员成绩管理系统</a-typography-title>
            </a-col>
            <a-col :span="8" class="a-item">
                <marquee behavior="" direction="">
                    <div class="tlist">
                        <h2>初心教育</h2>
                        <h2>匠心育人</h2>
                    </div>
                </marquee>
            </a-col>
            <a-col :span="8" class="a-item">
                <div class="info" v-if="userInfo.username">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            <span class="color">{{ userInfo.username }}</span>
                            <DownOutlined  class="color"/>
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <router-link to="/">个人中心</router-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <router-link to="/">设置</router-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <router-link to="/">成绩中心</router-link>
                                </a-menu-item>
                                <a-button size="small" type="primary" @click="ShowModal">修改密码</a-button>
                            </a-menu>
                        </template>
                    </a-dropdown>

                    <div class="ml15">
                        <a-tag :color="userInfo.color"  >{{userInfo.label  }}</a-tag>
                    </div>
                   
                    <MyAvatar/>

                    <a-tooltip title="注销登录">
                        <a-button danger  @click="todoLogout" class="ml15 btn"  shape="circle" size="middle">
                            <template #icon><ExportOutlined /></template>
                        </a-button>
                    </a-tooltip>
                    
                </div>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<style scoped lang="scss">
.a-head{
    padding:0 20px;
    .a-item{
        display: flex;
        align-items: center;
        height:100%;
    }
    .info{
        padding-left:20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width:100%;
        .btn{
            margin-top:5px;
        }
    }
   
    .tlist{
        display: flex;
        align-items: center;
        h2{
            color:#f50;
            font-size: 18px;
            margin:0 50px;
        }
    }
    .size{
        font-size: 22px;
        cursor: pointer;
    }
    .color{
        color:#fff;
        margin:0;
    }
}
</style>