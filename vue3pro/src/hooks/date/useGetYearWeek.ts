



// 自定义Hooks 
export const useGetYearWeek = ()=>{
     //a为年 b为月 c为日
     /*  
         date1是当前日期  
         date2是当年第一天  
         d是当前日期是今年第多少天  
         用d + 当前年的第一天的周差距的和在除以7就是本年第几周  
     */
    
    const getWeek = ()=>{
        var time = new Date()
        var a = time.getFullYear()
        var b:any = time.getMonth() + 1;
        var c = time.getDate()
    
        var date1 = new Date(a, parseInt(b) - 1, c),
        date2 = new Date(a, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
    }

    return {
        getWeek
    }

}