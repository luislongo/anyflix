import { PaginatedResponse } from "../utils/PaginatedResponse";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type Genre = {
  id: number;
  name: string;
}

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string ;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverMovieQuery {
  genres: number[];
}

export interface MovieImageSet {
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
}

export interface MovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  id: number;
}

export interface IMovieService {
  details: (id: string) => Promise<MovieDetails>;
  popular: () => Promise<PaginatedResponse<Movie>>;
  similar: (id: string) => Promise<PaginatedResponse<Movie>>;
  search: (query: string) => Promise<PaginatedResponse<Movie>>;
  genres: () => Promise<Genre[]>;
  images: (id: string) => Promise<MovieImageSet>;
  discover: (query?: DiscoverMovieQuery) => Promise<PaginatedResponse<Movie>>;
} 