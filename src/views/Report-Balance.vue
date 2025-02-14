

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const balanceSheet = ref({
  流動資產: [],
  流動資產合計: 0,
  非流動資產: [],
  非流動資產合計: 0,
  流動負債: [],
  流動負債合計: 0,
  非流動負債: [],
  非流動負債合計: 0,
  權益: [],
  權益合計: 0,
  資產總計: 0,
  負債及權益總計: 0
});

// 取得資產負債表資料
const fetchBalanceSheet = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/accounting/balance_sheet`);
    console.log("📊 資產負債表 API 回應：", response.data); // ✅ Debug API 回應
    balanceSheet.value = response.data;
  } catch (error) {
    console.error("❌ 無法取得資產負債表：", error);
  }
};

</script>

<template>
  <div class="container">
    <h1>資產負債表</h1>
    <div class="container-btn">
      <button @click="fetchBalanceSheet">獲取資產負債表</button>
    </div>

    <h3>流動資產</h3>
    <table v-if="balanceSheet['流動資產'] && balanceSheet['流動資產'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in balanceSheet['流動資產']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額.toLocaleString() }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
        <p>流動資產合計: ${{ balanceSheet['流動資產合計'] }}</p>
      </tbody>
    </table>
    <p v-else>無流動資產數據</p>

    <h3>非流動資產</h3>
    <table v-if="balanceSheet['非流動資產'] && balanceSheet['非流動資產'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in balanceSheet['非流動資產']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額.toLocaleString() }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
        <p>非流動資產合計: ${{ balanceSheet['非流動資產合計'] }}</p>
      </tbody>
    </table>
    <p v-else>無非流動資產數據</p>

    <h3>流動負債</h3>
    <table v-if="balanceSheet['流動負債'] && balanceSheet['流動負債'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
        </tr>
        
      </thead>
      <tbody>
        <tr v-for="item in balanceSheet['流動負債']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額.toLocaleString() }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
        <p>流動負債合計: ${{ balanceSheet['流動負債合計'] }}</p>
      </tbody>
    </table>
    <p v-else>無流動負債數據</p>

    <h3>非流動負債</h3>
    <table v-if="balanceSheet['非流動負債'] && balanceSheet['非流動負債'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in balanceSheet['非流動負債']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額.toLocaleString() }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
        <p>非流動負債合計: ${{ balanceSheet['非流動負債合計'] }}</p>
      </tbody>
    </table>
    <p v-else>無非流動負債數據</p>

    <h3>權益</h3>
    <table v-if="balanceSheet['權益'] && balanceSheet['權益'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期初餘額</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in balanceSheet['權益']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期初餘額.toLocaleString() }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
        <p>權益合計: ${{ balanceSheet['權益合計'] }}</p>
      </tbody>
    </table>
    <p v-else>無權益數據</p>

    <h3>合計</h3>

    <p>資產總計: ${{ balanceSheet['資產總計'] }}</p>
    <p>負債及權益總計: ${{ balanceSheet['負債及權益總計'] }}</p>
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
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  width: 20%;
}

th {
  background-color: #f4f4f4;
}
</style>