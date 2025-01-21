<template>
  <el-container style="height: 100vh;">
    <!-- 側邊欄 -->
    <el-aside width="200px" style="background-color: #333; color: white;">
      <div class="logo">儀錶板</div>
      <el-menu :default-openeds="['1']" router>
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span>首頁</span>
        </el-menu-item>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-menu"></i>
            <span>管理</span>
          </template>
          <el-menu-item index="/users">用戶管理</el-menu-item>
          <el-menu-item index="/products">商品管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-s-tools"></i>
          <span>設置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主要內容區域 --->
    <el-container>
      <el-header style="background-color: #f5f5f5; padding: 10px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首頁</el-breadcrumb-item>
          <el-breadcrumb-item>儀錶板</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.logo {
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
},
</style>