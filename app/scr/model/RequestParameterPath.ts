import {RequestParameter, ValueType} from "./RequestParameter";
import {OASParameter} from "../openAPI/OASDocument";
import  {getLogger} from "log4js";

/**
 * For more Information on Parameters and Parameter expansion see:
 * https://swagger.io/docs/specification/describing-parameters/
 * https://swagger.io/docs/specification/serialization/
 */
export class RequestParameterPath extends RequestParameter{
    protected logger = getLogger(this.constructor.name);

    constructor (param: OASParameter) {
        super(param);
        this.logger.debug(`Creating Parameter ${JSON.stringify(param)}`);
    }

    protected expand(value: ValueType): string {

        const schemaType = this.m_parameter.schema.type;
        const style = this.style ? this.style : "simple";
        const explode = this.explode == undefined ? false : this.explode;

        this.m_parameterText = "";

        // expand the primitive parameter
        if(schemaType === "string" || schemaType === "number" || schemaType === "boolean") {

            // explode will be ignored for
            if(typeof value === "string" || typeof value === "number" || typeof value === "boolean" ) {
                switch(style) {
                    case "simple":
                        this.m_parameterText = `${value}`;
                        break;
                    case "label":
                        this.m_parameterText = `.${value}`;
                        break;
                    case "matrix":
                        this.m_parameterText = `;${this.m_parameter.name}=${value}`;
                        break;
                    default:
                        this.logger.error(`SPEC ERROR: Only 'style: simple' is specified for primitive query parameter. 
                        You have: 'style: ${style}' for Parameter ${this.m_parameter.name}`);
                        break;
                }
            } else {
                this.logger.warn(`Given Parameter ${value} is not of primitive type. 
                I will take it as is (value.toString): ${value.toString()}.`);

                this.m_parameterText = `${value.toString()}`;
            }
        // expand an array
        }
        else if (schemaType === "array") {
            if (value instanceof Array) {
                let delimiter = ",";

                switch (style) {
                    case "simple":
                        this.m_parameterText = value.join(delimiter);
                        break;
                    case "label":
                        this.m_parameterText = `.${value.join(explode ? '.' : delimiter)}`;
                        break;
                    case "matrix":
                        this.m_parameterText = `;${this.m_parameter.name}=${value.join(explode ? `;${this.m_parameter.name}=` : delimiter)}`;
                        break;
                    default:
                        break;
                }
            } else {
                const message = `schema type of parameter ${this.m_parameter.name} should be an array but is: ${value}.`;
                this.logger.error(message);
                throw new TypeError(message);
            }
        }
        else if (schemaType === "object") {
            const keys = Object.keys(value);
            const values = Object.values(value);

            function arrayJoiner(delimiter: string): string[] {
                const arr = [];
                for ( let i = 0; i < keys.length; i++) {
                    arr.push(`${keys[i]}${delimiter}${values[i]}`)
                }
                return arr;
            }

            switch (style) {
                case "simple":
                    this.m_parameterText =
                        (explode ? arrayJoiner('=') : arrayJoiner(',')).join(',');
                    break;
                case "label":
                    this.m_parameterText =
                        `.${(explode ? arrayJoiner('=') : arrayJoiner(',')).join(explode ? '.' : ',')}`;
                    break;
                case "matrix":
                    this.m_parameterText =
                        `;${explode ? '' : this.m_parameter.name + '='}${(explode ? arrayJoiner('=') : 
                            arrayJoiner(',')).join(explode ? ';' : ',')}`;
                    break;
                default:
                    break;
            }
        }

        return this.m_parameterText
    }
}