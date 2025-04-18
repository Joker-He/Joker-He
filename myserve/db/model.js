

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema 定义 表结构 
const Good_Schema = new Schema({
    "name": String,
    "price": Number,
    "discount": Number,
    "img": String,
    "type": Object 
})


const User_Schema = new Schema({
    username:String,
    phone:String,
    password:String,
    dbpass:String,
    email:String,
    avatar:String,  // 头像信息 
    role:Number, // 权限  1 学员 2. 讲师 3.管理员 
    time:Date,
    nickname:String ,   
    class:String,
    subject:String 
})


// model 表模型对象   操作数据库 操作文档  

exports.GoodModel = mongoose.model('goods',Good_Schema)
// goods = goods
// good = goodes
// good1 = good1
// city = cities
// 
exports.UserModel = mongoose.model('users',User_Schema)


const Role_Schema = new Schema({
    color:String,
    label:String,
    value:Number,
    id:Number,
    menus:Array
})

exports.RoleModel = mongoose.model('roles',Role_Schema)



const Subject_Schema = new Schema({
    label:String,
    value:String,
})

exports.SubjectModel = mongoose.model('subjects',Subject_Schema)


const Class_Schema = new Schema({
    year:String,
    index:String,
    subject:String, 
    label:String,
    value:String
})

exports.ClassModel = mongoose.model('classes',Class_Schema)



const Anno_Schema = new Schema({
    title:String,
    content:String, 
    type:Number,
    desc:String,
    author:Object,
    time:Date 
})

exports.AnnoModel = mongoose.model('annos',Anno_Schema)


const Advise_Schema = new Schema({
    title:String,
    content:String, 
    type:Array,
    desc:String,
    author:Object,
    time:Date 
})

exports.AdviseModel = mongoose.model('advises',Advise_Schema)



const Grade_Schema = new Schema({
    name:String,
    address:String,
    jishu:String,
    lightdot:String,
    bug:String,
    detail:String,
    type:Number,
    author:Object ,
    time:Date,
    score:Number , // 老师打分的  
    subject:String,
    class:String , 
})

exports.GradeModel = mongoose.model('grades',Grade_Schema)


// APP项目 

const banner_Schema = new Schema({
    imgurl:String 
})

exports.BannerModel = mongoose.model('banners',banner_Schema)



const AppUser_Schema = new Schema({
    username:String,
    phone:String,
    password:String,
    dbpass:String,
    email:String,
    avatar:String,  // 头像信息 
    role:Number, // 权限  1 学员 2. 讲师 3.管理员 
    time:Date,
    nickname:String ,   
    class:String,
    subject:String 
})

exports.AppUserModel = mongoose.model('appusers',AppUser_Schema)



const AppTravel_Schema = new Schema({
    title:String,
    address:String,
    date:Date,
    tags:Array,
    imgs:Array,
    content:String,  
    time:Date,  // 提交时间 
    author:Object,
    hot:Number,  // 热度值   进来看一次 1 点赞 2 收藏 3 评论 1 
    likes:Number,
    collects:Number,
    pings:Number
})

exports.AppTravelModel = mongoose.model('apptravels',AppTravel_Schema)




const AppLike_Schema = new Schema({
    tid:String,
    phone:String,
    userInfo:Object,
    travel:Object, 
})

exports.AppLikeModel = mongoose.model('applikes',AppLike_Schema)


const AppCollect_Schema = new Schema({
    tid:String,
    phone:String,
    userInfo:Object,
    travel:Object, 
})

exports.AppCollectModel = mongoose.model('appcollects',AppCollect_Schema)


const AppPing_Schema = new Schema({
    tid:String,   // 评论的哪个旅游
    phone:String,   // 哪个人评论的 
    userInfo:Object,
    travel:Object, 
    rate:Number,
    time:Date,
    content:String 
})

exports.AppPingModel = mongoose.model('apppings',AppPing_Schema)




// 定义一个表  
const ProUser_Schema = new Schema({
    username:String,
    phone:String,
    password:String,
    dbpass:String,
    email:String,
    avatar:String,  // 头像信息 
    role:Number, // 权限  1.客服      2.商户     3.管理员
    time:Date,
    nickname:String ,   
})

// 定义一个表模型  操作数据表 
exports.ProUserModel = mongoose.model("pro_users",ProUser_Schema)

// 定义一个表  
const ProRole_Schema = new Schema({
    value:Number,
    label:String,
    color:String 
})

// 定义一个表模型  操作数据表 
exports.ProRoleModel = mongoose.model("pro_roles",ProRole_Schema)



const ProAnno_Schema = new Schema({
    type:Number,
    title:String,
    content:String,
    desc:String,
    time:Date,
    author:Object 
})


exports.ProAnnoModel = mongoose.model("pro_annos",ProAnno_Schema)


const ProAnnoType_Schema = new Schema({
    label:String,
    value:Number,
    color:String,
})


exports.ProAnnoTypeModel = mongoose.model("pro_anno_types",ProAnnoType_Schema)


const ProClassType_Schema = new Schema({
    label:String,
    value:Number,
    color:String,
})


exports.ProClassTypeModel = mongoose.model("pro_class_types",ProClassType_Schema)


// 广告招商
const ProGao_Schema = new Schema({
    title:String,   // 投标标题 
    time:Date,    // 招商时间
    price:Number, // 广告招标价格 
    file:Object,  // 投标书 
    content:String, // 投标内容
    author:Object, // 投标人信息  ()
})


exports.ProGaoModel = mongoose.model("pro_gaos",ProGao_Schema)


// 意见
const ProAdvise_Schema = new Schema({
    title:String,   // 意见标题 
    time:Date,    // 意见时间
    content:String, // 意见内容
    type:Array, // 意见分类 
    author:Object, // 发布意见人 
    desc:String,
})


exports.ProAdviseModel = mongoose.model("pro_advise",ProAdvise_Schema)