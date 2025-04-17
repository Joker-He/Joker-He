

import  {createRouter, createWebHistory, RouteRecordRaw , createWebHashHistory } from 'vue-router'
import { LayoutRoutes } from '../views/Layout/Layout'
import { routerList } from '../utils/routeList'
import { useStore } from '../store/store'
import { Ajax } from '../api/api'
import _ from 'lodash'
import { getRouterListByRole } from '../utils'

// 1.定义路由匹配规则
const routes:Array<any> = [
    {
        path:'/',
        redirect:'/login',
        meta:{
            noguard:true,
        }
        
    },
    {
        path:'/guide',
        name:'guide',
        component:()=>import('@/views/Guide/Guide.vue'),
        meta:{
            noguard:true,
        }
    },
    {
        path:"/login",
        name:'login',
        component:()=>import('@/views/Logins/Login.vue'),
        meta:{
            noguard:true,
        }
    },
    {
        path:"/reg",
        name:'reg',
        component:()=>import('@/views/Logins/Reg.vue'),
        meta:{
            noguard:true,
        }
    },
    {
        path:"/findpass",
        name:'findpass',
        component:()=>import('@/views/Logins/FindPass.vue'),
        meta:{
            noguard:true,
        }
    },
    ...LayoutRoutes,
    {
        path:'/404',
        name:'notFound',
        component:()=>import('@/views/Errors/NotFound.vue'),
        meta:{
            noguard:true,
        }
    },
    {
        path:'/503',
        name:'Badservice',
        component:()=>import('@/views/Errors/BadService.vue'),
        meta:{
            noguard:true,
        }
    },
    // 直接刷新会进入404 
    // {   
    //     path:'/:pathMatch(.*)*',
    //     redirect:'/404'
    // }
] 

// 2. 创建路由对象
const router =  createRouter({
    routes,
    history: createWebHistory()   //  process.env.BASE_URL
})







router.beforeEach(async (to,from,next)=>{
    console.log("beforeEach - beforeEach ")

    console.log(to)
    if(to.meta.noguard){
        if(to.name=='pro'){
            next('/home')
        }else{
            next()
        }
    }else{
        
        const store = useStore()
        // 根据 role 去 过滤筛选 属于当前用户的 角色路由列表 
        let res = await Ajax.getuserinfo() as any;
        let role = res.result.userInfo.role;      
        
        const mylist = getRouterListByRole(routerList,role)
        // console.log(mylist)
        
        store.changeroutes(mylist)
        // 刷新   动态添加路由
        router.addRoute({
            name: 'pro',
            path: '/pro',
            meta:{
                noguard:true,
            },
            component:()=>import('@/views/Layout/Layout.vue'),
            children: mylist   // 需要筛选 
        })
        // 1.404 
        router.addRoute({   
            path:'/:pathMatch(.*)*',
            redirect:'/404'
        })
        next({...to,replace:true})    // 重新进入当前的路由 
    }
    
})

// 3. 暴露挂载
export default router 