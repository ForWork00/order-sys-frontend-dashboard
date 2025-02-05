<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL

// 用來存放 API 取得的使用者資料
const users = ref([]);

// 儲存搜尋關鍵字
const searchQuery = ref("");


const fetchUsers = async () => {
// 從 API 獲取使用者數據
  try {
    const response = await axios.get(`${VITE_API_URL}/get_user`); // 修改為你的 API 端點
    users.value = response.data;
  } catch (error) {
    console.error("獲取使用者失敗：", error);
  }
};

// 搜尋過濾
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

</script>

<template>
  <div class="user-container">
    <h2>使用者列表</h2>
    
    <!-- 搜尋框 -->
    <div class="search-container" >
    <button @click="fetchUsers" class="fetch-button">獲取所有使用者</button>
    <el-input 
      v-model="searchQuery" 
      placeholder="搜尋 Email"
      clearable 
      style="width: 300px; margin-bottom: 10px;" 
    />
  </div>

    <!-- 使用者列表 -->
    <el-table :data="filteredUsers" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="email" label="電子郵件" />
      <el-table-column prop="points" label="積分" width="100" />
      <el-table-column prop="register" label="註冊時間" width="180" />
    </el-table>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: space-between; /* 左右對齊 */
  align-items: center; /* 垂直居中 */
  width: 100%;
}
.fetch-button {
  background-color: #1890ff;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}
.user-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>