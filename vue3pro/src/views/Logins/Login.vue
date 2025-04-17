
<script lang="ts" setup>
import {ref} from 'vue'
import LoginByAccount from './LoginByAccount.vue'
import LoginByMobile from './LoginByMobile.vue'
const videoSrc = ref('https://img-baofun.zhhainiao.com/market/semvideo/6ac24b3f50fda0b1a55f7ff25c6b62af_preview.mp4')
const activeKey = ref('account')

</script>

<template>
    <div class="lgbox">
        <video 
            :src="videoSrc"
            class="myvideo"
            muted
            loop
            autoplay
        ></video>
        <div class="login-box">
            <h2 class="title">学员成绩管理系统</h2>
            <div class="box">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="account" tab="账户登录">
                        <LoginByAccount/>
                    </a-tab-pane>
                    <a-tab-pane key="mobile" tab="手机登录" force-render>
                        <LoginByMobile/>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>