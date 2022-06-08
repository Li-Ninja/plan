import { GetApiCb, Params } from '@/types/api';
import { Item } from '@/types/item';

export function useCommonApi(getApi: GetApiCb) {
  const url = {
    getItems: '/Item/Get'
  };

  const getItemList = <D extends Item[]>(params: Params) => {
    return getApi<D>(url.getItems, params).then(res => res);
  };

  return {
    getItemList
  };
}
