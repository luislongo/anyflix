import axios, { AxiosInstance } from "axios";
import { IAPIClient, IAPIRequestOptions, IAPIResponse } from "./IAPIClient";

export class AxiosAPIClient implements IAPIClient {
    private readonly client: AxiosInstance;
    private readonly baseURL: string;
    private readonly headers: any;

    constructor(
        baseURL: string,
        headers?: any,
    ) {
        this.baseURL = baseURL;
        this.headers = headers;

        this.client = axios.create({
            baseURL: this.baseURL,
            ...headers   
        });
    }

    get<T>(
        url: string,
        opts?: IAPIRequestOptions
    ): IAPIResponse<T> {
        return this.client.get(url, opts);
    }

    post<T>(
        url: string,
        opts?: IAPIRequestOptions
    ): IAPIResponse<T> {
        return this.client.post(url, opts);
    }

    put<T>(
        url: string,
        opts?: IAPIRequestOptions
    ): IAPIResponse<T> {
        return this.client.put(url, opts);
    }

    delete<T>(
        url: string,
        opts?: IAPIRequestOptions
    ): IAPIResponse<T> {
        return this.client.delete(url, opts);
    }
}