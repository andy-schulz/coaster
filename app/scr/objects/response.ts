import {IncomingHttpHeaders} from "http";

export class Response {
    constructor(p_headers: IncomingHttpHeaders, p_httpcode: number, p_body: string[]| object) {
        this.headers = p_headers;
        this.httpCode = p_httpcode;
        this.body = p_body;
    }

    headers: any;
    public httpCode: number;
    body: any;

    result: boolean;
    resultmessage: string;

    
}