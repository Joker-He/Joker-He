

import {defineStore } from 'pinia'

export const useDataGolbal  = defineStore('data',{
    state:()=>({
        list:[] 
    })
})