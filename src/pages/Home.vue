<script setup lang="ts">
import { toRef } from 'vue';
import dayjs from 'dayjs';
import { useCommonModule } from '@/modules/common.module';

const { state, fetchItemList } = useCommonModule();
const itemList = toRef(state, 'itemList');

void fetchItemList();

function getFormatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

</script>

<template>
  <div class="row gx-5">
    <div
      v-for="item in itemList"
      :key="item.itemName"
      class="col-4"
    >
      <div class="card text-bg-primary">
        <div class="card-body">
          <h5 class="card-title text-center">
            {{ item.itemName }}
          </h5>
          <div class="card-text">
            <div>
              打卡次數:
              <span class="fs-1">
                {{ item.count }}
              </span>
            </div>
            <div>
              打卡時間: {{ getFormatDate(item.updateAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>