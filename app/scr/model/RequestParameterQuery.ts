import {RequestParameter, ValueType} from "./RequestParameter";
import {OASParameter, OASParameterQueryStyle} from "../openAPI/OASDocument";
import {NotImplementedError} from "./NotImplementedError";
import  {getLogger} from "log4js";

/**
 * For more Information on Parameters and Parameter expansion see:
 * https://swagger.io/docs/specification/describing-parameters/
 * https://swagger.io/docs/specification/serialization/
 */
export class RequestParameterQuery extends RequestParameter{
    private readonly m_style: OASParameterQueryStyle;
    protected logger = getLogger(this.constructor.name);

    constructor (param: OASParameter) {
        super(param);

        this.logger.debug(`Creating Parameter ${JSON.stringify(param)}`);

        if (param.style === undefined) {
            this.m_style = "form";
        } else {
            this.m_style = param.style as OASParameterQueryStyle;
        }

        if (param.explode === undefined) {
            this.m_explode = true;
        } else {
            this.m_explode = param.explode;
        }

    }

    protected expand(value: ValueType): string {

        const schemaType = this.m_parameter.schema.type;
        const style = this.m_style;
        const explode = this.m_explode;

        this.m_parameterText = "?";

        // expand the primitive parameter
        if(schemaType === "string" || schemaType === "number" || schemaType === "boolean") {

            // explode will be ignored for
            if(typeof value === "string" || typeof value === "number" || typeof value === "boolean" ) {
                if (style === "form") {
                    this.m_parameterText = `?${this.m_parameter.name}=${value}`;
                } else {
                    this.logger.error(`SPEC ERROR: Only 'style: form' is specified for primitive query parameter.
                You have: 'style: ${style}' for Parameter ${this.m_parameter.name}`);
                }
            } else {
                this.logger.warn(`Given Parameter ${value} is not of primitive type. 
                I will take it as is (value.toString): ${value.toString()}.`);

                this.m_parameterText = `?${this.m_parameter.name}=${value.toString()}`;
            }
        // expand an array
        }
        else if (schemaType === "array") {
            let text = "";
            if (value instanceof Array) {
                let delimiter = ",";
                let arr: any[];

                if (style === "form") {
                    delimiter = ",";
                } else if(style === "spaceDelimited") {
                    delimiter = "%20";
                } else if(style === "pipeDelimited") {
                    delimiter = "|";
                } else if(style === "deepObject") {
                    const message = `Style 'deepObject' is not defined for value type 'array'`
                    this.logger.warn(message);
                    throw new NotImplementedError (message);

                    // does not apply to array value types
                }

                if (explode) {
                    delimiter = "&";
                    arr = this.expandArray(this.m_parameter.name, value)
                } else {
                    arr = value;
                    if(arr.length > 0) {
                        arr[0] = `${this.m_parameter.name}=${arr[0]}`
                    }
                }


                this.m_parameterText = `?${arr.join(delimiter)}`;
            }  else {
                this.logger.warn(`Given value (${value}) is not of type '${schemaType}. I will use it as string and create the Parameter.`);
                this.m_parameterText = `?${this.m_parameter.name}=${value.toString()}`
            }

        }
        else if (schemaType === "object") {

            const message = "Parameter for schema type 'object' is not implemented yet";
            this.logger.error(message);
            throw new NotImplementedError(message);
        }

        return "TEST";
    }
}