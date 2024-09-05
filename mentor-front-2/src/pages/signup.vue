<template>
  <div class="page-style">
    <div class="create-user">
      <h1>Create new user</h1>
      <br>
      <form @submit.prevent="createUser">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="user.name" id="name" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="user.email" id="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" id="password" type="password" required />
        </div>
        <v-btn type="submit">CONFIRM</v-btn>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { doPostUser } from '@/services/api';


const user = ref({
  name: '',
  email: '',
  password: '',
  role: 'admin'
});

const createUser = async () => {
  try {
    await doPostUser('users', user.value);
    window.location.href = "login";
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Error creating user.');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
.page-style {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url('../images/background.jpeg');
  background-size: cover;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: left;
  font-family: "Bebas Neue", sans-serif;
  font-size: 50px;
  color: #fe4773;
}

.create-user {
  width: 700px;
  height: 450px;
  margin: auto;
  background-color: white;
  padding: 40px;
  border-radius: 8%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
  padding: 8px;
  font-size: 16px;
  border: 2px solid #fe4773;
  border-radius: 20px;
  width: 60%;
}

button {
  margin-top: 20px;
  padding: 8px;
  background-color: #fe4773;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 150px;
}

button:hover {
  background-color: #fe124e;
}
</style>
