<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL

// 用來存放 API 取得的使用者資料
const users = ref([]);

// 儲存搜尋關鍵字
const searchQuery = ref("");


const fetchUsers = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/get_user`);
    users.value = response.data.map(user => ({
      ...user,
      register: formatDate(user.register) // 轉換時間格式
    }));
  } catch (error) {
    console.error("獲取使用者失敗：", error);
  }
};
// 格式化時間函數
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的，所以要 +1
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    <h1 style="font-size:30px;">使用者列表</h1>
    
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
    <table >
      <thead>
        <tr>
          <th>ID</th>
          <th>電子郵件</th>
          <th>積分</th>
          <th>註冊時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="users in users" :key="users.id">
          <td>{{ users.id }}</td>
          <td>{{ users.email }}</td>
          <td>{{ users.points }}</td>
          <td>{{ users.register }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px; /* 標題字體大小 */
  text-align: center; /* 標題居中 */
  font-family: 'Roboto', sans-serif; 
  font-weight: bold; /* 設置字體為加粗 */
  margin-bottom: 20px; /* 標題下方的間距，根據需求可以調整 */
}
.search-container {
  display: flex;
  justify-content: space-between; /* 左右對齊 */
  align-items: center; /* 垂直居中 */
  width: 100%;
}
.fetch-button {
  background-color: #4CAF50; /* 綠色按鈕 */
  color: white; /* 白色文字 */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}
.fetch-button:hover {
  background: #0056b3;
}
.user-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>