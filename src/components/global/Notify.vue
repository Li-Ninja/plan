<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Toast } from 'bootstrap';
import { ColorEnum } from '@/enums/common.enum';

interface Props {
  content: string
  color: string
  delay: number
  isHide: boolean
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  color: ColorEnum.Primary,
  delay: 3000,
  isHide: false
});

const toastRef = ref<Element>();

onMounted(() => {
  const toast = new Toast(toastRef.value!, { delay: 600000 });

  toast.show();

  watch(() => props.isHide, () => {
    if (props.isHide) {
      toast.hide();
    }
  });
});

const bgColor = computed(() => `text-bg-${props.color}`);

</script>

<template>
  <div
    ref="toastRef"
    class="toast my-1 w-auto"
    :class="bgColor"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ props.content }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      />
    </div>
  </div>
</template>
