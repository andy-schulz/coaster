import {RequestParameter} from "./RequestParameter";
import {OASParameter} from "../openAPI/OASDocument";
import {RequestParameterQuery} from "./RequestParameterQuery";
import {RequestParameterPath} from "./RequestParameterPath";
import {NotImplementedError} from "./error/NotImplementedError";

export class RequestParameterFactory {

    static getParameter(parameter: OASParameter) : RequestParameter {

        switch(parameter.in) {
            case "query":
                return new RequestParameterQuery(parameter);
            case "path":
                return new RequestParameterPath(parameter);
            case "header":
            case "cookie":
            default:
                throw new NotImplementedError(`Factory for Parameter ${parameter.in} not implemented`);
        }
    }
}