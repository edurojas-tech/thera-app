<script setup>
import { ref, onMounted } from 'vue'
import Login from "./views/Login.vue"
import Ponto from "./views/Ponto.vue"
import TopBar from "./components/TopBar.vue"

let user = ref('')

onMounted(() => {
  return user.value = sessionStorage.getItem("UserName")
})

</script>
<template>
  <TopBar :UserName='user'/>
  <router-view />
</template>
<style scoped>
</style>
