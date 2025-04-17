<script lang="ts" setup>
import { onMounted , reactive  , ref , toRefs , onBeforeMount } from 'vue';
import { Ajax } from '../../api/api';
import Dao from '../../components/Dao.vue'
import { useGetYearWeek } from '../../hooks/date/useGetYearWeek';
import {getWeekYear} from '../../utils'
import { useStorage } from '@vueuse/core'
import { onBeforeRouteLeave, useRouter  } from 'vue-router';


let banners = ref<any>([])
let banner = reactive<any>({
    list:[]
})
let router = useRouter()
let {getWeek }  = useGetYearWeek()

const {list} = toRefs(banner)
const getBannerData = ()=>{
    
    // Ajax.getBanner()
    // .then(res=>{
    //     console.log(res)
    // })
    Ajax.getData()
    .then((res:any)=>{
        console.log(res)
        // banner = res.banners;
        banners.value = res.banners;
    })
}

const getBannerDataTwo = async  ()=>{
    let res = await Ajax.getDataTwo()  as unknown as any; 
    console.log(res)
    banner.list = res.returnData.page_content
}

onBeforeMount(()=>{
    let week:any  = getWeek()   // 当前的周数 
    // console.log(week)
    const localWeek = useStorage('localWeek','')   // 本地存储的周数 localStorage.getItem  
    // console.log(localWeek.value)
    // 如果本地没有 localWeek  说明没有访问过
    // 如果本地有 localWeek  就要比较 和   week 的大小 
    if(localWeek.value){
        if(localWeek.value==week){
            router.push('/pro')
        }else{
            // useStorage('localWeek',week)
            localWeek.value = week  // 修改 localStorage.setItem 
        }
    }else{
        // 第一次访问 
        // useStorage('localWeek',week) // 设置 localWeek 
        localWeek.value = week 
    }
})



onMounted(()=>{
    // getBannerData()
    getBannerDataTwo()
})
</script>


<template>
    <div class="guide">
        <div class="guide-box">
            <Dao url="/pro"  :interval="50"      ></Dao>
            <a-carousel autoplay dots  class="a-cars">
                <!-- <div class="swipe-item" v-for="(l,i) in banners" :key="i">
                    <img :src="l.imageUrl" alt="" class="aimg">
                </div> -->
                <div class="swipe-item" v-for="(l,i) in list" :key="i">
                    <img :src="l.mid_table_remark_002" alt="" class="aimg">
                </div>
            </a-carousel>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.guide{
    width:100%;
    height:100%;
    overflow: hidden;
    &-box{
        width:800px;
        height:400px;
        margin:120px auto;
        border:1px solid #ddd;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        .aimg, .a-cars{
            width:800px;
            height:400px;
        }
    }
}


</style>