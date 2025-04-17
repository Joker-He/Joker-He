

<script>
import { BackwardOutlined } from '@ant-design/icons-vue';
export default {
    components:{BackwardOutlined},
    props:{
            level:{
            type:Number,
            default:3
        },
        title:{
            type:String,
            default:''
        },
        back:{
            type:Boolean,
            default:false 
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>


<!-- <script lang="ts" setup >
import { BackwardOutlined } from '@ant-design/icons-vue';
const props = defineProps({
    level:{
        type:Number,
        default:3
    },
    title:{
        type:String,
        default:''
    },
    back:{
        type:Boolean,
        default:false 
    }
})
</script> -->


<template>
    <div class="title">
        <a-typography-title :level="level" class="title-text">{{ title }}</a-typography-title>
        <BackwardOutlined class="icon" v-if="back" @click="goback"></BackwardOutlined>
    </div>
</template>


<style lang="scss" scoped>
.title{
    display:flex;
    align-items: center;
    &-text{
        color:#f49;
        margin:0;
    }
    .icon{
        color:#f49;
        font-size:30px;
        margin-left:10px;
    }
}
</style>