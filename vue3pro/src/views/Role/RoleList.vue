

<script lang="ts" setup>
import { toRef , onMounted  , reactive  , ref  , nextTick } from 'vue';
import { useStore } from '../../store/store';
import TableData from '../../components/TableData.vue'
import SearchData from '../../components/SearchData.vue'
import FormModal from '../../components/FormModal.vue'
import _ from 'lodash'
import { Ajax } from '../../api/api';
const store = useStore()
const alertform = ref<any>()
const flag = ref<Boolean>(true)
const uid = ref<String>('')
const roleList:any  = toRef(store,'roleList')
const rules = reactive({
    label:[
        {
            required: true, message: '请输入!'
        }
    ],
    value:[
        {
            required: true, message: '请输入!'
        }
    ],
    color:[
        {
            required: true, message: '请选择!'
        }
    ],
})
const columns = reactive([
    {
        title: '序号',
        key:'index',
        align:'center',
    },
    {
        title: '角色名称',
        dataIndex: 'label',
        key: 'label',
        align:'center',
    },
    {
        title: '角色值',
        dataIndex: 'value',
        key: 'value',
        align:'center',
    },
    {
        title: '角色ID',
        dataIndex: '_id',
        key: '_id',
        align:'center',
    },
    {
        title: '颜色属性',
        dataIndex: 'color',
        key: 'color',
        align:'center',
    },
    {
        title: '操作',
        key:'action',
        align:'center',
    },
])
onMounted(()=>{
    store.getRoleListAsync()
})

// 删除
const delUserOne = async (item:any)=>{
    let res:any = await Ajax.delroleone({_id:item._id})
    if(res.code==200){
        // store.getRoleListAsync()
        let list = _.filter(roleList.value,(v:any)=>item._id!=v._id) 
        store.getRoleListSync(list)
    }
}
// 修改
const setUserOne = (item:any)=>{
    alertform.value.showModal()
    flag.value = false;
    uid.value = item._id;
    nextTick(()=>{
        alertform.value.form = Object.assign({},item)
    })
}
// 新增
const submitForm = async  (value:any)=>{
    if(flag.value){
        // 添加
        let res = await Ajax.addroleone(value ) as any;
        if(res.code==200){
            store.getRoleListAsync()
            alertform.value.closeModal()
        }
    }else{
        // 修改
        value._id = uid.value;
        let res = await Ajax.setroleone(value ) as any;
        if(res.code==200){
            // store.getRoleListAsync()
            alertform.value.closeModal()
            let list = _.map(roleList.value ,(v:any)=>{
                if(value._id == v._id){
                    v={...value}
                }
                return v;
            })
            store.getRoleListSync(list)
            
            getUserInfoData()
        }
    }
}   

const getUserInfoData =  async ()=>{
    let res = await Ajax.getuserinfo() as any;
    if(res.code==200){
        store.getAsyncData(res.result)
    }
}
const addRoles = ()=>{
    alertform.value.showModal()
    flag.value = true;
    nextTick(()=>{
        alertform.value.form.value = _.last(roleList.value)?.value + 1;
    })
}
</script>


<template>
    <div>
        <MyTitle title="角色列表"></MyTitle>
        <a-button danger class="mt10" @click="addRoles">添加角色</a-button>
        <SearchData :searchApi="store.getRoleListAsync">

        </SearchData>
        <FormModal
            ref="alertform"
            :rules="rules"
            :submit="submitForm"
            :title="flag?'添加角色':'修改角色信息'"
            >
            <template #default="{ form }">
                <a-form-item
                    label="角色名称"
                    name="label"
                    has-feedback

                >
                    <a-input autocomplete="off" placeholder="请输入角色名称"  v-model:value="form.label"></a-input>
                </a-form-item>

                <a-form-item
                    label="角色值"
                    name="value"
                    has-feedback
                    
                >   
                    <a-input disabled  autocomplete="off" placeholder="请输入角色值"  v-model:value="form.value"></a-input>
                </a-form-item>

                <a-form-item
                    label="颜色属性"
                    name="color"
                    has-feedback
                >   
                    <a-input type="color"  v-model:value="form.color"></a-input>
                </a-form-item>
            </template>
        </FormModal>
        <TableData 
            :dataSource="roleList" 
            :columns="columns" 
            @deleteOne="delUserOne"
            @updateOne="setUserOne"
            
        >
            
            <template #default="{record,column}">
                <template v-if="column.key=='label'">
                    <a-tag :color='record.color'> {{ record.label  }}</a-tag>
                </template>
                <template v-if="column.key=='color'">
                    <a-input type="color" disabled v-model:value="record.color" />
                </template>
                <template v-if="column.key=='_id'">
                    <a-tag color='#333'> {{ record._id  }}</a-tag>
                </template>
            </template>
        </TableData>
    </div>
</template>