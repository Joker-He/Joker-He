


export const LayoutRoutes:any =  [
    {
        path:'/pro',
        name:'pro',
        component:()=>import('@/views/Layout/Layout.vue'),
        meta:{
            noguard:true,
        }
        // redirect:'/home',
        // children:[
        //     {
        //         path:'/home',
        //         name:'home',
        //         text:"首页",
        //         component:()=>import('@/views/Home/Home.vue')
        //     },
        //     {
        //         path:'/mine',
        //         name:'mine',
        //         text:"个人中心",
        //         component:()=>import('@/views/Mine/Mine.vue')
        //     },

        //     {
        //         path:'/anno/list',
        //         name:'anno-list',
        //         component:()=>import('@/views/Anno/AnnoList.vue')
        //     },
        //     {
        //         path:'/anno/add',
        //         name:'anno-add',
        //         component:()=>import('@/views/Anno/AnnoAdd.vue')
        //     },
        //     {
        //         path:'/anno/update/:id',
        //         name:'anno-update',
        //         component:()=>import('@/views/Anno/AnnoUpdate.vue')
        //     },

        //     {
        //         path:'/edu/class',
        //         name:'edu-class',
        //         component:()=>import('@/views/Edu/ClassOpen.vue')
        //     },
        //     {
        //         path:'/edu/subject',
        //         name:'edu-subject',
        //         component:()=>import('@/views/Edu/Subject.vue')
        //     },
        //     {
        //         path:'/edu/student',
        //         name:'edu-student',
        //         component:()=>import('@/views/Edu/StudentOpen.vue')
        //     },
        //     // 用户管理
        //     {
        //         path:'/user/add',
        //         name:'user-add',
        //         component:()=>import('@/views/User/UserAdd.vue')
        //     },
        //     {
        //         path:'/user/list',
        //         name:'user-list',
        //         component:()=>import('@/views/User/UserList.vue')
        //     },

        //     // 角色管理
        //     {
        //         path:'/role/list',
        //         name:'role-list',
        //         component:()=>import('@/views/Role/RoleList.vue')
        //     },
        //     {
        //         path:'/role/data',
        //         name:'role-data',
        //         component:()=>import('@/views/Role/RoleData.vue')
        //     },

        //     // 意见管理
        //     {
        //         path:'/advise/add',
        //         name:'advise-add',
        //         component:()=>import('@/views/Advise/AdviseAdd.vue')
        //     },
        //     {
        //         path:'/advise/list',
        //         name:'advise-list',
        //         component:()=>import('@/views/Advise/AdviseList.vue')
        //     },
        //     {
        //         path:'/advise/update/:id',
        //         name:'advise-update',
        //         component:()=>import('@/views/Advise/AdviseUpdate.vue')
        //     },
        //     {
        //         path:'/advise/detail/:id',
        //         name:'advise-detail',
        //         component:()=>import('@/views/Advise/AdviseDetail.vue')
        //     },


        //     // 项目成绩管理
        //     {
        //         path:'/grade/my',
        //         name:'grade-my',
        //         component:()=>import('@/views/Grade/GradeMy.vue')
        //     },
        //     {
        //         path:'/grade/list',
        //         name:'grade-list',
        //         component:()=>import('@/views/Grade/GradeList.vue')
        //     },
        //     {
        //         path:'/grade/add',
        //         name:'grade-add',
        //         component:()=>import('@/views/Grade/GradeAdd.vue')
        //     },
        //     {
        //         path:'/grade/data',
        //         name:'grade-data',
        //         component:()=>import('@/views/Grade/GradeData.vue')
        //     },
        //     {
        //         path:'/grade/update/:id',
        //         name:'grade-update',
        //         component:()=>import('@/views/Grade/GradeUpdate.vue')
        //     },
        //     {
        //         path:'/grade/detail/:id',
        //         name:'grade-detail',
        //         component:()=>import('@/views/Grade/GradeView.vue')
        //     },
        // ]   
    }
]