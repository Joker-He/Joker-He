

<script lang="ts" setup>
import { EyeOutlined } from '@ant-design/icons-vue'; 
import { onMounted , ref , toRef } from 'vue';
import {ProjectTypes , scoreTypes } from '../../utils'
import SearchData from '../../components/SearchData.vue'
import {Ajax} from '../../api/api'
import TableData from '../../components/TableData.vue'
import { useCommon } from '../../hooks/common/useCommon';
import _ from 'lodash'
import FormModal from '../../components/FormModal.vue'
import Qrcode from '../../components/Qrcode.vue'

import { useValidate } from '../../hooks/date/useValidate';
import { validateType } from '_vue-types@3.0.2@vue-types';
import { useStore } from '../../store/store';
import * as XLSX from 'xlsx' // Vue3 版本 
const search = ref<any>()
const {num} = useValidate()
const formone = ref<any>()
const classList = ref<any>([])
const grades = ref<any>()
const cdata = ref<any>()
const store = useStore()
const userInfo:any  = toRef(store,'userInfo')
const {timeFormat , gotowhere} = useCommon()
const getClasses = async ()=>{
    let res:any  = await Ajax.getclasses() 
    if (res.code == 200) {
        classList.value = res.result;
    }
}


const getGrades = async (params?:any)=>{
    let res:any = await Ajax.getallgrades(params)
    if(res.code==200){
        grades.value = res.result 
    }
}

const columns = [
    {
        title: '序号',
        key:'index',
        align:'center',
    },
    {
        title: '项目标题',
        dataIndex: 'name',
        key: 'name',
        align:'center',
    },
    {
        title: '项目分类',
        dataIndex: 'type',
        key: 'type',
        align:'center',
    },
    {
        title: '项目地址',
        dataIndex: 'address',
        key: 'address',
        align:'center',
    },
    {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
        align:'center',
    },
    {
        title: '二维码',
        key: 'code',
        align:'center',
    },
    {
        title: '班级',
        dataIndex: 'class',
        key: 'class',
        align:'center',
    },
    {
        title: '学员名称',
        key: 'author',
        align:'center',
    },
    {
        title: '分数',
        key: 'score',
        align:'center',
    },
    {
        title: '操作',
        key:'action',
        align:'center',
    },
]
const gotoseen = (record:any)=>{
    console.log(record)
    gotowhere('/grade/detail/'+record._id)
}

// 打分 弹框 
const tosetScore = (record:any)=>{
    formone.value.showModal()
    cdata.value = record;
}
const setGradeScore = async (value:any)=>{
    let res:any = await Ajax.setgradeone({
        _id: cdata.value._id ,
        score:value.score 
    }) 
    if(res.code==200){
        formone.value.closeModal()
        getGrades()
    }
}
const rowClassName = (record :any ,index :any )=>{
    if(!record.score){
        return 'no-score'
    }
    else if(record.score<60){
        return 'low-score'
    }
    
}

const ExportXlsx = (form:any) => {

    search.value.todoSearch()  // 先执行搜索

  // 创建工作表
  const list = _.map(grades.value,(item:any)=>{
    const obj:any = {}
    // 
    for(const k in item){
        for(const key in columns){
            if(k==columns[key].key){
                obj[columns[key].title] = item[k]
                if(columns[key].key=='type'){ // 项目分类 
                    obj[columns[key].title] = _.find(ProjectTypes,(v:any)=>v.value==item[k])?.label  // 替换
                }
                if(columns[key].key=='author'){ // 名称  
                    obj[columns[key].title] =  item[k].username  
                }
                obj['项目细节']= item['detail']
            }
        }
    }
    // console.log(obj)
    return obj
  })
  const data = XLSX.utils.json_to_sheet(list)
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, 'data')
  // 生成文件并下载
  console.log(form)
  var typename:any  = ''
  var classname = ''
  if(form.class){
    classname = _.find(classList.value,(item:any)=>item.value==form.class)?.label;
  }
  if(form.type){
    typename = _.find(ProjectTypes,(item:any)=>item.value==form.type)?.label;
  }

  var filename = ''
  if(form.class && form.type){
    filename = classname+'_'+typename+'_项目成绩列表.xlsx'
  }
  else if(form.class){
    filename = classname+'_项目成绩列表.xlsx'
  }
  else if(form.type){
    filename = typename+'_项目成绩列表.xlsx'
  }
  else{
    filename = '项目成绩列表.xlsx'
  }

  XLSX.writeFile(wb,filename)
}
onMounted(()=>{
    getGrades()
    getClasses()
})
</script>



<template>
    <div>
        <MyTitle title="成绩列表"> </MyTitle>
        <FormModal
            ref="formone"
            title="设置分数"
            :submit="setGradeScore"
        >
            <template #default="{form}">
                <a-form-item
                    label="分数"
                    name="score"
                    has-feedback
                    :rules="[ 
                        {
                            required: true, message: '请输入!',
                        },
                        {
                            pattern:num, message:'必须为数字(0-100)'
                        }
                    ]"
                >
                    <a-input autocomplete="off" placeholder="请输入分数"  v-model:value="form.score"></a-input>
                </a-form-item>
            </template>
            
        </FormModal>
        <SearchData ref="search" :searchApi="getGrades" placeholder="请输入学员名字">
            <template #default="{form}" >
                <a-col :span="4" :offset="1">
                    <a-select class="ml10" style="width:100%" v-model:value="form.type" placeholder="请选择项目类型">
                        <a-select-option :value="l.value" v-for="(l, i) in ProjectTypes" :key="i">
                            {{ l.label}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4" :offset="1">
                    <a-select  v-model:value="form.class" placeholder="请选择对应班级" style="width:100%">
                        <a-select-option
                            :value="l.value"
                            v-for="(l, i) in classList"
                            :key="i"
                        >
                            {{ l.label }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4" :offset="1">
                    <a-select  v-model:value="form.score" placeholder="请选择分数类别" style="width:100%">
                        <a-select-option
                            :value="l.value"
                            v-for="(l, i) in scoreTypes"
                            :key="i"
                        >
                            {{ l.label }}
                        </a-select-option>
                    </a-select>
                </a-col>
            </template>

            <template #export="{form}">
                <a-button  @click="ExportXlsx(form)" type="primary" class="ml10" >导出数据</a-button>
            </template>
        </SearchData>

        <TableData :dataSource="grades" :columns="columns" :pagination="{ pageSize:30  }" :rowClassName="rowClassName">
            <template #default="{record,column}">
                <template v-if="column.key === 'time'">
                    <span> {{ timeFormat(record.time)  }}</span>
                </template>

                <template v-if="column.key === 'type'">
                    <a-tag :color="_.find(ProjectTypes,(v:any)=>v.value==record.type)?.color" > {{ _.find(ProjectTypes,(v:any)=>v.value==record.type)?.label   }}</a-tag>
                </template>

                <template v-if="column.key === 'author'">
                    <a-tag color="#999" > {{ record.author.username  }}</a-tag>
                </template>

                <template v-if="column.key === 'address'">
                    <a :href="record.address" target="__blank"> {{ record.address }}</a>
                </template>

                <template v-if="column.key === 'code'">
                    <Qrcode :text="record.address"></Qrcode>
                </template>

                <template v-if="column.key === 'class'">
                    <span>
                        {{ _.find(classList,(v:any)=>v.value==record.class)?.label  }}
                        <!-- {{  record.class }} -->
                    </span>
                </template>

                <template v-if="column.key === 'score'">
                    <span v-if="record.score">
                        <b>{{record.score  }}</b>
                    </span>
                    <span v-else>
                        <a-button v-if="userInfo.role==3"  type="primary" size="small" @click="tosetScore(record)">打分</a-button>
                        <span v-else>未打分</span>
                    </span>
                </template>
            </template>

            <template #action="{record,column}">
                <a-button  type="primary" @click="gotoseen(record)" size="small" shape="circle" class="ml10">
                    <template #icon  ><EyeOutlined /></template>
                </a-button>
            </template>
        </TableData>

    </div>
</template>

<style lang="scss" >
.no-score{
    background: #ddd !important; 
}

.low-score{
    background: #f99 !important; 
}
</style>