

import { message } from 'ant-design-vue'; 


let hide:any = null;
export const ShowLoading = (msg:string='加载中...')=>{
    message.destroy()
    hide = message.loading(msg, 0);
}

export const ShowSuccess = (msg:string='成功')=>{
    message.destroy()
    message.success(msg,1);
}

export const ShowFail = (msg:string='失败')=>{
    message.destroy()
    message.error(msg,1);
}