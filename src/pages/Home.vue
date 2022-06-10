<script setup lang="ts">
import { toRef } from 'vue';
import dayjs from 'dayjs';
import { useCommonModule } from '@/modules/common.module';
import { Item } from '@/types/item';

const { state, fetchItemList, updateTheItemCount } = useCommonModule();
const itemList = toRef(state, 'itemList');

void fetchItemList();

function getFormatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

async function punchInItem(id: Item['_id']) {
  // TODO double check dialog
  const resData = await updateTheItemCount({ _id: id });

  if (resData?.Success) {
    await fetchItemList();
  } else {
    // TODO alert message component
    alert(resData?.Message);
  }
}

</script>

<template>
  <div class="row gx-5">
    <div
      v-for="item in itemList"
      :key="item._id"
      class="col-4"
    >
      <div
        class="btn card text-bg-primary"
        @click="punchInItem(item._id)"
      >
        <div class="card-body">
          <h5 class="card-title">
            {{ item.itemName }}
          </h5>
          <div class="card-text">
            <div>
              <span class="fs-1">
                {{ item.count }}
              </span>
            </div>
            <div>
              打卡時間:
              <div>
                {{ getFormatDate(item.updateAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>