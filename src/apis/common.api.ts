import { Crud } from '@/types/api';
import { Item } from '@/types/item';

export function useCommonApi(crud: Crud) {
  const { getApi, postApi } = crud;
  const url = {
    getItems: '/Item/Get',
    updateItem: 'Item/Update'
  };

  const getItemList = <D extends Item[]>() => {
    return getApi<D>(url.getItems).then(res => res);
  };

  const updateTheItem = (postData: { _id: Item['_id'] }) => {
    return postApi(url.updateItem, postData).then(res => res);
  };

  return {
    getItemList,
    updateTheItem
  };
}
