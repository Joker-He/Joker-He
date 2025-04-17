
<script lang="ts" setup> 
import { onMounted , toRefs ,computed , nextTick , onBeforeMount  } from 'vue';
import { Ajax } from '../../api/api'
import MyFoot from './MyFoot.vue'
import {useStore} from '../../store/store'
import MyHead from './MyHead.vue'
import MyMenu from './MyMenu.vue'
import { routerList  } from '../../utils/routeList';
import { useRouter } from 'vue-router';
import _ from 'lodash'
import { getRouterListByRole } from '../../utils';
const router = useRouter()
const store = useStore()
const { count , newCount,  changecount , userInfo     } = toRefs(store) as any;


const getUserInfoData =  async ()=>{
    let res = await Ajax.getuserinfo() as any;
    if(res.code==200){
        store.getAsyncData(res.result)
        // BUG
        const mylist = getRouterListByRole(routerList,res.result.userInfo.role)
        console.log(mylist)
        nextTick(()=>{
            store.changeroutes(mylist)
        })
        
    }
}

const countone = computed(()=>store.count)
// 动态路由 
const toAddRouteDeyamic = ()=>{
    
    // addRoute
    router.addRoute({
        name: 'pro',
        path: '/pro',
        component:()=>import('@/views/Layout/Layout.vue'),
        meta:{
            noguard:true,
        },
        children: routerList   // 需要筛选 
    })

    router.addRoute({   
        path:'/:pathMatch(.*)*',
        redirect:'/404'
    })
    // 1.404 
    // 2.白屏 

    // router.push('/home')  // 重定向 
    // 等待动态路由加载完毕
    // nextTick(()=>{
    //     router.push('/home')  // 重定向 
    // })
}


onMounted(()=>{
    console.log(store)
    getUserInfoData()
    // window.location.reload() 
})


</script>


<template>
    <a-layout>
        <MyMenu/>
        <a-layout>
            <MyHead></MyHead>
            <a-layout-content class="mainbox">
                <router-view></router-view>
            </a-layout-content>
            <MyFoot/>
        </a-layout>
    </a-layout>
</template>

<style scoped>
.mainbox{
    padding:15px;
    overflow: auto;
}
</style>
