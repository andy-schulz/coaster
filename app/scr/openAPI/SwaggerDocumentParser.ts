import {TestCaseBuilder} from "../model/TestCaseBuilder";
import {SwaggerSpec} from "./SwaggerSpec";
import {OASDocument, OASOperation, OASParameter, OASPath, OASResponses} from "./OASDocument";
import {RequestParameterQuery} from "../model/RequestParameterQuery";
import {getLogger} from "log4js";

export class SwaggerDocumentParser {
    private logger = getLogger(this.constructor.name);
    constructor() {

    }

    public createXamples(document: OASDocument) {
        const testCaseBuilder = new TestCaseBuilder();

        const paths = document.paths;

        // loop all resources (key acts as name of resource)
        for (let ressource of Object.entries(paths)) {
            testCaseBuilder.resource = ressource[0];
            this.parseRessource(ressource[0], ressource[1] as OASPath, testCaseBuilder);
        }
    }

    private parseRessource(resourceName: string, pathSpec: OASPath, testCaseBuilder: TestCaseBuilder): void {

        for (let method of Object.entries(pathSpec)) {
            const builder: TestCaseBuilder = new TestCaseBuilder(testCaseBuilder);
            builder.method = method[0];

            if(method[0] == "parameters") {
                //TODO process global parameter for all methods
            } else {
                this.parseMethod(method[0], method[1], builder);
            }

        }
    }

    private parseMethod(methodName: string, methodSpec: OASOperation, testCaseBuilder: TestCaseBuilder): void {

        this.logger.debug(`Ressource: ${testCaseBuilder.resource} Method: ${testCaseBuilder.method}`);

        if(methodSpec.parameters) {
            this.parseParameter(methodSpec.parameters);
        }



        // get Parameter
        // get Responses
            // von den Responses get x-amples


        // pathrequests.sort(function (obj1) {
        //     if (obj1.method == 'post')
        //         return -1;
        //     if (obj1.method == 'put')
        //         return 0;
        //     else if (obj1.method == 'patch')
        //         return 1;
        //     else if (obj1.method == 'get')
        //         return 2;
        //     else
        //         return 3;
        // });
    }

    private parseParameter(parameterSpec: OASParameter[]) {

        for (const param of parameterSpec) {
            if (param.in === "query") {
                this.logger.debug(`Found Query Parameter for Parameter: ${param.name}`);
                const par = new RequestParameterQuery(param);
                par.value = 5;
                this.logger.trace(`$$$$$$ ${JSON.stringify(param.schema.items)}`);
            } else if(param.in == "path"){
                this.logger.debug(`Found Path Parameter for Parameter: ${param.name}`);
            } else if(param.in == "cookie"){
                this.logger.debug(`Found Cookie Parameter for Parameter: ${param.name}`);
            } else if(param.in == "header") {
                this.logger.debug(`Found Header Parameter for Parameter: ${param.name}`);
            }
        }

        // parse the query parameter and add it to the

    }
}