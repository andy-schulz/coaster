import {RequestParameter} from "./RequestParameter";
import {OASParameter} from "../openAPI/OASDocument";
import {RequestParameterQuery} from "./RequestParameterQuery";
import {NotImplementedError} from "./NotImplementedError";

export class RequestParameterFactory {

    getParameter(parameter: OASParameter) : RequestParameter {
        if(parameter.in === "query") {
            return new RequestParameterQuery(parameter);
        } else {
            throw new NotImplementedError(`Factory for Parameter ${parameter} not implemented`);
        }
    }
}