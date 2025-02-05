<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const menuItems = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const isEditing = ref(false);
const editItem = ref(null);
const VITE_API_URL = import.meta.env.VITE_API_URL

const fetchMenu = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`${VITE_API_URL}/menu`);
    menuItems.value = response.data.filter(item => item.is_available);
  } catch (err) {
    error.value = "無法獲取菜單，請稍後再試";
    console.error("API 錯誤:", err);
  } finally {
    loading.value = false;
  }
};

// 搜尋功能
const filteredMenu = computed(() => {
  return menuItems.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 跳轉到新增菜單頁面
const goToAddMenu = () => {
  router.push("/item-add");
};

// 編輯菜單
const startEdit = (item) => {
  editItem.value = { ...item};
  isEditing.value = true;
};

// 提交修改
const updateMenu = async () => {
  if (!editItem.value) return;
  try {
    const response = await axios.patch(
      `${VITE_API_URL}/menu/${editItem.value._id}`,
      editItem.value
    );
    const index = menuItems.value.findIndex(i => i._id === editItem.value._id);
    if (index !== -1) menuItems.value[index] = response.data;
    isEditing.value = false;
  } catch (err) {
    console.error("更新失敗:", err);
    alert("更新菜單失敗，請稍後再試！");
  }
};

// 刪除菜單
const deleteMenu = async (_id) => {
  if (!confirm("確定要刪除此菜單項目嗎？")) return;
  try {
    await axios.delete(`${VITE_API_URL}/menu/${_id}`);
    menuItems.value = menuItems.value.filter(item => item._id !== _id);
  } catch (err) {
    console.error("刪除失敗:", err);
    alert("刪除菜單失敗，請稍後再試！");
  }
};

</script>

<template>
  <div class="container">
    <h1>菜單列表</h1>
    <!-- 按鈕觸發獲取菜單 -->
    <button @click="fetchMenu" class="fetch-button">獲取菜單</button>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- 搜尋框 -->
    <input v-model="searchQuery" type="text" placeholder="搜尋菜品..." class="search-box" />

    <!-- 新增菜單按鈕 -->
    <button @click="goToAddMenu" class="add-button">新增菜單</button>



    <!-- 菜單列表 -->
    <div v-if="!loading && !error" class="menu-list">
      <div v-for="item in filteredMenu" :key="item._id" class="menu-item">
        <img :src="item.image_url" :alt="item.name" class="menu-image" />
        <div class="menu-details">
          <h3>{{ item.name }}</h3>
          <p class="category">類別：{{ item.category }}</p>
          <p class="description">{{ item.description }}</p>
          <p class="price">價格：${{ item.price }}</p>

          <!-- 操作按鈕 -->
          <button @click="startEdit(item)" class="edit-button">編輯</button>
          <button @click="deleteMenu(item._id)" class="delete-button">刪除</button>
        </div>
      </div>
    </div>

    <!-- 編輯菜單彈窗 -->
    <div v-if="isEditing" class="edit-modal">
      <div class="edit-content">
        <h2>編輯菜單</h2>
        <label class="label-title">名稱</label>
        <input v-model="editItem.name" type="text" />
        <label class="label-title">菜色說明</label>
        <textarea v-model="editItem.description" class="text-area" rows="3"></textarea>
        <label class="label-title">價格</label>
        <input v-model="editItem.price" type="number" />
        <label class="label-title">類別</label>
        <input v-model="editItem.category" type="text" />
        <button @click="updateMenu">儲存變更</button>
        <button @click="isEditing = false">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.fetch-button:hover {
  background-color: #0056b3;
}
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.search-box {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.add-button, .edit-button, .delete-button {
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

.add-button {
  background-color: #1890ff;
  color: white;
}

.add-button:hover {
  background-color: #0056b3;
}

.edit-button {
  background-color: #f0ad4e;
  color: white;
}

.edit-button:hover {
  background-color: #d18b39;
}

.delete-button {
  background-color: #d9534f;
  color: white;
}

.delete-button:hover {
  background-color: #b52b27;
}

.menu-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  background: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.menu-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.menu-details h3 {
  margin: 10px 0;
}

.category {
  font-weight: bold;
  color: #555;
}

.description {
  font-size: 14px;
  color: #777;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

/* 編輯彈窗 */
/* 彈窗背景（半透明遮罩） */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

/* 彈窗內容區塊 */
.edit-content {
  background: white;
  padding: 25px;
  border-radius: 10px; /* 圓角 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 陰影 */
  width: 90%;
  max-width: 400px;
  text-align: center;
  transform: scale(0.95);
  animation: popIn 0.3s ease-in-out forwards;
}

/* 標題 */
.edit-content h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 20px;
}

/* 表單輸入框 */
.edit-content input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* 彈窗按鈕樣式 */
.edit-content button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

/* 儲存按鈕 */
.edit-content button:first-of-type {
  background: #28a745;
  color: white;
}

.edit-content button:first-of-type:hover {
  background: #218838;
}

/* 取消按鈕 */
.edit-content button:last-of-type {
  background: #dc3545;
  color: white;
}

.edit-content button:last-of-type:hover {
  background: #c82333;
}

/* 彈窗動畫 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
/* 針對 Chrome, Safari, Edge, Opera 移除價格上下按鈕*/
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 針對 Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.label-title {
  font-family: "Noto Sans TC", sans-serif; /* 使用台灣字體 */
  font-weight: 700; /* 加粗 */
  font-size: 18px; /* 適中字體 */
  color: #333; /* 深灰色，提高對比度 */
  letter-spacing: 1px; /* 增加字距，讓字體更舒適 */
  text-transform: uppercase; /* 轉為大寫，提升標題感 */
  display: block; /* 讓 label 獨占一行 */
  margin-bottom: 8px; /* 與輸入框保持距離 */
}
.text-area {
  width: 100%;
  min-height: 80px; /* 設定最小高度 */
  resize: vertical; /* 允許使用者調整高度 */
  word-wrap: break-word; /* 自動換行 */
  overflow-y: auto; /* 當內容過長時出現滾動條 */
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}
</style>