

<script lang="ts" setup>
  
</script>

<template>
    <div class="pageall">
      <!-- 5. 路由出口  -->
        <router-view class="pagebox"></router-view>
    </div>
</template>


<style lang="scss"  scoped>
  .pageall{
    width:100%;
    height:100%;
    .pagebox{
      width:100%;
      height:100%;
    }
  }
</style>