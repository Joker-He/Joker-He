
<script lang="ts" setup>
import { ref } from 'vue';
import FormData from '../../components/FormData.vue'
import {ProjectTypes} from '../../utils'
import { ShowFail } from '../../utils/message';
import { Ajax } from '../../api/api';
import { useRouter } from 'vue-router';
import Tinymce from '@/components/Tinymce/Tinymce.vue'
const formone = ref<any>()
const router = useRouter()
const resetData = ()=>{
    formone.value.formRef.resetFields()
}
const submitData = ()=>{
    formone.value.formRef.validate()
    .then(async (value:any)=>{
        console.log(value)
        let res:any = await Ajax.addgradeone(value)
        if(res.code==200){
            router.push('/grade/my')
        }
    })
    .catch((err:any)=>{
        ShowFail('请输入有效的项目数据信息')
    })
}
</script>





<template>
    <div>
        <MyTitle title="添加项目"> </MyTitle>

        <FormData
            ref="formone"
            :span="12"
        >
            <template #default="{form}">
                <a-form-item
                    label="项目名称"
                    name="name"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >
                    <a-input  autocomplete="off"  v-model:value="form.name"></a-input>
                </a-form-item>
                <a-form-item
                    label="项目地址"
                    name="address"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >
                    <a-input  autocomplete="off"  v-model:value="form.address"></a-input>
                </a-form-item>
                <a-form-item
                    label="项目类别"
                    name="type"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请选择'
                    }]"
                >   
                    <a-select  v-model:value="form.type" >
                        <a-select-option  v-for="(l, i) in ProjectTypes" :key="i"  :value="l.value"  >
                            {{ l.label}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                
                <a-form-item
                    label="项目技术(至少3条)"
                    name="jishu"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >   
                    <Tinymce  v-model="form.jishu"   style="width:100%"></Tinymce>
                    <!-- <a-textarea  v-model:value="form.jishu" ></a-textarea> -->
                </a-form-item>
                <a-form-item
                    label="项目亮点(至少3条)"
                    name="lightdot"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >   
                    <Tinymce  v-model="form.lightdot"   style="width:100%"></Tinymce>
                    <!-- <a-textarea  v-model:value="form.lightdot" ></a-textarea> -->
                </a-form-item>
                <a-form-item
                    label="项目Bug(至少3条)"
                    name="bug"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >   
                    <Tinymce  v-model="form.bug"   style="width:100%"></Tinymce>
                    <!-- <a-textarea  v-model:value="form.bug" ></a-textarea> -->
                </a-form-item>
                <a-form-item
                    label="项目细节(至少3条)"
                    name="detail"
                    has-feedback
                    :rules="[{
                        required:true,
                        message:'请输入'
                    }]"
                >   
                    <Tinymce  v-model="form.detail"   style="width:100%"></Tinymce>
                    <!-- <a-textarea  v-model:value="form.detail" ></a-textarea> -->
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" @click="submitData">提交项目</a-button>
                    <a-button class="ml10" danger @click="resetData">重置</a-button>
                </a-form-item>
            </template>
        </FormData>
    </div>
</template>