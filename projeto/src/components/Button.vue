<script setup>
  defineProps(['dado', 'off'])
</script>
<template>
  <span class="button" :off=off>
    {{ dado }}
  </span>
</template>
<style scoped>
.button {
  /* background: #FCCD2A 0% 0% no-repeat padding-box; */
  border-radius: 5px;
  opacity: 1;
  color: var(--color-secundary);
  text-transform: uppercase;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  border: 2px solid var(--color-secundary);
  transition: 0.2s;
}

.button:hover {
  background: #FCCD2A 0% 0% no-repeat padding-box;
  color: var(--color-main);
}

.button[off]{
  pointer-events: none;
}

@media(max-width: 600px) {
  .button {
    font-size: 12px;
  }
}
</style>