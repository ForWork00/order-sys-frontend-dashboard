<script setup>
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router"; //  使用 Vue Router
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const account = ref("");
const password = ref("");
const errorMessage = ref("");
const emit = defineEmits(["login-success"]); // 事件發送
const router = useRouter(); //  獲取 Vue Router

//  [登入邏輯]
const login = async () => {
  try {
    const response = await axios.post(`${VITE_API_URL}/backstage/login`, {
      username: account.value,
      password: password.value
    });

    if (response.data.access_token) { 
      localStorage.setItem("token", response.data.access_token);
      alert("登入成功");
      emit("login-success");
    } 
  } catch (error) {
    errorMessage.value = "登入失敗，請檢查帳號密碼";
  }
};


</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>後台登入</h2>
      <input v-model="account" placeholder="輸入帳號" />
      <input v-model="password" type="password" placeholder="輸入密碼" />
      <button @click="login" class="auth-button">登入</button>
      <button @click="register" class="auth-button">註冊</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 讓登入畫面占滿整頁 */
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #1890ff;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
.auth-button {
  display: block; /* 讓按鈕獨占一行 */
  width: 80%; /* 按鈕寬度全滿 */
  margin: 15px auto;
}

</style>