



<script   >
import { Ajax } from "../../api/api";
import FormModal from "../../components/FormModal.vue";
export default {
  components: {
    FormModal,
  },
  data() {
    return {
      rules: {
        year: [{ required: true, message: "请选择" }],
        index: [{ required: true, message: "请选择" }],
        subject: [{ required: true, message: "请选择" }],
      },
      flag: true, // true 添加  false 修改
      subjects: [],
      years: [],
      classList: [], // 班级数据
      updateId:'', // 修改Id 
      keyword:'',
      columns: [
            {
                title: "序号",
                key: "index",
                align: "center",
                
            },
            {
                title: "班级名称",
                dataIndex: "label",
                key: "label",
                align: "center",
            },
            {
                title: "班级编码",
                dataIndex: "value",
                key: "value",
                align: "center",
            },
            {
                title: "年份",
                dataIndex: "year",
                key: "year",
                align: "center",
            },
            {
                title: "编号",
                dataIndex: "index",
                key: "index",
                align: "center",
            },
            {
                title: "班级ID",
                key: "_id",
                align: "center",
            },
            {
                title: "操作",
                key: "action",
                align: "center",
            },
        ],
    };
  },
  methods: {
    async getClasses(params) {
      let res = await Ajax.getclasses(params);
      if (res.code == 200) {
        this.classList = res.result;
      }
    },
    addClass() {
      this.$refs.alertform.visible = true;
    },
    async submitSubject(value) {
      
      if (this.flag) {
        // 添加班级
        let res = await Ajax.addclass(value);
        if (res.code == 200) {
          this.$refs.alertform.closeModal();
          this.getClasses();
        }
      } else {
        // 修改班级
        value._id = this.updateId;
        let res = await Ajax.updateclass(value)
        if(res.code==200){
            console.log(value);
            this.$refs.alertform.closeModal();
            this.getClasses(); 
            // this.classList = this.classList.map(item=>{
            //     if(item._id==value._id){
            //         item = {...value}
            //     }
            //     return item;
            // })
            
        }
      }
    },
    async getSubjectList() {
      let res = await Ajax.getsubjects();
      if (res.code == 200) {
        this.subjects = res.result;
      }
    },
    // 删除
    async deleteItem(item){
        let res = await Ajax.delclasses({_id:item._id})
        if(res.code==200){
            this.classList = this.classList.filter(val=>val._id!=item._id)
        }
    },
    // 修改
    updateItem(item){
        this.$refs.alertform.visible = true;
        this.flag = false;
        this.$refs.alertform.form = Object.assign({},item)
        this.updateId = item._id;
    },
    resetData(){
        this.keyword = ''
        this.getClasses()
    },
    todoSearch(){
        this.getClasses({keyword:this.keyword})
    },
  },
  computed: {
    title() {
      return this.flag ? "添加班级" : "修改班级";
    },
  },
  created(){
    this.getClasses()
  },
  mounted() {
    this.getSubjectList();
    let year = new Date().getFullYear();
    for (let i = -5; i < 5; i++) {
      this.years.push(i + year);
    }
  },
};
</script>
<!-- 
<script lang="ts" setup>
import {ref , reactive , computed } from 'vue'
import FormModal from '../../components/FormModal.vue'
const alertform = ref<any>()
const flag = ref<Boolean>(true)   // true 添加  false 修改 
const rules = reactive({

})
const submitSubject = ()=>{

}
const title = computed(()=>{
    return flag.value ? '添加班级':'修改班级'
})
const addClass = ()=>{
    alertform.value.visible = true;
}
</script>  -->



<template>
  <div>
    <MyTitle title="班级管理"></MyTitle>
    <a-button type="primary" class="mt10" @click="addClass">添加班级</a-button>
    <a-row class="mt10">
        <a-col >
            <a-input placeholder="请输入搜索关键字" v-model:value="keyword"></a-input>
        </a-col>
        <a-col >
            <a-button type="primary" @click="todoSearch">搜索</a-button>
            <a-button danger @click="resetData">重置</a-button>
        </a-col>
    </a-row>
    <a-row class="mt10">
      <a-col :span="23">
        <a-table :dataSource="classList" :columns="columns" :pagination="{ pageSize:6 }" >
            <template #bodyCell="{ column , record, index }" >
                <template v-if="column.key === 'index'">
                    <span>{{ index+1 }}</span>
                </template>
                <template v-if="column.key === 'action'">
                    <a-popconfirm
                        title="你真的要删除吗???"
                        ok-text="确定"
                        cancel-text="不"
                        @confirm="deleteItem(record,index)"
                    >
                        <a-button size="small" danger>  删除 </a-button>
                    </a-popconfirm>
                    
                    <a-button size="small" type="primary" class="ml10" @click="updateItem(record)">  修改 </a-button>
                </template>
                <template v-if="column.key === '_id'">
                    <a-tag color="#f50" > {{ record._id  }} </a-tag>
                </template>
            </template>
        </a-table>
      </a-col>
    </a-row>
    <FormModal
      ref="alertform"
      :rules="rules"
      :submit="submitSubject"
      :title="title"
    >
      <template #default="{ form }">
        <a-form-item label="学科选择" name="subject" has-feedback>
          <a-select v-model:value="form.subject">
            <a-select-option
              :value="l.value"
              v-for="(l, i) in subjects"
              :key="i"
            >
              {{ l.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班级年份" name="year" has-feedback>
          <a-select v-model:value="form.year">
            <a-select-option :value="l" v-for="(l, i) in years" :key="i">
              {{ l }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班级序号" name="index" has-feedback>
          <a-select v-model:value="form.index">
            <a-select-option
              :value="l < 10 ? '0' + l : l"
              v-for="(l, i) in 30"
              :key="i"
            >
              {{ l < 10 ? "0" + l : l }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </FormModal>
  </div>
</template>