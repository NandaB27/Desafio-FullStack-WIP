<template>
  <div class="page-style">
    <div class="login-container">
      <h1>Login</h1>
      <br>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">ENTER</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { doLogin } from '@/services/api';

const email = ref('');
const password = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await doLogin('login', { email: email.value, password: password.value });

    localStorage.setItem('token', response.access_token);
    localStorage.setItem('role', response.role);
    router.push('/home');

  } catch (error) {
    console.error('Error when logging in:', error);
    alert('Error when logging in. Check your credentials.');
  }
};
</script>

<style scoped>
.page-style {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url('../images/background.jpeg');
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 700px;
  height: 450px;
  margin: auto;
  background-color: white;
  padding: 40px;
  border-radius: 8%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: left;
  font-family: "Bebas Neue", sans-serif;
  font-size: 50px;
  color: #fe4773;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 30px; /* Espaçamento aumentado */
  width: 100%;
}

label {
  font-weight: bold;
  margin-right: 25px;
  flex-basis: 20%;
  font-family: "Roboto Condensed";
  font-size: 20px;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #fe4773;
  border-radius: 8px;
  width: 60%;
}

button {
  margin-top: 40px;
  padding: 8px;
  background-color: #fe4773;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;
}

button:hover {
  background-color: #fe124e;
}
</style>
