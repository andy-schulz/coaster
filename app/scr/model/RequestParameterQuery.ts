import {RequestParameter, ValueType} from "./RequestParameter";
import {OASParameter} from "../openAPI/OASDocument";
import {NotImplementedError} from "./error/NotImplementedError";
import  {getLogger} from "log4js";

/**
 * For more Information on Parameters and Parameter expansion see:
 * https://swagger.io/docs/specification/describing-parameters/
 * https://swagger.io/docs/specification/serialization/
 */
export class RequestParameterQuery extends RequestParameter{
    protected logger = getLogger(this.constructor.name);

    constructor (param: OASParameter) {
        super(param);
        this.logger.debug(`Creating Parameter ${JSON.stringify(param)}`);
    }

    protected expand(value: ValueType): string {

        const schemaType = this.m_parameter.schema.type;
        const style = this.style ? this.style : "form";
        const explode = this.explode == undefined ? true : this.explode;

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
            this.logger.info(`Style: ${this.style} - Explode: ${this.explode}`);

            if (value instanceof Array) {

                let delimiter = "";
                switch(style) {
                    case "form":
                        delimiter = ',';
                        break;
                    case "spaceDelimited":
                        delimiter = "%20";
                        break;
                    case "pipeDelimited":
                        delimiter = "|";
                        break;
                    case "deepObject":
                        const message = `Style 'deepObject' is not defined for value type 'array'`;
                        this.logger.warn(message);
                        throw new NotImplementedError("Style 'deepObject' is not defined for value type 'array'");
                    default:
                        break;
                }
                this.m_parameterText = this.m_parameterText +
                    `${this.m_parameter.name}=` +
                    value.join(explode ? `&id=` : delimiter);
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

        return this.m_parameterText;
    }
}