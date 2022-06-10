export interface ApiResponseStandard<
  D extends Record<string, any>
> {
  Data: D;
  Success: boolean;
  Message: string;
}

export type Params = Record<string, any>;

export type GetApi<D> = Promise<ApiResponseStandard<D> | null>;

export type PostApi<D> = Promise<ApiResponseStandard<D> | null>;

export type GetApiCb = <D>(url: string, params?: Params) => GetApi<D>;

export type PostApiCb = <D>(url: string, postData?: Params) => PostApi<D>;

export interface Crud {
  getApi: GetApiCb;
  postApi: PostApiCb;
}