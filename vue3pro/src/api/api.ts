
import { FormState } from '../utils/types'
import  {request, GET, POST }  from './request'

export const Ajax = {
    getBanner:()=>request({url:'http://121.196.235.163:3000/banner'}),

    getData:(data?:object)=>GET('http://121.196.235.163:3000/banner',data),

    getDataTwo:(data?:object)=>GET('/tutu/duzikai_api_mgr_public_middle_table?invoke_method=public_load_middle_table_list&pre_db_para_middle_table_name=public_middle_table_lite_mod_interview_exam&type_middle_app=14001&type_inner_app=1001',data),

    getTestMsg:()=>GET('/api/test'),

    todoRegister:(data:FormState)=>POST('/api/register',data),

    todoLogin:(data:FormState)=>POST('/api/login',data),

    sentCaptcha:(data:FormState)=>GET('http://121.196.235.163:3000/captcha/sent',data),

    verifyCaptcha:(data:FormState)=>GET('http://121.196.235.163:3000/captcha/verify',data),

    findUser:(data:FormState)=>POST('/api/finduser',data),

    getToken:(data:FormState)=>POST('/api/gettoken',data),

    changepassnologin:(data:FormState)=>POST('/api/changepassnologin',data),

    sentCaptchaMore:(data:FormState)=>POST('/api/sendcaptcha',data),

    checkcaptcha:(data:FormState)=>POST('/api/checkcaptcha',data),

    findpass:(data:FormState)=>POST('/api/findpass',data),

    getuserinfo:()=>GET('/api/getuserinfo'),

    uploadfile:(data:any)=>POST('/api/uploadfile',data ),

    changeuserinfo:(data:any)=>POST('/api/changeuserinfo',data ),

    updateuserinfo:(data:any)=>POST('/api/updateuserinfo',data ),

    // 学科

    subjectadd:(data?:any)=>POST('/api/subjectadd',data ),

    getsubjects:(data?:any)=>POST('/api/getsubjects',data ),

    delsubjects:(data?:any)=>POST('/api/delsubjects',data ),

    setsubjects:(data?:any)=>POST('/api/setsubjects',data ),
    
    // 班级

    addclass:(data?:any)=>POST('/api/addclass',data ),

    getclasses:(data?:any)=>POST('/api/getclasses',data ),

    delclasses:(data?:any)=>POST('/api/delclasses',data ),

    updateclass:(data?:any)=>POST('/api/updateclass',data ),

    // 公告

    addtoanno:(data?:any)=>POST('/api/addtoanno',data ),

    getannos:(data?:any)=>POST('/api/getannos',data ),

    delannoone:(data?:any)=>POST('/api/delannoone',data ),

    getannoone:(data?:any)=>POST('/api/getannoone',data ),

    setannoone:(data?:any)=>POST('/api/setannoone',data ),

    // 角色
    getroles:(data?:any)=>POST('/api/getroles',data ),

    addroleone:(data?:any)=>POST('/api/addroleone',data ),

    delroleone:(data?:any)=>POST('/api/delroleone',data ),

    setroleone:(data?:any)=>POST('/api/setroleone',data ),

    // 用户管理 user
    adduser:(data?:any)=>POST('/api/adduser',data ),

    getusers:(data?:any)=>POST('/api/getusers',data ),

    deluserone:(data?:any)=>POST('/api/deluserone',data ),

    setuserone:(data?:any)=>POST('/api/setuserone',data ),


    // 意见

    addadviseone:(data?:any)=>POST('/api/addadviseone',data ),

    getadviselist:(data?:any)=>POST('/api/getadviselist',data ),

    deladviseone:(data?:any)=>POST('/api/deladviseone',data ),

    getadviseone:(data?:any)=>POST('/api/getadviseone',data ),

    setadviseone:(data?:any)=>POST('/api/setadviseone',data ),


    // 项目成绩 
    addgradeone:(data?:any)=>POST('/api/addgradeone',data ),

    getmygrades:(data?:any)=>POST('/api/getmygrades',data ),

    delgradeone:(data?:any)=>POST('/api/delgradeone',data ),

    getgradeone:(data?:any)=>POST('/api/getgradeone',data ),

    setgradeone:(data?:any)=>POST('/api/setgradeone',data ),

    getallgrades:(data?:any)=>POST('/api/getallgrades',data ),

}