
<script lang="ts" setup> 
import * as echarts from "echarts";
import { ref, onMounted , reactive  } from "vue";
import ChartMap from "./ChartMap.vue";
const chartone = ref<any>();
const charttwo = ref<any>();

const chartOneData = reactive({
    title: {
      text: "学生项目发布数量",
    },
    tooltip: {},
    legend: {
      data: ["个数"],
    },
    xAxis: {
      data: ["小李", "王五", "张三", "李四", "赵六", "小七"],
    },
    yAxis: {},
    series: [
      {
        name: "个数",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
})

const chartOneInit = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(chartone.value);
  // 指定图表的配置项和数据
  
    // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(chartOneData);
};

const chartTwoData = reactive({
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
      data: [
        { value: 70, name: '学员' },
        { value: 10, name: '班主任' },
        { value: 15, name: '讲师' },
        { value: 4, name: '管理员' },
        { value: 1, name: '校长' }
      ]
    }
  ]
})
const chartTwoInit = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(charttwo.value);
  // 指定图表的配置项和数据
  
    // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(chartTwoData);
};

const chartThreeData = reactive({
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
})
const ChartFourData = reactive({
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
})
onMounted(() => {
    chartOneInit()
    chartTwoInit()
});
</script>


<template>
  <div class="home">
    <MyTitle title="首页"></MyTitle>
    <a-row class="arow">
      <a-col :span="11" :offset="1">
        <div class="aitem" id="chartone" ref="chartone"></div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div class="aitem" ref="charttwo"></div>
      </a-col>
    </a-row>
    <a-row class="arow">
      <a-col :span="11" :offset="1">
            <ChartMap :option="chartThreeData"/>
      </a-col>
      <a-col :span="11" :offset="1">
            <ChartMap :option="ChartFourData"/>
      </a-col>
    </a-row>
  </div>
</template>


<style lang="scss" scoped>
.home {
  .arow {
    margin-top: 15px;
    .aitem {
      width: 100%;
      height: 300px;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding-top:20px;
    }
  }
}
</style>