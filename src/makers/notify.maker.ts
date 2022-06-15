import { inject, reactive, App, InjectionKey } from 'vue';
import { ColorEnum } from '@/enums/common.enum';

export function prepareNotify(app: App) {
  const state = reactive({
    messageList: [] as Message[]
  });
  const getMessage = (content: string, delay: number, color: ColorEnum) => ({
    key: Math.random(),
    color,
    content,
    delay
  });

  const error = (val: string, delay = 3000) => {
    state.messageList.push(getMessage(val, delay, ColorEnum.Danger));
  };

  const success = (val: string, delay = 3000) => {
    state.messageList.push(getMessage(val, delay, ColorEnum.Success));
  };

  const apiError = (val: string | undefined, delay = 3000) => {
    if (!val) {
      state.messageList.push(getMessage('this API return null', delay, ColorEnum.Danger));

      return;
    }

    state.messageList.push(getMessage(val, delay, ColorEnum.Danger));
  };

  const instance = {
    state,
    error,
    success,
    apiError
  };

  app.provide(notifyKey, instance);

  return instance;
}

export const notifyKey = Symbol('notify') as InjectionKey<InjectNotify>;

export type InjectNotify = ReturnType<typeof prepareNotify>;

export interface Message {
  key: number;
  color: ColorEnum;
  content: string;
  delay: number;
}

export function useNotify() {
  return inject(notifyKey)!;
}
