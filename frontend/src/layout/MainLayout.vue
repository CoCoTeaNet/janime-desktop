<template>
  <el-container style="height: 100vh">
    <el-aside width="63px" class="main-layout-aside">
      <ani-aside/>
    </el-aside>

    <el-container>
      <el-header class="main-layout-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>HOME</el-breadcrumb-item>
          <el-breadcrumb-item>
            {{route.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <ani-header/>
      </el-header>

      <el-main>
        <router-view v-slot="{Component}">
          <keep-alive>
            <transition :name="`slide-fade`" :mode="`out-in`">
              <component :is="Component"/>
            </transition>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AniHeader from "@/layout/header/AniHeader.vue";
import AniAside from "@/layout/aside/AniAside.vue";
import {onMounted} from "vue";
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import {useRoute} from "vue-router";

const route = useRoute();

onMounted(() => {
  ipc.invoke(ipcApiRoute.test).then(id => {
    console.log('loaded:', id);
  });
})
</script>

<style scoped>
.main-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--el-box-shadow-lighter);
}

.main-layout-aside {
  box-shadow: var(--el-box-shadow);
  overflow-x: hidden;
}
</style>