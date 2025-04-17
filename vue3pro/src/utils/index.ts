


export const getWeekYear = ()=>{
    var time = new Date()
    var a = time.getFullYear()
    var b:any = time.getMonth() + 1;
    var c = time.getDate()

    var date1 = new Date(a, parseInt(b) - 1, c),
    date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
}


export const AnnoTypes = [
    {
        label:'普通公告',
        value:1,
        id:1,
        color:"#123456"
    },
    {
        label:'紧急公告',
        value:2,
        id:2,
        color:"#f50"
    },
    {
        label:'重要公告',
        value:3,
        id:3,
        color:"#0f0"
    },
    {
        label:'置顶公告',
        value:4,
        id:4,
        color:"#bbbbbb"
    }
]


export const  AdviseTypes:any  = [
    {
        title:"one",
        value:"服务意见",
        label:"服务意见",
        children:[
            {
                value:"保险服务",
                title:"one_1",
                label:"保险服务",
            },
            { 
                value:"维修服务",
                title:"one_2",
                label:"维修服务",
            },
            {
              value:"回访服务",
              title:"one_3",
              label:"回访服务",
            },
            {
                value:"客服服务",
                title:"one_3",
                label:"客服服务",
            }
        ],
    },
    {
        value:"绩效意见",
        title:"two",
        label:"绩效意见",
        children:[
            {
                value:"加班意见",
                title:"two_1",
                label:"加班意见",
                children:[
                    {
                        value:"没有加班费",
                        title:"two_1_1",
                        label:"没有加班费",
                    },
                    {
                        value:"恶意加班",
                        title:"two_1_2",
                        label:"恶意加班",
                    }
                ]
            },
            {
                value:"薪资意见",
                title:"two_2",
                label:"薪资意见",
            }
        ]
    },
    {
        title:"three",
        value:"其他意见",
        label:"其他意见",
        children:[
            {
                value:"生活意见",
                title:"three_1",
                label:"生活意见",
            },
            { 
                value:"服务意见",
                title:"three_2",
                label:"服务意见",
            },
            {
              value:"前台意见",
              title:"three_3",
              label:"前台意见",
            },
        ],
    },    
]





export const ProjectTypes = [
    {
        label:'Vue2',
        value:1,
        id:1,
        color:"#123456"
    },
    {
        label:'Vue3',
        value:2,
        id:2,
        color:"#f50"
    },
    {
        label:'React',
        value:3,
        id:3,
        color:"#0f0"
    },
    {
        label:'小程序',
        value:4,
        id:4,
        color:"#bbbbbb"
    },
    {
        label:'原生',
        value:5,
        id:5,
        color:"#999"
    },
    {
        label:'其他',
        value:6,
        id:6,
        color:"#000"
    }
]


export const scoreTypes = [
    {
        label:'90分区间',  // 90 
        value:"A",
        id:1,
        color:"#123456"
    },
    {
        label:'80分区间',  // 80 
        value:"B",
        id:2,
        color:"#123456"
    },
    {
        label:'70分区间',  // 80 
        value:"C",
        id:3,
        color:"#123456"
    },
    {
        label:'60分区间',  // 80 
        value:"D",
        id:4,
        color:"#123456"
    },
    {
        label:'不及格',  // 80 
        value:"E",
        id:5,
        color:"#123456"
    },
    {
        label:'未打分',  // 80 
        value:"F",
        id:6,
        color:"#123456"
    },
]

import _ from 'lodash'

// 数组递归 
export const getRouterListByRole = (arr:any,role:Number)=>{    
    let newArr = _.filter([...arr],(item:any)=>{
        if(item.max){
            return role>=item.role && role<= item.max; 
        }else{
            return role>=item.role;
        }
    })
    
    
    _.forEach(newArr,(item:any)=>{
        if(item.children){
            return item.children = getRouterListByRole(item.children,role)  ;  // 第二次循环递归 
        }
    })

    return [...newArr]
}