import {getLogger} from "log4js";
import {SwaggerSpec} from "./SwaggerSpec";
import {SwaggerDocumentParser} from "./SwaggerDocumentParser";

export class SwaggerRunner {
    readonly logger = getLogger("swaggerRunner");
    readonly sd: SwaggerSpec;
    readonly sdp: SwaggerDocumentParser = new SwaggerDocumentParser();


    constructor(p_swaggerFilePath: string) {
        this.sd = new SwaggerSpec(p_swaggerFilePath);
        this.sdp.createXamples(this.sd);
    }

    public Execute() {
        this.logger.info(`Start Executing the Tests`);
    }
}