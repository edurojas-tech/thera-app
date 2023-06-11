<script setup>
import axios from 'axios';
import api from '../api'

function login(ev) {
  ev.preventDefault()
  api.login('login', 'user', 'senha')
}

api.autenticado()
</script>
<template>
  <div class="login">
    <form class="login__form" @submit="login" id="login">  
      <div class="login__campos">
        <label>Usuário: </label>
        <input type="text" name="user" required>
      </div>
      <div class="login__campos">
        <label>Senha: </label>
        <input type="password" name="senha" required>
      </div>
      <button class="login__btn">
        LOGIN
      </button>
    </form>
  </div>
</template>
<style scoped> 
.login {
  height: auto;
  display: flex;
  align-content: center;
  justify-content: center;
}

.login__form {
  width: 25%;
  border: 2px solid var(--color-secundary);
  padding: 10px;
  border-radius: 10px;
  margin-top: 50px;
}

.login__campos {
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: aliceblue;
  font-size: 22px;
}

.login__campos input{
  border: none;
  padding: 10px;
  margin-top: 10px;
  height: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px var(--color-light);
  font-size: 22px;
}

.login__btn {
  border-radius: 5px;
  display: block;
  width: 95%;
  padding: 10px;
  border: none;
  margin: 20px auto;
  background-color: var(--color-secundary);
  color: var(--color-main);
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;
}
.login__btn:hover {
  background-color: gainsboro;
  color: var(--color-main);
}

@media (max-width: 600px) {
  .login__form {
    width: 90%;
    margin-top: 10px;
  }
}

@media (max-width: 1200px) {
  .login__form {
    width: 400px;
    margin-top: 10px;
  }
}
</style>