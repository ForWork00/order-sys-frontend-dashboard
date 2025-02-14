<script setup>
import { ref } from "vue";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const orders = ref([]);
const singleOrder = ref(null);
const searchId = ref("");

const showDialog = ref(false); // 詳細訂單彈窗
const showEditDialog = ref(false); // 修改訂單彈窗
const selectedOrder = ref(null); // 選中的詳細訂單
const editingOrder = ref(null); // 目前正在修改的訂單
const selectedStatus = ref(""); // 選擇的新狀態

// 1. 獲取所有訂單
const fetchOrders = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/orders`);
    orders.value = response.data;
  } catch (error) {
    console.error("無法獲取訂單", error);
    alert("獲取訂單失敗，請檢查 API");
  }
};
  // 顯示詳細訂單
  const detailedOrder = async (orderId) => {
  
  try {
    console.log(orderId);
    const response = await axios.post(`${VITE_API_URL}/orders/${orderId}`);
    selectedOrder.value = response.data; // 確保 selectedOrder 取得完整資料
    showDialog.value = true; // 顯示彈窗
  } catch (error) {
    console.error("查詢訂單失敗", error);
    alert("無法獲取訂單，請檢查 API");
  }
};

    // 關閉彈窗
const closeDialog = () => {
      showDialog.value = false;
    };
const closeEditDialog = () => {
      showEditDialog.value = false;
};
// 2. 查詢單一訂單
const fetchSingleOrder = async () => {
      orders.value = []; // 清除所有訂單資料
      if (!searchId.value) {
        alert("請輸入訂單 ID");
        return;
      }
      try {
        const response = await axios.post(`${VITE_API_URL}/orders/${searchId.value}`);
        console.log(searchId.value);
        singleOrder.value = response.data;
        
      } catch (error) {
        console.error("查詢失敗", error);
        alert("找不到該訂單，請檢查 ID");
      }
    };


// 4. 顯示「修改訂單」彈窗
const openEditDialog = (order) => {
  editingOrder.value = { ...order }; // 複製訂單資料
  selectedStatus.value = order.status; // 預設為當前狀態
  showEditDialog.value = true;
};

// 5. 修改訂單狀態
const updateOrder = async () => {
  if (!editingOrder.value) return;
  
  try {
    const response = await axios.put(`${VITE_API_URL}/orders/${editingOrder.value._id}`, {
      status: selectedStatus.value, // 使用者選擇的新狀態
    });

    alert("訂單狀態已更新！");
    showEditDialog.value = false; // 關閉彈窗
    fetchOrders(); // 重新獲取訂單
  } catch (error) {
    console.error("修改訂單失敗", error);
    alert("無法修改訂單，請檢查 API");
  }
};

// 6. 刪除單一訂單
const deleteOrder = async (orderId) => {
  if (!confirm("確定要刪除此訂單嗎？")) return;

  try {
    const response = await axios.delete(`${VITE_API_URL}/orders/${orderId}`);
    alert(response.data.message);
    fetchOrders();
  } catch (error) {
    console.error("刪除訂單失敗", error);
    alert("無法刪除訂單，請檢查 API");
  }
};
</script>
<template>
  <div class="container">
    <h2 style="font-size:30px;">訂單管理</h2>
    <div class="container-btn">
     <!-- 獲取所有訂單 -->
     <button class="order-btn" @click="fetchOrders">獲取所有訂單</button>
    <!-- 查詢單一訂單 -->
      <input v-model="searchId" class="search-box" placeholder="輸入訂單 ID">
      <button class="order-btn" style="margin-left: 15px;"  @click="fetchSingleOrder">查詢單一訂單</button>
    </div>

  
    <!-- 訂單表格 -->
    <table v-if="orders.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>狀態</th>
          <th>總價</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.status }}</td>
          <td>${{ order.total_price }}</td>
          <td>
            <button class="order-btn" @click="detailedOrder(order._id)">詳細訂單</button>
            <button class="order-btn update" @click="openEditDialog(order)">修改</button>
            <button class="order-btn delete" @click="deleteOrder(order._id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 單一訂單顯示 -->
    <div v-if="singleOrder">
      <h3>單一訂單</h3>
      <p><strong>ID：</strong> {{ singleOrder._id }}</p>
      <p><strong>狀態：</strong> {{ singleOrder.status }}</p>
      <p><strong>總價：</strong> ${{ singleOrder.total_price }}</p>
      <hr />
    <h4>餐點內容：</h4>
    <ul>
      <li v-for="item in singleOrder.menu_items" :key="item.id">
        <p><strong>ID：</strong> {{ item.id }}</p>
        <p><strong>名稱：</strong> {{ item.name }}</p>
        <p><strong>單價：</strong> ${{ item.price }}</p>
        <p><strong>數量：</strong> {{ item.quantity }}</p>
        <p><strong>小計：</strong> ${{ item.total }}</p>
      </li>
      <hr />
    </ul>
      <button class="order-btn update" @click="updateOrder(singleOrder._id)">修改</button>
      <button class="order-btn delete" @click="deleteOrder(singleOrder._id)">刪除</button>
    </div>
    <!-- 詳細訂單內容 -->
    <div v-if="showDialog" class="dialog">
  <div class="dialog-content">
    <h3>訂單詳細內容</h3>
    <p><strong>ID：</strong> {{ selectedOrder._id }}</p>
    <p><strong>狀態：</strong> {{ selectedOrder.status }}</p>
    <p><strong>總價：</strong> ${{ selectedOrder.total_price }}</p>
    <hr />
    <h4>餐點內容：</h4>
    <ul>
      <li v-for="item in selectedOrder.menu_items" :key="item.id">
        <p><strong>ID：</strong> {{ item.id }}</p>
        <p><strong>名稱：</strong> {{ item.name }}</p>
        <p><strong>單價：</strong> ${{ item.price }}</p>
        <p><strong>數量：</strong> {{ item.quantity }}</p>
        <p><strong>小計：</strong> ${{ item.total }}</p>
      </li>
      <hr />
    </ul>
    
    <button class="order-btn" @click="closeDialog">關閉</button>
  </div>
  </div>
    <!-- 修改訂單彈窗 -->
    <div v-if="showEditDialog" class="dialog">
      <div class="dialog-content">
        <h3>修改訂單狀態</h3>
        <p><strong>ID：</strong> {{ editingOrder._id }}</p>
        <label>狀態：</label>
        <select v-model="selectedStatus">
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
        <br><br>
        <button class="order-btn update" @click="updateOrder">保存修改</button>
        <button class="order-btn" @click="closeEditDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-btn{
  display: flex;
  justify-content: space-between;
}
h2{
  font-size:30px;
  text-align: center;

}
.container {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: auto;
}
.search-box {
  width: 30%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}
input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
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


.order-detail {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 5px;
}
/* 彈窗樣式 */
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: left; /* 讓文字置左對齊 */
}
.order-btn {
  background-color: #4CAF50; /* 綠色按鈕 */
  color: white; /* 白色文字 */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
  margin-bottom:15px;
  
 
}
/*按鈕樣式*/ 
.order-btn:hover {
  background-color: #45a049; /* 深綠色，滑鼠懸停時變色 */
}

.order-btn.delete {
  background-color: #f44336; /* 紅色刪除按鈕 */
  margin-left:15px;
}

.order-btn.delete:hover {
  background-color: #d32f2f; /* 深紅色 */
}

.order-btn.update {
  background-color: #2196F3; /* 藍色更新按鈕 */
  margin-left:15px;
}

.order-btn.update:hover {
  background-color: #1976D2; /* 深藍色 */
}
</style>
