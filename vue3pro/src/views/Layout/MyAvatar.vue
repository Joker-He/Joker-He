<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
import { ref, toRefs, computed } from 'vue';
import { Ajax } from '../../api/api';
import { useStore } from '../../store/store';
import { baseURL } from '../../api/request'

const fileRef = ref<any>()
const store = useStore()
// const {userInfo} = toRefs(store)
const userInfo: any = computed(() => store.userInfo)

// 点击上传
const todoUpload = () => {
    fileRef.value?.click()
}

// 上传文件 
const startSendFile = async () => {
    const file = fileRef.value?.files[0]
    console.log(file)
    if (!file) {
        console.error('未选择文件');
        return;
    }

    const data = new FormData()  // 新建的JS 表单对象 
    data.append('file', file)     // 上传文件的数据  <input type="file" name='file' ref="fileRef" @change='startSendFile'  class="file">

    // // 1.先上传文件
    // let res = await Ajax.uploadfile(data) as any;

    // // 2.再修改数据库信息
    // let res2 = await Ajax.changeuserinfo({
    //     avatar: res.path
    // }) as any;


    // // 3. 最后修改前端的本地数据 pinia 
    // if (res2.code == 200) {
    //     console.log(userInfo.value)
    //     userInfo.value.avatar = res.path;
    //     store.changeUserInfo(userInfo.value)
    // }
    try {
        // 1. 上传文件
        const res = await Ajax.uploadfile(data) as any;
        if (res.code !== 200) {
            console.error('文件上传失败', res);
            return;
        }

        // 2. 修改数据库信息
        const res2 = await Ajax.changeuserinfo({
            avatar: res.path,
        }) as any;

        // 3. 更新前端的本地数据
        if (res2.code === 200) {
            userInfo.value.avatar = `${baseURL}${res.path}`;
            store.changeUserInfo(userInfo.value);
        }
    } catch (error) {
        console.error('上传失败', error);
    } try {
        // 1. 上传文件
        const res = await Ajax.uploadfile(data) as any;
        if (res.code !== 200) {
            console.error('文件上传失败', res);
            return;
        }

        // 2. 修改数据库信息
        const res2 = await Ajax.changeuserinfo({
            avatar: res.path,
        }) as any;

        // 3. 更新前端的本地数据
        if (res2.code === 200) {
            userInfo.value.avatar = res.path;
            store.changeUserInfo(userInfo.value);
        }
    } catch (error) {
        console.error('上传失败', error);
    }


}
</script>


<template>
    <a-tooltip title="切换头像">
        <div class="ml15">
            <input type="file" ref="fileRef" @change='startSendFile' class="file">

            <!-- 更换的头像 -->
            <!-- :src="userInfo.avatar.replace(/public/, baseURL)"无法显示 -->
            <a-avatar v-if="userInfo.avatar" size="middle" :src="`${baseURL}${userInfo.avatar}`" @click="todoUpload">
            </a-avatar>

            <!-- 默认头像  -->
            <a-avatar v-else size="middle" @click="todoUpload">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
        </div>

    </a-tooltip>
</template>

<style lang="scss" scoped>
.file {
    display: none;
}
</style>