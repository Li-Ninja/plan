import { inject, App } from 'vue';
import axios from 'axios';
import { GetApi } from '@/types/api';
import { useCommonApi } from '@/apis/common.api';

export const apiProvideKey = Symbol('api');

export function prepareApi(app: App) {
  const api = axios.create({
    timeout: 60000,
    baseURL: import.meta.env.VITE_API_DOMAIN.replace(/\/$/, '/')
  });

  const commonApi = useCommonApi(getApi);

  function getApi<D>(url: string, params?: Record<string, any>): GetApi<D> {
    const data = {
      ...params
    };

    return api.get<D>(url, { params: data })
      .then(res => res.data)
      .catch(err => {
        console.error('api catch error', err);

        return null;
      });
  }

  const instance = {
    provideKey: apiProvideKey,
    ...commonApi
  };

  app.provide(apiProvideKey, instance);

  app.config.globalProperties.$api = instance;

  return instance;
}

type PrepareApi = ReturnType<typeof prepareApi>;
export type InjectApi = Omit<PrepareApi, 'provideKey'>;

export function useApi(app?: App): InjectApi {
  return app?.config.globalProperties.$api ?? inject<InjectApi>(apiProvideKey)!;
}
