
<script lang="ts" setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import {ref , nextTick  , onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { Ajax } from '../../api/api';
import { baseURL } from '../../api/request';
import moment from 'moment'
const route = useRoute()
const adviseData = ref<any>(null)
const getadviseData = async ()=>{
    let res :any = await Ajax.getadviseone({_id: route.params.id})
    if(res.code==200){
        nextTick(()=>{
            adviseData.value = res.result 
        })
    }
}

onMounted(()=>{
    getadviseData()
})
</script>


<template>
    <div>
        <MyTitle title="意见详情" :back="true"></MyTitle>
        <a-card hoverable style="width: 50%;margin-top:15px;" v-if="adviseData" class="mt10">
            <a-card-meta :title="adviseData.title">
                <template #description>
                    <div v-html="adviseData.content">

                    </div>
                    <div class="mt10 ">
                        <a-tag color="#123456" v-for="(l,i) in adviseData.type"> {{ l }}</a-tag>
                    </div>
                </template>
            </a-card-meta>
            <div class="mt20">
                <a-card-meta  :title="adviseData.author.username + '(本人)'" :description="moment(adviseData.time).format('YYYY-MM-DD HH:mm')">
                    <template #avatar v-if="adviseData.author.avatar">
                        <a-avatar :src="adviseData.author.avatar.replace(/public/,baseURL)" />
                    </template>
                </a-card-meta>
            </div>
            <template #actions>
                <a-space><setting-outlined key="setting" />点赞</a-space>
                <a-space><edit-outlined key="edit" />评论</a-space>
                <a-space><ellipsis-outlined key="ellipsis" />收藏 </a-space>
            </template>
        </a-card>
    </div>
</template> 