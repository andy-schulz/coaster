import * as yml from "js-yaml";
import * as fs from "fs";
import {getLogger} from "log4js";
import {OASDocument, OASServer} from "./OASDocument";


export class SwaggerSpec implements OASDocument{
    private logger = getLogger("swaggerDocument");
    private m_server: OASServer[];

    private m_document: OASDocument;
    readonly m_hostPath: string = "";


    private m_tests: string = "";


    constructor(p_swaggerFilePath: string) {

        try {
            this.logger.info("Load swagger file: " + p_swaggerFilePath);
            this.m_document = yml.safeLoad(fs.readFileSync(p_swaggerFilePath, 'utf8'));
        } catch (e) {
            console.log(e);
            return;
        }
        console.log("#################################################");
        console.log(this.m_document['x-ample-definitions']);

        if (this.m_document.basePath) {
            this.m_hostPath = this.m_document.host + this.m_document.basePath
        }
    }

    set servers(server: OASServer[]) {
        this.m_server = server
    }

    get paths() {
        return this.m_document.paths;
    }

    get info() {
        return this.m_document.info;
    }

    get tags() {
        return this.m_document.tags;
    }

    get externalDocs() {
        return this.m_document.externalDocs;
    }

    get servers() {
        return this.m_document.servers;
    }


    get components() {
        return this.m_document.components;
    }

    get xAmpleDefinitions() {
        return this.m_document['x-ample-definitions'];
    }

}