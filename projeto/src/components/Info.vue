<script setup>
  defineProps(['dado', 'color'])
</script>
<template>
  <div>
    <div :class="color && 'colorYellow'">
      {{ dado }}
    </div>
  </div>
</template>
<style scoped>
.colorYellow {
  color: var(--color-secundary);
}
</style>