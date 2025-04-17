

<script lang="ts" setup>
import FormModal from '../../components/FormModal.vue';
import { ref , reactive , onMounted , nextTick} from 'vue'
import { Ajax } from '../../api/api';
const alertform = ref<any>()
const subjects = ref<Array<object>>([])
const flag  = ref<Boolean>(true)  // true 添加  false 修改 
const updateId = ref<String>('')   // 保存修改的id  方便修改 
const keyword = ref<String>('')
const addSubject = ()=>{
    console.log(alertform.value)
    flag.value = true;
    alertform.value.visible = true; 
}
const rules = reactive({
    label:[
        {required:true,message:'请输入学科名称'}
    ],
    value:[
        {required:true,message:'请输入学科编码'}
    ]
})
// 添加学科
const submitSubject = async  (value:any)=>{
    console.log(value)
    if(flag.value){
        let res = await Ajax.subjectadd(value) as any;
        if(res.code==200){
            alertform.value.closeModal()
            getsubjects()
        }
    }else{
        // 修改学科
        value._id = updateId.value;  
        let res = await Ajax.setsubjects(value) as any;
        if(res.code==200){
            alertform.value.closeModal()
            // getsubjects()

            // 本地修改前端 
            subjects.value = subjects.value.map((item:any)=>{
                if(item._id==value._id){
                    item = {...value}
                }
                return item;
            })
        }
    }
}

// 查询学科
const getsubjects = async (params?:any)=>{
    let res = await Ajax.getsubjects(params) as any;
    if(res.code==200){
        subjects.value = res.result 
    }
}


// 表头信息  
const columns = [
    {
        title: '序号',
        key:'index',
        align:'center',
    },
    {
        title: '学科名称',
        dataIndex: 'label',
        key: 'label',
        align:'center',
    },
    {
        title: '学科编码',
        dataIndex: 'value',
        key: 'value',
        align:'center',
    },
    {
        title: '学科ID',
        // dataIndex: '_id',
        key: '_id',
        align:'center',
    },
    {
        title: '操作',
        key:'action',
        align:'center',
    },
]

onMounted(()=>{
    getsubjects()
})

// 删除 
const deleteItem = async (item:any,index:any)=>{
    let res:any = await Ajax.delsubjects({_id:item._id})
    if(res.code==200){
        // subjects.value.splice(index,1)
        subjects.value = subjects.value.filter((v:any)=>v._id!=item._id)
    }
}

// 修复数据 
const updateItem = (record:any )=>{
    alertform.value.visible =  true;
    flag.value = false;

    // 延迟dom 
    nextTick(()=>{
        console.log(record)
        updateId.value = record._id;
        alertform.value.form = Object.assign({},record)  //  深拷贝 
    })
}

// 重置 
const resetData = ()=>{
    keyword.value = '';
    getsubjects()
}
// 搜索
const todoSearch = ()=>{
    getsubjects({keyword:keyword.value})
}
</script>


<template>
    <div>
        <MyTitle title="学科管理"></MyTitle>
        <a-button type="primary" class="mt10" @click="addSubject">添加学科</a-button>
        <a-row class="mt10">
            <a-col >
                <a-input placeholder="请输入搜索关键字" v-model:value="keyword"></a-input>
            </a-col>
            <a-col >
                <a-button type="primary" @click="todoSearch">搜索</a-button>
                <a-button danger @click="resetData">重置</a-button>
            </a-col>
        </a-row>
        <a-row class="mt10">
            <a-col :span="23" :offset="0">
                <a-table :dataSource="subjects" :columns="columns" :pagination="{ pageSize:6 }" >
                    <template #bodyCell="{ column , record, index }" >
                        <template v-if="column.key === 'index'">
                            <span>{{ index+1 }}</span>
                        </template>
                        <template v-if="column.key === 'action'">
                            <a-popconfirm
                                title="你真的要删除吗???"
                                ok-text="确定"
                                cancel-text="不"
                                @confirm="deleteItem(record,index)"
                            >
                                <a-button size="small" danger>  删除 </a-button>
                            </a-popconfirm>
                            
                            <a-button size="small" type="primary" class="ml10" @click="updateItem(record)">  修改 </a-button>
                        </template>
                        <template v-if="column.key === '_id'">
                            <a-tag color="#123456" > {{ record._id  }} </a-tag>
                        </template>
                    </template>
                </a-table>
            </a-col>
        </a-row>


        <FormModal 
            ref="alertform" 
            :rules="rules"
            :submit="submitSubject"
            :title="flag?'添加学科':'修改学科'"
        >   
        <!-- #default="{form}"  #default="scope" -->
            <template #default="{form}">
                <a-form-item
                    label="学科名称"
                    name="label"
                    has-feedback
                    
                >
                    <a-input  v-model:value="form.label"></a-input>
                </a-form-item>
                <a-form-item
                    label="学科编码"
                    name="value"
                    has-feedback
                    
                >
                    <a-input  v-model:value="form.value" ></a-input>
                </a-form-item>
            </template>
        </FormModal>
    </div> 
</template>