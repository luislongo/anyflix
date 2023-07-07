import { IAPIClient } from "../api/IAPIClient";
import { PaginatedResponse } from "../utils/PaginatedResponse";
import { DiscoverMovieQuery, IMovieService, Movie, MovieDetails, MovieImageSet } from "./IMovieService";

export class MovieService implements IMovieService {
    private readonly client: IAPIClient;
    
    constructor(client: IAPIClient) {
        this.client = client;
    }

    details(id: string)  {
        return this.client.get<MovieDetails>(`movie/${id}`).then(res => res.data);
    }
    popular() {
        return this.client.get<PaginatedResponse<Movie>>(`movie/popular`).then(res => res.data);
    }
    similar(id: string) {
        return this.client.get<PaginatedResponse<Movie>>(`movie/${id}/similar`).then(res => res.data);
    }
    search(query: string) {
        return this.client.get<PaginatedResponse<Movie>>(`search/movie?query=${query}`).then(res => res.data);
    }
    genres() {
        return this.client.get<{genres: {id: number, name: string}[]}>('genre/movie/list').then(res => res.data.genres);
    }
    discover(query? : DiscoverMovieQuery ) {
        let url = 'discover/movie';
        if (query) {
            url += '?';
            if (query.genres) {
                url += `with_genres=${query.genres.join(',')}`;
            }
        }
        return this.client.get<PaginatedResponse<Movie>>(url).then(res => res.data);
    }
    images(id: string) {
        return this.client.get<MovieImageSet>(`movie/${id}/images`).then(res => res.data);
    }

}