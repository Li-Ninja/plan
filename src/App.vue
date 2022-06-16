<script setup lang="ts">
import Home from '@/pages/Home.vue';
import NotifyList from '@/components/global/NotifyList.vue';

</script>

<template>
  <div class="bg-black min-vh-100">
    <div class="container py-3 overflow-hidden">
      <NotifyList />
      <Home />
    </div>
  </div>
</template>
