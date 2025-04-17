

<script lang="ts" setup>
import {ref} from 'vue'
import {Ajax} from '../api/api'
const fileRef = ref<any>()
const emits:any  = defineEmits()
const props:any = defineProps({
    getFilePath:Function ,
})
const startSendFile = async ()=>{
    const file = fileRef.value?.files[0]
    

    const data = new FormData()  // 新建的JS 表单对象 
    data.append('file',file)     // 上传文件的数据  <input type="file" name='file' ref="fileRef" @change='startSendFile'  class="file">

    // 1.先上传文件
    let res = await Ajax.uplodafile(data) as any;
    if(res.code==200){
        emits('sendFilePath',res.path)  
        // props.getFilePath(res.path)
    }
}

// 点击上传
const todoUpload = ()=>{
    fileRef.value?.click()
}
</script>


<template>
    <div class="diss" >
        <input type="file" ref="fileRef" @change='startSendFile'     />
    </div>
    <div @click="todoUpload">
       <slot ></slot>
    </div>
</template>


<style lang="scss" scoped>
.diss{
    display:none;
}
</style>