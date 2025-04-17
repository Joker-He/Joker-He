
<script lang="ts" setup>
import { StarOutlined, LikeOutlined, MessageOutlined , UserOutlined  } from '@ant-design/icons-vue';
import { onMounted , ref , markRaw } from 'vue';
import { Ajax } from '../../api/api';
import SearchData from '../../components/SearchData.vue'
import moment from 'moment'
import  { useCommon } from '../../hooks/common/useCommon';
import _ from 'lodash'
import {ProjectTypes}  from '../../utils'
import { useRoute } from 'vue-router';
import { baseURL } from '../../api/request';
const {timeFormat} = useCommon()
const mylist = ref<any>([])
const route = useRoute()
const getgradeone = async ()=>{
    let res:any = await Ajax.getgradeone({_id:route.params.id})
    if(res.code==200){
        mylist.value = [res.result]
    }
}
const actions: Record<string, string>[] = [
      { type: 'StarOutlined', text: '156' },
      { type: 'LikeOutlined', text: '156' },
      { type: 'MessageOutlined', text: '2' },
];
const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 1,
}

onMounted(()=>{
    getgradeone()
})
</script>


<template>
    <div>
        <MyTitle title="项目详情" :back="true"> </MyTitle>
        <a-row class="mt10">
            <a-col :span="24">
                <a-list
                    item-layout="vertical"
                    size="large"
                    
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
                            <template #actions>
                                <!-- <span v-for="{ type, text } in actions" :key="type">
                                    <component :is="type" style="margin-right: 8px" />
                                    {{ text }}
                                </span> -->
                                <span >
                                    <StarOutlined></StarOutlined>
                                    {{ 200 }}
                                </span>
                                <span >
                                    <LikeOutlined></LikeOutlined>
                                    {{ 200 }}
                                </span>
                                <span >
                                    <MessageOutlined></MessageOutlined>
                                    {{ 200 }}
                                </span>
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
                                        <a-avatar v-if="item.author.avatar" :src="item.author.avatar.replace(/public/,baseURL)" />
                                        <a-avatar v-else  >
                                            <template #icon><UserOutlined /></template>
                                        </a-avatar>
                                    </div>
                                    <div class="mt10">
                                        {{ item.author.username  }} (学员)
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