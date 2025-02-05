<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const account = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const router = useRouter();
const emit = defineEmits(["back-to-login"]); // ✅ 發送事件回到登入頁

// 🚀 [註冊邏輯]
const register = async () => {
  if (!account.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "請輸入所有欄位";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "密碼不一致";
    return;
  }

  try {
    const response = await axios.post(`${VITE_API_URL}/backstage/register`, {
      username: account.value,
      password: password.value
    });

    alert("註冊成功，請登入！");
    emit("back-to-login"); // ✅ 註冊成功後回到登入頁
  } catch (error) {
    errorMessage.value = "註冊失敗，帳號可能已存在";
  }
};

</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h2>註冊帳號</h2>
      <input v-model="account" placeholder="輸入帳號" />
      <input v-model="password" type="password" placeholder="輸入密碼" />
      <input v-model="confirmPassword" type="password" placeholder="確認密碼" />
      <button @click="register" class="auth-button">註冊</button>
      <button @click="goToLogin" class="auth-button">返回登入</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
}

.register-box {
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
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #28a745;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.auth-button {
  display: block;
  width: 80%;
  margin: 15px auto;
}
</style>