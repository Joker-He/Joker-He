import { useRouter } from "vue-router"
import { ShowFail } from "../../utils/message"
import moment from 'moment'


export const useCommon = ()=>{

    const router = useRouter()
    const timeFormat = (date:any,format?:any)=>{
        format = format || 'YYYY-MM-DD '
        return moment(date).format(format)
    }
    const gotowhere = (url:string)=>{
        router.push(url)
    }
    const onFinishFailed = (msg='错误')=>{
        ShowFail(msg)
    }
    const resetData = (formRef:any)=>{
        formRef.resetFields()
    }

    return {
        onFinishFailed,
        gotowhere,
        resetData,
        timeFormat
    }
}