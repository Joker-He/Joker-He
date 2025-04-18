
<script lang="ts" setup>
import {ref} from 'vue'
import LoginByAccount from './LoginByAccount.vue'
import LoginByMobile from './LoginByMobile.vue'

import videoFile from '@/assets/images/loginbg.mp4'
// const videoSrc = ref(videoFile)
const activeKey = ref('account')

</script>

<template>
    <div class="lgbox">
        <video 
            :src="videoFile"
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

<style lang="scss" scoped>
.lgbox {
  position: relative;
  width: 100%;
  height: 100vh; /* 设置全屏高度 */
  overflow: hidden; /* 防止内容溢出 */
  .myvideo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1920px; /* 固定宽度 */
    height: 1080px; /* 固定高度 */
    transform: translate(-50%, -50%); /* 居中显示 */
    object-fit: none; /* 禁止缩放 */
  }
}

</style>