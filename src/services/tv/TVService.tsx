import { IAPIClient } from '../api/IAPIClient';
import { PaginatedResponse } from '../utils/PaginatedResponse';
import { DiscoverShowQuery, ITVService, TVShow, TVShowCredits, TVShowDetails } from './ITVService';

export class TVService implements ITVService {
  client: IAPIClient;

  constructor(api: IAPIClient) {
    this.client = api;
  }

  search(query: string) {
    return this.client.get<PaginatedResponse<TVShow>>(`/search/tv?query=${query}`).then((res) => res.data);
  }

  id(id: string) {
    return this.client.get<TVShow>(`/tv/${id}`).then((res) => res.data);
  }

  details(id: string) {
    return this.client.get<TVShowDetails>(`/tv/${id}`).then((res) => res.data);
  }

  credits(id: string) {
    return this.client.get<TVShowCredits>(`/tv/${id}/credits`).then((res) => res.data);
  }

  similar(id: string): Promise<PaginatedResponse<TVShow>> {
    return this.client.get<PaginatedResponse<TVShow>>(`/tv/${id}/similar`).then((res) => res.data);
  }
  discover(query?: DiscoverShowQuery): Promise<PaginatedResponse<TVShow>> {
    let url = 'discover/tv';
    if (query) {
      url += '?';
      if (query.genres) {
        url += `with_genres=${query.genres.join(',')}`;
      }
    }
    return this.client.get<PaginatedResponse<TVShow>>(url).then((res) => res.data);
  }
}
