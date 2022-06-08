export type Params = Record<string, any>;

export type GetApi<D> = Promise<D | null>;

export type GetApiCb = <D>(url: string, params?: Params) => GetApi<D>;
