import { Request } from "./request";

export class Ressource {
    constructor(p_path: string, p_requests: Request[]) {
        this.path = p_path;
        this.requests = p_requests;
    }

    path: string;
    requests: Request[];
}