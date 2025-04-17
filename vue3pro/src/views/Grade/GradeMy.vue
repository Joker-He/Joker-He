


<script lang="ts" setup>
import { onMounted , ref} from 'vue';
import { Ajax } from '../../api/api';
import SearchData from '../../components/SearchData.vue'
import moment from 'moment'
import  { useCommon } from '../../hooks/common/useCommon';
import _ from 'lodash'
import {ProjectTypes}  from '../../utils'
const {timeFormat} = useCommon()
const mylist = ref<any>([])
const getMyGrade = async (params?:any)=>{
    let res:any = await Ajax.getmygrades(params)
    if(res.code==200){
        mylist.value  = res.result 
    }
}
const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 5,
}

const delItemOne = async (item:any )=>{
    let res:any = await Ajax.delgradeone({_id:item._id })
    if(res.code==200){
        mylist.value  = _.filter(mylist.value,(v:any)=>v._id!=item._id)
    }
}
onMounted(()=>{
    getMyGrade()
})
</script>


<template>
    <div>
        <MyTitle title="我的成绩"> </MyTitle>
        <SearchData :searchApi="getMyGrade">
            <template #default="{form}" >
                <a-col :span="4" :offset="1">
                    <a-select class="ml10" style="width:100%" v-model:value="form.type" placeholder="请选择项目类型">
                        <a-select-option :value="l.value" v-for="(l, i) in ProjectTypes" :key="i">
                            {{ l.label}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4" :offset="1">
                    <a-range-picker  v-model:value="form.date"  />
                </a-col>
            </template>
        </SearchData>
        <a-row class="mt10">
            <a-col :span="24">
                <a-list
                    item-layout="vertical"
                    size="large"
                    :pagination="pagination"
                    :data-source="mylist"
                    >
                    <template #footer>
                        <div>
                        <b class="mr10">当前时间</b>
                        <span> {{ moment().format('YYYY-MM-DD') }}</span>
                        </div>
                    </template>
                    <template #renderItem="{ item }">
                        <a-list-item key="item.title" class="aitem">
                            <template #actions v-if="item.author">
                                <tempalte >
                                    <a-popconfirm
                                        title="你真的要删除吗???"
                                        ok-text="确定"
                                        cancel-text="不"
                                        @confirm="delItemOne(item)"
                                    >
                                        <a class="mr10" >删除</a>
                                    </a-popconfirm>
                                    
                                    <router-link :to="'/grade/update/'+item._id">修改</router-link>
                                </tempalte>
                            </template>
                            <template #extra>
                                <div>
                                    <div class="info"  >
                                        <h3 >{{timeFormat(item.time)}} </h3>
                                    </div>
                                    <div class="mt10" v-if="item.author">
                                        <a-tag :color="_.find(ProjectTypes,(v:any)=>v.value==item.type)?.color" > {{ _.find(ProjectTypes,(v:any)=>v.value==item.type)?.label   }}</a-tag>
                                    </div>
                                    
                                    <div class="mt10">
                                        <a :href="item.address"> {{ item.address }}</a>
                                    </div>

                                    <div class="mt10">
                                        分数: {{ item.score ? item.score:'暂无分数' }}
                                    </div>
                                </div>
                            </template>
                            <a-list-item-meta :description="item.name">
                            </a-list-item-meta>
                                <div  class="content">  项目BUG: <br> <div v-html="item.bug"> </div>  </div>
                                <div  class="content">  项目技术: <br> <div v-html="item.jishu"> </div></div>
                                <div  class="content"> 项目亮点: <br> <div v-html="item.lightdot"> </div></div>
                                <div  class="content"> 项目细节: <br> <div v-html="item.detail"> </div></div>

                            </a-list-item>
                    </template>
                    </a-list>
            </a-col>
        </a-row>
    </div>
</template>


<style lang="scss" scoped>
.aitem{
    border:1px solid #ddd;
    border-radius: 10px;
    margin:20px 0 ;
    width:80%;
    .content{
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 100px;
        padding: 5px;
    }

    .info{
        display: flex;
        align-items: center;
        h4{
            margin-left:10px;
            margin-bottom:0;
        }
    }
}
</style>