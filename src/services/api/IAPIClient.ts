import { AxiosRequestConfig, AxiosResponse } from "axios";

export type IAPIRequestOptions = AxiosRequestConfig
export type IAPIResponse<T> = Promise<AxiosResponse<T>>

export interface IAPIClient {
    get: <T>(url: string, opts?: IAPIRequestOptions) => IAPIResponse<T>;
    post: <T>(url: string, opts?: IAPIRequestOptions) => IAPIResponse<T>;
    put: <T>(url: string, opts?: IAPIRequestOptions) => IAPIResponse<T>;
    delete: <T>(url: string, opts?: IAPIRequestOptions) => IAPIResponse<T>;
}