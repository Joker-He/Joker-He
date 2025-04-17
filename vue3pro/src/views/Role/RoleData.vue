
<script lang="ts" setup>
import ChartMap from '../Home/ChartMap.vue'
import * as echarts from "echarts";
import {reactive , onMounted , ref , nextTick  } from 'vue'
import { useStore } from '../../store/store';
import {Ajax} from '../../api/api'
import _ from 'lodash'
const chartOneData = ref({})
const chartTwoData = ref({})
const chatmap = ref<any>()
const chatmap2 = ref<any>()

const getOneChartInit = async ()=>{
    let res:any = await Ajax.getroles()   // 角色
    let res1:any = await Ajax.getusers()  // 用户 
    let data:any = []

    _.forEach(res.result,(item:any)=>{
        data.push({
            name:item.label,
            value: _.filter(res1.result, (v:any)=>v.role==item.value).length 
        })
    })
    console.log(data)

    chartOneData.value = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
            name: '人员比例分析',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data 
            }
        ]
    }

    var list:any = []
    var values :any = []
    _.forEach(data,(item:any)=>{
        list.push(item.name)
        values.push(item.value)
    })
    chartTwoData.value = {
        title: {
        text: "人员分析表",
        },
        tooltip: {},
        legend: {
        data: ["人数"],
        },
        xAxis: {
        data: list
        },
        yAxis: {},
        series: [
            {
                name: "人数",
                type: "bar",
                data: values,
            },
        ],
    }

    nextTick(()=>{
        // 异步 二次初始化
        chatmap.value.ChartMapInit()
        chatmap2.value.ChartMapInit()

    })
}

onMounted(()=>{
    getOneChartInit()
})


</script>


<template>
    <div>
        <MyTitle title="角色数据分析"></MyTitle>
        <a-row class="arow">
            <a-col :span="11" >
                <ChartMap  ref="chatmap" :option="chartOneData" />
            </a-col>
            <a-col :span="11" >
                <ChartMap ref="chatmap2"  :option="chartTwoData"  />
            </a-col>
        </a-row>
    </div>
</template>

<style lang="scss" scoped>
 .arow {
    margin-top: 15px;
    justify-content: space-around;
    .aitem {
      width: 100%;  
      height: 500px;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding-top:20px;
    }
  }
</style>