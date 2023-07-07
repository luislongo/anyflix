import { AxiosAPIClient } from "./AxiosAPIClient.";
import { IAPIClient, IAPIRequestOptions, IAPIResponse } from "./IAPIClient";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2RkODAyNTZiNDdjNTE4ZDMzNjYxNmRjYTkwNTQ1ZSIsInN1YiI6IjY0YTYyMDM4MmI1MzFkMDEwN2E3ZTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nKZtu-v9dSo9n3h_ED2sDfxNIcHye2za8woUaLUk-DI'

export class MoviesAPI implements IAPIClient {
    client : IAPIClient;
                
    constructor() {
        this.client = new AxiosAPIClient(
           'https://api.themoviedb.org/3/',
           {headers: { Authorization: `Bearer ${token}` }}
           )
    }

    get<T>(
        url: string,
        opts?: IAPIRequestOptions
    ): IAPIResponse<T> {
        return this.client.get(url, opts).then((res) => {
            console.log(res.data);
            return res
        }).catch((err) => {
            console.log(err);
            return err;
        });
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