import { readonly, shallowReactive, shallowRef } from 'vue';
import { useApi } from '@/makers/api.maker';
import { Item } from '@/types/item';

let instance: ReturnType<typeof prepareCommonModule> | undefined = undefined;
let useApiInstance: ReturnType<typeof useApi>;

export function useCommonModule() {
  if (!useApiInstance) {
    useApiInstance = useApi();
  }

  return instance ??= prepareCommonModule();
}

function prepareCommonModule() {
  // state
  const state = shallowReactive({
    itemList: shallowRef<Item[]>()
  });

  // getter
  const getter = {};

  async function fetchItemList() {
    const data = await useApiInstance.getItemList();

    if (!data) {
      console.error('fetchRecommendHotelList is null');

      return;
    }

    state.itemList.value = data.Data;
  }

  async function updateTheItemCount(postData: { _id: Item['_id']}) {
    const data = await useApiInstance.updateTheItem(postData);

    if (!data) {
      console.error('updateTheItemCount is null');

      return;
    }

    return data;
  }

  return {
    state: readonly(state),
    getter: readonly(getter),
    fetchItemList,
    updateTheItemCount
  };
}
