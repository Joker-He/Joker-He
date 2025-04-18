

var express = require('express')
var router = express.Router()
var { GoodModel , UserModel , RoleModel , SubjectModel , ClassModel , AnnoModel , AdviseModel , GradeModel } = require('../db/model')
var { createToken , decodeToken } = require('../utils/token')
var axios = require('axios')
var multer = require('multer')
var routes = require('../utils/routes')
var getRouterListByRole = require('../utils')
var { insertDataFromTable  , findAllDataFromTable , findOneDataFromTable , removeDataFromTable , updateDataFromTable } = require('../db/index')
router.get('/test',(req,res)=>{
    res.json({
        code:200,
        msg:'test - 测试Api 接口的',
        result:null 
    })
})

// Find
// remove
// update
// insert 
router.get('/goodlist',(req,res)=>{
    GoodModel.find({},{
        id:0,
        '10id':0,
        'zhu10id':0
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'查询商品成功',
            result, 
        })
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})

// 注册
router.post('/register',(req,res)=>{
    var body = req.body ;  // POST 获取的参数 
    UserModel.findOne({  // find=[]  findOne = {}
        $or:[
            {
                username:body.username
            },
            {
                phone:body.phone 
            }
        ]
    },{})
    .then(result=>{
        console.log(result)
        if(result){
            // 已经注册过了
            res.json({
                code:401,
                msg:'当前的账户已经被注册了',
                result, 
            })
        }else{
            // 直接插入数据 
            body.time = new Date()  // 注册时间 
            body.role = 1;  // 学员注册 
            UserModel.insertMany(body)
            .then(data=>{
                res.json({
                    code:200,
                    msg:'注册成功',
                    result:data,  
                })
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})


// 账号登录 
// 用户名+密码
// 手机号+密码

router.post('/login',(req,res)=>{
    var body = req.body;
    UserModel.findOne({
        $or:[
            {
                username:body.account 
            },
            {
                phone:body.account 
            }
        ]
    })
    .then(result=>{
        if(result){
            if(result.password==body.password){
                // token 
                const token = createToken({
                    username:result.username,
                    phone:result.phone,
                    password:result.password,
                })
                res.json({
                    code:200,
                    msg:'登录成功',
                    result,
                    token
                })
            }else{
                res.json({
                    code:401,
                    msg:'登录失败,账号密码不匹配'
                })
            }
        }else{
            res.json({
                code:401,
                msg:'登录失败,账号不存在'
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})

// router.post('/sendcaptcha',(req,res)=>{
//     var body = req.body;
//     UserModel.findOne({
//         phone:body.phone,
//     })
//     .then(result=>{
//         if(result){
//             // 发送验证码 
//             axios.get('http://121.196.235.163:3000/captcha/sent',{
//                 params:{
//                     phone:body.phone,
//                 }
//             })
//             .then(result=>{
                
//                 res.json({
//                     code:200,
//                     msg:'成功',
//                     ...result.data,
//                     result:result.data,
//                 })
//             })
//         }else{
//             res.json({
//                 code:401,
//                 msg:'手机号未注册,请先注册'
//             })
//         }
//     })
//     .catch(err=>{
        
//         res.json({
//             code:500,
//             err,
//             msg:'服务器异常'
//         })
//     })
// })

// router.post('/checkcaptcha',(req,res)=>{
//     var body = req.body;
//     UserModel.findOne({
//         phone:body.phone,
//     })
//     .then(data=>{
//         if(data){
//             // 发送验证码 
//             axios.get('http://121.196.235.163:3000/captcha/verify',{
//                 params:body 
//             })
//             .then(result=>{
//                 if(result.data.code==200){
//                     const token = createToken({
//                         username:data.username,
//                         phone:data.phone,
//                         password:data.password,
//                     })
//                     res.json({
//                         code:200,
//                         msg:'验证成功',
//                         ...result.data,
//                         result:result.data,
//                         token, 
//                     })
//                 }else{
//                     res.json({
//                         msg:'失败',
//                         ...result.data,
//                         result:result.data,
//                     })
//                 }
//             })
//         }else{
//             res.json({
//                 code:401,
//                 msg:'手机号未注册,请先注册'
//             })
//         }
//     })
//     // .catch(err=>{
        
//     //     res.json({
//     //         code:500,
//     //         err,
//     //         msg:'服务器异常'
//     //     })
//     // })
// })

// 创造token 
router.post("/gettoken",(req,res)=>{
    var body = req.body 
    const token = createToken(body)
    res.json({
        code:200,
        msg:'成功',
        token
    })
})

// 查用户
router.post('/finduser',(req,res)=>{
    var body = req.body;
    UserModel.findOne(body)
    .then(result=>{
        if(result){
            res.json({
                code:200,
                msg:'查询成功',
                result 
            })
        }else{
            res.json({
                code:401,
                msg:'查询失败',
                result 
            })
        }
    })
    .catch(err=>{
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})

// 修改用户信息
router.post("/changepassnologin",(req,res)=>{
    var body = req.body;
    UserModel.updateMany({
        phone:body.phone
    },{
        $set:{
            password:body.password
        } 
    })
    .then(result=>{
        res.json({
            code:200,
            msg:'密码修改成功',
            result 
        })
    })
    .catch(err=>{
    
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})

// 找回密码
// router.post('/findpass',(req,res)=>{
//     var body = req.body;
//     UserModel.findOne({
//         phone:body.phone,
//     })
//     .then(data=>{
//         if(data){
//             // 发送验证码 
//             axios.get('http://121.196.235.163:3000/captcha/verify',{
//                 params:{
//                     phone:body.phone,
//                     captcha:body.captcha
//                 } 
//             })
//             .then(result=>{
//                 if(result.data.code==200){
//                     // 修改密码 
//                     UserModel.updateMany({
//                         phone:body.phone 
//                     },{
//                         $set:{
//                             password:body.password 
//                         }
//                     }).then(result=>{
//                         res.json({
//                             code:200,
//                             msg:'密码修改成功',
//                             result 
//                         })
//                     })
//                 }else{
//                     res.json({
//                         msg:'失败',
//                         ...result.data,
//                         result:result.data,
//                     })
//                 }
               
//             })
//         }else{
//             res.json({
//                 code:401,
//                 msg:'手机号未注册,请先注册'
//             })
//         }
//     })
//     // .catch(err=>{
//     //     res.json({
//     //         code:500,
//     //         err,
//     //         msg:'服务器异常'
//     //     })
//     // })
// })


// 获取用户信息
// router.get('/getuserinfo',(req,res)=>{
//     // 根据 token username phone 
//     decodeToken(req,res, ({ username })=>{
//         UserModel.findOne({
//             username
//         })
//         .then(result=>{
//             res.json({
//                 code:200,
//                 msg:'查询成功',
//                 result 
//             })
//         })  
//         .catch(err=>{
//             console.log(err)
//             res.json({
//                 code:500,
//                 err,
//                 msg:'服务器异常'
//             })
//         })
//     })
// })

router.get('/getuserinfo',(req,res)=>{
    // 根据 token username phone 
    decodeToken(req,res, async  ({ username })=>{
        let userInfo =  await UserModel.findOne({
            username
        },{_id:0}) 

        if(userInfo) {
            let role = await  RoleModel.findOne({
                value:userInfo.role 
            },{_id:0})
            let mylist = getRouterListByRole(routes,userInfo.role)
            res.json({
                code:200,
                msg:'查询成功',
                result:{
                    userInfo,
                    role,
                    routes:mylist
                }
            })
        }else{
            res.json({
                code:500,
                msg:'用户不存在,请登录',

            })
        }
        
    })
})


// 上传文件 
const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
      //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {    
      cb(null, "FX2301" + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage }).any()   // 任何文件格式 


router.post('/uplodafile',upload,(req,res)=>{
    var path = req.files[0].path 
    res.json({
        code:200,
        msg:'上传成功',
        path,
        result:path, 
    })
})

// 修改用户信息
router.post("/changeuserinfo",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        UserModel.updateMany({
            username
        },{
            $set:body 
        })
        .then(result=>{
            res.json({
                code:200,
                msg:'修改成功',
                result 
            })
        })
        .catch(err=>{
        
            res.json({
                code:500,
                err,
                msg:'服务器异常'
            })
        })
    })
})


router.post("/updateuserinfo",(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({username})=>{
        updateDataFromTable({
            model:UserModel,
            res,
            query:{
                username
            },
            data:body 
        })
    })
})


// 学科添加
router.post('/subjectadd',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        let result = await findOneDataFromTable({
            model:SubjectModel,
            res,
            query:{
                $or:[
                    {
                        label:body.label,
                    },
                    {
                        value:body.value
                    }
                ]
            },
            next:1 
        })
        if(!result){
            insertDataFromTable({
                model:SubjectModel,
                res,
                data:body 
            })
        }else{
            res.json({
                code:401,
                msg:'学科已经存在,请重新修改再操作',
            })
        }
    })
})

router.post('/getsubjects',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    if(keyword){
        query = {
            $or:[
                {value:new RegExp(keyword)},
                {label:new RegExp(keyword)},
            ]
        }
    }
    decodeToken(req,res,({username})=>{
        findAllDataFromTable({
            model:SubjectModel,
            res,
            query,
        })
    })
})

// 删除 
router.post('/delsubjects',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        removeDataFromTable({
            model:SubjectModel,
            res,
            query:body 
        })
    })
})

// 修改 
router.post('/setsubjects',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        updateDataFromTable({
            model:SubjectModel,
            res,
            query:{
                _id:body._id,
            },
            data:body 
        })
    })
})

// 添加班级 
router.post('/addclass',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({username})=>{
        let result = await findOneDataFromTable({
            res,
            model:ClassModel,
            query:body,
            next:1 
        })
        if(result){
            res.json({
                code:401,
                msg:'班级已经存在,请重新再试',
                result 
            })
        }else{
            let xueke = await findOneDataFromTable({
                res,
                model:SubjectModel,
                query:{
                    value:body.subject
                },
                next:1, 
            }) || {}

            // 插入班级 
            body.label = xueke.label +'_'+ body.year +'_'+  body.index;
            body.value = xueke.value +'_'+ body.year +'_'+  body.index;

            insertDataFromTable({
                res,
                model:ClassModel,
                data:body ,
                msg:'添加班级成功'
            })
        }
    })
    
})

router.post('/getclasses',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    if(keyword){
        query = {
            $or:[
                {value:new RegExp(keyword)},
                {label:new RegExp(keyword)},
            ]
        }
    }
    decodeToken(req,res,({username})=>{
        findAllDataFromTable({
            model:ClassModel,
            res,
            query,
        })
    })
})


// 删除 
router.post('/delclasses',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        removeDataFromTable({
            model:ClassModel,
            res,
            query:body 
        })
    })
})


// 修改
router.post('/updateclass',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,async ({username})=>{
        let result = await findOneDataFromTable({
            res,
            model:ClassModel,
            query:{
                subject:body.subject,
                year:body.year,
                index:body.index,
            },
            next:1 
        })
        if(result){
            res.json({
                code:401,
                msg:'班级已经存在,请重新再试',
                result 
            })
        }else{
            let xueke = await findOneDataFromTable({
                res,
                model:SubjectModel,
                query:{
                    value:body.subject
                },
                next:1, 
            })

            // 插入班级 
            body.label = xueke.label +'_'+ body.year +'_'+  body.index;
            body.value = xueke.value +'_'+ body.year +'_'+  body.index;

            updateDataFromTable({
                res,
                model:ClassModel,
                query:{
                    _id:body._id
                },
                data:body ,
                msg:'修改班级成功'
            })
        }
    })
    
})



// 公告新增
router.post('/addtoanno',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({username})=>{
        insertDataFromTable({
            model:AnnoModel,
            res,
            data:body 
        })
    })
})

router.post('/getannos',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var type = body.type
    var date = body.date 
    if(keyword){
        query.title = new RegExp(keyword)
    }
    if(type){
        query.type = type;
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:AnnoModel,
            res,
            query:query  
        })
    })
})

router.post('/delannoone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        removeDataFromTable({
            model:AnnoModel,
            res,
            query:{_id:body._id} 
        })
    })
})


router.post('/getannoone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        findOneDataFromTable({
            model:AnnoModel,
            res,
            query:{_id:body._id} 
        })
    })
})


router.post('/setannoone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        updateDataFromTable({
            model:AnnoModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})


// 角色查询
router.post('/getroles',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    if(keyword){
        query.label = new RegExp(keyword)
    }
    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:RoleModel,
            res,
            query:query  
        })
    })
})

// 用户添加
router.post('/adduser',(req,res)=>{
    var body = req.body ;  // POST 获取的参数 
    UserModel.findOne({  // find=[]  findOne = {}
        $or:[
            {
                username:body.username
            },
            {
                phone:body.phone 
            }
        ]
    },{})
    .then(result=>{
        console.log(result)
        if(result){
            // 已经注册过了
            res.json({
                code:401,
                msg:'当前的账户已经存在了',
                result, 
            })
        }else{
            // 直接插入数据 
            body.time = new Date()  // 注册时间 
            UserModel.insertMany(body)
            .then(data=>{
                res.json({
                    code:200,
                    msg:'注册成功',
                    result:data,  
                })
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
})


router.post('/getusers',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var role = body.role 
    var date = body.date 
    if(keyword){
        query = {
            $or:[
                {
                    username:new RegExp(keyword)
                },
                {
                    phone:new RegExp(keyword)
                }
            ]
        }
    }
    if(role){
        query.role = role 
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:UserModel,
            res,
            query:query  
        })
    })
})


router.post('/deluserone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        removeDataFromTable({
            model:UserModel,
            res,
            query:{_id:body._id} 
        })
    })
})

router.post('/setuserone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        updateDataFromTable({
            model:UserModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})

// 删除 
router.post('/delroleone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        removeDataFromTable({
            model:RoleModel,
            res,
            query:body 
        })
    })
})

// 修改 
router.post('/setroleone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res,({username})=>{
        updateDataFromTable({
            model:RoleModel,
            res,
            query:{
                _id:body._id,
            },
            data:body 
        })
    })
})

// 新增角色
router.post('/addroleone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        insertDataFromTable({
            model:RoleModel,
            res,
            data:body 
        })
    })
})


// 新增意见
router.post('/addadviseone',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({username})=>{
        insertDataFromTable({
            model:AdviseModel,
            res,
            data:body 
        })
    })
})

router.post('/getadviselist',(req,res)=>{
    var body = req.body;
    var query = {}
    var keyword = body.keyword
    var type = body.type
    var date = body.date 
    if(keyword){
        query.title = new RegExp(keyword)
    }
    if(type){
        query.type = type;
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }
    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:AdviseModel,
            res,
            query:query  
        })
    })
})

router.post('/deladviseone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        removeDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id} 
        })
    })
})

router.post('/getadviseone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        findOneDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id} 
        })
    })
})

router.post('/setadviseone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        updateDataFromTable({
            model:AdviseModel,
            res,
            query:{_id:body._id},
            data:body 
        })
    })
})

// 新增项目成绩
router.post('/addgradeone',(req,res)=>{
    var body = req.body;
    body.time = new Date()
    decodeToken(req,res, async ({username})=>{
        let result = await findOneDataFromTable({
            query:{ username},
            res, 
            model:UserModel,
            next:1, 
        }) 
        body.subject = result.subject;
        body.class = result.class;
        body.author = result;
        
        insertDataFromTable({
            model:GradeModel,
            res,
            data:body 
        })
    })
})

router.post('/getmygrades',(req,res)=>{
    var body = req.body 
    var query = {}
    var type = body.type;
    var keyword = body.keyword;
    var date = body.date;
    if(type){
        query.type = type;
    }
    if(keyword){
        query.name = new RegExp(keyword)
    }
    if(date){
        query.time = {
            $gte:date[0],
            $lte:date[1]
        }
    }

    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:GradeModel,
            res,
            query:{
                ...query,
                'author.username':username
            }
        })
    })
})

router.post('/getallgrades',(req,res)=>{
    var body = req.body;
    var query = {}
    var type = body.type;
    var keyword = body.keyword;
    var banji = body.class;  // 班级
    var score = body.score   || ''
    if(keyword){
        query = {
            'author.username':new RegExp(keyword)
        }
    }
    if(type){
        query.type = type 
    }
    if(banji){
        query.class = banji
    }
    if(score){
        switch(score){
            case "A":
                query.score = {
                    $gte:90
                }
                break;
            case "B":
                query.score = {
                    $gte:80,
                    $lt:90
                }
                break;
            case "C":
                query.score = {
                    $gte:70,
                    $lt:80
                }
                break;
            case "D":
                query.score = {
                    $gte:60,
                    $lt:70
                }
                break;
            case "E":
                query.score = {
                    $lt:60
                }
                break;
            case "F":
                query.score = ''
                break;
            default:
                break;
        }
    }
    decodeToken(req,res, async ({username})=>{
        findAllDataFromTable({
            model:GradeModel,
            res,
            query:query ,
        })
    })
})

router.post('/delgradeone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        removeDataFromTable({
            model:GradeModel,
            res,
            query:{
                _id:body._id 
            }  
        })
    })
})

router.post('/getgradeone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        findOneDataFromTable({
            model:GradeModel,
            res,
            query:{
                _id:body._id 
            }  
        })
    })
})


router.post('/setgradeone',(req,res)=>{
    var body = req.body;
    decodeToken(req,res, async ({username})=>{
        updateDataFromTable({
            model:GradeModel,
            res,
            query:{
                _id:body._id 
            },
            data:body  
        })
    })
})



module.exports =  router 
