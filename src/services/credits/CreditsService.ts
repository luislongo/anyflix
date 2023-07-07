import { IAPIClient } from "../api/IAPIClient";
import { Credits, ICreditsService } from "./ICreditsService";

export class CreditsService implements ICreditsService {
    client: IAPIClient
    
    constructor(client: IAPIClient) {
        this.client = client;
    }

    credits(id: string) {
        return this.client.get<Credits>(`movie/${id}/credits`).then(res => res.data);
    }
}