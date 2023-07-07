import { IAPIClient } from "../api/IAPIClient";
import { EpisodeDetails, IEpisodesService } from "./IEpisodesService";

export class EpisodesService implements IEpisodesService {
    api : IAPIClient

    constructor(api : IAPIClient) {
        this.api = api;
    }

    details(showId: string, seasonNumber: number, episodeNumber: number)  {
        return this.api.get<EpisodeDetails>(`/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`).then((res) => res.data);
    }
}

    