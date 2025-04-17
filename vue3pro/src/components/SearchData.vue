
<script lang="ts" setup>
import {ref} from 'vue'
const props:any = defineProps({
    searchApi:Function,
    placeholder:{
        type:String, 
        default:'请输入搜索关键字'
    }
})
const form =  ref<any>({

})
const todoSearch = ()=>{
    props.searchApi(form.value)
}
const resetData = ()=>{
    form.value = {}
    props.searchApi({})
}

defineExpose({
    todoSearch
})
</script>

<template>
    <a-row class="mt10">
        <a-col :span="4">
            <a-input :placeholder="placeholder" v-model:value="form.keyword"></a-input>
        </a-col>
        <slot :form="form">

        </slot>
        <a-col :span="7" :offset="1" >
            <a-button type="primary" @click="todoSearch">搜索</a-button>
            <a-button class="ml10" danger @click="resetData">重置</a-button>
            <slot name="export" :form="form"></slot>
        </a-col>
       
    </a-row>
</template>