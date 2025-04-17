

<script lang="ts" setup>
import {ref , nextTick , toRef } from 'vue'
import { useCommon } from '../../hooks/common/useCommon';
import { AdviseTypes } from '../../utils';
import Tinymce from '@/components/Tinymce/Tinymce.vue'
import { ShowFail } from '../../utils/message';
import { Ajax } from '../../api/api';
import { useStore } from '../../store/store';
const { onFinishFailed} = useCommon()
const content = ref<any>()   // 富文本的值 
const store = useStore()
const userInfo = toRef(store,'userInfo')
const { gotowhere} = useCommon()
const steps = [
    {
        title:'意见标题',
        desc:"第一步"
    },
    {
        title:'意见内容',
        desc:"第二步"
    },
    {
        title:'意见提交',
        desc:"第三步"
    }
]
const current = ref<Number>(0)
const formone = ref<any>()
const formOneData = ref({})
// 下一步 
const gonext = ()=>{
    if(current.value==0){
        // 第一步 
        
        formone.value.formRef.validate()
        .then((value:any)=>{
            current.value = current.value + 1;
            formOneData.value = value;
        })
        .catch((err:any)=>{
            onFinishFailed('输入有效的表单数据')
        })
    }
    else if(current.value==1){
        if(content.value){
            current.value = current.value + 1;
        }else{
            ShowFail('请输入具体意见')
        }
    }
}

const goprev = ()=>{
    current.value = current.value - 1;
    if(current.value==0){
        console.log(formOneData.value)
        nextTick(()=>{
            formone.value.form = Object.assign({},formOneData.value)
        })
    }
}

const submitAdvise = async ()=> {
    let params = {
        content:content.value,
        ...formOneData.value,
        author:userInfo.value,
    }
    let res:any = await Ajax.addadviseone(params) 
    if(res.code==200){
        gotowhere('/advise/list')
    }
}
</script>


<template>
    <div>
        <MyTitle title="意见新增"></MyTitle>
        <a-row class="mt10" style="width:100%"> 
            <a-col :span="24">
                <a-steps :current="current">
                    <a-step v-for="(l,i) in steps" :title="l.title" :description="l.desc" />  
                </a-steps>
            </a-col>
        </a-row>
        <a-row class="mt10" style="width:100%"> 
            <a-col :span="24">
                <div class="abox">
                    <div class="boxone" v-show="current==0">
                        <FormData 
                            ref="formone"
                        >
                            <template #default="{form}">
                                <a-form-item
                                    label="意见标题"
                                    name="title"
                                    has-feedback
                                    :rules="[{
                                        required: true, message: '请输入意见标题!'
                                    }]"

                                >
                                    <a-input autocomplete="off" placeholder="请输入意见标题"  v-model:value="form.title"></a-input>
                                </a-form-item>
                                <a-form-item
                                    label="意见分类"
                                    name="type"
                                    has-feedback
                                    :rules="[{
                                        required: true, message: '请选择意见分类!'
                                    }]"
                                >
                                    <a-cascader v-model:value="form.type" :options="AdviseTypes" placeholder="请选择意见分类" />
                                </a-form-item>
                            </template>
                        </FormData>
                    </div>
                    <div class="boxtwo" v-if="current==1">
                        <Tinymce  v-model="content"   style="width:100%"></Tinymce>
                    </div>
                </div>
            </a-col>
        </a-row>

        <a-row class="mt10" style="width:100%"> 
            <a-col :span="24">
                <a-button type="primary" @click="gonext" v-if="current!=steps.length-1">下一步</a-button>
                <a-button danger class="ml10" @click="goprev" v-if="current!=0">上一步</a-button>
                <a-button type="primary"  @click="submitAdvise" class="ml10" v-if="current==steps.length-1">发表意见</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="scss" scoped>
.abox{
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 360px;
    padding: 20px;
}
</style>