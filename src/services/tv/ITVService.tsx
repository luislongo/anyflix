import { PaginatedResponse } from '../utils/PaginatedResponse';

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TVShowGenre {
  id: number;
  name: string;
}

export interface TVShowLastEpisode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  production_code: string;
  season_number: number;
  still_path: string;
}

export interface TVShowNetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TVShowProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TVShowProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TVShowSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TVShowSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TVShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: TVShowCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TVShowGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVShowLastEpisode | null;
  name: string;
  networks: TVShowNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVShowProductionCompany[];
  production_countries: TVShowProductionCountry[];
  seasons: TVShowSeason[];
  spoken_languages: TVShowSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowCastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
}

export interface TVShowCrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface TVShowCredits {
  cast: TVShowCastMember[];
  crew: TVShowCrewMember[];
}

export interface DiscoverShowQuery {
  genres: number[];
}

export interface ITVService {
  search(query: string): Promise<PaginatedResponse<TVShow>>;
  id(id: string): Promise<TVShow>;
  details(id: string): Promise<TVShowDetails>;
  credits(id: string): Promise<TVShowCredits>;
  similar(id: string): Promise<PaginatedResponse<TVShow>>;
  discover(query?: DiscoverShowQuery): Promise<PaginatedResponse<TVShow>>;
}
