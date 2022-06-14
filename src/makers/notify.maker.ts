import { inject, InjectionKey, App } from 'vue';

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

  app.provide(notifyKey, instance);

  return instance;
}

export const notifyKey = Symbol('notify') as InjectionKey<InjectNotify>;

export type InjectNotify = ReturnType<typeof prepareNotify>;

export function useNotify() {
  return inject(notifyKey)!;
}
