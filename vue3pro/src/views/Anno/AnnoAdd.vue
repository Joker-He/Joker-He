

<script lang="ts" setup>
import {reactive , ref } from 'vue'
import {AnnoTypes} from '../../utils'
import UploadFile from '../../components/UploadFile.vue'
import { baseURL } from '../../api/request';
import { ShowFail } from '../../utils/message';
import {Ajax} from '../../api/api'
import { useStore } from '../../store/store';
import { useCommon } from '../../hooks/common/useCommon';
const form = ref<any>({})
const formRef = ref<any>()
const rules = reactive({
    title: [{ required: true, message: "请输入" }],
    type: [{ required: true, message: "请选择" }],
    content: [{ required: true, message: "请输入" }],
})
const store = useStore()
const userInfo = store.userInfo
const { gotowhere} = useCommon()
const onFinish = async (value:any)=>{
    console.log(value)
    value.author = userInfo;
    let res:any = await Ajax.addtoanno(value)
    if(res.code==200){
        gotowhere('/anno/list') 
    }
}
const onFinishFailed = ()=>{
    ShowFail('输入有效的表单数据')
}
const getFilePath = (path:String)=>{
    form.value.desc = path;
}

const deleteImg = ()=>{
    form.value.desc = ''
}
const resetData = ()=>{
    formRef.value.resetFields()
    form.value = {}
}
</script>


<template>
    <div>
        <MyTitle title="公告新增"></MyTitle>
        <a-row class="mt10">
            <a-col :span="8">
                <a-form
                    :rules="rules"
                    ref="formRef"
                    :model="form"
                    name="normal_login"
                    class="login-form"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                    layout="vertical"
                >
                    <a-form-item
                        label="公告标题"
                        name="title"
                        has-feedback

                    >
                        <a-input autocomplete="off" placeholder="请输入公告标题"  v-model:value="form.title"></a-input>
                    </a-form-item>

                    <a-form-item
                        label="公告类型"
                        name="type"
                        has-feedback
                        
                    >   
                        <a-select v-model:value="form.type" placeholder="请选择公告类型">
                            <a-select-option :value="l.value" v-for="(l, i) in AnnoTypes" :key="i">
                                {{ l.label}}
                            </a-select-option>
                        </a-select>
                       
                    </a-form-item>

                    <a-form-item
                        label="公告内容"
                        name="content"
                        has-feedback
                        
                    >
                        <a-textarea v-model:value="form.content"  placeholder="请输入公告内容"></a-textarea>
                    </a-form-item>

                    <a-form-item
                        label="公告描述"
                        name="desc"
                        has-feedback
                        
                    >
                        <!-- :getFilePath="getFilePath" -->
                        
                        <UploadFile @sendFilePath="getFilePath" >

                            <img class="descimg" v-if="form.desc" :src="form.desc.replace(/public/,baseURL)" alt=""/>
                            <a-button type="primary" class="mt10">点击上传相关公告图片</a-button>
                            <a-button danger @click.stop="deleteImg" v-if="form.desc" class="mt10 ml10">删除图片</a-button>
                        </UploadFile>
                    </a-form-item>
                   
                    
                    <a-form-item  >
                        <a-button  type="primary" block html-type="submit" class="login-form-button">
                            添加
                        </a-button>
                    </a-form-item>
                    <a-form-item >
                        <a-button  danger  block  @click="resetData"  class="login-form-button">
                            重置
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
       
    </div>
</template>

<style scoped>
.descimg{
    width:320px;
    height:200px;
    margin-top:15px;
    border-radius:15px;
}
</style>