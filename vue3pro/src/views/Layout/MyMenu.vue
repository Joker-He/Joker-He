
<script lang="ts" setup>
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
    DesktopOutlined,
    HomeOutlined,
    ProfileOutlined,
    StarOutlined,
    UserOutlined,
    LockOutlined,
    FileSearchOutlined 
} from '@ant-design/icons-vue';
import { routerList } from '../../utils/routeList';
import {reactive , toRefs , onMounted , onUpdated , watch  , toRef   } from 'vue'
import type { MenuTheme } from 'ant-design-vue';
import Logo from '../../assets/images/logo.png'
import { useStore } from '../../store/store';
import { useCommon } from '../../hooks/common/useCommon';
import { useRoute } from 'vue-router';
import Menu from '../../components/Menu.vue'
const route = useRoute()
const store = useStore()
const { gotowhere } = useCommon()
const routes:any = toRef(store,'routes')
const state:any = reactive({
      theme: 'dark' as MenuTheme,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
});

const { theme , selectedKeys , openKeys } = toRefs(state)
const clickMenu = (value:any)=>{
    gotowhere(value.key)
}

onMounted(()=>{
    console.log(route.path.split('/'))
    state.selectedKeys = [route.path]
    state.openKeys = ['/'+route.path.split('/')[1]]
})

watch(route,(v)=>{
    console.log(v)
    state.selectedKeys = [v.path]
    state.openKeys = ['/'+v.path.split('/')[1]]
},)


</script>


<template>
   <a-layout-sider
        :collapsed="store.collapsed"
        style="overflow:auto"
    >
        <div class="logo">
            <img :style="{height:store.collapsed?'50px':'150px'}" :src="Logo" class="logo-img" alt="">
        </div>
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :theme="theme"
            @click="clickMenu"
        >
            <Menu v-for="(l,i) in routes" :item="l" :key="i" ></Menu>
            <!-- <a-menu-item key="/home">
                <template #icon>
                    <HomeOutlined />
                </template>
                首页
            </a-menu-item>
            
            <a-sub-menu key="/grade">
                <template #icon>
                    <ProfileOutlined />
                </template>
                <template #title>成绩管理</template>
                <a-menu-item key="/grade/list">
                    <template #icon>
                        <ProfileOutlined />
                    </template>
                    成绩打分
                </a-menu-item>
                <a-menu-item key="/grade/my">
                    <template #icon>
                        <ProfileOutlined />
                    </template>
                    我的成绩
                </a-menu-item>
                <a-menu-item key="/grade/add">
                    <template #icon>
                        <ProfileOutlined />
                    </template>
                    提交成绩
                </a-menu-item>
                
                <a-menu-item key="/grade/data">
                    <template #icon>
                        <ProfileOutlined />
                    </template>
                    成绩分析
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="/anno">
                <template #icon>
                    <DesktopOutlined />
                </template>
                <template #title>公告管理</template>
                <a-menu-item key="/anno/list">
                    <template #icon>
                        <DesktopOutlined />
                    </template>
                    公告列表
                </a-menu-item>
                <a-menu-item key="/anno/add">
                    <template #icon>
                        <DesktopOutlined />
                    </template>
                    发表公告
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="/edu">
                <template #icon>
                    <StarOutlined />
                </template>
                <template #title>教务管理</template>
                <a-menu-item key="/edu/subject">
                    <template #icon>
                        <StarOutlined />
                    </template>
                    学科管理
                </a-menu-item>
                <a-menu-item key="/edu/class">
                    <template #icon>
                        <StarOutlined />
                    </template>
                    班级管理
                </a-menu-item>
                <a-menu-item key="/edu/student">
                    <template #icon>
                        <StarOutlined />
                    </template>
                    学员管理
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="/user">
                <template #icon>
                    <UserOutlined />
                </template>
                <template #title>用户管理</template>
                <a-menu-item key="/user/add">
                    <template #icon>
                        <UserOutlined />
                    </template>
                    用户新增
                </a-menu-item>
                <a-menu-item key="/user/list">
                    <template #icon>
                        <UserOutlined />
                    </template>
                    用户列表
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="/role">
                <template #icon>
                    <LockOutlined />
                </template>
                <template #title>角色管理</template>
                <a-menu-item key="/role/list">
                    <template #icon>
                        <LockOutlined />
                    </template>
                    角色列表
                </a-menu-item>
                <a-menu-item key="/role/data">
                    <template #icon>
                        <LockOutlined />
                    </template>
                    角色分析
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="/advise">
                <template #icon>
                    <FileSearchOutlined />
                </template>
                <template #title>意见管理</template>
                <a-menu-item key="/advise/list">
                    <template #icon>
                        <FileSearchOutlined />
                    </template>
                    意见列表
                </a-menu-item>
                <a-menu-item key="/advise/add">
                    <template #icon>
                        <FileSearchOutlined />
                    </template>
                    意见新增
                </a-menu-item>
            </a-sub-menu>

            <a-menu-item key="/mine">
                <template #icon>
                    <CalendarOutlined />
                </template>
                个人中心
            </a-menu-item> -->
        </a-menu>
   </a-layout-sider>
</template>


<style lang="scss" scoped>
.logo{
    padding:20px;
    width:100%;
    .logo-img{
        width:100%;
        height:150px;
        border-radius: 10px;
    }
}
</style>