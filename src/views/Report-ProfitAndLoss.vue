<script setup>
import { ref } from "vue";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const incomeStatement = ref({
  營業收入: [],
  營業總收入: 0,
  營業成本: [],
  營業總成本: 0,
  毛利: 0,
  營業費用: [],
  營業利潤: 0,
  業外收入: [],
  業外支出: [],
  利潤總額: 0,
  所得稅: [],
  淨利潤: 0,
  其他綜合損益: 0,
  全面收益總額: 0
});

// 取得損益表數據
const fetchIncomeStatement = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/accounting/income_statement`);
    console.log("📊 損益表 API 回應：", response.data);
    incomeStatement.value = response.data;
  } catch (error) {
    console.error("❌ 無法取得損益表數據：", error);
  }
};
</script>

<template>
  <div class="container">
    <h1>損益表</h1>
    <div class="container-btn">
      <button @click="fetchIncomeStatement">獲取損益表</button>
    </div>

    <h3>營業收入</h3>
    <table v-if="incomeStatement['營業收入'] && incomeStatement['營業收入'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['營業收入']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <p>營業總收入: ${{ incomeStatement['營業總收入'] }}</p>

    <h3>營業成本</h3>
    <table v-if="incomeStatement['營業成本'] && incomeStatement['營業成本'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['營業成本']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <p>營業總成本: ${{ incomeStatement['營業總成本'] }}</p>
    <p>毛利: ${{ incomeStatement['毛利'] }}</p>

    <h3>營業費用</h3>
    <table v-if="incomeStatement['營業費用'] && incomeStatement['營業費用'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['營業費用']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <p>營業利潤: ${{ incomeStatement['營業利潤'] }}</p>

    <h3>業外收入</h3>
    <table v-if="incomeStatement['業外收入'] && incomeStatement['業外收入'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['業外收入']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <h3>業外支出</h3>
    <table v-if="incomeStatement['業外支出'] && incomeStatement['業外支出'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['業外支出']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <p>利潤總額: ${{ incomeStatement['利潤總額'] }}</p>

    <h3>所得稅</h3>
    <table v-if="incomeStatement['所得稅'] && incomeStatement['所得稅'].length > 0">
      <thead>
        <tr>
          <th>代碼</th>
          <th>科目</th>
          <th>期末餘額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeStatement['所得稅']" :key="item.代碼">
          <td>{{ item.代碼 }}</td>
          <td>{{ item.科目 }}</td>
          <td>${{ item.期末餘額.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <p>淨利潤: ${{ incomeStatement['淨利潤'] }}</p>
    <p>其他綜合損益: ${{ incomeStatement['其他綜合損益'] }}</p>
    <p>全面收益總額: ${{ incomeStatement['全面收益總額'] }}</p>
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
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #45a049;
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
  width: 33%;
}

th {
  background-color: #f4f4f4;
}
</style>
