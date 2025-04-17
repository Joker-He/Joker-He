

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref , onMounted} from 'vue';

const props = defineProps({
    option:{
        type:Object,
        default:{}
    }
})
const chartRef = ref<any>()
const ChartMapInit = ()=>{
    // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(chartRef.value);
  // 指定图表的配置项和数据
  
    // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(props.option);
}

onMounted(() => {
    ChartMapInit()
});

defineExpose({
    ChartMapInit
})
</script>


<template>
    <div class="aitem" ref="chartRef"></div>
</template>