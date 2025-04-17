

<script lang="ts" setup>
import { reactive , ref , onMounted , toRefs , nextTick , watch , computed} from 'vue';
import {Ajax} from '../../api/api'
import { useCommon } from '../../hooks/common/useCommon';
import { useValidate } from '../../hooks/date/useValidate';
import { useStore } from '../../store/store';
const {resetData , onFinishFailed , gotowhere} = useCommon()

const store = useStore()
const userInfo = computed(()=>store.userInfo)
const roles = ref<any>([])
const {phone} = useValidate()
const rules = reactive({
    username:[
        {
            required: true, message: '请输入用户名称!'
        }
    ],
    phone:[
        {
            required: true, message: '请输入手机号码!'
        },
        {
            pattern:phone,
            message:'请输入正确的手机号码'
        }
    ],
    password:[
        {
            required: true, message: '请输入密码!'
        }
    ],
    role:[
        {
            required: true, message: '请选择!'
        }
    ]
})
const formRef = ref<any>()
const form = ref<any>({
    password:'qwe123'
})
const onFinish = async (value:any)=>{
    let res:any  = await Ajax.adduser(value)
    if(res.code==200){
        gotowhere('/user/list')
    }
}

const getRoles = async ()=>{
    let res:any = await Ajax.getroles()
    if(res.code==200){
        roles.value = res.result
    }
}



onMounted(()=>{
    nextTick(()=>{
        getRoles()
    })
})
</script>


<template>
    <div>
        <MyTitle title="用户新增"></MyTitle>
        <a-row class="mt10">
            <a-col :span="6">
                <a-form
                    :rules="rules"
                    ref="formRef"
                    :model="form"
                    name="normal_login"
                    class="login-form"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed('输入有效的数据')"
                    layout="vertical"
                >
                    <a-form-item
                        label="用户名称"
                        name="username"
                        has-feedback

                    >
                        <a-input autocomplete="off" placeholder="请输入用户名称"  v-model:value="form.username"></a-input>
                    </a-form-item>

                    <a-form-item
                        label="手机号码"
                        name="phone"
                        has-feedback
                        
                    >   
                        <a-input autocomplete="off" placeholder="请输入手机号码"  v-model:value="form.phone"></a-input>
                    </a-form-item>

                    <a-form-item
                        label="初始密码"
                        name="password"
                        has-feedback
                        
                    >   
                        <a-input disabled  autocomplete="off"   v-model:value="form.password"></a-input>
                    </a-form-item>

                    <a-form-item
                        label="用户角色"
                        name="role"
                        has-feedback
                        
                    >   
                        <a-select v-model:value="form.role" placeholder="请选择用户角色">
                            <a-select-option  v-for="(l, i) in roles.filter((item:any)=>item.value<store.userInfo.role)" :key="i"  :value="l.value"  >
                                {{ l.label}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                   
                    
                    <a-form-item  >
                        <a-block>
                            <a-button  type="primary"  html-type="submit" class="login-form-button">
                                添加用户
                            </a-button>
                        </a-block>
                        <a-block class="ml10">
                            <a-button  danger    @click="resetData(formRef)"  class="login-form-button">
                                重置数据
                            </a-button>
                        </a-block>
                        
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>