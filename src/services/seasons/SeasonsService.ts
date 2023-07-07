import { IAPIClient } from "../api/IAPIClient";
import { ISeasonsService } from "./ISeasonsService";

export class SeasonsService implements ISeasonsService {
    api : IAPIClient;

    constructor(api : IAPIClient) {
        this.api = api;
    }

    details(id: string, seasonNumber: number): Promise<any> {
        return this.api.get(`tv/${id}/season/${seasonNumber}`).then((response) => {
            return response.data;
        });
    }

}