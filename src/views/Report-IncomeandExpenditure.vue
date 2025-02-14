<script setup>
import { ref } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";



// 搜尋條件
const VITE_API_URL = import.meta.env.VITE_API_URL;
const startDate = ref("");
const endDate = ref("");
const chart = ref(false);
const chartType = ref("line");
const isLoading = ref(false);
const reportData = ref(null);
const chartImage = ref(null);
let chartInstance = null;

const formatDateTime = (dateTime) => {
  if (!dateTime) return ""; 
  return dateTime.replace("T", " ").split(":").length === 2 
    ? dateTime.replace("T", " ") + ":00"  // 確保有秒數
    : dateTime.replace("T", " ");
};
// 發送 API 請求
const fetchReport = async () => {
  if (!startDate.value || !endDate.value) {
    alert("請輸入開始和結束時間！");
    return;
  }
  let formattedStartDate = formatDateTime(startDate.value);
  let formattedEndDate = formatDateTime(endDate.value);
  isLoading.value = true;
  reportData.value = null;
  chartImage.value = null;

  console.log("處理後的開始時間:", formattedStartDate);
  console.log("處理後的結束時間:", formattedEndDate);
  try {
    const response = await axios.get(`${VITE_API_URL}/api/search/report`, {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        chart: chart.value, // 啟用圖表
        chart_type: chartType.value
      },
      responseType: chart.value ? "blob" : "json" // 若 chart 為 true，請求 PNG 圖檔
    });
    if (chart.value) {
      // API 返回的是 PNG 圖片 (Blob)
      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob); // 轉換為 Object URL
      chartImage.value = imageUrl;
      reportData.value = null; // 確保不顯示表格
    } else {
      // API 返回的是 JSON 數據
      reportData.value = response.data;
      chartImage.value = null;
    }
  } catch (error) {
    console.error("獲取報表失敗", error);
    alert("獲取報表失敗，請檢查 API 或網絡連線");
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div class="report-container">
    <h1 style="font-size:30px;">收入支出報表</h1>
    
    <div class="container-btn">
      
        <label>開始時間：</label>
        <input type="datetime-local" v-model="startDate" />
      
      
      
      <label>結束時間：</label>
      <input type="datetime-local" v-model="endDate" />
      
      <label>產生圖表：</label>
      <input type="checkbox" v-model="chart" />
      
      <label>圖表類型：</label>
      <select v-model="chartType" :disabled="!chart">
        <option value="line">折線圖</option>
        <option value="bar">長條圖</option>
      </select>
      
      <button @click="fetchReport" :disabled="isLoading">
        {{ isLoading ? "查詢中..." : "搜尋" }}
      </button>
    </div>

    <div v-if="reportData">
      <h3>總收入: {{ reportData.total_revenue }}</h3>
      <h3>總支出: {{ reportData.total_expense }}</h3>

      <table>
        <thead>
          <tr>
            <th>時間</th>
            <th>金額</th>
            <th>類型</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in reportData.expenses" :key="expense.created_time">
            <td>{{ expense.created_time }}</td>
            <td style="color: red;">-{{ expense.amount }}</td>
            <td>支出</td>
          </tr>
          <tr v-for="revenue in reportData.revenues" :key="revenue.updated_at">
            <td>{{ revenue.updated_at }}</td>
            <td style="color: green;">+{{ revenue.total_price }}</td>
            <td>收入</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="chart" >
      <h3>報表圖表</h3>
      <img v-if="chartImage" :src="chartImage" alt="報表圖表" class="chart-image" />
      <canvas v-else id="cashFlowChart"></canvas>
    </div>
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
.report-container {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: auto;
}

.container-btn {
  display: flex;
  text-align: center;
}

.search-box input, .search-box select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #4CAF50; /* 綠色按鈕 */
  color: white; /* 白色文字 */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #45a049; /* 深綠色，滑鼠懸停時變色 */
}
button:disabled {
  background-color: gray;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

canvas {
  width: 100%;
  height: 400px;
}
.chart-image {
  max-width: 900px; /* 限制最大寬度 */
  height: auto; /* 保持原比例 */
  margin: 0 auto; /* 讓圖片置中 */
}
</style>