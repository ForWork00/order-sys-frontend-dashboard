<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// 控制彈窗顯示
const dialogVisible = ref(false);

// 儲存優惠券資料
const couponData = ref({
  discount: null,
  expiration_date: "",
});

// 開啟彈窗
const openDialog = () => {
  dialogVisible.value = true;
};

// 提交優惠券資料
const submitCoupon = async () => {
  try {
    const response = await axios.post(`${VITE_API_URL}/coupons/admin`, couponData.value);
    ElMessage.success("優惠券創建成功！");
    dialogVisible.value = false; // 關閉彈窗
  } catch (error) {
    console.error("創建優惠券失敗：", error);
    ElMessage.error("創建失敗，請重試！");
  }
};
</script>

<template>
  <div class="container">
    <el-button type="primary" @click="openDialog">新增優惠券</el-button>

    <el-dialog v-model="dialogVisible" title="新增優惠券" width="400px">
      <el-form label-width="120px">
        <el-form-item label="折扣金額">
          <el-input v-model.number="couponData.discount" type="number" placeholder="輸入折扣金額" />
        </el-form-item>
        <el-form-item label="過期時間">
          <el-date-picker
            v-model="couponData.expiration_date"
            type="date"
            placeholder="選擇過期時間"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCoupon">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
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
.container {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: auto;
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
  margin-bottom:15px;
}

</style>

