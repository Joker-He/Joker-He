
<script lang="ts"  setup>
import { ref ,reactive  } from 'vue';
import { ShowFail } from '../utils/message';

const visible = ref<boolean>(false)
const formRef = ref<any>()
const props:any  = defineProps({
    submit:{
      type:Function,
      default:()=>{}
    },
    rules:{
        type:Object 
    },
    show:{   // 
      type:Boolean,
    },
    title:{
      type:String,
      default:'标题'
    },
    okText:{
      type:String,
      default:'确认'
    },
    width:{
      type:String,
      default:'30%'
    }
})
const layout = ref('vertical')
const form = ref<any>({})   // ref.value  reactive  必须改里面的数据
const todoconfirm = ()=>{
  formRef.value.validate()
  .then((result:any)=>{
     console.log(result)
      // 外部控制的  
      props.submit(result)
  })
  .catch((err:any)=>{
      console.log(err)
      ShowFail('表单校验失败,请重试')
  })
}

const closeModal = ()=>{
  visible.value = false;
  formRef.value.resetFields()
}

const showModal = ()=>{
  visible.value = true;
  
}

// 把组件内部的数据暴露出去给父组件使用 
defineExpose({
    visible,
    todoconfirm,
    closeModal,
    formRef,
    form,
    showModal
})
</script>


<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    @ok="todoconfirm"
    :okText="okText"
    cancelText="取消"
    okType="danger"
    :width="width"
  >
    <a-form
      :rules="rules"
      ref="formRef"
      :model="form"
      name="normal_login"
      class="login-form"
      :layout="layout"
    >
        <slot :form="form" ></slot>
    </a-form>
  </a-modal>
</template>