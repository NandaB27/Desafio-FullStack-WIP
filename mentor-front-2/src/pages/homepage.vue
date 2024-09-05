<template>
  <div class="page-style">
    <div class="content">
      <div class="titles">
        <h1>FULLSTACK CHALLENGE</h1>
        <h2>By Nalanda Baiotto</h2>
        <h1>˚ʚ♡ɞ˚</h1>
      </div>
      <div class="buttons">
        <v-btn @click="goToSignup" color="pink-accent-2">Sign-up</v-btn>
        <v-btn @click="goToLogin" color="pink-accent-2">Login</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToSignup() {
      window.location.href = 'signup';
    },
    goToLogin(){
    window.location.href = 'login';
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.page-style {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url('../images/background.jpeg');
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 800px;
  height: 400px;
  border-radius: 8%;
  padding: 20px;
}

.titles {
  flex-grow: 1;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}

h1 {
  margin-left: 30px;
  text-align: left;
  font-family: "Bebas Neue", sans-serif;
  font-size: 60px;
  color: #fe4773;
}

h2 {
  margin-right: 100px;
  float: right;
  font-family: "Bebas Neue", sans-serif;
  font-size: 40px;
  color: #fe4773;
}

.v-application__wrap, .v-main {
  min-height: 0vh !important;
  border-radius: 8%;
}
</style>
