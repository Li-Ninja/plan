<script setup lang="ts">
import { provide } from 'vue';
import Home from '@/pages/Home.vue';
import { notifyProvideKey, useNotify } from '@/makers/notify.maker';

const notify = useNotify();

provide(notifyProvideKey, notify);

</script>

<template>
  <div class="bg-black vh-100">
    <div class="container py-3 overflow-hidden">
      <Home />
    </div>
  </div>
</template>
