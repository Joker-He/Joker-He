
<script lang="ts" setup>
import { SearchOutlined,DeleteOutlined , FormOutlined,EyeOutlined } from '@ant-design/icons-vue'; 
import { toRef } from 'vue';
import { useStore } from '../store/store';

const store = useStore()
const userInfo:any = toRef(store,'userInfo')
const emits:any = defineEmits()
const props:any = defineProps({
    dataSource:[Array,Object ],
    columns:[Array,Object ],
    pagination:{
        type:Object,
        default:{
            pageSize:5
        }
    },
    rowClassName:{  //  设置类 class  
        type:Function,
        default:()=>{} 
    },
    role:{  //  添加权限 
        type:Boolean,
        default:false 
    } 
})


</script>

<template>
    <a-row class="mt10">
        <a-col :span="23" :offset="0">
            <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination" :rowClassName="rowClassName" >
                <template #bodyCell="{ column , record, index }" >
                    <template v-if="column.key === 'index'">
                        <span>{{ index+1 }}</span>
                    </template>
                    <template v-if="column.key === 'action'  ">
                        <!-- v-if="userInfo.role>record.role" -->
                        <slot name="action" :record="record" :column="column" >
                            <template v-if=" userInfo.role>record.role || !role" >
                                <a-popconfirm
                                    title="你真的要删除吗???"
                                    ok-text="确定"
                                    cancel-text="不"
                                    @confirm="emits('deleteOne',record)"
                                >
                                    <a-button danger size="small" shape="circle" class="ml10">
                                        <template #icon><DeleteOutlined /></template>
                                    </a-button>
                                </a-popconfirm>
                                
                                <a-button @click="emits('updateOne',record)" type="primary" size="small" shape="circle" class="ml10">
                                    <template #icon  ><FormOutlined /></template>
                                </a-button>
                            </template>
                        </slot>
                        
                    </template>
                    <slot :record="record" :column="column" ></slot>
                </template>
            </a-table>
        </a-col>
    </a-row>
</template>