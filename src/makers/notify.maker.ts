import { inject, App } from 'vue';

export const notifyProvideKey = Symbol('notify');

export function prepareNotify(app: App) {
  const error = (val: string) => {
    if (!val) {
      console.error(val);

      return;
    }

    console.error(val);
  };

  const apiError = (val: string | undefined) => {
    if (!val) {
      console.error('this api is null');

      return;
    }

    console.error(val);
  };

  const instance = {
    error,
    apiError
  };

  app.provide(notifyProvideKey, instance);

  return instance;
}
export type InjectNotify = ReturnType<typeof prepareNotify>;

export function useNotify(): InjectNotify {
  return inject<InjectNotify>(notifyProvideKey)!;
}
