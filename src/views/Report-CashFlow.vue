<script setup>
import { ref } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";



// 搜尋條件
const startDate = ref("");
const endDate = ref("");
const chart = ref(false);
const chartType = ref("line");
const isLoading = ref(false);
const reportData = ref(null);
const chartImage = ref(null);
let chartInstance = null;

// 發送 API 請求
const fetchReport = async () => {
  if (!startDate.value || !endDate.value) {
    alert("請輸入開始和結束時間！");
    return;
  }

  isLoading.value = true;
  reportData.value = null;
  chartImage.value = null;

  try {
    const response = await axios.get("https://workspace24.pythonanywhere.com/api/search/report", {
      params: {
        start_date: startDate.value,
        end_date: endDate.value,
        chart: chart.value,
        chart_type: chartType.value
      }
    });
    console.log(startDate.value)
    reportData.value = response.data;

    if (chart.value && response.data.chart_image) {
      chartImage.value = response.data.chart_image; // API 可能返回圖表 URL
    } else if (chart.value) {
      generateChart();
    }
  } catch (error) {
    console.error("獲取報表失敗", error);
    alert("獲取報表失敗，請檢查 API 或網絡連線");
  } finally {
    isLoading.value = false;
  }
};

// 生成圖表
const generateChart = () => {
  if (!reportData.value) return;

  const ctx = document.getElementById("cashFlowChart");
  if (chartInstance) chartInstance.destroy(); // 清除舊的圖表

  const expenses = reportData.value.expenses.map(e => ({
    x: e.created_time,
    y: e.amount
  }));

  const revenues = reportData.value.revenues.map(r => ({
    x: r.updated_at,
    y: r.total_price
  }));
  
  const formatDateTime = () => {
  if (!startDate.value) return;
  
  const date = new Date(startDate.value);
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  startDate.value = formattedDate; // 轉成 YYYY-MM-DD HH:MM:SS
};
  chartInstance = new Chart(ctx, {
    type: chartType.value,
    data: {
      datasets: [
        {
          label: "支出",
          data: expenses,
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.2)"
        },
        {
          label: "收入",
          data: revenues,
          borderColor: "green",
          backgroundColor: "rgba(75, 192, 192, 0.2)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
};
</script>

<template>
  <div class="report-container">
    <h2>收入支出報表</h2>
    
    <div class="search-box">
      
        <label>開始時間：</label>
        <input type="datetime.local" v-model="startDate" />
      
      
      
      <label>結束時間：</label>
      <input type="datetime.local" v-model="endDate" />
      
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

    <div v-if="chart">
      <h3>報表圖表</h3>
      <img v-if="chartImage" :src="chartImage" alt="報表圖表" />
      <canvas v-else id="cashFlowChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: auto;
}

.search-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.search-box input, .search-box select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
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

</style>