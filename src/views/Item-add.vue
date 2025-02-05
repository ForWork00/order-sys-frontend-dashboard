<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const formData = ref({
  _id: "",
  name: "",
  description: "",
  price: "",
  category: "",
  image: null,
});

const loading = ref(false);
const error = ref(null);
const successMessage = ref("");

// 選擇圖片
const handleFileChange = (event) => {
  formData.value.image = event.target.files[0];
};

// 提交表單
const submitForm = async () => {
  if (!formData.value.image) {
    error.value = "請選擇圖片";
    return;
  }

  const data = new FormData();
  data.append("_id", formData.value._id);
  data.append("name", formData.value.name);
  data.append("description", formData.value.description);
  data.append("price", formData.value.price);
  data.append("category", formData.value.category);
  data.append("image", formData.value.image);
  const VITE_API_URL = import.meta.env.VITE_API_URL

  loading.value = true;
  error.value = null;
  successMessage.value = "";

  try {
    await axios.post(`${VITE_API_URL}/menu`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    successMessage.value = "菜單新增成功!";
    setTimeout(() => {
      router.push("/item-item"); // 新增成功後跳轉回菜單列表
    }, 2000);
  } catch (err) {
    error.value = "新增失敗，請檢查輸入內容";
    console.error("API 錯誤:", err);
  } finally {
    loading.value = false;
  }
};

// 返回按鈕
const goBack = () => {
  router.push("/item-item");
};
</script>

<template>
  <div class="container">
    <h1>新增菜單</h1>

    <form @submit.prevent="submitForm">
      <input v-model="formData._id" type="text" placeholder="菜單編號" required />
      <input v-model="formData.name" type="text" placeholder="菜單名稱" required />
      <textarea v-model="formData.description" placeholder="菜色說明" required></textarea>
      <input v-model="formData.price" type="number" placeholder="價格" required />
      <input v-model="formData.category" type="text" placeholder="菜色類別 (例：肉類、炸物)" required />
      <input type="file" @change="handleFileChange" accept="image/png, image/jpeg, image/gif" required />

      <div class="button-group">
        <button type="submit" :disabled="loading">提交</button>
        <button type="button" class="back-button" @click="goBack">返回</button>
      </div>
    </form>

    <p v-if="loading">正在提交...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}
/* 針對 Chrome, Safari, Edge, Opera 移除上下按鍵 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* 針對 Firefox 移除上下按鍵 */
input[type="number"] {
  -moz-appearance: textfield;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
 

}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin: 5px;
}

.back-button {
  background-color: #ff4d4f;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>