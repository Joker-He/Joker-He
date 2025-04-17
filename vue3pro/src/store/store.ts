

import {defineStore } from 'pinia'
import { Ajax } from '../api/api';

// 不是hooks 
export const useStore = defineStore('main',{

     // 开启数据持久化
    persist: true, 
    
    state:()=>({
        count:2000,
        userInfo:{},
        collapsed:false,  // false 不收起  true 收起
        annoList:[] ,   // 公告列表
        userList:[],
        roleList:[], // 权限列表 
        adviseList:[], // 意见列表 
        routes:[], // 路由权限列表 
    }),
    getters:{
        newCount:(state)=>{
            return state.count * 2 
        }
    },
    actions:{  // 修改数据 
        changecount(payload:number){
            this.count += payload;
        },
        changeUserInfo(payload:any){
            this.userInfo = payload;
        },
        getAsyncData(payload:any){
            this.userInfo = {...payload.userInfo , ...payload.role}
            // console.log(this.userInfo)
        },
        clearUserInfo(){
            this.userInfo = {}
        },
        changecollapsed(payload:boolean){
            this.collapsed = payload;
        },
        async getAnnoList(payload?:any){
            let res = await Ajax.getannos(payload) as any
            if(res.code==200){
                this.annoList = res.result 
            }
        },
        changeAnnoList(payload:any){
            this.annoList = payload
            console.log(this.annoList)
        },
        async getUserListAsync(payload? :any ){
            let res = await Ajax.getusers(payload) as any
            if(res.code==200){
                this.userList = res.result 
            }
        },
        getUserListSync(payload:any){
            this.userList = payload
        },

        async getRoleListAsync(payload? :any ){
            let res = await Ajax.getroles(payload) as any
            if(res.code==200){
                this.roleList = res.result 
            }
        },
        
        getRoleListSync(payload:any){
            this.roleList = payload
        },

        async getAdviseListAsync(payload? :any ){
            let res = await Ajax.getadviselist(payload) as any
            if(res.code==200){
                this.adviseList = res.result 
            }
        },
        
        setAdviseListSync(payload:any){
            this.adviseList = payload
        },

        changeroutes(payload:any){
            this.routes = payload;
        }

    }
})