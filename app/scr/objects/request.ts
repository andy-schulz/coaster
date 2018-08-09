import { Response } from './response';
import { ParameterInfo } from './parameterinfo';
import { UseReference } from './useReference';


export class Request {

    constructor(p_name: string , p_method: string, p_url: string, p_valid: boolean) {
        this.name = p_name;
        this.method = p_method;
        this.url = p_url;
        this.valid = p_valid;
        this.resolveParametersLater = false;
        this.parametersToResolve = [];
        this.useReference = [];
    }


    name: string;
    method: string;
    url: string;
    valid: boolean;
    resolveParametersLater: boolean;
    parametersToResolve: ParameterInfo[];

    expectedresponse: number;
    bodyparameter: any;
    headerParameter: any;

    useReference: UseReference[];
}