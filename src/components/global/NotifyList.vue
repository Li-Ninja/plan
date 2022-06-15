<script setup lang="ts">
import { toRef, watch } from 'vue';
import { useNotify } from '@/makers/notify.maker';
import Notify from '@/components/global/Notify.vue';

const { state } = useNotify();
const messageList = toRef(state, 'messageList');

watch(() => messageList.value, (newList, oldList) => {
  if (messageList.value.length === 0) {
    return;
  }

  // avoid removeTheMessage's setTimeout call again
  if (oldList.length > newList.length) {
    return;
  }

  const message = messageList.value[messageList.value.length - 1];

  removeTheMessage(message.key, message.delay);
}, { deep: true });

function removeTheMessage(key: number, delay: number) {
  // the setTimeout is clear messageList, not delay hide Notify
  setTimeout(() => {
    messageList.value = messageList.value.filter(message => message.key !== key);
  }, delay + 5000);
}

</script>

<template>
  <div
    class="position-fixed bottom-0 start-50 translate-middle-x mb-3"
    style="z-index: 1090;"
  >
    <template
      v-for="(message, index) in messageList"
      :key="index"
    >
      <Notify
        :content="message.content"
        :color="message.color"
        :delay="message.delay"
      />
    </template>
  </div>
</template>
