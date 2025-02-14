<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// 現金流量表資料
const cashFlowData = ref({
  "營業活動現金流量": [],
  "投資活動現金流量": [],
  "籌資活動現金流量": [],
  "現金及約當現金增減淨額": 0
});

// 呼叫 API 獲取現金流量數據
const fetchCashFlow = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/accounting/cash_flow_statement`);
    cashFlowData.value = response.data;
    ElMessage.success("現金流量數據加載成功！");
  } catch (error) {
    console.error("獲取現金流量數據失敗：", error);
    ElMessage.error("加載失敗，請重試！");
  }
};
</script>

<template>
  <div class="container">
    <h1>現金流量表</h1>
    <div class="container-btn">
      <button @click="fetchCashFlow">獲取現金流量</button>
     <!-- <button @click="handleExport">匯出現金流量表</button>-->
    </div>

    <h3>營業活動現金流量</h3>
    <table v-if="cashFlowData['營業活動現金流量'] && cashFlowData['營業活動現金流量'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
          <th>現金流量變動</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cashFlowData['營業活動現金流量']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額 }}</td>
          <td>${{ item.期末餘額 }}</td>
          <td>${{ item.現金流量變動 }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>無營業活動現金流量數據</p>

    <h3>投資活動現金流量</h3>
    <table v-if="cashFlowData['投資活動現金流量'] && cashFlowData['投資活動現金流量'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
          <th>現金流量變動</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cashFlowData['投資活動現金流量']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額 }}</td>
          <td>${{ item.期末餘額 }}</td>
          <td>${{ item.現金流量變動 }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>無投資活動現金流量數據</p>

    <h3>籌資活動現金流量</h3>
    <table v-if="cashFlowData['籌資活動現金流量'] && cashFlowData['籌資活動現金流量'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
          <th>現金流量變動</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cashFlowData['籌資活動現金流量']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額 }}</td>
          <td>${{ item.期末餘額 }}</td>
          <td>${{ item.現金流量變動 }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>無籌資活動現金流量數據</p>

    <h3>現金及約當現金增減淨額</h3>
    <p v-if="cashFlowData['現金及約當現金增減淨額'] !== undefined">
      ${{ cashFlowData["現金及約當現金增減淨額"] }}
    </p>
    <p v-else>無數據</p>
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
.container {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: auto;
}
.container-btn {
  display: flex;
  justify-content: space-between;
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
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  width: 15%;
}

th {
  background: #f4f4f4;
  font-weight: bold;
}

tr:hover {
  background: #f1f1f1;
}

</style>