



<script lang="ts" setup>
import { reactive , ref , onMounted , toRefs , nextTick , watch , computed} from 'vue';
import { useCommon } from '../hooks/common/useCommon';

const {resetData , onFinishFailed , gotowhere} = useCommon()
const props:any = defineProps({
    rules:{
        type:Object 
    },
    span:{
        type:Number,
        default:7 
    }
})
const emits:any = defineEmits()

const formRef = ref<any>()
const form = ref<any>({
    
})
const onFinish = async (value:any)=>{
    emits('onFinish',value)
}

defineExpose({
    formRef,
    form,
    
})
</script>


<template>
    <a-row class="mt10">
        <a-col :span="span">
            <a-form
                :rules="rules"
                ref="formRef"
                :model="form"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed('输入有效的表单数据')"
                layout="vertical"
            >
                <slot :form="form">
                    
                </slot>
            </a-form>
        </a-col>
    </a-row>
</template>

