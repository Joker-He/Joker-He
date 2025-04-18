

// 项目里面所有的类型的定义  


export type nameTypes = string | number | boolean;
export type numTypes = string | number | undefined

export interface spanTypes{
    left:string,
    top:string,
    transform:string,
    animationDelay:string,
    background:string
}


export interface FormState {
    account?: string;
    username?: string;
    password?: string;
    phone?: string;
    dbpass?:string;
    captcha?:string;
}