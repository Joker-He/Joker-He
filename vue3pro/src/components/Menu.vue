
<script lang="ts" setup>

const props:any = defineProps({
    item:{
        type:Object,
        default:{}
    }
})

</script>


<template>
    <template  v-if="!item.children">
        <a-menu-item :key="item.path"  v-if="!item.noshow">
            <template #icon>
                <component :is="item.icon"></component>
            </template>
            {{ item.text }}
        </a-menu-item>
    </template>
    
    <template v-else>
        <a-sub-menu :key="item.path" >
            <template #icon>
                <component :is="item.icon"></component>
            </template>
            <template #title>{{ item.text }}</template>
            <Menu v-for="(l,i) in item.children" :item="l" :key="i" ></Menu>
        </a-sub-menu>
    </template>
    

</template>