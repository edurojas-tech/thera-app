<script setup>
  defineProps(['UserName'])
</script>
<template>
  <div class="TopBar">
    <img src="../assets/thera-logo.svg" alt="logo" class="TopBar__logo">
    <h1 v-if="UserName"> 
      Olá, {{ UserName }}!
    </h1>
  </div>
</template>
<style scoped>
.TopBar {
  display: flex;
  color: var(--color-white);
  font-family: 'Open Sans', sans-serif;
  gap: 120px;
  height: 100px;
}

.TopBar__logo {
  width: 150px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

@media(max-width: 800px) {
  h1 {
    font-size: 17px;
  }
  .TopBar {
    gap: 20px;
  }
}
</style>