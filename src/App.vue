<script setup>

import {  RouterView } from 'vue-router';
import { ref, onMounted, onBeforeUnmount ,watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import Login from "@/views/Login.vue"; // 引入 Login.vue

const isUserManagementOpen = ref(false); // 控制「用户管理」是否展開
const isReportManagementOpen = ref(false); // 控制「報表管理」是否展開
const isItemManagementOpen = ref(false); // 控制「報表管理」是否展開
//判斷一次只能打開一個分類
const toggleUserManagement = () => {
  isUserManagementOpen.value = !isUserManagementOpen.value;
  if (isUserManagementOpen.value) {
    isReportManagementOpen.value = false;
    isItemManagementOpen.value = false;
  }
};
const toggleReportsManagement = () => {
  isReportManagementOpen.value = !isReportManagementOpen.value;
  if (isReportManagementOpen.value) {
    isUserManagementOpen.value = false;
    isItemManagementOpen.value = false;
  }
};
const toggleItemManagement = () => {
  isItemManagementOpen.value = !isItemManagementOpen.value;
  if (isItemManagementOpen.value) {
    isUserManagementOpen.value = false;
    isReportManagementOpen.value = false;
  }
};
// 監聽 localStorage 變化，確保 isLoggedIn 及時更新
const isLoggedIn = ref(false);

// 當 localStorage 存在 token 時，標記為已登入
watchEffect(() => {
  isLoggedIn.value = !!localStorage.getItem("token");
});

// 處理登入成功
const handleLoginSuccess = () => {
  console.log("1");
  isLoggedIn.value = true;
  router.push({path: '/home'}); // 登入成功後跳轉到首頁
};

// 處理登出
const handleLogout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
};
//router
const router = useRouter();
  // 定義狀態
const isMenuOpen = ref(false);
const toggleMenu = (event) => {
      event.stopPropagation(); // 防止事件冒泡
      isMenuOpen.value = !isMenuOpen.value;
    };
     // 關閉功能列
     const closeMenu = () => {
      isMenuOpen.value = false;
    };

    // 點擊外部時關閉功能列
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        closeMenu();
      }
    };
  // 在組件掛載時添加事件監聽器，並在銷毀前移除
  onMounted(() => {
      document.addEventListener('click', handleOutsideClick);
      const token = localStorage.getItem("access_token");
      isLoggedIn.value = !!token; // 檢查是否有 Token
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutsideClick);
    }); 



</script>

<template>
 <!-- 如果未登入，顯示登入頁面 -->
 <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />

<!-- 如果已登入，顯示主頁面 -->
<el-container v-else style="height:100vh">
    
    
    <!-- 側邊欄 -->
    <el-aside width="200px" style="background-color: #001529; color: white;">
      
      <div class="logo">儀錶板</div>
      <el-menu  
      router
        class="custom-menu"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
      >
      
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span>首頁</span>
        </el-menu-item>
    
        <!-- 子菜單 -->
        <el >
          <!-- 用戶管理 -->
          <el-menu-item @click="toggleUserManagement"  class="expandable">
            用戶管理
            <span class="arrow">{{ isUserManagementOpen ? '▲' : '▼' }}</span>
            <el-icon style="float: right;">
              <i :class="isUserManagementOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </el-icon>
          </el-menu-item>
        
          <el v-if="isUserManagementOpen" >
            <el-menu-item class="sub-item" index="/users">用戶列表</el-menu-item>
          </el>

          <!-- 報表管理 -->
          <el-menu-item @click="toggleReportsManagement"  class="expandable">
            報表管理
            <span class="arrow">{{ isReportManagementOpen ? '▲' : '▼' }}</span>
            <el-icon style="float: right;">
              <i :class="isReportManagementOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </el-icon>
          </el-menu-item>
          <el v-if="isReportManagementOpen">
            <el-menu-item class="sub-item" index="/Report-Balance">資產負債表</el-menu-item>
            <el-menu-item class="sub-item" index="/Report-Income">損益表</el-menu-item>
            <el-menu-item class="sub-item" index="/Report-CashFlow">現金流量表</el-menu-item>
          </el>


          <!-- 營運管理 -->
          <el-menu-item @click="toggleItemManagement"  class="expandable">
            營運管理
            <span class="arrow">{{ isItemManagementOpen ? '▲' : '▼' }}</span>
            <el-icon style="float: right;">
              <i :class="isItemManagementOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </el-icon>
          </el-menu-item>
          <el v-if="isItemManagementOpen">
            <i class="el-icon-s-tools"></i>
            
            <el-menu-item class="sub-item" index="/Item-Item">目前菜品</el-menu-item>
            <el-menu-item class="sub-item" index="/Item-Order">查詢訂單</el-menu-item>
            <el-menu-item class="sub-item" index="/Item-Vip">VIP點數</el-menu-item>
          </el>
        </el>
      
   
      </el-menu>
    </el-aside>
  
  
    <!-- 主要內容區域 -->
    <el-container>
      <el-header   style="background-color: #f5f5f5; padding: 15px; height:50px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首頁</el-breadcrumb-item>
          <el-breadcrumb-item>儀錶板</el-breadcrumb-item>
          <div class="dropdown">
          <button @click="toggleMenu" class="login-button" >登出</button>
          <div v-if="isMenuOpen" class="dropdown-menu">
          <ul>
            <li @click="isLoggedIn = false; localStorage.removeItem('token')" class="logout-button">登出</li>
            <li @click="goRegister ">註冊</li>
          </ul>

        </div>
      </div>
        </el-breadcrumb>
      </el-header>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<style scoped>

.logo {
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
}
.sub-item {
  padding-left: 40px !important; /* 縮排的距離 */
}
/* 重置樣式，讓 <el-aside> 貼齊邊框 */
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/* 以下是登入功能樣式*/
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100px;
  z-index: 1000;
 

}
.dropdown {
  position: relative;
  display: inline-block;
  display: flex;
}


.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100px;
  z-index: 1000;
}
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}v

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.floatright{
  margin-left: auto;
 
}


/* 登入按鈕樣式 */
.login-button {
  background-color: #1890ff; /* 藍色 */
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 5px 20px;
  border: none;
  border-radius: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-left: auto; /* 推到右側 */
}
/* 按鈕的 hover 效果 */
.login-button:hover {
  background-color: #40a9ff; /* 浅蓝色 */
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
}
/*------------*/
</style>